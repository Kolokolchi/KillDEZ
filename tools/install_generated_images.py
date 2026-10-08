import os
import shutil
from PIL import Image

brain_dir = r"C:\Users\Kolok\.gemini\antigravity\brain\e0ef0ae2-16a8-469c-a0e8-c167f75d2fe9"

def find_latest(prefix):
    matches = [f for f in os.listdir(brain_dir) if f.startswith(prefix) and f.endswith(".jpg")]
    if not matches:
        raise FileNotFoundError(f"No file starting with {prefix}")
    matches.sort(key=lambda x: os.path.getmtime(os.path.join(brain_dir, x)))
    return os.path.join(brain_dir, matches[-1])

# Mapping of generated files to target images
mappings = {
    "hero_disinfection_bg": ("hero-bg.jpg", (1920, 1080)),
    "team_specialist_lead": ("team-nursultan.jpg", (900, 1200)),
    "team_technician_second": ("team-bakytzhan.jpg", (900, 1200)),
    "team_technician_third": ("team-temirlan.jpg", (900, 1200)),
    "cert_conformity_doc": ("cert-1.jpg", (800, 1067)),
    "cert_license_doc": ("cert-2.jpg", (800, 1067)),
    "cert_safety_doc": ("cert-3.jpg", (800, 1067)),
    "cert_diploma_doc": ("cert-4.jpg", (800, 1067)),
    "og_cover_banner": ("og-cover.jpg", (1200, 630)),
}

for prefix, (target_name, target_size) in mappings.items():
    src_file = find_latest(prefix)
    dest_file = os.path.join("images", target_name)
    im = Image.open(src_file)
    # Resize with high quality Lanczos
    im_resized = im.resize(target_size, Image.Resampling.LANCZOS)
    im_resized.save(dest_file, "JPEG", quality=92)
    print(f"Installed {target_name} ({target_size[0]}x{target_size[1]}) from {os.path.basename(src_file)}")

print("\nAll non-services photos successfully replaced with unique generated Dis Cleaning imagery!")
