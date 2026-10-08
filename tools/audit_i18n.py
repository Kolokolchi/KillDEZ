import re

with open('original_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's verify all SVG icons in original_page.html
svgs = re.findall(r'<svg[\s\S]*?</svg>', html)
print(f"Total SVGs: {len(svgs)}")

# Let's verify all data-i18n keys in HTML
html_keys = set(re.findall(r'data-i18n=["\']([^"\']+)["\']', html))
print(f"Total data-i18n keys in HTML: {len(html_keys)}")

# Let's verify i18n keys in JS
with open('main_script.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

# Extract keys in i18n.ru
ru_match = re.search(r'ru:\s*\{([\s\S]*?)\n\s*\},', js_code)
if ru_match:
    ru_keys = set(re.findall(r'[\'"]([a-zA-Z0-9._-]+)[\'"]\s*:', ru_match.group(1)))
    print(f"Total keys in ru dictionary: {len(ru_keys)}")
    missing_in_ru = html_keys - ru_keys
    print(f"HTML keys missing in ru dict: {missing_in_ru}")

kz_match = re.search(r'kz:\s*\{([\s\S]*?)\n\s*\}', js_code)
if kz_match:
    kz_keys = set(re.findall(r'[\'"]([a-zA-Z0-9._-]+)[\'"]\s*:', kz_match.group(1)))
    print(f"Total keys in kz dictionary: {len(kz_keys)}")
    diff = ru_keys - kz_keys
    print(f"Keys in RU but missing in KZ: {diff}")
