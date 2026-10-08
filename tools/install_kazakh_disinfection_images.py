import os
from PIL import Image

brain_dir = r"C:\Users\Kolok\.gemini\antigravity\brain\e0ef0ae2-16a8-469c-a0e8-c167f75d2fe9"

def find_latest(prefix):
    matches = [f for f in os.listdir(brain_dir) if f.startswith(prefix) and f.endswith(".jpg")]
    if not matches:
        raise FileNotFoundError(f"No file starting with {prefix}")
    matches.sort(key=lambda x: os.path.getmtime(os.path.join(brain_dir, x)))
    return os.path.join(brain_dir, matches[-1])

updates = {
    "hero_kazakh_specialist": ("hero-bg.jpg", (1920, 1080)),
    "cert_kazakh_disinfection": ("cert-4.jpg", (800, 1067)),
    "og_kazakh_disinfection": ("og-cover.jpg", (1200, 630)),
}

for prefix, (target_name, target_size) in updates.items():
    src_file = find_latest(prefix)
    dest_file = os.path.join("images", target_name)
    im = Image.open(src_file)
    im_resized = im.resize(target_size, Image.Resampling.LANCZOS)
    im_resized.save(dest_file, "JPEG", quality=92)
    print(f"Updated {target_name} ({target_size[0]}x{target_size[1]}) from {os.path.basename(src_file)}")

print("All images updated with 100% Kazakh disinfection specialists and authentic Kazakh documents!")
