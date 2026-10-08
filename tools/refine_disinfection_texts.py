import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Title and Meta Description to emphasize Disinfection
html = html.replace(
    "<title>Dis Cleaning — профессиональная дезинфекция, дезинсекция и клининг</title>",
    "<title>Dis Cleaning — Профессиональная дезинфекция, дезинсекция и дератизация</title>"
)
html = html.replace(
    'content="Dis Cleaning (ИП Фёдоров Д.С.) — профессиональная дезинфекция, дезинсекция, дератизация и клининг в Кордае, Алматы и области. Договор, Kaspi Bank, гарантия. +7 707 620 38 13"',
    'content="Dis Cleaning (ИП Фёдоров Д.С.) — профессиональная дезинфекция, дезинсекция и дератизация в Кордае, Алматы и области. Уничтожение клопов, тараканов, грызунов, плесени. Договор, Kaspi Bank, гарантия. +7 707 620 38 13"'
)
html = html.replace(
    'content="Dis Cleaning, дис клининг, дезинфекция Кордай, дезинфекция Алматы, дезинсекция, клининг, уничтожение клопов, уничтожение тараканов, дератизация, ИП Федоров"',
    'content="Dis Cleaning, дезинфекция Кордай, дезинфекция Алматы, дезинсекция, дератизация, уничтожение клопов, уничтожение тараканов, уничтожение грызунов, СЭС, обработка туманом, ИП Федоров"'
)
html = html.replace(
    'property="og:title" content="Dis Cleaning — профессиональная дезинфекция и клининг"',
    'property="og:title" content="Dis Cleaning — Профессиональная дезинфекция и дезинсекция"'
)
html = html.replace(
    'property="og:description" content="Профессиональная дезинфекция и клининг по Кордаю, Алматы и области. ИП Фёдоров Д.С. Договор, гарантия, Kaspi Bank."',
    'property="og:description" content="Профессиональная дезинфекция, дезинсекция и дератизация по Кордаю, Алматы и области. Уничтожение всех видов вредителей с гарантией. ИП Фёдоров Д.С."'
)

# 2. Hero Badge & Headings
html = html.replace(
    '<span>Dis Cleaning — Чистота, безопасность и защита от вредителей</span>',
    '<span>Dis Cleaning — Профессиональное уничтожение всех видов вредителей</span>'
)
html = html.replace(
    'data-i18n="hero.title">Дезинфекция и клининг в&nbsp;<span class="b">Алматы</span> и&nbsp;<span class="g">Кордае</span>',
    'data-i18n="hero.title">Дезинфекция в&nbsp;<span class="b">Алматы</span> и&nbsp;<span class="g">Кордае</span>'
)
html = html.replace(
    'data-i18n="foot.tag">— Профессиональная дезинфекция и клининг —',
    'data-i18n="foot.tag">— Профессиональная служба дезинфекции —'
)
html = html.replace(
    'data-i18n="foot.desc">Профессиональная дезинфекция, дезинсекция, дератизация и клининг помещений в Кордае, Алматы и области. Официальный договор, Kaspi Bank, гарантия качества.',
    'data-i18n="foot.desc">Профессиональная дезинфекция, дезинсекция и дератизация в Кордае, Алматы и области. Уничтожение клопов, тараканов, грызунов, клещей и плесени. Официальный договор, Kaspi Bank, гарантия качества.'
)
html = html.replace(
    'data-i18n="foot.desc">Профессиональная дезинфекция, дезинсекция, дератизация и клининг в Кордае, Алматы и области. Официальный договор, Kaspi Bank, гарантия качества.',
    'data-i18n="foot.desc">Профессиональная дезинфекция, дезинсекция и дератизация в Кордае, Алматы и области. Уничтожение клопов, тараканов, грызунов, клещей и плесени. Официальный договор, Kaspi Bank, гарантия качества.'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html successfully updated to emphasize Disinfection!")

# Update js/main.js
with open('js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace(
    "'hero.title':'Дезинфекция и клининг в&nbsp;<span class=\"b\">Алматы</span> и&nbsp;<span class=\"g\">Кордае</span>'",
    "'hero.title':'Дезинфекция в&nbsp;<span class=\"b\">Алматы</span> и&nbsp;<span class=\"g\">Кордае</span>'"
)
js = js.replace(
    "'hero.title':'<span class=\"b\">Алматы мен Қордайдағы</span> <span class=\"g\">дезинфекция және клининг</span>'",
    "'hero.title':'<span class=\"b\">Алматы мен Қордайдағы</span> <span class=\"g\">дезинфекция</span>'"
)
js = js.replace(
    "'foot.tag':'— Профессиональная дезинфекция и клининг —'",
    "'foot.tag':'— Профессиональная служба дезинфекции —'"
)
js = js.replace(
    "'foot.tag':'— Кәсіби дезинфекция және клининг —'",
    "'foot.tag':'— Кәсіби дезинфекция қызметі —'"
)
js = js.replace(
    "'foot.desc':'Профессиональная дезинфекция, дезинсекция, дератизация и клининг помещений в Кордае, Алматы и области. Договор с ИП Фёдоров Д.С., Kaspi Bank, гарантия.'",
    "'foot.desc':'Профессиональная дезинфекция, дезинсекция и дератизация в Кордае, Алматы и области. Уничтожение вредителей с договором от ИП Фёдоров Д.С., Kaspi Bank, гарантия.'"
)
js = js.replace(
    "'foot.desc':'Қордай, Алматы және облыстағы кәсіби дезинфекция, дезинсекция, дератизация және клининг. ЖК Фёдоров Д.С. келісім-шарты, Kaspi Bank, кепілдік.'",
    "'foot.desc':'Қордай, Алматы және облыстағы кәсіби дезинфекция, дезинсекция және дератизация. Зиянкестерді жою. ЖК Фёдоров Д.С. келісім-шарты, Kaspi Bank, кепілдік.'"
)

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("js/main.js successfully updated to emphasize Disinfection!")
