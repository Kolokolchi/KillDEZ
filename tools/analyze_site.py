import re
import json

with open('original_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. CSS URLs
css_urls = set(re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', html))
print("=== CSS URLs ===")
for u in sorted(css_urls):
    print(u)

# 2. Images, icons, audio, video
img_srcs = set(re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', html, re.IGNORECASE))
print("\n=== IMG SRCS ===")
for s in sorted(img_srcs):
    print(s)

# 3. Favicon and apple-touch-icon
icons = set(re.findall(r'<link[^>]+rel=[\'"][^\'"]*icon[^\'"]*[\'"][^>]+href=[\'"]([^\'"]+)[\'"]', html, re.IGNORECASE))
icons.update(re.findall(r'<link[^>]+href=[\'"]([^\'"]+)[\'"][^>]+rel=[\'"][^\'"]*icon[^\'"]*[\'"]', html, re.IGNORECASE))
print("\n=== ICONS ===")
for i in sorted(icons):
    print(i)

# 4. Scripts
scripts = re.findall(r'<script([^>]*)>([\s\S]*?)</script>', html, re.IGNORECASE)
print(f"\n=== SCRIPTS (Total: {len(scripts)}) ===")
for idx, (attrs, body) in enumerate(scripts):
    body_clean = body.strip()
    src_match = re.search(r'src=[\'"]([^\'"]+)[\'"]', attrs)
    src = src_match.group(1) if src_match else "inline"
    print(f"[{idx}] src={src}, length={len(body_clean)}")
    if body_clean and "googletagmanager" not in body_clean and "ld+json" not in attrs:
        print(f"Preview:\n{body_clean[:300]}...\n")

# 5. Forms, inputs, buttons, modals, interactive sections
forms = re.findall(r'<form[\s\S]*?</form>', html, re.IGNORECASE)
print(f"\n=== FORMS (Total: {len(forms)}) ===")
for idx, form in enumerate(forms):
    print(f"--- Form {idx} ---")
    print(form[:400] + "...")

# 6. Modals
modals = re.findall(r'<div[^>]+(?:class|id)=[\'"][^\'"]*modal[^\'"]*[\'"][^>]*>', html, re.IGNORECASE)
print(f"\n=== MODALS ({len(modals)}) ===")
for m in modals:
    print(m)

# 7. Buttons and onclick handlers
onclicks = set(re.findall(r'onclick=[\'"]([^\'"]+)[\'"]', html, re.IGNORECASE))
print(f"\n=== ONCLICK HANDLERS ({len(onclicks)}) ===")
for oc in sorted(onclicks):
    print(oc)
