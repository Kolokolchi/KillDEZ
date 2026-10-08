import unittest
from tools.export_github_pages import prefix_jsx, site_copy


class GitHubPagesExportTests(unittest.TestCase):
    def test_public_links_and_relative_images_receive_the_project_path(self):
        text = '<a href={"/objects/"}/><img src={"../images/photo.jpg"}/><a href={"/"}/><a href={"/#faq"}/>'
        result = prefix_jsx(text, '/KillDEZ')
        self.assertIn('href={"/KillDEZ/objects/"}', result)
        self.assertIn('src={"/KillDEZ/images/photo.jpg"}', result)
        self.assertIn('href={"/KillDEZ/"}', result)
        self.assertIn('href={"/KillDEZ/#faq"}', result)

    def test_imports_native_contacts_and_local_anchors_are_not_rewritten(self):
        text = 'import "../../css/rebrand.css"; <a href="tel:+77076203813"/><a href="#contacts"/><a href="whatsapp://send"/>'
        self.assertEqual(prefix_jsx(text, '/KillDEZ'), text)

    def test_header_links_preserve_home_and_nested_anchor_destinations(self):
        text = 'link("/"); home ? value : "/" + value; src={link("/images/brand/wordmark.webp")}'
        result = prefix_jsx(text, '/KillDEZ')
        self.assertIn('link("/KillDEZ/")', result)
        self.assertIn('"/KillDEZ/" + value', result)
        self.assertIn('link("/KillDEZ/images/brand/wordmark.webp")', result)

    def test_custom_root_domain_needs_no_project_prefix(self):
        text = '<a href="/objects/"/><img src="images/photo.jpg"/>'
        self.assertEqual(prefix_jsx(text, ''), '<a href="/objects/"/><img src="/images/photo.jpg"/>')

    def test_custom_root_domain_normalizes_nested_directory_images(self):
        self.assertEqual(prefix_jsx('<img src={"../images/photo.jpg"}/>', ''), '<img src={"/images/photo.jpg"}/>' )

    def test_template_image_urls_keep_their_dynamic_part(self):
        self.assertEqual(prefix_jsx('src={`/images/brand/guide-${phase}.svg`}', '/KillDEZ'), 'src={`/KillDEZ/images/brand/guide-${phase}.svg`}')

    def test_the_owner_domain_is_rebased_for_the_temporary_pages_address(self):
        self.assertEqual(site_copy('https://killdez.kz/objects/medicine', 'https://kolokolchi.github.io/KillDEZ', ['objects/medicine.html']), 'https://kolokolchi.github.io/KillDEZ/objects/medicine/')

    def test_schema_canonical_and_resources_use_the_actual_published_url(self):
        value = {'canonical': 'https://discleaning.kz/services/klopy', 'id': 'https://discleaning.kz/services/klopy#service', 'image': 'https://discleaning.kz/images/a.jpg', 'external': 'https://npic.orst.edu/'}
        result = site_copy(value, 'https://kolokolchi.github.io/KillDEZ', ['index.html', 'services/klopy.html'])
        self.assertEqual(result['canonical'], 'https://kolokolchi.github.io/KillDEZ/services/klopy/')
        self.assertEqual(result['id'], 'https://kolokolchi.github.io/KillDEZ/services/klopy/#service')
        self.assertEqual(result['image'], 'https://kolokolchi.github.io/KillDEZ/images/a.jpg')
        self.assertEqual(result['external'], value['external'])


if __name__ == '__main__':
    unittest.main()
