"""Read-only audit of the actual Next.js HTTP output, links and public resources."""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote, parse_qs
from urllib.request import urlopen
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).resolve().parents[1]
BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8084').rstrip('/') + '/'
routes = json.loads((ROOT / 'content/routes.json').read_text(encoding='utf-8'))
errors = []

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links, self.ids, self.schemas = [], set(), []
        self.schema = None
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs: self.ids.add(attrs['id'])
        for key in ['href', 'src']:
            if attrs.get(key): self.links.append(attrs[key])
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.schema = ''
    def handle_data(self, data):
        if self.schema is not None: self.schema += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None

def fetch(url):
    try:
        with urlopen(url, timeout=15) as response:
            if response.geturl() != url:
                errors.append(f'{url}: unexpected redirect to {response.geturl()}')
            return response.read()
    except (HTTPError, URLError) as error:
        errors.append(f'{url}: {error}')
        return b''

pages = {}
for route in routes:
    path = '' if route == 'index.html' else 'objects/' if route == 'objects.html' else route.removesuffix('.html')
    url = urljoin(BASE, path)
    html = fetch(url).decode('utf-8')
    if '/_next/static/' not in html: errors.append(f'{route}: not rendered by Next.js')
    for removed in ['000708501515', 'KZ44722S000019492073', 'CASPKZKA', 'team-temirlan', 'team-nursultan', 'team-bakytzhan', 'cert-1.jpg', 'id="team"', 'id="certificates"', 'pest-game.js', 'pest-game.css']:
        if removed in html: errors.append(f'{route}: removed content {removed}')
    try: pages[url] = Page(html)
    except (ValueError, TypeError) as error: errors.append(f'{route}: invalid markup/schema {error}')

resources = set()
for url, page in pages.items():
    for link in page.links:
        parsed = urlsplit(link)
        if parsed.scheme == 'tel' and parsed.path != '+77076203813': errors.append(f'{url}: phone {link}')
        if parsed.netloc == 'wa.me' and parsed.path != '/77076203813': errors.append(f'{url}: WhatsApp {link}')
        if parsed.scheme == 'whatsapp':
            query = parse_qs(parsed.query)
            if parsed.netloc != 'send' or query.get('phone') != ['77076203813'] or not query.get('text'):
                errors.append(f'{url}: WhatsApp app link {link}')
        target = urlsplit(urljoin(url, link))
        if target.netloc != urlsplit(BASE).netloc or target.scheme not in ('http', 'https'): continue
        address = target._replace(fragment='').geturl()
        if target.path.endswith('.html'): errors.append(f'{url}: legacy internal link {link}')
        if address not in pages: resources.add(address)
        elif target.fragment and unquote(target.fragment) not in pages[address].ids:
            errors.append(f'{url}: missing anchor {link}')
for resource in sorted(resources): fetch(resource)
print(f'Next.js: checked {len(pages)} public pages and {len(resources)} resources; {len(errors)} errors')
for error in errors: print(error)
raise SystemExit(bool(errors))
