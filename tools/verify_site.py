import os
import re

with open('js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()
with open('js/interactions.js', 'r', encoding='utf-8') as f:
    js += f.read()

total_errors = 0

for page in ['index.html', 'objects.html']:
    print(f"\n=== VERIFYING {page} ===")
    with open(page, 'r', encoding='utf-8') as f:
        html = f.read()

    errors = 0
    # Check src attributes
    srcs = re.findall(r'src=["\']([^"\']+)["\']', html)
    for s in srcs:
        if s.startswith('http') or s.startswith('//'):
            continue
        if not os.path.exists(s):
            print(f"ERROR: missing src file '{s}'")
            errors += 1
        else:
            print(f"OK src: {s}")

    # Check href assets
    hrefs = re.findall(r'<link[^>]+href=["\']([^"\']+)["\']', html)
    for h in hrefs:
        if h.startswith('http') or h.startswith('//'):
            continue
        if not os.path.exists(h):
            print(f"ERROR: missing link href file '{h}'")
            errors += 1
        else:
            print(f"OK href: {h}")

    # Check i18n keys
    html_keys = set(re.findall(r'data-i18n=["\']([^"\']+)["\']', html))
    missing_keys = [k for k in html_keys if f"'{k}'" not in js and f'"{k}"' not in js]
    if missing_keys:
        print(f"ERROR: Missing i18n keys: {missing_keys}")
        errors += len(missing_keys)
    else:
        print(f"OK i18n: All {len(html_keys)} data-i18n keys present in JS dictionary!")

    print(f"{page} finished with {errors} errors.")
    total_errors += errors

print(f"\nTotal verification finished with {total_errors} errors.")
