"""Sync public-page chrome from index.html; run after editing shared markup."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

def element(text, pattern, tag):
    start = re.search(pattern, text).start()
    depth = 0
    for token in re.finditer(fr'</?{tag}\b[^>]*>', text[start:]):
        depth += -1 if token.group().startswith('</') else 1
        if depth == 0:
            return text[start:start + token.end()]
    raise ValueError(pattern)

def sync():
    source = (ROOT / 'index.html').read_text(encoding='utf-8')
    parts = [(r'<header\b', 'header'), (r'<footer\b', 'footer'),
             (r'<div class="bmenu"', 'div'), (r'<nav class="mbb"', 'nav'),
             (r'<div class="modal"', 'div')]
    for path in [*([ROOT / 'objects.html'] if (ROOT / 'objects.html').exists() else []), *sorted((ROOT / 'services').glob('*.html')), *sorted((ROOT / 'objects').glob('*.html'))]:
        text = path.read_text(encoding='utf-8')
        prefix = '../' if path.parent.name in ('services', 'objects') else ''
        for pattern, tag in parts:
            shared = element(source, pattern, tag)
            shared = re.sub(r'(href|src)="([^" ]+)"', lambda m:
                f'{m[1]}="{prefix}index.html{m[2]}"' if m[2].startswith('#') else
                f'{m[1]}="{prefix}{m[2]}"' if not re.match(r'(https?:|tel:|mailto:)', m[2]) else m[0], shared)
            if re.search(pattern, text):
                text = text.replace(element(text, pattern, tag), shared)
            else:
                text = text.replace('</body>', shared + '\n</body>')
        if prefix:
            text = re.sub(r'<script>\s*function openServiceModal[\s\S]*?</script>', '', text)
        path.write_text('\n'.join(line.rstrip() for line in text.splitlines())+'\n', encoding='utf-8')

if __name__ == '__main__':
    sync()
