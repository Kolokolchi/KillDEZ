"""Targeted static SEO updates. Dry run by default; never rebuild page bodies."""
import argparse
import difflib
from html import escape
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
from urllib.parse import urljoin, urlsplit
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


def read(path):
    return path.read_bytes().decode('utf-8')


def public_pages(root):
    return [root / 'index.html', root / 'objects.html',
            *sorted((root / 'services').glob('*.html')),
            *sorted((root / 'objects').glob('*.html'))]


def load_config(root):
    config = json.loads(read(root / 'seo.config.json'))
    for key, env in [('site_url', 'SITE_URL'),
                     ('google_site_verification', 'GOOGLE_SITE_VERIFICATION'),
                     ('yandex_verification', 'YANDEX_VERIFICATION')]:
        config[key] = os.environ.get(env, config.get(key, '')).strip()
    site = config['site_url'].rstrip('/')
    if site:
        parts = urlsplit(site)
        if (parts.scheme != 'https' or not parts.hostname or parts.username
                or parts.password or parts.path or parts.query or parts.fragment
                or re.search(r'[\s<>"\\]', site)):
            raise ValueError('site_url must be an HTTPS origin without path, credentials, query or fragment')
    config['site_url'] = site
    return config


class PageData(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.meta = {}
        self.title = ''
        self.h1 = ''
        self.crumbs = []
        self.capture = None
        self.in_crumbs = False
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'meta':
            self.meta[a.get('name', a.get('property', ''))] = a.get('content', '')
        if tag in ('title', 'h1'):
            self.capture = tag
        if tag == 'nav' and 'catalog-breadcrumbs' in a.get('class', '').split():
            self.in_crumbs = True
        if self.in_crumbs and (tag == 'a' or a.get('aria-current') == 'page'):
            self.crumbs.append({'name': '', 'href': a.get('href', '')})
            self.capture = 'crumb'
        if tag == 'br':
            self.handle_data(' ')

    def handle_endtag(self, tag):
        if tag == 'nav':
            self.in_crumbs = False
        if tag in ('title', 'h1') or (self.capture == 'crumb' and tag in ('a', 'span')):
            self.capture = None

    def handle_data(self, data):
        if self.capture == 'crumb':
            self.crumbs[-1]['name'] += data
        elif self.capture:
            setattr(self, self.capture, getattr(self, self.capture) + data)


def canonical(site, relative):
    return site + ('/' if relative == 'index.html' else '/' + relative)


def resolve_url(site, relative, target):
    url = urljoin(canonical(site, relative), target)
    parts = urlsplit(url)
    if parts.path == '/index.html':
        url = url.replace('/index.html', '/', 1)
    return url


def set_tag(source, tag, attribute, key, value, value_attribute='content'):
    pattern = rf'<{tag}\b(?=[^>]*\b{attribute}=["\']{re.escape(key)}["\'])[^>]*>'
    replacement = f'<{tag} {attribute}="{key}" {value_attribute}="{escape(value, quote=True)}">'
    matches = list(re.finditer(pattern, source, re.I))
    if matches:
        # Replace the first occurrence and remove accidental duplicates.
        first = True
        def replace(_):
            nonlocal first
            result = replacement if first else ''
            first = False
            return result
        return re.sub(pattern, replace, source, flags=re.I)
    newline = '\r\n' if '\r\n' in source else '\n'
    return source.replace('</head>', replacement + newline + '</head>', 1)


class ContentTree(HTMLParser):
    """Read authored service cards and FAQ, without evaluating scripts."""
    VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
            'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = ET.Element('document')
        self.stack = [self.root]
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        node = ET.SubElement(self.stack[-1], tag, {k: v or '' for k, v in attrs})
        if tag not in self.VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self.VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        node = self.stack[-1]
        if len(node):
            node[-1].tail = (node[-1].tail or '') + data
        else:
            node.text = (node.text or '') + data


def plain_text(node):
    return ' '.join(''.join(node.itertext()).split()) if node is not None else ''


def page_catalog_and_faq(source, site, relative):
    root = ContentTree(source).root
    services = root.find('.//section[@id="services"]')
    offers = []
    if services is not None:
        for card in services.iter('a'):
            href = card.get('href', '')
            if not re.fullmatch(r'services/[a-z0-9-]+\.html', href):
                continue
            fields = {cls: node for node in card.iter() for cls in node.get('class', '').split()}
            if 'svc-title' in fields:
                name = ' '.join(filter(None, [plain_text(fields.get('svc-pre')), plain_text(fields['svc-title'])]))
            else:
                name = plain_text(card.find('h3')).removesuffix(' ↗')
            if not name:
                continue
            service_url = resolve_url(site, relative, href)
            service = {'@type': 'Service', '@id': service_url + '#service',
                       'name': name, 'url': service_url, 'provider': {'@id': site + '/#business'},
                       'areaServed': 'Алматы'}
            description = plain_text(card.find('p'))
            if description:
                service['description'] = description
            offer = {'@type': 'Offer', 'url': service_url, 'itemOffered': service}
            price = plain_text(fields.get('svc-price'))
            if price:
                match = re.fullmatch(r'от\s+([\d\s]+)\s*₸', price)
                if not match:
                    raise ValueError(f'Unsupported visible price on {href}: {price}')
                offer['priceSpecification'] = {'@type': 'PriceSpecification',
                                               'minPrice': int(re.sub(r'\s', '', match[1])),
                                               'priceCurrency': 'KZT'}
            offers.append(offer)
    faq = root.find('.//section[@id="faq"]')
    questions = []
    if faq is not None:
        fields = {node.get('data-i18n'): plain_text(node) for node in faq.iter() if node.get('data-i18n')}
        for key, question in fields.items():
            if re.fullmatch(r'faq\.\d+\.q', key) and question:
                answer = fields.get(key[:-1] + 'a')
                if answer:
                    questions.append({'@type': 'Question', 'name': question,
                                      'acceptedAnswer': {'@type': 'Answer', 'text': answer}})
    return offers, questions


def transform(source, relative, config):
    """Return a patched document. An empty origin is a strict no-op."""
    site = config['site_url']
    if not site:
        return source
    data = PageData(source)
    url = canonical(site, relative)
    description = data.meta.get('description', '')
    if not data.title.strip() or not description:
        raise ValueError(f'{relative}: title and description are required')
    image_source = data.meta.get('og:image', '/images/hero-business.jpg')
    old_image = urlsplit(image_source)
    old_page = urlsplit(data.meta.get('og:url', ''))
    if old_image.netloc and old_image.netloc == old_page.netloc:
        image_source = old_image.path + ('?' + old_image.query if old_image.query else '')
    image = resolve_url(site, relative, image_source)
    source = set_tag(source, 'link', 'rel', 'canonical', url, 'href')
    for key, value in {'og:title': data.meta.get('og:title') or data.title.strip(),
                       'og:description': data.meta.get('og:description') or description,
                       'og:type': 'website', 'og:url': url, 'og:image': image,
                       'og:locale': 'ru_KZ'}.items():
        source = set_tag(source, 'meta', 'property', key, value)
    for key, value in {'twitter:card': 'summary_large_image',
                       'twitter:title': data.meta.get('og:title') or data.title.strip(),
                       'twitter:description': data.meta.get('og:description') or description,
                       'twitter:image': image}.items():
        source = set_tag(source, 'meta', 'name', key, value)
    for key, config_key in [('google-site-verification', 'google_site_verification'),
                            ('yandex-verification', 'yandex_verification')]:
        if config.get(config_key):
            source = set_tag(source, 'meta', 'name', key, config[config_key])
        else:
            source = re.sub(rf'<meta\b(?=[^>]*name=["\']{key}["\'])[^>]*>', '', source, flags=re.I)
    business = {'@type': 'LocalBusiness', '@id': site + '/#business',
                'name': 'Dis Cleaning', 'url': site + '/', 'telephone': '+77076203813',
                'logo': site + '/images/logo-lockup.svg', 'areaServed': 'Алматы'}
    graph = [business, {'@type': 'WebPage', '@id': url + '#webpage', 'url': url,
                       'name': data.title.strip(), 'description': description,
                       'inLanguage': 'ru', 'about': {'@id': business['@id']}}]
    offers, questions = page_catalog_and_faq(source, site, relative)
    if offers:
        business['hasOfferCatalog'] = {'@type': 'OfferCatalog', '@id': url + '#service-catalog',
                                      'name': 'Услуги Dis Cleaning в Алматы', 'itemListElement': offers}
    if questions:
        graph.append({'@type': 'FAQPage', '@id': url + '#faq', 'url': url + '#faq',
                      'inLanguage': 'ru', 'isPartOf': {'@id': url + '#webpage'}, 'mainEntity': questions})
        graph[1]['hasPart'] = {'@id': url + '#faq'}
    if relative.startswith('services/'):
        service = {'@type': 'Service', '@id': url + '#service', 'url': url,
                   'name': data.h1.strip(), 'description': description,
                   'provider': {'@id': business['@id']}, 'areaServed': 'Алматы'}
        quote = re.search(r'class="service-quote"[^>]*>\s*<strong>от\s+([\d\s]+)\s*₸', source)
        if quote:
            service['offers'] = {'@type': 'Offer', 'url': url,
                                 'priceSpecification': {'@type': 'PriceSpecification',
                                                        'minPrice': int(re.sub(r'\s', '', quote[1])),
                                                        'priceCurrency': 'KZT'}}
        graph.append(service)
        graph[1]['mainEntity'] = {'@id': service['@id']}
    if data.crumbs:
        graph.append({'@type': 'BreadcrumbList', '@id': url + '#breadcrumbs',
                      'itemListElement': [
                          {'@type': 'ListItem', 'position': i, 'name': crumb['name'].strip(),
                           'item': resolve_url(site, relative, crumb['href']) if crumb['href'] else url}
                          for i, crumb in enumerate(data.crumbs, 1)]})
        graph[1]['breadcrumb'] = {'@id': url + '#breadcrumbs'}
    payload = json.dumps({'@context': 'https://schema.org', '@graph': graph}, ensure_ascii=False).replace('<', '\\u003c')
    block = '<script type="application/ld+json">' + payload + '</script>'
    pattern = r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>.*?</script>'
    # Current pages contain one WebPage or business block. Preserve unrelated schemas.
    replaced = False
    def replace_schema(match):
        nonlocal replaced
        existing = json.loads(match[0].split('>', 1)[1].rsplit('</script>', 1)[0])
        managed = existing.get('@type') in ('WebPage', 'HomeAndConstructionBusiness', 'LocalBusiness')
        managed = managed or any(n.get('@type') == 'LocalBusiness' and n.get('name') == 'Dis Cleaning'
                                 for n in existing.get('@graph', []))
        if managed:
            result = '' if replaced else block
            replaced = True
            return result
        return match[0]
    source = re.sub(pattern, replace_schema, source, flags=re.S | re.I)
    if not replaced:
        source = source.replace('</head>', block + '</head>', 1)
    return source


def planned_changes(root, config):
    if not config['site_url']:
        return {}
    changes = {}
    pages = public_pages(root)
    for path in pages:
        before = read(path)
        after = transform(before, path.relative_to(root).as_posix(), config)
        if before != after:
            changes[path] = after
    ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    sitemap = ET.Element('{http://www.sitemaps.org/schemas/sitemap/0.9}urlset')
    for path in pages:
        entry = ET.SubElement(sitemap, 'url')
        ET.SubElement(entry, 'loc').text = canonical(config['site_url'], path.relative_to(root).as_posix())
    ET.indent(sitemap)
    outputs = {'sitemap.xml': ET.tostring(sitemap, encoding='unicode', xml_declaration=True) + '\n',
               'robots.txt': robots(config['site_url'])}
    for name, content in outputs.items():
        path = root / name
        if not path.exists() or read(path) != content:
            changes[path] = content
    return changes


def robots(site=''):
    result = ('User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /tools/\n'
              'Disallow: /tests/\nDisallow: /docs/\nDisallow: /artifacts/\n'
              'Disallow: /node_modules/\n')
    # admin.html remains crawlable so crawlers can see its noindex tag.
    return result + (f'Sitemap: {site}/sitemap.xml\n' if site else '')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true', help='Write the reviewed changes')
    parser.add_argument('--diff', action='store_true', help='Show a unified diff without writing')
    args = parser.parse_args()
    if args.apply and args.diff:
        parser.error('--apply and --diff are mutually exclusive')
    config = load_config(ROOT)
    if not config['site_url']:
        print('BLOCKED: set a confirmed site_url in seo.config.json (or SITE_URL). No files written.')
        print(f'Public pages: {len(public_pages(ROOT))}; domain metadata and sitemap deferred.')
        return
    changes = planned_changes(ROOT, config)
    for path, after in changes.items():
        print(('WRITE ' if args.apply else 'WOULD UPDATE ') + path.relative_to(ROOT).as_posix())
        if args.diff:
            before = read(path) if path.exists() else ''
            print(''.join(difflib.unified_diff(before.splitlines(True), after.splitlines(True),
                                              fromfile=str(path), tofile=str(path))), end='')
        if args.apply:
            path.write_bytes(after.encode('utf-8'))
    print(f'{len(changes)} changed files; ' + ('applied.' if args.apply else 'dry run, no files written.'))


if __name__ == '__main__':
    main()
