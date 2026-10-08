# -*- coding: utf-8 -*-
"""
Build all 19 standalone Service Landing Pages for Dis Cleaning
Outputs to /services/[slug] with pixel-perfect matching header, buttons, and burger menu
"""

import os
import re
import json
import urllib.parse
from services_data import SERVICES_DATA

os.makedirs('services', exist_ok=True)

def generate_page(s):
    slug = s['slug']
    img = s['image']
    name = s['name']
    name_gen = s['name_gen']
    cat = s['category']
    title = s['title']
    h1 = s['h1']
    price_from = s['price_from']
    lead = s['lead']
    what_is = s['what_is']
    how_infest = s['how_infest']
    problems = s['problems']
    diy_fail = s['diy_fail']
    why_must = s['why_must']
    solutions = s['solutions']
    why_good = s['why_good']
    prices = s['prices']
    prep_before = s['prep_before']
    prep_after = s['prep_after']
    faq = s['faq']

    # WhatsApp message URL encoded
    wa_msg = f"Здравствуйте! Хочу заказать услугу: {title} в Алматы / Кордае. Подскажите, пожалуйста, стоимость и свободное время мастера."
    wa_href = f"https://wa.me/77076203813?text={urllib.parse.quote(wa_msg)}"

    # Generate Related Services (pick 4 different services)
    related_items = [x for x in SERVICES_DATA if x['slug'] != slug][:4]

    # Build schema FAQ
    schema_faq_items = []
    for item in faq:
        schema_faq_items.append({
            "@type": "Question",
            "name": item['q'],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item['a']
            }
        })

    schema_json = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Главная",
                        "item": "https://sanitex.kz/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Каталог услуг",
                        "item": "https://sanitex.kz/#services"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": title,
                        "item": f"https://sanitex.kz/services/{slug}"
                    }
                ]
            },
            {
                "@type": "Service",
                "name": title,
                "serviceType": cat,
                "provider": {
                    "@type": "HomeAndConstructionBusiness",
                    "name": "Dis Cleaning",
                    "legalName": "ИП ФЁДОРОВ ДАНИЛ СЕРГЕЕВИЧ",
                    "telephone": "+77076203813",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "ул. Байдибек Баба, 219",
                        "addressLocality": "Кордай",
                        "addressRegion": "Жамбылская область",
                        "addressCountry": "KZ"
                    }
                },
                "areaServed": ["Алматы", "Алматинская область", "Кордай", "Жамбылская область"],
                "offers": {
                    "@type": "Offer",
                    "price": price_from.replace(" ", "").replace("₸", ""),
                    "priceCurrency": "KZT",
                    "availability": "https://schema.org/InStock"
                },
                "description": lead
            },
            {
                "@type": "FAQPage",
                "mainEntity": schema_faq_items
            }
        ]
    }

    # Render HTML content
    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>{title} в Алматы и Кордае — Dis Cleaning | Договор и гарантия 6 мес.</title>
  <meta name="description" content="{lead} Выезд мастера в день обращения. Тел: +7 707 620 38 13.">
  <meta name="keywords" content="{title}, {name}, дезинфекция, дезинсекция, дератизация, Алматы, Кордай, ИП Федоров, Dis Cleaning, СЭС">
  <link rel="canonical" href="https://sanitex.kz/services/{slug}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Dis Cleaning">
  <meta property="og:title" content="{title} с гарантией 6 месяцев — Dis Cleaning">
  <meta property="og:description" content="{lead}">
  <meta property="og:image" content="../images/{img}">
  <meta property="og:url" content="https://sanitex.kz/services/{slug}">
  <meta property="og:locale" content="ru_RU">

  <!-- Favicons -->
  <link rel="icon" type="image/png" sizes="64x64" href="../images/favicon.png">
  <link rel="icon" href="../favicon.ico" sizes="any">
  <link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png">

  <!-- Schema.org -->
  <script type="application/ld+json">
{json.dumps(schema_json, ensure_ascii=False, indent=2)}
  </script>

  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/service-page.css">
