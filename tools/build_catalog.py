"""Build public catalog and concise service pages from versioned editorial sources.

Shared chrome is read from index.html; run sync-layout after editing it.
"""
from pathlib import Path
from html import escape as e
import json
import re
from objects_data import GROUPS
from service_copy import COPY
from services_data import SERVICES_DATA
from sync_layout import element
from seo import load_config, transform

ROOT = Path(__file__).resolve().parents[1]

def write(name, content):
    p = ROOT / name
    p.parent.mkdir(parents=True, exist_ok=True)
    if p.suffix == '.html':
        content = transform(content, name, load_config(ROOT))
    p.write_text('\n'.join(line.rstrip() for line in content.splitlines())+'\n', encoding='utf-8')

def section(title, text):
    return f'<section class="detail-section"><div class="wrap detail-grid"><h2>{title}</h2><div class="detail-copy">{text}</div></div></section>'

def cta(subject):
    return f'''<section class="catalog-cta"><div class="wrap"><div><span class="s-eyebrow">Обсудим ваш объект</span><h2>Начнём с вашей задачи</h2><p>Сообщите тип помещения, площадь и адрес. Согласуем состав работ, стоимость и время выезда.</p></div><button class="btn btn-green" onclick="openServiceModal('{e(subject)}')">Рассчитать стоимость ↗</button></div></section>'''

def chrome(source, prefix):
    def part(pattern, tag):
        s = element(source, pattern, tag)
        return re.sub(r'(href|src)="([^" ]+)"', lambda m: f'{m[1]}="{prefix}index.html{m[2]}"' if m[2].startswith('#') else f'{m[1]}="{prefix}{m[2]}"' if not re.match(r'(https?:|tel:|mailto:)',m[2]) else m[0], s)
    return part(r'<header\b','header'), '\n'.join(part(p,t) for p,t in [(r'<footer\b','footer'),(r'<div class="bmenu"','div'),(r'<nav class="mbb"','nav'),(r'<div class="modal"','div')])

def page(path, title, description, body, prefix='../', image='hero-business.jpg'):
    source = (ROOT/'index.html').read_text(encoding='utf-8')
    head, tail = chrome(source, prefix)
    schema = json.dumps({'@context':'https://schema.org','@type':'WebPage','name':title,'description':description,'inLanguage':'ru'},ensure_ascii=False)
    write(path, f'''<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)} — Dis Cleaning, Алматы</title><meta name="description" content="{e(description)}">
<meta property="og:title" content="{e(title)} — Dis Cleaning"><meta property="og:description" content="{e(description)}"><meta property="og:type" content="website"><meta property="og:image" content="{prefix}images/{image}">
<link rel="icon" href="{prefix}images/favicon.png"><link rel="stylesheet" href="{prefix}css/style.css"><link rel="stylesheet" href="{prefix}css/theme.css"><script type="application/ld+json">{schema}</script></head>
<body><a href="#main-content" class="skip-link">К содержимому</a>{head}<main id="main-content">{body}</main>{tail}
<div class="toast" id="toast" role="status"></div><script src="{prefix}js/main.js"></script><script src="{prefix}js/interactions.js"></script></body></html>''')

def crumbs(items, prefix='../'):
    return '<nav class="catalog-breadcrumbs wrap" aria-label="Хлебные крошки"><a href="'+prefix+'index.html">Главная</a>'+''.join(f'<span>/</span><a href="{url}">{e(label)}</a>' if url else f'<span>/</span><span aria-current="page">{e(label)}</span>' for label,url in items)+'</nav>'

