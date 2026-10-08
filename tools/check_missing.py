import re
import urllib.request

with open('original_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Look for yard in original_page.html
yard_matches = re.findall(r'[^"\'>]*yard[^"\'>]*', html, re.IGNORECASE)
print("Yard occurrences:", yard_matches)

# Let's test if there is /favicon.ico or similar
for path in ['/favicon.ico', '/favicon.png', '/images/favicon.ico', '/images/svc-yard.jpeg', '/images/svc-yard.webp', '/images/svc-yard.png', '/images/yard.jpg']:
    try:
        url = 'https://www.sanitex.kz' + path
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            print(f"{path}: status {resp.status}, size {len(resp.read())}")
    except Exception as e:
        print(f"{path}: {e}")