</head>
<body>

  <!-- HEADER (matches index.html) -->
  <header>
    <div class="wrap hrow">
      <a href="../index.html" class="brand" aria-label="Dis Cleaning">
        <span class="mark">
          <img src="../images/logo-square.png" alt="Dis Cleaning Logo">
        </span>
        <span class="name"><span class="brand-dis">Dis</span>&nbsp;<span class="brand-clean">Cleaning</span></span>
      </a>

      <nav class="nav" aria-label="Главная навигация">
        <a href="../index.html#services" data-i18n="nav.services">Услуги</a>
        <a href="../index.html#methods" data-i18n="nav.methods">Методы</a>
        <a href="../index.html#team" data-i18n="nav.team">Команда</a>
        <a href="../index.html#certificates" data-i18n="nav.certs">Документы</a>
        <a href="../index.html#b2b" data-i18n="nav.b2b">Юрлицам</a>
        <a href="../index.html#faq" data-i18n="nav.faq">FAQ</a>
        <a href="../index.html#contacts" data-i18n="nav.contacts">Контакты</a>
      </nav>

      <div class="h-actions">
        <div class="lang-switch" role="group" aria-label="Язык">
          <button type="button" data-lang="ru" class="active">RU</button>
          <button type="button" data-lang="kz">KZ</button>
        </div>
        <a href="tel:+77076203813" class="phone-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          <span>+7&nbsp;707&nbsp;620&nbsp;38&nbsp;13</span>
        </a>
        <button type="button" class="burger" id="burgerBtn" aria-label="Меню">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- BREADCRUMBS -->
  <nav class="breadcrumbs-bar" aria-label="Хлебные крошки">
    <div class="wrap">
      <ul class="breadcrumbs-list">
        <li><a href="../index.html" data-i18n="bc.home">Главная</a></li>
        <li class="breadcrumbs-separator">/</li>
        <li><a href="../index.html#services" data-i18n="bc.services">Каталог услуг</a></li>
        <li class="breadcrumbs-separator">/</li>
        <li class="current" aria-current="page">{title}</li>
      </ul>
    </div>
  </nav>

  <!-- SERVICE HERO -->
  <section class="svc-hero">
    <div class="wrap">
      <div class="svc-hero-grid">
        <div class="svc-hero-left">
          <div class="svc-hero-badge">
            <span class="sparkle">🛡</span> {cat} В АЛМАТЫ И КОРДАЕ
          </div>
          <h1>{h1}</h1>
          <p class="lead-p">{lead}</p>

          <div class="svc-hero-features">
            <div class="svc-h-feat">
              <span class="feat-icon">✓</span>
              <span><strong>Гарантия до 6 мес.</strong> по договору</span>
            </div>
            <div class="svc-h-feat">
              <span class="feat-icon">✓</span>
              <span><strong>Препараты IV класса</strong> (безвредно)</span>
            </div>
            <div class="svc-h-feat">
              <span class="feat-icon">✓</span>
              <span><strong>Сертификаты Минздрава</strong> РК</span>
            </div>
            <div class="svc-h-feat">
              <span class="feat-icon">✓</span>
              <span><strong>Срочный выезд</strong> за 1–3 часа</span>
            </div>
          </div>

          <div class="svc-hero-actions">
            <button type="button" class="btn btn-green btn-lg" onclick="openServiceModal('{title}')">
              <span>Заказать обработку</span>
            </button>
            <a href="{wa_href}" class="btn-wa btn-lg" target="_blank" rel="noopener">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.419-.101.824z"/></svg>
              <span>Консультация в WhatsApp</span>
            </a>
            <a href="tel:+77076203813" class="btn btn-out btn-lg" style="color:#fff; border-color:rgba(255,255,255,0.3); background:rgba(255,255,255,0.08);">
              <span>+7 707 620 38 13</span>
            </a>
          </div>
        </div>

        <div class="svc-hero-right">
          <div class="svc-hero-img-box">
            <img src="../images/{img}" alt="{title}" loading="eager">
            <div class="svc-hero-float-tag">
              <div class="svc-float-left">
                <div class="svc-float-icon">✓</div>
                <div class="svc-float-txt">
                  <div class="t">СЭС Аккредитация</div>
                  <div class="d">100% результат за 1 визит</div>
                </div>
              </div>
              <div class="svc-float-price">
                <div class="l">Стоимость</div>
                <div class="p">от {price_from}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- QUICK STATS BAR -->
  <div class="quick-stats-bar">
    <div class="wrap">
      <div class="qs-grid">
        <div class="qs-item">
          <div class="qs-icon">⏱</div>
          <div>
            <div class="qs-val">40–60 минут</div>
            <div class="qs-lbl">Среднее время обработки</div>
          </div>
        </div>
        <div class="qs-item">
          <div class="qs-icon green">📜</div>
          <div>
            <div class="qs-val">до 6 месяцев</div>
            <div class="qs-lbl">Письменная гарантия с договором</div>
          </div>
        </div>
        <div class="qs-item">
          <div class="qs-icon">🌿</div>
          <div>
            <div class="qs-val">IV класс опасности</div>
            <div class="qs-lbl">Безопасно для детей и животных</div>
          </div>
        </div>
        <div class="qs-item">
          <div class="qs-icon green">🚗</div>
          <div>
            <div class="qs-val">Выезд за 1–3 часа</div>
            <div class="qs-lbl">Дежурные мастера 24/7</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 1: WHAT IS IT & HOW IT APPEARS -->
  <section class="sec-overview">
    <div class="wrap">
      <div class="s-head">
        <div class="s-eyebrow">Суть услуги</div>
        <h2>Что такое <span class="g">{title.lower()}</span> и откуда они берутся</h2>
      </div>

      <div class="sec-grid-2col">
        <div class="overview-box">
          <h3>🔍 Описание и биологические особенности</h3>
          <p>{what_is}</p>
        </div>
        <div class="overview-box">
          <h3>🚪 Пути проникновения в помещение</h3>
          <p>{how_infest}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 2: PROBLEM & HAZARDS -->
  <section class="sec-problem">
    <div class="wrap">
      <div class="s-head">
        <div class="s-eyebrow" style="color:#dc2626;">Скрытая угроза</div>
        <h2 style="color:#991b1b;">Проблема и её описание: <span style="color:#dc2626;">чем это опасно</span></h2>
        <p class="lead">Присутствие {name_gen} в помещении — это не просто эстетический дискомфорт, а прямая угроза здоровью людей и имуществу.</p>
      </div>

      <div class="problem-card-grid">