def hero(label, title, desc, img, subject, prefix='../', focus=None):
    visual=f'<div class="detail-photo"><img src="{prefix}images/{img}" alt="{e(title)}" width="1200" height="800"></div>'
    if focus:
        visual=f'<aside class="object-focus"><span class="focus-symbol" aria-hidden="true">↗</span><span class="s-eyebrow">Индивидуальный план</span><h2>В фокусе работы</h2><p>{e(focus)}</p><div class="focus-footer"><span>01 / Обсуждение задачи</span><span>02 / Согласование работ</span><span>03 / Обработка и рекомендации</span></div></aside>'
    return f'''<section class="detail-hero"><div class="wrap detail-hero-grid"><div><span class="s-eyebrow">{e(label)} · Алматы</span><h1>{e(title)}</h1><p class="detail-lead">{e(desc)}</p><div class="detail-actions"><button class="btn btn-green" onclick="openServiceModal('{e(subject)}')">Обсудить задачу ↗</button><a class="detail-phone" href="tel:+77076203813">+7 707 620 38 13</a></div><p class="detail-caption">Разовый выезд или регулярное обслуживание</p></div>{visual}</div></section>'''

def cards(prefix='objects/'):
    return '<div class="object-grid">'+''.join(f'<a class="object-card" href="{prefix}{slug}.html"><div class="object-card-photo"><img src="images/objects/{"medicine-clinic" if slug == "medicine" else slug}.jpg" alt="{title}" width="1200" height="900" loading="lazy" decoding="async"></div><div class="object-card-body"><span class="object-number">{i:02}</span><h3>{title}</h3><p>{", ".join(x[1].lower() for x in rows)}</p><span class="object-link">{len(rows)} {"типов" if len(rows) >= 5 else "типа"} объектов <span>↗</span></span></div></a>' for i,(slug,title,desc,rows) in enumerate(GROUPS,1))+'</div>'

