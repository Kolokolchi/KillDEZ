"""Read-only audit of public files and URLs in the actual Apache/nginx package."""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE = json.loads((ROOT / 'seo.config.json').read_text(encoding='utf-8'))['site_url'].rstrip('/')


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links, self.ids, self.canonical = [], set(), None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        for name in ('href', 'src'):
            if attrs.get(name):
                self.links.append(attrs[name])


def audit(folder, routes):
    folder = Path(folder)
    errors, pages = [], {}
    for route in routes:
        path = '/' if route == 'index.html' else '/objects/' if route == 'objects.html' else '/' + route[:-5]
        file = folder / ('objects/index.html' if route == 'objects.html' else route)
        if not file.is_file():
            errors.append(f'{path}: missing page {file.relative_to(folder)}')
            continue
        page = Page(file.read_text(encoding='utf-8'))
        pages[path] = page
        if page.canonical != BASE + path:
            errors.append(f'{path}: canonical {page.canonical}')
        if (folder / path.lstrip('/')).is_dir() and not path.endswith('/'):
            errors.append(f'{path}: directory requires a trailing slash on nginx')
    for path, page in pages.items():
        for link in page.links:
            target = urlsplit(urljoin(BASE + path, link))
            if target.netloc != urlsplit(BASE).netloc or target.scheme not in ('http', 'https'):
                continue
            address = unquote(target.path)
            if address in pages:
                if target.fragment and unquote(target.fragment) not in pages[address].ids:
                    errors.append(f'{path}: missing anchor {link}')
            elif not (folder / address.lstrip('/')).is_file():
                errors.append(f'{path}: missing target {link}')
            if address.endswith('.html'):
                errors.append(f'{path}: legacy internal link {link}')
    rules = (folder / '.htaccess').read_text(encoding='utf-8')
    if 'RewriteRule ^objects/$ /objects ' in rules:
        errors.append('/objects/: redirect conflicts with nginx directory normalization')
    return errors


if __name__ == '__main__':
    routes = json.loads((ROOT / 'content/routes.json').read_text(encoding='utf-8'))
    errors = audit(sys.argv[1], routes)
    print(f'Hosting: checked {len(routes)} public pages, local links, anchors and assets; {len(errors)} errors')
    for error in errors:
        print(error)
    raise SystemExit(bool(errors))