"""

    for i, p in enumerate(problems, 1):
        html += f"""        <div class="problem-card">
          <div class="icon-head">
            <div class="p-icon">!</div>
            <h4>{p['title']}</h4>
          </div>
          <p>{p['desc']}</p>
        </div>
"""

    html += f"""      </div>

      <!-- DIY WARNING -->
      <div class="diy-alert">
        <div class="diy-alert-icon">⚠️</div>
        <div class="diy-alert-body">
          <h4>Почему самостоятельная обработка не работает и делает только хуже?</h4>
          <p>{diy_fail}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3: WHY TIMELY ACTION MATTERS -->
  <section class="sec-why-act">
    <div class="wrap">
      <div class="s-head">
        <div class="s-eyebrow">Фактор времени</div>
        <h2>Почему эту проблему нужно решать <span class="g">немедленно</span></h2>
        <p class="lead">Каждый день задержки кратно увеличивает численность колонии и усложняет зачистку.</p>
      </div>

      <div class="why-act-grid">
"""
    for item in why_must:
        html += f"""        <div class="why-act-item">
          <div class="why-act-num">{item['num']}</div>
          <div class="why-act-title">{item['title']}</div>
          <div class="why-act-desc">{item['desc']}</div>
        </div>
"""

    html += f"""      </div>
    </div>
  </section>

  <!-- SECTION 4: SOLUTION & WHY IT WORKS -->
  <section class="sec-solution">
    <div class="wrap">
      <div class="s-head">
        <div class="s-eyebrow">Наш метод</div>
        <h2>Решение проблемы от Dis Cleaning: <span class="g">почему это работает</span></h2>
        <p class="lead">Мы не маскируем проблему, а полностью уничтожаем всю цепочку размножения с помощью современного оборудования.</p>
      </div>

      <div class="solution-card-grid">
"""
    for sol in solutions:
        html += f"""        <div class="sol-card">
          <div class="s-icon">🛡</div>
          <h4>{sol['title']}</h4>
          <p>{sol['desc']}</p>
        </div>
"""

    html += f"""      </div>

      <div class="overview-box" style="margin-top:36px; background:var(--green-soft); border-color:#bbf7d0;">
        <h3 style="color:var(--green-d); display:flex; align-items:center; gap:10px;">
          <span>🌟</span> Почему клиенты довольны нашим результатом
        </h3>
        <p style="color:#14532d; font-size:16px;">{why_good}</p>
      </div>
    </div>
  </section>

  <!-- SECTION 5: PRICING -->
  <section class="sec-pricing" id="pricing">
    <div class="wrap">
      <div class="s-head">
        <div class="s-eyebrow">Честная стоимость</div>
        <h2>Тарифы на <span class="g">{title.lower()}</span></h2>
        <p class="lead">Фиксированная стоимость без доплат на месте. Включает выезд дезинфектора, работу и официальный договор с гарантией.</p>
      </div>

      <div class="price-cards-grid">
