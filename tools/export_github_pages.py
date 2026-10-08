"""Export only the public Next.js application for a GitHub Pages project URL."""
import argparse
from datetime import datetime
from html import escape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
import subprocess
from urllib.parse import unquote, urljoin, urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parents[1]


def content_path(route):
    return '/' if route == 'index.html' else '/objects/' if route == 'objects.html' else '/' + route[:-5] + '/'


def prefix_jsx(source, base_path):
    if not base_path:
        return source
    # Public URLs, not imports or the route resolver, receive the project prefix.
    source = re.sub(r'''(["'`])(/(?:images|css|objects|services|instructions)(?:/[^"'`]*|\#[^"'`]*|))\1''',
                    lambda m: m[1] + base_path + m[2] + m[1], source)
    source = re.sub(r'''((?:src|href)=\{?["'])((?:\.\./)*(?:images|css)/[^"']+)(["'])''',
                    lambda m: m[1] + base_path + '/' + re.sub(r'^(?:\.\./)+', '', m[2]) + m[3], source)
    source = re.sub(r'''(href=\{?["'])/(#[^"']*)?(["'])''',
                    lambda m: m[1] + base_path + '/' + (m[2] or '') + m[3], source)
    source = source.replace('link("/")', 'link(' + json.dumps(base_path + '/') + ')')
    source = source.replace('"/" + value', json.dumps(base_path + '/') + ' + value')
    return source


def site_copy(value, site_url, routes):
    paths = {'/' + route[:-5]: content_path(route) for route in routes if route != 'index.html'}
    paths['/'] = '/'
    if isinstance(value, dict):
        return {key: site_copy(item, site_url, routes) for key, item in value.items()}
    if isinstance(value, list):
        return [site_copy(item, site_url, routes) for item in value]
    if isinstance(value, str):
        parsed = urlsplit(value)
        if parsed.netloc in ['discleaning.kz', 'killdez.kz']:
            path = paths.get(parsed.path, parsed.path)
            return site_url + urlunsplit(('', '', path, parsed.query, parsed.fragment))
    return value


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.ids, self.canonical = [], set(), None
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if 'id' in attributes:
            self.ids.add(attributes['id'])
        if tag == 'link' and attributes.get('rel') == 'canonical':
            self.canonical = attributes.get('href')
        for key in ['src', 'href']:
            if attributes.get(key):
                self.links.append(attributes[key])


