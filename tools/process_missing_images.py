import os
import shutil
from PIL import Image

# 1. Process yard image
artifact_dir = r"C:\Users\Kolok\.gemini\antigravity\brain\e0ef0ae2-16a8-469c-a0e8-c167f75d2fe9"
yard_files = [f for f in os.listdir(artifact_dir) if f.startswith("svc_yard") and f.endswith(".jpg")]
if yard_files:
    latest_yard = os.path.join(artifact_dir, yard_files[-1])
    im = Image.open(latest_yard)
    # Resize and crop to 426x284
    im_resized = im.resize((426, 284), Image.Resampling.LANCZOS)
    im_resized.save("images/svc-yard.jpg", "JPEG", quality=90)
    print("Saved images/svc-yard.jpg from generated image")

# 2. Process favicon and apple-touch-icon from logo-square.png
if os.path.exists("images/logo-square.png"):
    logo = Image.open("images/logo-square.png")
    # Make favicon.png (64x64)
    fav = logo.resize((64, 64), Image.Resampling.LANCZOS)
    fav.save("images/favicon.png", "PNG")
    fav.save("favicon.png", "PNG")
    fav.save("favicon.ico", format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64)])
    
    # Make apple-touch-icon.png (180x180)
    apple = logo.resize((180, 180), Image.Resampling.LANCZOS)
    apple.save("images/apple-touch-icon.png", "PNG")
    apple.save("apple-touch-icon.png", "PNG")
    print("Created favicon.png, favicon.ico, and apple-touch-icon.png")