"""

    for pr in prices:
        feat_cls = " featured" if pr['badge'] else ""
        badge_html = f'<div class="p-card-tag">{pr["badge"]}</div>' if pr['badge'] else ''
        html += f"""        <div class="p-card{feat_cls}">
          {badge_html}
          <div class="p-card-head">
            <div class="p-card-title">{pr['name']}</div>
            <div class="p-card-sub">{pr['sub']}</div>
          </div>
          <div class="p-card-cost">
            <span class="amount">{pr['price']}</span>
          </div>
          <ul class="p-card-list">
            <li>Осмотр и диагностика очагов</li>
            <li>Обработка холодным/горячим туманом</li>
            <li>Барьерная защита по периметру</li>
            <li>Сертифицированный препарат IV класса</li>
            <li>Договор и гарантия до 6 месяцев</li>
          </ul>
          <button type="button" class="btn btn-green p-card-btn" onclick="openServiceModal('{title} — {pr['name']}')">
            <span>Заказать за {pr['price']}</span>
          </button>
        </div>
"""

    html += f"""      </div>
    </div>
  </section>

  <!-- SECTION 6: HOW WE WORK (PROCESS) -->
  <section id="process" style="background:var(--bg-2);">
    <div class="wrap">
      <div class="s-head">
        <div class="s-eyebrow">Прозрачный регламент</div>
        <h2>Как проходит <span class="g">обработка</span></h2>
        <p class="lead">5 простых шагов от первого обращения до полного освобождения от вредителей.</p>
      </div>

      <div class="proc-grid">
        <div class="proc-item">
          <div class="proc-num">01</div>
          <div class="proc-title">Заявка и расчет</div>
          <div class="proc-desc">Вы звоните или оставляете заявку. Менеджер рассчитывает точную стоимость и согласовывает удобное время выезда.</div>
        </div>
        <div class="proc-item">
          <div class="proc-num">02</div>
          <div class="proc-title">Выезд дезинфектора</div>
          <div class="proc-desc">Специалист прибывает в течение 1–3 часов на авто без опознавательных знаков в анонимном режиме.</div>
        </div>
        <div class="proc-item">
          <div class="proc-num">03</div>
          <div class="proc-title">Диагностика очагов</div>
          <div class="proc-desc">Мастер находит скрытые гнезда, определяет степень заражения и подбирает действующее вещество.</div>
        </div>
        <div class="proc-item">
          <div class="proc-num">04</div>
          <div class="proc-title">Профессиональная санация</div>
          <div class="proc-desc">Генератор тумана заполняет помещение микрокапсулами, обрабатываются все щели и наносится защитный барьер.</div>
        </div>
        <div class="proc-item">
          <div class="proc-num">05</div>
          <div class="proc-title">Акт и гарантия</div>
          <div class="proc-desc">Заключаем официальный договор, выдаем акт выполненных работ и гарантийный талон сроком до полугода.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 7: PREPARATION GUIDE -->
  <section class="sec-prep">
    <div class="wrap">
      <div class="s-head">
        <div class="s-eyebrow">Памятка клиенту</div>
        <h2>Подготовка помещения к <span class="g">обработке</span></h2>
        <p class="lead">Соблюдение простых правил гарантирует максимальную эффективность процедуры и безопасность ваших близких.</p>
      </div>

      <div class="prep-grid">
        <div class="prep-box before">
          <h4><span>📋</span> До приезда мастера:</h4>
          <ul class="prep-list">
"""
    for it in prep_before:
        html += f"""            <li>{it}</li>\n"""

    html += f"""          </ul>
        </div>

        <div class="prep-box after">
          <h4><span>✨</span> После завершения обработки:</h4>
          <ul class="prep-list">