def audit(folder, site_url, base_path, routes):
    errors, pages = [], {}
    for route in routes:
        path = content_path(route)
        file = folder / path.lstrip('/') / 'index.html'
        if path == '/':
            file = folder / 'index.html'
        if not file.is_file():
            errors.append(f'{path}: missing index.html')
            continue
        page = Page(file.read_text(encoding='utf-8'))
        pages[base_path + path] = page
        if page.canonical != site_url + path:
            errors.append(f'{path}: incorrect canonical {page.canonical}')
    host = urlsplit(site_url).netloc
    for path, page in pages.items():
        for link in page.links:
            parsed = urlsplit(urljoin('https://' + host + path, link))
            if parsed.scheme not in ['http', 'https'] or parsed.netloc != host:
                continue
            address = unquote(parsed.path)
            if base_path and not address.startswith(base_path + '/'):
                errors.append(f'{path}: escaped the project URL: {link}')
                continue
            target = address[len(base_path):].lstrip('/')
            file = folder / target
            if file.is_dir():
                file = file / 'index.html'
            if not file.is_file():
                errors.append(f'{path}: missing resource: {link}')
            elif parsed.fragment and address in pages and unquote(parsed.fragment) not in pages[address].ids:
                errors.append(f'{path}: missing anchor: {link}')
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-path', default='/KillDEZ')
    parser.add_argument('--site-url', default='https://kolokolchi.github.io/KillDEZ')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    base_path = args.base_path.rstrip('/')
    site_url = args.site_url.rstrip('/')
    if base_path and not re.fullmatch(r'/[A-Za-z0-9_-]+', base_path):
        raise ValueError('Expected an empty base path or one repository directory')
    if urlsplit(site_url).scheme != 'https' or urlsplit(site_url).path.rstrip('/') != base_path:
        raise ValueError('The HTTPS site URL must match the base path')
    publication = ROOT / 'artifacts' / ('github-pages-' + datetime.now().strftime('%Y%m%d-%H%M%S'))
    stage = publication / 'build'
    output = args.output.resolve() if args.output else publication / 'site'
    if output.exists() and any(output.iterdir()):
        raise ValueError('Refusing to overwrite an existing publication directory')
    stage.mkdir(parents=True)
    output.mkdir(parents=True, exist_ok=True)
    for name in ['components', 'content', 'lib', 'css']:
        shutil.copytree(ROOT / name, stage / name)
    shutil.copytree(ROOT / 'app/(site)', stage / 'app/(site)')
    for file in (ROOT / 'app').iterdir():
        if file.is_file():
            shutil.copy2(file, stage / 'app' / file.name)
    for name in ['package.json', 'package-lock.json']:
        shutil.copy2(ROOT / name, stage / name)
    public = stage / 'public'
    public.mkdir()
    for name in ['css', 'images']:
        shutil.copytree(ROOT / name, public / name, ignore=shutil.ignore_patterns('*.md', '*.json'))
    for name in ['favicon.ico', 'favicon.png', 'apple-touch-icon.png']:
        shutil.copy2(ROOT / name, public / name)
    routes = json.loads((ROOT / 'content/routes.json').read_text(encoding='utf-8'))
    for file in list((stage / 'app').rglob('*.jsx')) + list((stage / 'components').rglob('*.jsx')) + list((stage / 'content/pages').glob('*.jsx')):
        file.write_text(prefix_jsx(file.read_text(encoding='utf-8'), base_path), encoding='utf-8')
    for folder in [stage / 'css', public / 'css']:
        for file in folder.rglob('*.css'):
            text = file.read_text(encoding='utf-8')
            text = re.sub(r'''(url\(["']?)/''', lambda m: m[1] + base_path + '/', text)
            file.write_text(text, encoding='utf-8')
    seo = json.loads((stage / 'content/seo.json').read_text(encoding='utf-8'))
    (stage / 'content/seo.json').write_text(json.dumps(site_copy(seo, site_url, routes), ensure_ascii=False, indent=2), encoding='utf-8')
    (stage / 'next.config.mjs').write_text('export default ' + json.dumps({
        'output': 'export', 'basePath': base_path, 'trailingSlash': True,
        'poweredByHeader': False, 'agentRules': False, 'images': {'unoptimized': True},
    }) + ';\n', encoding='utf-8')
    page = stage / 'app/(site)/[[...slug]]/page.jsx'
    text = page.read_text(encoding='utf-8')
    if 'dynamicParams = true' not in text:
        raise ValueError('Review the public route export after source changes')
    page.write_text(text.replace('dynamicParams = true', 'dynamicParams = false'), encoding='utf-8')
    subprocess.run(['node', str(ROOT / 'node_modules/next/dist/bin/next'), 'build', str(stage), '--webpack'], cwd=ROOT, check=True)
    shutil.copytree(stage / 'out', output, dirs_exist_ok=True)
    (output / '.nojekyll').write_text('', encoding='utf-8')
    (output / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join('<url><loc>' + escape(site_url + content_path(route)) + '</loc></url>\n' for route in routes) + '</urlset>\n', encoding='utf-8')
    (output / 'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: ' + site_url + '/sitemap.xml\n', encoding='utf-8')
    for route in routes:
        if route == 'index.html':
            continue
        target = base_path + content_path(route)
        file = output / route
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text('<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=' + escape(target, quote=True) + '"><link rel="canonical" href="' + escape(site_url + content_path(route), quote=True) + '"><title>KILL DEZ</title></head><body><a href="' + escape(target, quote=True) + '">KILL DEZ</a><script>location.replace(' + json.dumps(target) + '+location.search+location.hash)</script></body></html>', encoding='utf-8')
    errors = audit(output, site_url, base_path, routes)
    if errors:
        raise RuntimeError('GitHub Pages audit failed:\n' + '\n'.join(errors[:30]))
    if (output / 'admin').exists() or (output / 'api').exists() or (output / 'leads.json').exists():
        raise RuntimeError('Internal application data must not enter the public export')
    result = {'output': str(output), 'site_url': site_url + '/', 'base_path': base_path, 'pages': len(routes), 'files': sum(1 for file in output.rglob('*') if file.is_file()), 'audit_errors': len(errors)}
    (publication / 'manifest.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps(result))


if __name__ == '__main__':
    main()
