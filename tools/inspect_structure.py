import re

with open('original_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect sections
sections = re.findall(r'<section[^>]*id=["\']([^"\']+)["\'][^>]*>', html)
print("Sections with IDs:", sections)

all_sections = re.findall(r'<section([^>]*)>', html)
print(f"Total sections: {len(all_sections)}")
for s in all_sections:
    print(f"  section: {s}")

# Let's check headers, footers, navs
headers = re.findall(r'<header[^>]*>', html)
print("Headers:", headers)
footers = re.findall(r'<footer[^>]*>', html)
print("Footers:", footers)
navs = re.findall(r'<nav[^>]*>', html)
print("Navs:", navs)
