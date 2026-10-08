"""Decorate methods with photos and benefits/process with local vector icons."""
from pathlib import Path
import re
from sync_layout import element

ROOT=Path(__file__).resolve().parents[1]
ICONS={
'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2M4 4l-2 3M20 4l2 3"/>',
'flask':'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 14h8"/><path d="m10 17 1 1 3-3"/>',
'shield':'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
'document':'<path d="M14 3H6a1 1 0 0 0-1 1v16h14V8l-5-5ZM14 3v5h5M9 12h6M9 16h4"/>',
'home':'<path d="m3 11 9-8 9 8M5 10v11h14V10"/><path d="M12 12c-4-4-7 2 0 6 7-4 4-10 0-6Z"/>',
'badge':'<circle cx="12" cy="9" r="6"/><path d="m8 14-2 7 6-3 6 3-2-7M10 9l1.5 1.5L14 7"/>',
'lock':'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
'wallet':'<rect x="3" y="6" width="18" height="15" rx="3"/><path d="M3 8V5a2 2 0 0 1 2-2h12v3M21 11h-6v5h6M17 13.5h.1"/>',
'message':'<path d="M20 15a3 3 0 0 1-3 3H9l-6 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v9ZM7 8h9M7 12h6"/>',
'chat':'<path d="M14 14H7l-4 3V5h14v6M10 17v3h7l4 2V10h-2"/><path d="M7 8h6"/>',
'van':'<path d="M3 6h11v12H3V6ZM14 10h4l3 4v4h-7M14 14h7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
'spray':'<path d="M5 8h9l-2 5H6L5 8ZM6 13l-2 8h10l-2-8M8 8V4h7v3h-4M15 5h2M20 3h1M20 7h1M18 5h3"/>',
}
def icon(name):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">{ICONS[name]}</svg>'

DRAWINGS={
'hot-fog':'''<rect x="51" y="81" width="92" height="37" rx="12" fill="#fff"/><path d="M75 81V66h39v15M62 118l-6 12M132 118l6 12"/><path d="M143 90h37v19h-37" fill="#d5e4dc"/><path d="M72 94h26M72 102h18"/><path d="M194 79c-12 8 12 11 0 20s12 11 0 20M211 68c-13 10 13 13 0 23s13 13 0 23M228 59c-13 10 13 13 0 23s13 13 0 23" stroke="#168348"/><circle cx="124" cy="99" r="5" fill="#a9cdb8"/>''',
'cold-fog':'''<rect x="60" y="89" width="92" height="41" rx="14" fill="#fff"/><path d="M82 88V68h25v20"/><path d="M108 81h45l23-13 10 22-33 10h-45Z" fill="#d8e7ed"/><path d="m191 66 16-10M196 83h19M191 100l16 10" stroke="#1266a8"/><circle cx="226" cy="47" r="3" fill="#93bfd1" stroke="none"/><circle cx="233" cy="81" r="3" fill="#93bfd1" stroke="none"/><circle cx="226" cy="119" r="3" fill="#93bfd1" stroke="none"/><path d="M74 104h20M74 114h30"/>''',
'barrier':'''<path d="m70 86 63-45 63 45M84 77v59h93V77" fill="#fff"/><path d="M108 136V99h31v37M151 88h12v14h-12Z"/><path d="M55 134V76l78-56 79 56v58" stroke="#168348" stroke-dasharray="4 8"/><path d="m183 99 25 9v17c0 18-25 31-25 31s-25-13-25-31v-17Z" fill="#d4e9dc" stroke="#168348"/><path d="m173 124 7 7 14-17" stroke="#168348"/>''',
'gel':'''<path d="M60 129h138M60 129V54" stroke="#a9c4b7"/><g transform="rotate(-35 145 79)"><path d="M97 66h74v27H97Z" fill="#fff"/><path d="M171 71h22v17h-22M193 75h24v9h-24M97 73H79v13h18M79 66v27"/><path d="M119 67v10M135 67v10M151 67v10" stroke="#168348"/></g><circle cx="190" cy="128" r="4" fill="#168348" stroke="none"/><circle cx="170" cy="128" r="4" fill="#168348" stroke="none"/><circle cx="150" cy="128" r="4" fill="#168348" stroke="none"/>'''
}

def build():
    folder=ROOT/'images'/'icons';folder.mkdir(exist_ok=True)
    for name,art in DRAWINGS.items():
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" fill="none"><ellipse cx="140" cy="148" rx="94" ry="8" fill="#173e2a" opacity=".06"/><circle cx="140" cy="90" r="70" fill="#ffffff" opacity=".5"/><g stroke="#244d43" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">{art}</g></svg>'
        (folder/(name+'.svg')).write_text(svg,encoding='utf-8')
    path=ROOT/'index.html';s=path.read_text(encoding='utf-8')
    methods=element(s,r'<section id="methods"','section')
    updated=methods
    descriptions=['Термогенератор с металлическим соплом и плотным туманом','Электрический генератор холодного тумана с мелким распылением','Обработка стыка пола и плинтуса распылительной штангой','Точечное нанесение гелевой приманки аппликатором']
    for i,name in enumerate(DRAWINGS,1):
        visual=f'<div class="method-art method-photo"><img src="images/methods/{name}.jpg" alt="{descriptions[i-1]}" width="1200" height="900" loading="lazy" decoding="async"><span class="method-index">0{i}</span></div>'
        updated=updated.replace(f'<div class="met-num">{i}</div>',visual)
        updated=re.sub(r'<div class="method-art(?: method-photo)?"><img[^>]+(?:icons|methods)/'+name+r'\.(?:svg|jpg)"[\s\S]*?</div>',lambda _:visual,updated)
    s=s.replace(methods,updated)
    for i,name in enumerate(['clock','flask','shield','document','home','badge','lock','wallet'],1):
        s=s.replace(f'<div class="why-num">0{i}</div>',f'<div class="benefit-icon">{icon(name)}</div>')
    for i,name in enumerate(['message','chat','van','spray','shield'],1):
        s=s.replace(f'<div class="pn">{i}</div>',f'<div class="step-visual"><div class="step-icon">{icon(name)}</div><span class="step-number">0{i}</span></div>')
    s=s.replace('Почему выбирают <span class="g">Sanitex</span>','Почему выбирают <span class="b">Dis</span> <span class="g">Cleaning</span>')
    path.write_text(s,encoding='utf-8')

if __name__=='__main__':build()
