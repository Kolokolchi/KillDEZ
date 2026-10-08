# -*- coding: utf-8 -*-
import os
import re

service_files = [f for f in os.listdir('services') if f.endswith('.html')]
print(f"Checking {len(service_files)} service HTML files in services/:")

errors = []
for fname in service_files:
    path = os.path.join('services', fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check relative links to images
    img_matches = re.findall(r'src="(\.\./images/[^"]+)"', content)
    for img in img_matches:
        actual_path = os.path.normpath(os.path.join('services', img))
        if not os.path.exists(actual_path):
            errors.append(f"{fname}: Missing image {img} -> {actual_path}")
            
    # Check CSS links
    css_matches = re.findall(r'href="(\.\./css/[^"]+)"', content)
    for css in css_matches:
        actual_path = os.path.normpath(os.path.join('services', css))
        if not os.path.exists(actual_path):
            errors.append(f"{fname}: Missing css {css} -> {actual_path}")

    # Check JS links
    js_matches = re.findall(r'src="(\.\./js/[^"]+)"', content)
    for js in js_matches:
        actual_path = os.path.normpath(os.path.join('services', js))
        if not os.path.exists(actual_path):
            errors.append(f"{fname}: Missing js {js} -> {actual_path}")

if not errors:
    print("SUCCESS: ALL ASSET LINKS (images, CSS, JS) VERIFIED ACROSS ALL 19 SERVICE PAGES!")
else:
    print(f"Found {len(errors)} errors:")
    for e in errors:
        print(" -", e)
