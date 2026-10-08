"""Exercise SEO against copies of the actual pages, never the working website."""
import importlib.util
import json
import os
from pathlib import Path
import re
import shutil
import tempfile
import unittest
from unittest.mock import patch
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('seo', ROOT / 'tools/seo.py')
seo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(seo)


class SeoTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for page in seo.public_pages(ROOT):
            target = self.root / page.relative_to(ROOT)
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(page, target)
        shutil.copyfile(ROOT / 'seo.config.json', self.root / 'seo.config.json')
        self.config = {'site_url': 'https://seo-test.example',
                       'google_site_verification': '', 'yandex_verification': ''}

    def test_missing_domain_never_changes_pages(self):
        config = dict(self.config, site_url='')
        self.assertEqual(seo.planned_changes(self.root, config), {})
        for path in seo.public_pages(self.root):
            self.assertEqual(seo.transform(seo.read(path), path.name, config), seo.read(path))

    def test_all_pages_body_prices_metadata_and_schema(self):
        changes = seo.planned_changes(self.root, self.config)
        for path in seo.public_pages(self.root):
            before = seo.read(path)
            after = changes[path]
            self.assertEqual(before.split('</head>', 1)[1], after.split('</head>', 1)[1])
            self.assertEqual(re.findall(r'(?:от\s+)?\d[\d\s]*₸', before),
                             re.findall(r'(?:от\s+)?\d[\d\s]*₸', after))
            self.assertEqual(after.count('rel="canonical"'), 1)
            self.assertEqual(after.count('name="twitter:card"'), 1)
            self.assertNotIn('site-verification', after)
            data = seo.PageData(after)
            self.assertTrue(data.meta['og:image'].startswith(self.config['site_url']))
            self.assertEqual(data.meta['og:url'], seo.canonical(self.config['site_url'], path.relative_to(self.root).as_posix()))
            graph = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', after, re.S)[1])['@graph']
            business = graph[0]
            self.assertEqual(business['areaServed'], 'Алматы')
            self.assertNotIn('address', business)
            self.assertNotIn('aggregateRating', business)
            if path.parent.name == 'services':
                service = next(n for n in graph if n['@type'] == 'Service')
                self.assertEqual(service['provider']['@id'], business['@id'])
                if path.name == 'klopy.html':
                    self.assertEqual(service['offers']['priceSpecification']['minPrice'], 12000)
                if path.name == 'cleaning.html':
                    self.assertNotIn('offers', service)
            if path.name != 'index.html':
                crumbs = next(n for n in graph if n['@type'] == 'BreadcrumbList')['itemListElement']
                self.assertEqual(crumbs[0]['item'], self.config['site_url'] + '/')
                self.assertEqual(crumbs[-1]['item'], data.meta['og:url'])
                self.assertTrue(all(c['name'] for c in crumbs))

    def test_sitemap_and_idempotence(self):
        changes = seo.planned_changes(self.root, self.config)
        xml = ET.fromstring(changes[self.root / 'sitemap.xml'])
        urls = [e.text for e in xml.findall('.//{*}loc')]
        self.assertEqual(len(urls), 73)
        self.assertEqual(len(set(urls)), 73)
        self.assertIn(self.config['site_url'] + '/', urls)
        self.assertNotIn(self.config['site_url'] + '/admin.html', urls)
        self.assertFalse(any('/index.html' in url for url in urls))
        for path, text in changes.items():
            path.write_bytes(text.encode('utf-8'))
        self.assertEqual(seo.planned_changes(self.root, self.config), {})
        switched = seo.planned_changes(self.root, dict(self.config, site_url='https://other.example'))
        for path in seo.public_pages(self.root):
            self.assertNotIn('seo-test.example', switched[path])
            self.assertEqual(switched[path].count('"@type": "LocalBusiness"'), 1)

    def test_verification_escaping_and_removal(self):
        source = seo.read(self.root / 'index.html')
        config = dict(self.config, google_site_verification='a"<&', yandex_verification='abc123')
        result = seo.transform(source, 'index.html', config)
        parsed = seo.PageData(result)
        self.assertEqual(parsed.meta['google-site-verification'], 'a"<&')
        self.assertEqual(parsed.meta['yandex-verification'], 'abc123')
        self.assertEqual(seo.transform(result, 'index.html', config), result)
        cleared = seo.transform(result, 'index.html', self.config)
        self.assertNotIn('name="google-site-verification"', cleared)
        self.assertNotIn('name="yandex-verification"', cleared)

    def test_domain_validation_and_environment(self):
        with patch.dict(os.environ, {'SITE_URL': 'https://confirmed.example/', 'GOOGLE_SITE_VERIFICATION': 'g'}, clear=True):
            config = seo.load_config(self.root)
            self.assertEqual(config['site_url'], 'https://confirmed.example')
            self.assertEqual(config['google_site_verification'], 'g')
        for invalid in ['http://example.com', 'https://example.com/path', 'https://user@example.com',
                        'https://example.com?x=y', 'https://example.com#fragment', 'https://bad host']:
            with patch.dict(os.environ, {'SITE_URL': invalid}, clear=True), self.assertRaises(ValueError):
                seo.load_config(self.root)

    def test_unrelated_schema_is_preserved(self):
        extra = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}</script>'
        source = seo.read(self.root / 'index.html').replace('</head>', extra + '</head>')
        result = seo.transform(source, 'index.html', self.config)
        self.assertIn(extra, result)

    def test_home_catalog_uses_visible_services_and_minimum_prices(self):
        source = seo.read(self.root / 'index.html')
        result = seo.transform(source, 'index.html', self.config)
        graph = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', result, re.S)[1])['@graph']
        offers = graph[0]['hasOfferCatalog']['itemListElement']
        self.assertEqual(len(offers), 21)
        by_slug = {offer['url'].rsplit('/', 1)[-1]: offer for offer in offers}
        self.assertEqual(by_slug['klopy.html']['priceSpecification']['minPrice'], 12000)
        self.assertEqual(by_slug['tarakany.html']['priceSpecification']['minPrice'], 11000)
        for slug in ('cleaning.html', 'dezinfekciya.html'):
            self.assertNotIn('priceSpecification', by_slug[slug])
        for slug, offer in by_slug.items():
            self.assertTrue((self.root / 'services' / slug).is_file())
            self.assertNotIn('price', offer)  # "from" is not a fixed quote.
            self.assertNotIn('maxPrice', offer.get('priceSpecification', {}))
            self.assertEqual(offer['itemOffered']['@id'], offer['url'] + '#service')
        # Editing a visible card must update the schema, not retain stale head data.
        changed = source.replace('от 12 000 ₸', 'от 12 500 ₸')
        offers, _ = seo.page_catalog_and_faq(changed, self.config['site_url'], 'index.html')
        klopy = next(o for o in offers if o['url'].endswith('/klopy.html'))
        self.assertEqual(klopy['priceSpecification']['minPrice'], 12500)

    def test_faq_only_uses_questions_present_on_the_page(self):
        source = seo.read(self.root / 'index.html')
        _, questions = seo.page_catalog_and_faq(source, self.config['site_url'], 'index.html')
        self.assertEqual(len(questions), 8)
        for question in questions:
            self.assertIn(question['name'], source)
            self.assertIn(question['acceptedAnswer']['text'], source)
        for path in ('services/klopy.html', 'services/tarakany.html', 'objects.html'):
            offers, faq = seo.page_catalog_and_faq(seo.read(self.root / path), self.config['site_url'], path)
            self.assertEqual(offers, [])
            self.assertEqual(faq, [])
        empty = source.replace('id="faq"', 'id="other-section"')
        result = seo.transform(empty, 'index.html', self.config)
        self.assertNotIn('"@type": "FAQPage"', result)

    def test_current_geography_and_admin_exclusion(self):
        paths = [*seo.public_pages(ROOT), ROOT / 'js/main.js', ROOT / 'js/interactions.js',
                 ROOT / 'tools/build_catalog.py', ROOT / 'tools/services_data.py']
        for path in paths:
            self.assertNotRegex(seo.read(path).lower(), r'корда[йеяю]|қордай|korday|kordai|пригород|облыс|алматинск\w* област|жамбыл')
        self.assertIn('content="noindex, nofollow"', seo.read(ROOT / 'admin.html'))
        self.assertNotIn('Disallow: /admin', seo.robots())


if __name__ == '__main__':
    unittest.main()
