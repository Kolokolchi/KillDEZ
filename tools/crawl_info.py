import urllib.request
import re
import json

url = 'https://www.sanitex.kz/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

print(f"HTML length: {len(html)} chars")

with open("original_page.html", "w", encoding="utf-8") as f:
    f.write(html)

hrefs = set(re.findall(r'href=["\']([^"\']+)["\']', html))
srcs = set(re.findall(r'src=["\']([^"\']+)["\']', html))
actions = set(re.findall(r'action=["\']([^"\']+)["\']', html))

print("\n--- ALL HREF LINKS ---")
for h in sorted(hrefs):
    print(h)

print("\n--- ALL SRC ASSETS ---")
for s in sorted(srcs):
    print(s)

print("\n--- FORM ACTIONS ---")
for a in sorted(actions):
    print(a)