"""
    for it in prep_after:
        html += f"""            <li>{it}</li>\n"""

    html += f"""          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 8: FAQ -->
  <section class="sec-faq" id="faq">
    <div class="wrap" style="max-width:860px;">
      <div class="s-head">
        <div class="s-eyebrow">Частые вопросы</div>
        <h2>Вопросы и ответы по услуге: <span class="g">{title.lower()}</span></h2>
        <p class="lead">Если у вас остались вопросы — напишите нам в WhatsApp, специалист ответит за 5 минут.</p>
      </div>

      <div class="faq-list">
"""
    for idx, item in enumerate(faq):
        open_cls = " open" if idx == 0 else ""
        html += f"""        <div class="faq-i{open_cls}">
          <div class="faq-q">
            <span>{item['q']}</span>
            <span class="faq-arrow"></span>
          </div>
          <div class="faq-a">
            <p>{item['a']}</p>
          </div>
        </div>
"""

    html += f"""      </div>
    </div>
  </section>

  <!-- SECTION 9: ORDER FORM CTA -->
  <section class="sec-cta-form" style="background:linear-gradient(135deg, #071324 0%, #0d213f 100%); color:#fff; padding:70px 0;">
    <div class="wrap" style="max-width:760px;">
      <div class="s-head" style="margin-bottom:30px;">
        <div class="s-eyebrow" style="color:var(--green-l);">Спецпредложение</div>
        <h2 style="color:#fff;">Вызовите мастера со <span class="g">скидкой 10%</span></h2>
        <p class="lead" style="color:rgba(255,255,255,0.85);">Оставьте заявку прямо сейчас — дежурный специалист перезвонит в течение 10 минут, рассчитает точную стоимость и ответит на все вопросы.</p>
      </div>

      <div class="modal-body" style="background:#ffffff; border-radius:var(--r-lg); padding:32px; color:var(--ink); box-shadow:0 20px 50px rgba(0,0,0,0.4);">
        <form onsubmit="return handleServicePageOrder(event, '{title}')">
          <input type="hidden" name="service" value="{title}">

          <div class="f-group" style="margin-bottom:16px;">
            <label style="font-weight:700; font-size:13px; color:var(--ink);">Ваше имя *</label>
            <input type="text" name="name" class="f-ctrl" placeholder="Например, Данил" required style="width:100%; padding:12px 14px; border:1.5px solid var(--line); border-radius:var(--r-sm);">
          </div>

          <div class="f-group" style="margin-bottom:16px;">
            <label style="font-weight:700; font-size:13px; color:var(--ink);">Номер телефона *</label>
            <input type="tel" name="phone" class="f-ctrl phone-mask" placeholder="+7 (___) ___-__-__" required style="width:100%; padding:12px 14px; border:1.5px solid var(--line); border-radius:var(--r-sm);">
          </div>

          <div class="f-row" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
            <div>
              <label style="font-weight:700; font-size:13px; color:var(--ink);">Город / Район</label>
              <select name="city" class="f-ctrl" style="width:100%; padding:12px 14px; border:1.5px solid var(--line); border-radius:var(--r-sm);">
                <option value="Алматы">Алматы и область</option>
                <option value="Кордай">Кордай и район</option>
              </select>
            </div>
            <div>
              <label style="font-weight:700; font-size:13px; color:var(--ink);">Тип объекта</label>
              <select name="object" class="f-ctrl" style="width:100%; padding:12px 14px; border:1.5px solid var(--line); border-radius:var(--r-sm);">
                <option value="Квартира">Квартира</option>
                <option value="Частный дом">Частный дом</option>
                <option value="Офис / Бизнес">Офис / Бизнес</option>
                <option value="Кафе / Общепит">Кафе / Общепит</option>
                <option value="Участок / Сад">Участок / Сад</option>
              </select>
            </div>
          </div>

          <div class="f-group" style="margin-bottom:20px;">
            <label style="font-weight:700; font-size:13px; color:var(--ink);">Описание проблемы (необязательно)</label>
            <textarea name="comment" class="f-ctrl" rows="2" placeholder="Укажите примерную площадь, адрес или удобное время" style="width:100%; padding:12px 14px; border:1.5px solid var(--line); border-radius:var(--r-sm);"></textarea>
          </div>

          <button type="submit" class="btn btn-green btn-block" style="padding:15px; font-size:16px; font-weight:800; border-radius:var(--r-sm);">
            <span>Отправить заявку со скидкой 10%</span>
          </button>
          <div style="font-size:12px; color:var(--mute); text-align:center; margin-top:10px;">
            🔒 Ваши данные защищены. Заявка мгновенно поступает дежурному дезинфектору.
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- SECTION 10: RELATED SERVICES -->
  <section style="background:var(--bg); padding:60px 0;">
    <div class="wrap">
      <div class="s-head" style="margin-bottom:28px;">
        <div class="s-eyebrow">Смежные направления</div>
        <h2>Другие услуги <span class="g">дезинфекции</span></h2>
      </div>

      <div class="related-svc-grid">
