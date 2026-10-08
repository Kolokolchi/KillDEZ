# -*- coding: utf-8 -*-
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace old burger menu brand
html = html.replace(
    '<div class="brand">\n        <span class="mark"><img src="images/logo-square.png" alt="Sanitex"></span>\n        <span class="name">Sani<span class="g">tex</span></span>\n      </div>',
    '<div class="brand">\n        <span class="mark"><img src="images/logo-square.png" alt="Dis Cleaning"></span>\n        <span class="name"><span class="brand-dis">Dis</span>&nbsp;<span class="brand-clean">Cleaning</span></span>\n      </div>'
)

# Replace footer quick service links with real service URLs
html = html.replace('<li><a href="#services" data-i18n="foot.s1">Уничтожение клопов</a></li>', '<li><a href="services/klopy.html" target="_blank" data-i18n="foot.s1">Уничтожение клопов</a></li>')
html = html.replace('<li><a href="#services" data-i18n="foot.s2">Уничтожение тараканов</a></li>', '<li><a href="services/tarakany.html" target="_blank" data-i18n="foot.s2">Уничтожение тараканов</a></li>')
html = html.replace('<li><a href="#services" data-i18n="foot.s3">Дератизация</a></li>', '<li><a href="services/krysy-myshi.html" target="_blank" data-i18n="foot.s3">Дератизация</a></li>')
html = html.replace('<li><a href="#services" data-i18n="foot.s4">Уничтожение блох</a></li>', '<li><a href="services/blokhi.html" target="_blank" data-i18n="foot.s4">Уничтожение блох</a></li>')
html = html.replace('<li><a href="#services" data-i18n="foot.s5">Уничтожение комаров</a></li>', '<li><a href="services/komary.html" target="_blank" data-i18n="foot.s5">Уничтожение комаров</a></li>')
html = html.replace('<li><a href="#services" data-i18n="foot.s6">Уничтожение клещей</a></li>', '<li><a href="services/kleshchi.html" target="_blank" data-i18n="foot.s6">Уничтожение клещей</a></li>')

# Generate new grid items
services_cards = [
    ("klopy.html", "svc-bedbug.jpg", "Клопы", 1, "Уничтожение", "клопов", "от 12 000 ₸"),
    ("tarakany.html", "svc-cockroach.jpg", "Тараканы", 2, "Уничтожение", "тараканов", "от 11 000 ₸"),
    ("zapakh.html", "svc-odor.jpg", "Запах", 3, "Устранение", "запахов", "от 15 000 ₸"),
    ("gribok.html", "svc-fungus.jpg", "Грибок", 4, "Уничтожение", "грибка", "от 14 000 ₸"),
    ("plesen.html", "svc-mold.jpg", "Плесень", 5, "Уничтожение", "плесени", "от 14 000 ₸"),
    ("kroty.html", "svc-mole.jpg", "Кроты", 6, "Выведение", "кротов", "от 20 000 ₸"),
    ("zmei.html", "svc-snake.jpg", "Змеи", 7, "Выведение", "змей", "от 22 000 ₸"),
    ("kozheed.html", "svc-carpetbeetle.jpg", "Кожеед", 8, "Уничтожение", "кожееда", "от 13 000 ₸"),
    ("krysy-myshi.html", "svc-rat.jpg", "Крысы", 9, "Выведение", "крыс и&nbsp;мышей", "от 14 000 ₸"),
    ("komary.html", "svc-mosquito.jpg", "Комары", 10, "Уничтожение", "комаров", "от 18 000 ₸"),
    ("mokricy.html", "svc-woodlouse.jpg", "Мокрицы", 11, "Уничтожение", "мокриц", "от 11 000 ₸"),
    ("cheshujnicy.html", "svc-silverfish.jpg", "Чешуйницы", 12, "Уничтожение", "чешуйниц", "от 11 000 ₸"),
    ("pauki.html", "svc-spider.jpg", "Пауки", 13, "Уничтожение", "пауков", "от 13 000 ₸"),
    ("kleshchi.html", "svc-tick.jpg", "Клещи", 14, "Уничтожение", "клещей", "от 19 000 ₸"),
    ("osy.html", "svc-wasp.jpg", "Осы", 15, "Уничтожение", "осиных гнёзд", "от 16 000 ₸"),
    ("muravi.html", "svc-ant.jpg", "Муравьи", 16, "Уничтожение", "муравьёв", "от 11 000 ₸"),
    ("blokhi.html", "svc-flea.jpg", "Блохи", 17, "Уничтожение", "блох", "от 11 000 ₸"),
    ("mol.html", "svc-moth.jpg", "Моль", 18, "Уничтожение", "моли", "от 12 000 ₸"),
    ("obrabotka-uchastka.html", "svc-yard.jpg", "Обработка участка", 19, "Обработка", "участка", "от 25 000 ₸")
]

new_grid_html = '    <div class="svc-grid">\n'
for slug, img, alt, num, pre_ru, main_ru, price in services_cards:
    new_grid_html += f'''      <a class="svc" href="services/{slug}" target="_blank" rel="noopener">
        <div class="svc-img"><img src="images/{img}" alt="{alt}" loading="lazy"></div>
        <div class="svc-body">
          <div class="svc-pre" data-i18n="svc.{num}.pre">{pre_ru}</div>
          <div class="svc-title"><span data-i18n="svc.{num}.main">{main_ru}</span></div>
          <div class="svc-bot">
            <span class="svc-price">{price}</span>
            <span class="svc-act"><span data-i18n="svc.learn_more">Подробнее</span> <span>→</span></span>
          </div>
        </div>
      </a>\n'''
new_grid_html += '    </div>'

# Find the start and end of svc-grid in index.html
start_idx = html.find('<div class="svc-grid">')
end_marker = '\n  </div>\n</section>'
end_idx = html.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    html = html[:start_idx] + new_grid_html + html[end_idx:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("index.html successfully updated with precise pre/main titles!")
else:
    print(f"Error locating svc-grid boundaries: start={start_idx}, end={end_idx}")
