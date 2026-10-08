import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('backup/style_0.css', 'r', encoding='utf-8') as f:
    orig_css = f.read()

with open('css/style.css', 'r', encoding='utf-8') as f:
    cur_css = f.read()

html_class_attrs = re.findall(r'class=["\']([^"\']+)["\']', html)
all_html_classes = set()
for c in html_class_attrs:
    for sub in c.split():
        all_html_classes.add(sub)

missing_in_cur = [c for c in all_html_classes if f'.{c}' not in cur_css]
print(f"Total HTML classes: {len(all_html_classes)}")
print(f"Classes in HTML missing in cur_css: {sorted(missing_in_cur)}")
