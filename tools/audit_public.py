"""Check every public local link, asset, JSON-LD block, contact and removed section."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, re

ROOT=Path(__file__).resolve().parents[1]
pages=[ROOT/'index.html',ROOT/'objects.html',*sorted((ROOT/'objects').glob('*.html')),*sorted((ROOT/'services').glob('*.html'))]
errors=[]
class Tags(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.ids=set()
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.add(a['id'])
        for k in ['href','src']:
            if a.get(k):self.links.append(a[k])

parsed={}
for p in pages:
    s=p.read_text(encoding='utf-8'); parser=Tags();parser.feed(s);parsed[p.resolve()]=parser
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S):
        try:json.loads(block)
        except Exception as ex:errors.append(f'{p.name}: JSON-LD {ex}')
    for bad in ['000708501515','KZ44722S000019492073','CASPKZKA','team-temirlan','team-nursultan','team-bakytzhan','cert-1.jpg','id="team"','id="certificates"']:
        if bad in s:errors.append(f'{p.name}: removed content {bad}')
for p in pages:
    for link in parsed[p.resolve()].links:
        u=urlsplit(link)
        if u.scheme=='tel' and u.path!='+77076203813':errors.append(f'{p.name}: phone {link}')
        if u.netloc=='wa.me' and u.path!='/77076203813':errors.append(f'{p.name}: WhatsApp {link}')
        if u.scheme or u.netloc:continue
        target=(p.parent/unquote(u.path)).resolve() if u.path else p.resolve()
        if not target.exists():errors.append(f'{p.name}: missing {link}')
        elif u.fragment and target in parsed and unquote(u.fragment) not in parsed[target].ids:errors.append(f'{p.name}: missing anchor {link}')
print(f'Checked {len(pages)} public pages; {len(errors)} errors')
for error in errors:print(error)
raise SystemExit(bool(errors))
