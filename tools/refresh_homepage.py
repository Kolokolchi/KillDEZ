"""Apply the homepage redesign while preserving existing prices and interactions."""
from pathlib import Path
import re, json
from sync_layout import element
ROOT=Path(__file__).resolve().parents[1]

def remove(text,pattern,tag):
    return text.replace(element(text,pattern,tag),'') if re.search(pattern,text) else text

src=(ROOT/'index.html').read_text(encoding='utf-8')
for id in ['team','certificates']:
    src=remove(src,fr'<section id="{id}"','section')
for pattern in [r'<div class="foot-req-card"',r'<div class="b2b-contract-badge"',r'<div class="foot-dev"',r'<div class="lightbox"']:
    src=remove(src,pattern,'div')
src=re.sub(r'<a\b[^>]*href="#(?:team|certificates)"[^>]*>[\s\S]*?</a>','',src)
src=src.replace('<a href="#methods" data-i18n="nav.methods">Методы</a>','<a href="objects.html" data-i18n="nav.objects">Объекты</a>')
object_link='<a href="objects.html"><span data-i18n="nav.objects">Объекты</span><span class="arr">→</span></a>'
src=src.replace(object_link,'')
src=src.replace('<a href="#methods" onclick="closeBurger()">',object_link+'<a href="#methods" onclick="closeBurger()">')
hero='''<section class="visual-hero" aria-roledescription="карусель" aria-label="Решения Dis Cleaning">
  <div class="hero-slides">
    <article class="hero-slide" data-slide aria-label="1 из 3">
      <img class="slide-image" src="images/hero-business.jpg" alt="Светлый современный интерьер с видом на горы Алматы" width="1672" height="941" fetchpriority="high">
      <div class="slide-shade"></div><div class="wrap slide-content"><span class="slide-eyebrow" data-i18n="slide.1.eyebrow">DIS CLEANING · АЛМАТЫ И КОРДАЙ</span><h1 data-i18n="slide.1.title">Чистое пространство.<br>Спокойствие каждый день.</h1><p data-i18n="slide.1.desc">Дезинфекция, контроль вредителей и клининг.<br>Для вашего дома и вашего бизнеса.</p><a class="btn btn-green" href="#services" data-i18n="slide.1.cta">Выбрать услугу ↗</a></div>
    </article>
    <article class="hero-slide" data-slide aria-label="2 из 3" hidden>
      <img class="slide-image" src="images/hero-restaurant.jpg" alt="Современный ресторан с чистым и светлым залом" width="1672" height="941" loading="lazy">
      <div class="slide-shade"></div><div class="wrap slide-content"><span class="slide-eyebrow" data-i18n="slide.2.eyebrow">РЕШЕНИЯ ДЛЯ БИЗНЕСА</span><h2 data-i18n="slide.2.title">Вы заботитесь о гостях.<br>Мы — о пространстве.</h2><p data-i18n="slide.2.desc">От небольшого кафе до гостиницы.<br>Согласуем работы с ритмом вашего бизнеса.</p><a class="btn btn-green" href="objects.html" data-i18n="slide.2.cta">Найти свой объект ↗</a></div>
    </article>
    <article class="hero-slide" data-slide aria-label="3 из 3" hidden>
      <img class="slide-image" src="images/hero-garden.jpg" alt="Ухоженная зелёная территория частного дома" width="1672" height="941" loading="lazy">
      <div class="slide-shade"></div><div class="wrap slide-content"><span class="slide-eyebrow" data-i18n="slide.3.eyebrow">ДОМА И ПРИЛЕГАЮЩИЕ ТЕРРИТОРИИ</span><h2 data-i18n="slide.3.title">Порядок в доме.<br>Комфорт за его пределами.</h2><p data-i18n="slide.3.desc">Обработка комнат, хозяйственных помещений и участка.<br>Решение под вашу задачу и сезон.</p><a class="btn btn-green" href="objects/houses.html" data-i18n="slide.3.cta">Для частного дома ↗</a></div>
    </article>
  </div>
  <div class="wrap slider-bottom"><a class="slider-contact" href="tel:+77076203813">+7 707 620 38 13</a><div class="slider-controls"><button type="button" data-slide-prev aria-label="Предыдущий слайд">←</button><span id="slide-count" aria-live="polite">01 / 03</span><button type="button" data-slide-next aria-label="Следующий слайд">→</button><button type="button" data-slide-play aria-label="Включить автопрокрутку" aria-pressed="false">▶</button></div><span class="slider-location" data-i18n="slider.location">Алматы · Кордай · Область</span></div>
</section>'''
pattern=r'<section class="(?:hero|visual-hero)"'
hero=hero.replace('.<br>','. <br>')
src=src.replace(element(src,pattern,'section'),hero)
src=src.replace('<!-- TEAM -->','').replace('<!-- CERTIFICATES -->','')
src=re.sub(r'src="images/(svc-[^"]+)"',r'src="images/clean/\1"',src)
src=src.replace('content="images/og-cover.jpg"','content="images/hero-business.jpg"')
# Basic work types precede the existing pest-specific cards.
if 'class="work-overview"' not in src:
    src=src.replace('<div class="svc-grid">','<div class="work-overview"><a href="services/dezinfekciya.html"><span>01 / ДЕЗИНФЕКЦИЯ</span><h3>Обработка помещений ↗</h3><p>Поверхности и общие зоны — с учётом назначения объекта.</p></a><a href="services/cleaning.html"><span>02 / КЛИНИНГ</span><h3>Чистота в деталях ↗</h3><p>Уборка дома и бизнеса по согласованному перечню задач.</p></a></div><div class="svc-grid">',1)
src=src.replace('data-i18n="svc.lead"','data-i18n="svc.lead"')
for field in ['legalName','taxID','streetAddress']:
    src=re.sub(r'^\s*"'+field+r'":.*\n','',src,flags=re.M)
src=re.sub(r'\(ИП Фёдоров Д\.С\.\)\s*','',src)
src=src.replace(' ИП Фёдоров Д.С.','').replace(', ИП Федоров','')
src=re.sub(r'<div class="b2b-docs">[\s\S]*?</div>','<div class="b2b-docs"><span>Согласованный график</span><span>Разовые работы</span><span>Регулярное обслуживание</span></div>',src)
interactions=(ROOT/'js/interactions.js').read_text(encoding='utf-8')
for block in re.findall(r'Object.assign\(i18n.ru, \{(.*?)\}\)',interactions,re.S):
    for key,value in re.findall(r"'([^']+)': '([^']*)'",block):
        pattern=rf'(<([a-z][a-z0-9]*)\b[^>]*data-i18n="{re.escape(key)}"[^>]*>)[\s\S]*?</\2>'
        src=re.sub(pattern,lambda m:m[1]+value+'</'+m[2]+'>',src)
(ROOT/'index.html').write_text(src,encoding='utf-8')

main=(ROOT/'js/main.js').read_text(encoding='utf-8')
for field in ['legalName','iin','address','bank','bik','kbe','iban']:
    main=re.sub(r'^  '+field+r':.*\n','',main,flags=re.M)
main=re.sub(r"'foot.desc':'.*?',", "'foot.desc':'Dis Cleaning · Алматы · Кордай',",main)
(ROOT/'js/main.js').write_text(main,encoding='utf-8')
admin=(ROOT/'admin.html').read_text(encoding='utf-8')
admin=re.sub(r'<p[^>]*>ИП «ФЁДОРОВ[\s\S]*?</p>','',admin)
(ROOT/'admin.html').write_text(admin,encoding='utf-8')
