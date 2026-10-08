import os
import urllib.request
import urllib.parse

images = [
    "cert-1.jpg",
    "cert-2.jpg",
    "cert-3.jpg",
    "cert-4.jpg",
    "hero-bg.jpg",
    "logo-square.png",
    "logo-wide.png",
    "svc-ant.jpg",
    "svc-bedbug.jpg",
    "svc-carpetbeetle.jpg",
    "svc-cockroach.jpg",
    "svc-flea.jpg",
    "svc-fungus.jpg",
    "svc-mold.jpg",
    "svc-mole.jpg",
    "svc-mosquito.jpg",
    "svc-moth.jpg",
    "svc-odor.jpg",
    "svc-rat.jpg",
    "svc-silverfish.jpg",
    "svc-snake.jpg",
    "svc-spider.jpg",
    "svc-tick.jpg",
    "svc-wasp.jpg",
    "svc-woodlouse.jpg",
    "svc-yard.jpg",
    "team-bakytzhan.jpg",
    "team-nursultan.jpg",
    "team-temirlan.jpg",
    "apple-touch-icon.png",
    "favicon.png",
    "og-cover.jpg"
]

os.makedirs("images", exist_ok=True)
base_url = "https://www.sanitex.kz/images/"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

results = []
for img in images:
    url = base_url + img
    dest = os.path.join("images", img)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(dest, "wb") as f:
                f.write(data)
            results.append((img, len(data), "OK"))
    except Exception as e:
        results.append((img, 0, str(e)))

for img, size, status in results:
    print(f"{img:25}: {size:8} bytes | {status}")
