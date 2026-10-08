"""One-time, lossless HTML-to-JSX import. Not part of build/dev; never overwrites JSX.

The accepted HTML stays available as the original disk-openable edition.
After import, components/ and content/ are the Next.js sources of truth.
"""
from pathlib import Path
from html.parser import HTMLParser
import json
import re

ROOT = Path(__file__).resolve().parents[1]
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
NAMES = dict(zip(
    'class for tabindex readonly maxlength minlength autocomplete autofocus colspan rowspan viewbox preserveaspectratio stroke-width stroke-linecap stroke-linejoin stroke-miterlimit stroke-dasharray stroke-dashoffset fill-rule clip-rule fill-opacity stroke-opacity xlink:href crossorigin referrerpolicy srcset'.split(),
    'className htmlFor tabIndex readOnly maxLength minLength autoComplete autoFocus colSpan rowSpan viewBox preserveAspectRatio strokeWidth strokeLinecap strokeLinejoin strokeMiterlimit strokeDasharray strokeDashoffset fillRule clipRule fillOpacity strokeOpacity xlinkHref crossOrigin referrerPolicy srcSet'.split()))
BOOLEAN = set('hidden required disabled multiple readOnly autoFocus checked selected'.split())

class Node:
    def __init__(self, tag, attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []

class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.root = Node('document')
        self.stack = [self.root]
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID: self.stack.append(node)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.handle_endtag(tag)
    def handle_endtag(self, tag):
        assert self.stack[-1].tag == tag, (tag, self.stack[-1].tag)
        self.stack.pop()
    def handle_data(self, text): self.stack[-1].children.append(text)
    def nodes(self, tag, root=None):
        result = []
        for node in (root or self.root).children:
            if isinstance(node, Node):
                if node.tag == tag: result.append(node)
                result.extend(self.nodes(tag, node))
        return result

def js(value): return json.dumps(value, ensure_ascii=False)
def style(value):
    result = {}
    for declaration in value.split(';'):
        if ':' not in declaration: continue
        key, val = declaration.split(':', 1)
        key = key.strip()
        if not key.startswith('--'): key = re.sub(r'-([a-z])', lambda m: m[1].upper(), key)
        result[key] = val.strip()
    return result

def jsx(node, shared=False):
    if isinstance(node, str): return '{' + js(node) + '}' if node else ''
    if node.tag == 'script': return ''
    attrs = []
    for key, value in node.attrs.items():
        if key == 'onclick':
            match = re.fullmatch(r"(\w+)\((.*)\)", value)
            action, arguments = match.groups()
            args = re.findall(r"'([^']*)'", arguments)
            action = {'openModal': 'order', 'openServiceModal': 'order', 'closeModal': 'close', 'closeBurger': 'close-menu'}[action]
            attrs.append('data-action=' + '{' + js(action) + '}')
            if args and (match[1] == 'openServiceModal' or len(args) > 1):
                attrs.append('data-service={' + js(args[-1]) + '}')
            continue
        if key == 'onsubmit':
            assert value == 'return submitOrder(event)'
            attrs.append('data-order-form=""')
            continue
        assert not key.startswith('on'), (key, value)
        key = NAMES.get(key, key)
        if key == 'fetchpriority': key = 'fetchPriority'
        if key == 'value' and node.tag in ('input', 'textarea', 'select'): key = 'defaultValue'
        if key == 'style': value = style(value)
        if key in BOOLEAN: value = True
        if value is None: value = ''
        expression = js(value)
        if shared and key in ('href', 'src') and not re.match(r'(https?:|tel:|mailto:)', value):
            expression = 'link(' + expression + ')'
        attrs.append(key + '={' + expression + '}')
    opening = '<' + node.tag + (' ' + ' '.join(attrs) if attrs else '')
    if node.tag in VOID: return opening + ' />'
    return opening + '>' + ''.join(jsx(n, shared) for n in node.children) + '</' + node.tag + '>'

def write(name, text):
    path = ROOT / name
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('x', encoding='utf-8', newline='\n') as f: f.write(text)

def metadata(doc):
    head = doc.nodes('head')[0]
    metas = {n.attrs.get('name', n.attrs.get('property')): n.attrs.get('content') for n in doc.nodes('meta', head)}
    links = {n.attrs.get('rel'): n.attrs.get('href') for n in doc.nodes('link', head)}
    result = {'title': ''.join(doc.nodes('title', head)[0].children), 'description': metas.get('description')}
    for key in ('keywords', 'robots'):
        if metas.get(key): result[key] = metas[key]
    if links.get('canonical'): result['alternates'] = {'canonical': links['canonical']}
    og = {key: metas['og:' + key] for key in ('type','title','description','url','locale') if metas.get('og:' + key)}
    if metas.get('og:image'): og['images'] = [metas['og:image']]
    if og: result['openGraph'] = og
    other = {k:v for k,v in metas.items() if k in ('google-site-verification','yandex-verification')}
    if other: result['other'] = other
    return result

def main():
    files = [ROOT/'index.html', ROOT/'objects.html', *sorted((ROOT/'objects').glob('*.html')), *sorted((ROOT/'services').glob('*.html'))]
    imports, entries, seo = [], [], {}
    home = Document(files[0].read_text(encoding='utf-8'))
    body = home.nodes('body')[0]
    # Shared header, footer, mobile navigation and form; keep accepted DOM order.
    nodes = [n for n in body.children if isinstance(n, Node) and n.tag not in ('main','script')]
    for name, parts in [('SiteHeader',nodes[:2]), ('SiteFooter',nodes[2:])]:
        if name == 'SiteFooter':
            names = ['footer', 'backToTop', 'mobile', 'menu', 'modal', 'toast']
            declarations = ''.join('  const ' + key + ' = (' + jsx(node, shared=True) + ');\n' for key, node in zip(names, parts))
            content = '{footer}{home && backToTop}{home ? <>{mobile}{menu}</> : <>{menu}{mobile}</>}{modal}{toast}'
        else:
            declarations = ''
            content = ''.join(jsx(n, shared=True) for n in parts)
            # The skip link always targets the current page, not the homepage.
            content = content.replace('href={link("#main-content")}', 'href="#main-content"')
        write(f'components/{name}.jsx', 'export default function '+name+'({ home = false, prefix = "" }) {\n'
              '  const link = value => value.startsWith("#") ? (home ? value : prefix + "index.html" + value) : prefix + value;\n'
              + declarations + '  return <>\n'+content+'\n  </>;\n}\n')
    for i, file in enumerate(files):
        route = file.relative_to(ROOT).as_posix()
        doc = Document(file.read_text(encoding='utf-8'))
        name = route.replace('/', '-').replace('.html', '')
        write(f'content/pages/{name}.jsx', 'export default function PageContent() {\n  return (\n'+jsx(doc.nodes('main')[0])+'\n  );\n}\n')
        imports.append(f'import Page{i} from "./pages/{name}";')
        entries.append(f'  {js(route)}: Page{i},')
        seo[route] = {'metadata': metadata(doc), 'schema': [json.loads(''.join(n.children)) for n in doc.nodes('script') if n.attrs.get('type') == 'application/ld+json']}
    write('content/pages.js', '\n'.join(imports)+'\n\nexport const pages = {\n'+'\n'.join(entries)+'\n};\n')
    write('content/seo.json', json.dumps(seo, ensure_ascii=False, indent=2)+'\n')
    write('content/routes.json', json.dumps(list(seo), indent=2)+'\n')
    write('lib/site-config.js', (ROOT/'js/main.js').read_text(encoding='utf-8').replace('const CONFIG =', 'export const CONFIG =').replace('const i18n =', 'export const i18n ='))
    print(f'Imported {len(files)} public pages as JSX; original HTML unchanged.')

if __name__ == '__main__': main()