"""

    for r in related_items:
        html += f"""        <a class="svc" href="{r['slug']}">
          <div class="svc-img"><img src="../images/{r['image']}" alt="{r['title']}" loading="lazy"></div>
          <div class="svc-body">
            <div class="svc-pre">{r['category']}</div>
            <div class="svc-title">{r['title']}</div>
            <div class="svc-bot">
              <span style="font-size:13px; font-weight:800; color:var(--blue);">от {r['price_from']}</span>
              <span class="svc-act">Подробнее <span>→</span></span>
            </div>
          </div>
        </a>
"""

    html += f"""      </div>

      <div style="text-align:center; margin-top:34px;">
        <a href="../index.html#services" class="btn btn-out" style="font-weight:700;">
          <span>← Посмотреть все 19 услуг каталога</span>
        </a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="wrap">
      <div class="foot-top">
        <div class="foot-col foot-about">
          <div class="foot-brand">
            <span class="mark"><img src="../images/logo-square.png" alt="Dis Cleaning"></span>
            <span class="name"><span class="brand-dis">Dis</span>&nbsp;<span class="brand-clean">Cleaning</span></span>
          </div>
          <div class="foot-tag">— Профессиональная дезинфекция и клининг —</div>
          <p class="foot-desc">Профессиональная дезинфекция, дезинсекция, дератизация и клининг в Кордае, Алматы и области. Договор ИП Фёдоров Д.С., гарантия до 6 месяцев.</p>
          <div class="foot-reqs" style="font-size:12px; color:rgba(255,255,255,0.7); line-height:1.6; margin-top:10px;">
            <strong>ИП «ФЁДОРОВ ДАНИЛ СЕРГЕЕВИЧ»</strong><br>
            ИИН: 000708501515 • Банк: АО "Kaspi Bank"<br>
            Адрес: с. Кордай, ул. Байдибек Баба, 219
          </div>
        </div>

        <div class="foot-col">
          <h4>Услуги</h4>
          <ul>
            <li><a href="klopy.html">Уничтожение клопов</a></li>
            <li><a href="tarakany.html">Уничтожение тараканов</a></li>
            <li><a href="krysy-myshi.html">Дератизация (крысы, мыши)</a></li>
            <li><a href="kleshchi.html">Уничтожение клещей</a></li>
            <li><a href="plesen.html">Уничтожение плесени</a></li>
            <li><a href="../index.html#services">Все 19 направлений →</a></li>
          </ul>
        </div>

        <div class="foot-col">
          <h4>Контакты</h4>
          <div class="fc-list">
            <div class="fc-item">
              <span class="fc-lbl">Телефон:</span>
              <a href="tel:+77076203813" class="fc-val">+7 707 620 38 13</a>
            </div>
            <div class="fc-item">
              <span class="fc-lbl">WhatsApp:</span>
              <a href="{wa_href}" target="_blank" rel="noopener" class="fc-val">Чат WhatsApp (24/7)</a>
            </div>
            <div class="fc-item">
              <span class="fc-lbl">Режим работы:</span>
              <span class="fc-val">Круглосуточно, без выходных</span>
            </div>
            <div class="fc-item">
              <span class="fc-lbl">Города выезда:</span>
              <span class="fc-val">Алматы и область, Кордай</span>
            </div>
          </div>
        </div>
      </div>

      <div class="foot-bot">
        <div class="fb-copy">© <span id="year">2026</span> Dis Cleaning (ИП Фёдоров Д.С.). Все права защищены.</div>
        <div class="fb-links">
          <a href="../index.html">На главную</a>
          <a href="../index.html#services">Каталог услуг</a>
          <a href="{wa_href}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- BURGER MENU -->
  <div class="bmenu" id="burgerMenu">
    <div class="bmenu-ov" onclick="closeBurger()"></div>
    <aside class="bmenu-panel">
      <div class="bmenu-head">
        <div class="brand">
          <span class="mark"><img src="../images/logo-square.png" alt="Dis Cleaning"></span>
          <span class="name"><span class="brand-dis">Dis</span>&nbsp;<span class="brand-clean">Cleaning</span></span>
        </div>
        <button class="bmenu-close" onclick="closeBurger()" aria-label="Закрыть">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="bmenu-body">
        <div class="bmenu-grp">
          <h5 data-i18n="menu.main">Основное</h5>
          <a href="../index.html#services" onclick="closeBurger()"><span data-i18n="nav.services">Услуги</span><span class="arr">→</span></a>
          <a href="../index.html#methods" onclick="closeBurger()"><span data-i18n="nav.methods">Методы обработки</span><span class="arr">→</span></a>
          <a href="../index.html#team" onclick="closeBurger()"><span data-i18n="nav.team">Наша команда</span><span class="arr">→</span></a>
          <a href="../index.html#certificates" onclick="closeBurger()"><span data-i18n="nav.certs">Документы и&nbsp;сертификаты</span><span class="arr">→</span></a>
          <a href="../index.html#faq" onclick="closeBurger()"><span data-i18n="nav.faq">FAQ</span><span class="arr">→</span></a>
        </div>
        <div class="bmenu-cta">
          <button type="button" class="btn btn-green btn-block" onclick="openServiceModal('{title}'); closeBurger();">
            <span>Вызвать мастера</span>
          </button>
        </div>
      </div>
    </aside>
  </div>

  <!-- MOBILE BOTTOM BAR -->
  <nav class="mbb" aria-label="Быстрые действия">
    <div class="mbb-row">
      <a href="../index.html#services" class="mbb-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span data-i18n="mbb.services">Услуги</span>
      </a>
      <a href="../index.html#team" class="mbb-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        <span data-i18n="mbb.team">Команда</span>
      </a>
      <a href="tel:+77076203813" class="mbb-btn r">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
        <span data-i18n="mbb.call">Звонок</span>
      </a>
      <a href="{wa_href}" target="_blank" rel="noopener" class="mbb-btn w">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.38c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.09-.16.19-.33.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.33.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.47l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.97.95-.97 2.31 0 1.36 1 2.67 1.14 2.85.14.19 1.96 3 4.75 4.21.66.29 1.18.46 1.58.59.67.21 1.27.18 1.75.11.53-.08 1.66-.68 1.89-1.33.23-.65.23-1.2.16-1.33-.06-.12-.25-.2-.53-.34zM12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 1.76.46 3.45 1.33 4.95L2 22l5.22-1.36c1.45.79 3.08 1.21 4.78 1.21 5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.17-2.92-7.05C17.17 3.07 14.66 2.04 12 2.04"/></svg>
        <span>WhatsApp</span>
      </a>
    </div>
  </nav>

  <!-- MODAL ORDER DIALOG -->
  <div class="modal" id="modalServiceOrder" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-wrap">
      <div class="modal-box">
        <button type="button" class="modal-x" onclick="closeServiceModal()" aria-label="Закрыть модальное окно">×</button>
        <div class="modal-head">
          <div class="modal-icon">🛡</div>
          <h3 id="modalTitle">Заказ услуги: <span class="g" id="modalServiceName">{title}</span></h3>
          <p>Мастер рассчитает стоимость со скидкой 10% и согласует время приезда.</p>
        </div>

        <form class="modal-form" onsubmit="return handleModalSubmit(event)">
          <input type="hidden" name="service" id="modalFormService" value="{title}">

          <div class="f-group">
            <label>Ваше имя *</label>
            <input type="text" name="name" class="f-ctrl" placeholder="Иван" required>
          </div>

          <div class="f-group">
            <label>Телефон *</label>
            <input type="tel" name="phone" class="f-ctrl phone-mask" placeholder="+7 (___) ___-__-__" required>
          </div>

          <div class="f-row">
            <div class="f-group">
              <label>Город</label>
              <select name="city" class="f-ctrl">
                <option value="Алматы">Алматы и область</option>
                <option value="Кордай">Кордай и район</option>
              </select>
            </div>
            <div class="f-group">
              <label>Объект</label>
              <select name="object" class="f-ctrl">
                <option value="Квартира">Квартира</option>
                <option value="Частный дом">Частный дом</option>
                <option value="Офис">Офис</option>
                <option value="Кафе">Кафе / Ресторан</option>
                <option value="Участок">Участок</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-green btn-block" style="padding:14px; font-size:15px; font-weight:700;">
            <span>Отправить заявку в WhatsApp</span>
          </button>
          <div class="f-note">🔒 Перезвоним в течение 10 минут. Выезд в день обращения.</div>
        </form>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION -->
  <div class="toast" id="toast">Заявка отправлена! Дезинфектор свяжется с вами через 10 минут</div>

  <!-- JAVASCRIPT LOGIC -->
  <script src="../js/main.js"></script>
  <script>
    function openServiceModal(svcName) {{
      const m = document.getElementById('modalServiceOrder');
      const lbl = document.getElementById('modalServiceName');
      const inp = document.getElementById('modalFormService');
      if (lbl) lbl.textContent = svcName || '{title}';
      if (inp) inp.value = svcName || '{title}';
      if (m) {{
        m.classList.add('open');
        document.body.style.overflow = 'hidden';
      }}
    }}

    function closeServiceModal() {{
      const m = document.getElementById('modalServiceOrder');
      if (m) {{
        m.classList.remove('open');
        document.body.style.overflow = '';
      }}
    }}

    function handleServicePageOrder(e, defaultService) {{
      e.preventDefault();
      const f = e.target;
      const d = Object.fromEntries(new FormData(f).entries());
      const svc = d.service || defaultService;

      // Save lead locally
      if (typeof saveLead === 'function') {{
        saveLead(d);
      }}

      // Format WhatsApp message
      let msg = `✨ *Заявка с отдельной страницы услуги Dis Cleaning*%0A`;
      msg += `🛡 *Услуга:* ${{svc}}%0A`;
      msg += `👤 *Имя:* ${{d.name || '-'}}%0A`;
      msg += `📞 *Телефон:* ${{d.phone || '-'}}%0A`;
      if (d.city) msg += `🏙 *Город:* ${{d.city}}%0A`;
      if (d.object) msg += `🏠 *Объект:* ${{d.object}}%0A`;
      if (d.comment) msg += `💬 *Комментарий:* ${{d.comment}}%0A`;

      window.open(`https://wa.me/77076203813?text=${{msg}}`, '_blank');
      if (typeof showToast === 'function') showToast();
      f.reset();
      return false;
    }}

    function handleModalSubmit(e) {{
      e.preventDefault();
      const f = e.target;
      const d = Object.fromEntries(new FormData(f).entries());

      if (typeof saveLead === 'function') {{
        saveLead(d);
      }}

      let msg = `✨ *Заказ услуги с сайта Dis Cleaning*%0A`;
      msg += `🛡 *Услуга:* ${{d.service || '{title}'}}%0A`;
      msg += `👤 *Имя:* ${{d.name || '-'}}%0A`;
      msg += `📞 *Телефон:* ${{d.phone || '-'}}%0A`;
      if (d.city) msg += `🏙 *Город:* ${{d.city}}%0A`;
      if (d.object) msg += `🏠 *Объект:* ${{d.object}}%0A`;

      window.open(`https://wa.me/77076203813?text=${{msg}}`, '_blank');
      if (typeof showToast === 'function') showToast();
      closeServiceModal();
      f.reset();
      return false;
    }}

    // Phone input mask for dynamic inputs
    document.querySelectorAll('.phone-mask').forEach(input => {{
      input.addEventListener('input', function() {{
        let val = this.value.replace(/\\D/g, '');
        if (!val) {{ this.value = ''; return; }}
        if (val.startsWith('8')) val = '7' + val.substring(1);
        if (!val.startsWith('7')) val = '7' + val;

        let formatted = '+7';
        if (val.length > 1) formatted += ' (' + val.substring(1, 4);
        if (val.length >= 5) formatted += ') ' + val.substring(4, 7);
        if (val.length >= 8) formatted += '-' + val.substring(7, 9);
        if (val.length >= 10) formatted += '-' + val.substring(9, 11);
        this.value = formatted;
      }});
    }});

    // Close on escape
    document.addEventListener('keydown', e => {{
      if (e.key === 'Escape') closeServiceModal();
    }});
  </script>
</body>
</html>
"""
    return html

# Generate all 19 files
for s in SERVICES_DATA:
    filepath = os.path.join('services', s['slug'])
    page_html = generate_page(s)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(page_html)
    print(f"Generated {filepath}")

print("All 19 service landing pages successfully created in /services/ with perfected layout!")
