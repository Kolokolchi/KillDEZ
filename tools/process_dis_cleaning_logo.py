import os
from PIL import Image, ImageChops

src_path = r'C:/Users/Kolok/.gemini/antigravity/brain/e0ef0ae2-16a8-469c-a0e8-c167f75d2fe9/.user_uploaded/media_1790248002360.jpg'
im = Image.open(src_path).convert("RGBA")

# Function to make pure white transparent
def make_transparent(img, threshold=245):
    datas = img.getdata()
    newData = []
    for item in datas:
        # If item is close to white
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    img.putdata(newData)
    return img

# Save full square logo (with and without transparency)
im_clean = im.copy()
im_clean.save("images/logo-full.png", "PNG")

im_trans = make_transparent(im.copy(), threshold=248)
im_trans.save("images/logo-transparent.png", "PNG")

# Let's crop just the circular icon (house + leaves + stars)
# Bounding box of the emblem is approximately:
# left ~ 220, top ~ 140, right ~ 860, bottom ~ 690
icon_crop = im.crop((180, 140, 860, 700))
# Make square
w, h = icon_crop.size
max_dim = max(w, h)
icon_sq = Image.new("RGBA", (max_dim, max_dim), (255, 255, 255, 0))
offset = ((max_dim - w) // 2, (max_dim - h) // 2)
icon_trans = make_transparent(icon_crop.copy(), threshold=248)
icon_sq.paste(icon_trans, offset, icon_trans)

# Save logo-square.png (used in header & favicon)
icon_sq.save("images/logo-square.png", "PNG")

# Generate favicons
fav = icon_sq.resize((64, 64), Image.Resampling.LANCZOS)
fav.save("images/favicon.png", "PNG")
fav.save("favicon.png", "PNG")
fav.save("favicon.ico", format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64)])

apple = icon_sq.resize((180, 180), Image.Resampling.LANCZOS)
apple.save("images/apple-touch-icon.png", "PNG")
apple.save("apple-touch-icon.png", "PNG")

# Generate logo-wide.png: icon on left, "Dis Cleaning" on right
# Let's crop the text
text_crop = im.crop((120, 680, 904, 860))
text_trans = make_transparent(text_crop.copy(), threshold=248)

# Wide composition: e.g. 800 x 240
wide_img = Image.new("RGBA", (850, 240), (255, 255, 255, 0))
# Resize icon to height 200
icon_small = icon_sq.resize((210, 210), Image.Resampling.LANCZOS)
wide_img.paste(icon_small, (15, 15), icon_small)

# Resize text crop to fit nicely
text_aspect = text_crop.width / text_crop.height
text_h = 130
text_w = int(text_h * text_aspect)
text_resized = text_trans.resize((text_w, text_h), Image.Resampling.LANCZOS)
wide_img.paste(text_resized, (240, 55), text_resized)

wide_img.save("images/logo-wide.png", "PNG")

print("All logos successfully generated and saved to images/")
