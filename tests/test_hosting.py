import tempfile
import unittest
from pathlib import Path
from tools.audit_hosting import audit


class HostingAuditTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.folder = Path(self.temp.name)
        (self.folder / 'objects').mkdir()
        (self.folder / 'images').mkdir()
        (self.folder / 'images/catalog.svg').write_text('<svg/>')
        (self.folder / '.htaccess').write_text('DirectoryIndex index.html\nRewriteEngine On\n')
        (self.folder / 'index.html').write_text('<link rel="canonical" href="https://killdez.kz/"><a href="/objects/">Catalog</a>')
        (self.folder / 'objects/index.html').write_text('<link rel="canonical" href="https://killdez.kz/objects/"><a href="/#services">Services</a><img src="/images/catalog.svg">')
        self.routes = ['index.html', 'objects.html']

    def test_valid_directory_catalog_and_assets(self):
        with (self.folder / 'index.html').open('a') as file:
            file.write('<section id="services"></section>')
        self.assertEqual(audit(self.folder, self.routes), [])

    def test_detects_missing_anchors(self):
        self.assertTrue(any('missing anchor' in error for error in audit(self.folder, self.routes)))

    def test_detects_catalog_relative_image_resolved_under_directory(self):
        path = self.folder / 'objects/index.html'
        path.write_text(path.read_text().replace('/images/catalog.svg', 'images/catalog.svg'))
        self.assertTrue(any('missing target images/catalog.svg' in error for error in audit(self.folder, self.routes)))

    def test_detects_directory_redirect_loop_and_link_without_slash(self):
        (self.folder / '.htaccess').write_text('RewriteRule ^objects/$ /objects [R=308,L,NE]\n')
        path = self.folder / 'index.html'
        path.write_text(path.read_text().replace('/objects/', '/objects'))
        errors = audit(self.folder, self.routes)
        self.assertTrue(any('redirect conflicts' in error for error in errors))
        self.assertTrue(any('missing target /objects' in error for error in errors))


if __name__ == '__main__':
    unittest.main()