def build():
    src=(ROOT/'index.html').read_text(encoding='utf-8')
    # Idempotently regenerate the homepage catalog from this data source.
    if '<section id="objects"' in src:
        src=src.replace(element(src,r'<section id="objects"','section'),'')
    catalog='<section id="objects"><div class="wrap"><div class="s-head"><span class="s-eyebrow">Решения по типу объекта</span><h2>У каждого пространства<br>свои задачи</h2><p class="lead">От квартиры до распределительного центра. Выберите свой объект — расскажем, что учесть и как подготовиться.</p></div>'+cards()+'<a class="catalog-all" href="objects.html">Весь каталог объектов →</a></div></section>'
    services=element(src,r'<section id="services"','section')
    src=src.replace(services,services+'\n'+catalog)
    write('index.html',src)
    page('objects.html','Каталог объектов','Обработка квартир, организаций и коммерческих объектов в Алматы. Выберите тип объекта и подходящее обслуживание.',crumbs([('Объекты',None)],'')+f'<section class="catalog-heading"><div class="wrap"><span class="s-eyebrow">Для дома и бизнеса</span><h1>Пространства, о которых<br>мы заботимся</h1><p>{len(GROUPS)} направлений. {sum(len(g[3]) for g in GROUPS)} типов объектов. Решение под ваши помещения и график.</p></div></section><section class="catalog-body"><div class="wrap">'+cards()+'</div></section>'+cta('Подбор обработки объекта'),prefix='')
    for slug,title,desc,rows in GROUPS:
        img='hero-restaurant.jpg' if slug in ('food','retail','hospitality') else 'hero-business.jpg'
        listing='<div class="facility-list">'+''.join(f'<a class="facility-row" href="{s}.html"><span><h2>{t}</h2><p>{d}</p></span><span aria-hidden="true">↗</span></a>' for s,t,d,z,p in rows)+'</div>'
        page(f'objects/{slug}.html',title,desc,crumbs([('Объекты','../objects.html'),(title,None)])+hero('Каталог объектов',title,desc,img,title,focus=' · '.join(r[1] for r in rows))+'<section class="catalog-body"><div class="wrap">'+listing+'</div></section>'+cta(title),image=img)
        for s,t,d,z,p in rows:
            body=crumbs([('Объекты','../objects.html'),(title,slug+'.html'),(t,None)])+hero(title,t,d,img,'Обработка объекта: '+t,focus=z)
            body+=section('Что учитываем',f'<p>{e(desc)}</p>')
            body+=section('Работы под вашу задачу','<p>Состав обработки выбираем после обсуждения проблемы и осмотра. Можно согласовать разовый выезд или график регулярного обслуживания.</p><div class="work-links"><a href="../services/dezinfekciya.html">Дезинфекция поверхностей ↗</a><a href="../services/tarakany.html">Контроль насекомых ↗</a><a href="../services/krysy-myshi.html">Контроль грызунов ↗</a><a href="../services/cleaning.html">Клининг помещений ↗</a></div>')
            body+=section('Перед выездом',f'<p>{e(p)}</p><p>Перед началом работ согласуем доступ, защиту имущества и период, когда помещение нельзя использовать. Порядок уборки, проветривания и возвращения зависит от метода и применяемого средства.</p>')
            body+=section('Стоимость и график','<p>Для расчёта нужны площадь, адрес, характер проблемы и режим работы объекта. Дополнительные зоны и повторные визиты обсуждаем заранее. Итоговый объём и стоимость согласуем до начала работ.</p>')
            related=''.join(f'<a href="{ss}.html">{tt} ↗</a>' for ss,tt,*_ in rows if ss!=s)
            body+=section('В этом разделе',f'<div class="work-links">{related}</div>')+cta('Обработка объекта: '+t)
            page(f'objects/{s}.html',t,d,body,image=img)
    for item in SERVICES_DATA:
        slug=item['slug'].removesuffix('.html'); intro,focus,method,prep=COPY[slug]
        title=item['title']; img='clean/'+item['image']
        body=crumbs([('Услуги','../index.html#services'),(title,None)])+hero(item['category'],title,intro,img,title)
        body+=section('Где работаем',f'<p>{focus}</p><a class="inline-link" href="../objects.html">Подобрать решение по типу объекта →</a>')
        body+=section('Как решаем задачу',f'<p>{method}</p>')
        body+=section('Подготовка к обработке',f'<p>{prep}</p><p>До выезда передадим инструкцию. Время отсутствия людей и животных, проветривание и порядок уборки согласуем с учётом метода и применяемого средства.</p>')
        body+=section('Стоимость',f'<div class="service-quote"><strong>от {item["price_from"]}</strong><p>Ориентир для базового объёма работ. Итог зависит от площади, доступа к зонам обработки и характера проблемы. Согласуем цену до начала работ.</p></div>')
        body+=section('После обработки','<p>Вы получите рекомендации по дальнейшему уходу за помещением и профилактике. Необходимость контроля и повторной обработки обсуждаем отдельно. Условия обслуживания фиксируем при согласовании заказа.</p>')+cta(title)
        page('services/'+item['slug'],title,intro,body,image=img)
    extra=[('dezinfekciya','Дезинфекция помещений','Подбираем обработку поверхностей для дома, офиса или организации. Учитываем назначение комнат, материалы и график использования.','Контактные поверхности, санузлы, общие и хозяйственные зоны.','Согласуем перечень поверхностей, совместимость материалов и способ нанесения. Для медицинских объектов учитываем внутренний режим учреждения.','Уберите личные вещи и защитите материалы, которые не подлежат обработке.'),('cleaning','Клининг помещений','Организуем уборку жилых и коммерческих помещений: согласуем зоны, объём загрязнений и требования к результату.','Полы, доступные поверхности, санузлы, кухонные и общие зоны.','Определяем перечень задач и подходящие средства для покрытий. Сложные загрязнения, высотные работы и уборку после ремонта обсуждаем отдельно.','Сообщите об особенностях отделки, уберите ценные вещи и обеспечьте доступ к воде и электричеству.')]
    for slug,title,intro,focus,method,prep in extra:
        body=crumbs([('Услуги','../index.html#services'),(title,None)])+hero('Услуги',title,intro,'hero-business.jpg',title)
        for heading,content in [('Зоны работы',focus),('Порядок работ',method),('Подготовка',prep),('Стоимость','Расчёт зависит от площади, состояния помещения и согласованного перечня задач. Отправьте описание объекта — уточним объём и стоимость до выезда.')]: body+=section(heading,f'<p>{content}</p>')
        page(f'services/{slug}.html',title,intro,body+cta(title))

if __name__=='__main__': build()
