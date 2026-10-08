import re
import json

print("Updating index.html, js/main.js, and admin.html with Dis Cleaning branding and requisites...")

# ================= 1. UPDATE INDEX.HTML =================
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update title & meta tags
html = html.replace(
    "<title>Sanitex — профессиональная дезинфекция в Алматы</title>",
    "<title>Dis Cleaning — профессиональная дезинфекция, дезинсекция и клининг</title>"
)
html = html.replace(
    'content="Sanitex — дезинфекция, дезинсекция и дератизация в Алматы и области. Уничтожение клопов, тараканов, крыс. Сертифицированные средства, гарантия, договор. +7 707 620 38 13"',
    'content="Dis Cleaning (ИП Фёдоров Д.С.) — профессиональная дезинфекция, дезинсекция, дератизация и клининг в Кордае, Алматы и области. Договор, Kaspi Bank, гарантия. +7 707 620 38 13"'
)
html = html.replace(
    'content="Sanitex, санитекс, дезинфекция Алматы, дезинсекция, уничтожение клопов, уничтожение тараканов, дератизация, СЭС Алматы"',
    'content="Dis Cleaning, дис клининг, дезинфекция Кордай, дезинфекция Алматы, дезинсекция, клининг, уничтожение клопов, уничтожение тараканов, дератизация, ИП Федоров"'
)
html = html.replace(
    'property="og:title" content="Sanitex — профессиональная дезинфекция в Алматы"',
    'property="og:title" content="Dis Cleaning — профессиональная дезинфекция и клининг"'
)
html = html.replace(
    'property="og:description" content="Уничтожение всех видов вредителей по Алматы и области. Сертифицированные средства, гарантия, выезд в день обращения."',
    'property="og:description" content="Профессиональная дезинфекция и клининг по Кордаю, Алматы и области. ИП Фёдоров Д.С. Договор, гарантия, Kaspi Bank."'
)

# Update Schema.org
schema_orig = """<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PestControlService",
  "name": "Sanitex",
  "image": "images/og-cover.jpg",
  "@id": "https://sanitex.kz/",
  "url": "https://sanitex.kz/",
  "telephone": "+77076203813",
  "priceRange": "₸₸",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Алматы",
    "addressCountry": "KZ"
  },
  "areaServed": ["Алматы", "Алматинская область"],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
}
</script>"""

schema_new = """<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Dis Cleaning",
  "legalName": "ИП ФЁДОРОВ ДАНИЛ СЕРГЕЕВИЧ",
  "taxID": "000708501515",
  "image": "images/logo-full.png",
  "telephone": "+77076203813",
  "priceRange": "₸₸",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Байдибек Баба, 219",
    "addressLocality": "Кордай",
    "addressRegion": "Жамбылская область",
    "addressCountry": "KZ"
  },
  "areaServed": ["Кордай", "Алматы", "Алматинская область", "Жамбылская область"],
  "paymentAccepted": "Kaspi Bank, безналичный расчет, наличные",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
}
</script>"""

html = html.replace(schema_orig, schema_new)

# Update Header brand
brand_orig = """    <a href="#" class="brand" aria-label="Sanitex">
      <span class="mark">
        <img src="images/logo-square.png" alt="Sanitex">
      </span>
      <span class="name">Sani<span class="g">tex</span></span>
    </a>"""

brand_new = """    <a href="#" class="brand" aria-label="Dis Cleaning">
      <span class="mark">
        <img src="images/logo-square.png" alt="Dis Cleaning Logo">
      </span>
      <span class="name"><span class="brand-dis">Dis</span>&nbsp;<span class="brand-clean">Cleaning</span></span>
    </a>"""

html = html.replace(brand_orig, brand_new)

# Update Hero section
hero_orig = """<!-- HERO (фото на фоне, минимум текста) -->
<section class="hero">
  <div class="hero-bg">
    <img src="images/hero-bg.jpg" alt="Дезинфекция Алматы">
  </div>
  <div class="wrap hero-inner">
    <div class="hero-content">
      <h1 data-i18n="hero.title">Дезинфекция в&nbsp;<span class="g">Алматы</span></h1>
      <p class="lead" data-i18n="hero.sub">Профессиональное уничтожение вредителей с&nbsp;гарантией</p>
      <div class="hero-actions">
        <a href="https://wa.me/77076203813" target="_blank" rel="noopener" class="hero-btn wa">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z"/></svg>
          <span data-i18n="hero.btnWa">Написать в WhatsApp</span>
        </a>
        <a href="tel:+77076203813" class="hero-btn call">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="18" height="18"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          <span data-i18n="hero.btnCall">Позвонить</span>
        </a>
      </div>
      <div class="hero-trust">
        <div class="trust-item">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          <span data-i18n="trust.1">Сертификаты СЭС</span>
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          <span data-i18n="trust.2">Договор и АВР</span>
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          <span data-i18n="trust.3">Безопасно для семьи</span>
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          <span data-i18n="trust.4">Гарантия до 6 мес.</span>
        </div>
      </div>
    </div>
  </div>
</section>"""

hero_new = """<!-- HERO (Dis Cleaning Brand Style) -->
<section class="hero">
  <div class="hero-bg">
    <img src="images/hero-bg.jpg" alt="Дезинфекция и клининг">
  </div>
  <div class="wrap hero-inner">
    <div class="hero-content">
      <div class="hero-badge">
        <span class="sparkle">✦</span>
        <span>Dis Cleaning — Чистота, безопасность и защита от вредителей</span>
      </div>
      <h1 data-i18n="hero.title">Дезинфекция и клининг в&nbsp;<span class="b">Алматы</span> и&nbsp;<span class="g">Кордае</span></h1>
      <p class="lead" data-i18n="hero.sub">Профессиональное уничтожение вредителей с&nbsp;гарантией по официальному договору</p>
      <div class="hero-actions">
        <a href="https://wa.me/77076203813" target="_blank" rel="noopener" class="hero-btn wa">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z"/></svg>
          <span data-i18n="hero.btnWa">Написать в WhatsApp</span>
        </a>
        <a href="tel:+77076203813" class="hero-btn call">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="18" height="18"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          <span data-i18n="hero.btnCall">Позвонить</span>
        </a>
      </div>
      <div class="hero-trust">
        <div class="trust-item">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          <span data-i18n="trust.1">Сертификаты СЭС</span>
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          <span data-i18n="trust.2">Договор и АВР</span>
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          <span data-i18n="trust.3">Безопасно для семьи</span>
        </div>
        <div class="trust-item">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
          <span data-i18n="trust.4">Гарантия до 6 мес.</span>
        </div>
      </div>
    </div>
  </div>
</section>"""

html = html.replace(hero_orig, hero_new)

# Update B2B Section with Kaspi Bank requisites badge
b2b_orig = """      <div class="b2b-cta-box">
        <div class="b2b-cta-text">
          <h4 data-i18n="b2b.cta.t">Нужно регулярное обслуживание объекта?</h4>
          <p data-i18n="b2b.cta.d">Оставьте заявку — подготовим коммерческое предложение с графиком ТО и тарифами под ваш объект в течение 24 часов.</p>
        </div>
        <button class="b2b-cta-btn" onclick="openModal('order')" data-i18n="b2b.cta.btn">Получить КП</button>
      </div>"""

b2b_new = """      <!-- B2B Legal Entity & Bank Badge -->
      <div class="b2b-contract-badge">
        <div class="b2b-badge-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <div class="b2b-badge-info">
          <h4>Официальный договор с юридическими лицами (ИП, ТОО)</h4>
          <p>Работаем официально через <strong>ИП «ФЁДОРОВ ДАНИЛ СЕРГЕЕВИЧ»</strong> (ИИН: 000708501515). Оплата на расчётный счёт в <strong>АО "Kaspi Bank"</strong> (IBAN: KZ44722S000019492073, БИК: CASPKZKA, КБе: 19). Полный комплект закрывающих документов: ЭСФ, АВР и санитарные акты СанПиН.</p>
        </div>
      </div>

      <div class="b2b-cta-box">
        <div class="b2b-cta-text">
          <h4 data-i18n="b2b.cta.t">Нужно регулярное обслуживание объекта?</h4>
          <p data-i18n="b2b.cta.d">Оставьте заявку — подготовим коммерческое предложение с графиком ТО и тарифами под ваш объект в течение 24 часов.</p>
        </div>
        <button class="b2b-cta-btn" onclick="openModal('order', 'B2B (Коммерческое предложение)')" data-i18n="b2b.cta.btn">Получить КП</button>
      </div>"""

html = html.replace(b2b_orig, b2b_new)

# Update Footer with Dis Cleaning wide logo and official Requisites Card
foot_orig = """      <!-- Col 1: Brand -->
      <div class="foot-col foot-brand-col">
        <div class="foot-brand-wide">
          <img src="images/logo-wide.png" alt="Sanitex">
        </div>
        <div class="foot-tag" data-i18n="foot.tag">— Дезинфекция нового уровня —</div>
        <p class="foot-desc" data-i18n="foot.desc">Профессиональная дезинфекция, дезинсекция и дератизация в Алматы и области. Сертифицированные средства, гарантия, договор.</p>
        <div class="foot-social">
          <a href="https://wa.me/77076203813" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z"/></svg>
          </a>
          <a href="tel:+77076203813" aria-label="Позвонить">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          </a>
        </div>
      </div>"""

foot_new = """      <!-- Col 1: Brand & Requisites -->
      <div class="foot-col foot-brand-col">
        <div class="foot-brand-wide">
          <img src="images/logo-wide.png" alt="Dis Cleaning" style="max-height: 52px; width: auto;">
        </div>
        <div class="foot-tag" data-i18n="foot.tag">— Профессиональная дезинфекция и клининг —</div>
        <p class="foot-desc" data-i18n="foot.desc">Профессиональная дезинфекция, дезинсекция, дератизация и клининг помещений в Кордае, Алматы и области. Официальный договор, Kaspi Bank, гарантия качества.</p>
        
        <!-- Requisites Box -->
        <div class="foot-req-card">
          <div class="foot-req-header">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span>Реквизиты компании</span>
          </div>
          <div class="foot-req-body">
            <p class="foot-req-company">ИП «ФЁДОРОВ ДАНИЛ СЕРГЕЕВИЧ»</p>
            <p><span>ИИН / БИН:</span> <strong>000708501515</strong></p>
            <p><span>Адрес:</span> Кордайский р-н, с. Кордай, ул. Байдибек Баба, д. 219</p>
            <p><span>Банк:</span> АО "Kaspi Bank" · БИК: CASPKZKA · КБе: 19</p>
            <p><span>Счёт (IBAN):</span> <strong class="iban-code">KZ44722S000019492073</strong></p>
          </div>
        </div>

        <div class="foot-social" style="margin-top: 18px;">
          <a href="https://wa.me/77076203813" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z"/></svg>
          </a>
          <a href="tel:+77076203813" aria-label="Позвонить">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          </a>
        </div>
      </div>"""

html = html.replace(foot_orig, foot_new)

# Update Footer copyright
html = html.replace("© <span id=\"year\"></span> Sanitex.", "© <span id=\"year\"></span> Dis Cleaning.")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("index.html updated successfully!")


# ================= 2. UPDATE JS/MAIN.JS =================
with open('js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace CONFIG
config_orig = """// ================= GLOBAL CONFIGURATION =================
const CONFIG = {
  companyName: 'Sanitex',
  phoneDisplay: '+7 707 620 38 13',
  phoneRaw: '+77076203813',
  whatsappNumber: '77076203813',
  city: 'Алматы',
  saveLeadsLocally: true, // Stores all submissions in localStorage for admin review
  webhookUrl: ''          // Optional: Add Telegram Bot / CRM webhook endpoint here
};"""

config_new = """// ================= GLOBAL CONFIGURATION =================
const CONFIG = {
  companyName: 'Dis Cleaning',
  legalName: 'ИП «ФЁДОРОВ ДАНИЛ СЕРГЕЕВИЧ»',
  iin: '000708501515',
  address: 'Кордайский район, с. Кордай, ул. Байдибек Баба, дом 219',
  bank: 'АО "Kaspi Bank"',
  bik: 'CASPKZKA',
  kbe: '19',
  iban: 'KZ44722S000019492073',
  phoneDisplay: '+7 707 620 38 13',
  phoneRaw: '+77076203813',
  whatsappNumber: '77076203813',
  city: 'Кордай / Алматы',
  saveLeadsLocally: true, // Stores all submissions in localStorage for admin review
  webhookUrl: ''          // Optional: Add Telegram Bot / CRM webhook endpoint here
};"""

js = js.replace(config_orig, config_new)

# Replace Sanitex references in i18n dictionary
js = js.replace("'hero.title':'Дезинфекция в&nbsp;<span class=\"g\">Алматы</span>'", "'hero.title':'Дезинфекция и клининг в&nbsp;<span class=\"b\">Алматы</span> и&nbsp;<span class=\"g\">Кордае</span>'")
js = js.replace("'hero.title':'<span class=\"g\">Алматыдағы</span> дезинфекция'", "'hero.title':'<span class=\"b\">Алматы мен Қордайдағы</span> <span class=\"g\">дезинфекция және клининг</span>'")

js = js.replace("'why.title':'Почему выбирают <span class=\"g\">Sanitex</span>'", "'why.title':'Почему выбирают <span class=\"b\">Dis</span> <span class=\"g\">Cleaning</span>'")
js = js.replace("'why.title':'Неліктен <span class=\"g\">Sanitex</span> таңдайды'", "'why.title':'Неліктен <span class=\"b\">Dis</span> <span class=\"g\">Cleaning</span> таңдайды'")

js = js.replace("'foot.tag':'— Дезинфекция нового уровня —'", "'foot.tag':'— Профессиональная дезинфекция и клининг —'")
js = js.replace("'foot.tag':'— Жаңа деңгейдегі дезинфекция —'", "'foot.tag':'— Кәсіби дезинфекция және клининг —'")

js = js.replace(
    "'foot.desc':'Профессиональная дезинфекция, дезинсекция и дератизация в Алматы и области. Сертифицированные средства, гарантия, договор.'",
    "'foot.desc':'Профессиональная дезинфекция, дезинсекция, дератизация и клининг помещений в Кордае, Алматы и области. Договор с ИП Фёдоров Д.С., Kaspi Bank, гарантия.'"
)
js = js.replace(
    "'foot.desc':'Алматы мен облыстағы кәсіби дезинфекция, дезинсекция және дератизация. Сертификатталған құралдар, кепілдік, шарт.'",
    "'foot.desc':'Қордай, Алматы және облыстағы кәсіби дезинфекция, дезинсекция, дератизация және клининг. ЖК Фёдоров Д.С. келісім-шарты, Kaspi Bank, кепілдік.'"
)

# Update submitOrder message header
js = js.replace(
    "let msg = `🟢 *Заявка с сайта ${CONFIG.companyName}*%0A`;",
    "let msg = `✨ *Заявка с сайта Dis Cleaning*%0A`;"
)

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("js/main.js updated successfully!")


# ================= 3. UPDATE ADMIN.HTML =================
with open('admin.html', 'r', encoding='utf-8') as f:
    admin = f.read()

admin = admin.replace(
    "<title>Sanitex Admin — Панель заявок</title>",
    "<title>Dis Cleaning Admin — Панель заявок</title>"
)
admin = admin.replace(
    "<h1>Sani<span>tex</span> <span class=\"badge-admin\">Admin</span></h1>",
    "<h1><span style=\"color:#0066cc;\">Dis</span> <span style=\"color:#16a34a;\">Cleaning</span> <span class=\"badge-admin\">Admin</span></h1>"
)
admin = admin.replace(
    "<p style=\"font-size:12px; color:var(--mute)\">Журнал входящих заявок с сайта</p>",
    "<p style=\"font-size:12px; color:var(--mute)\">ИП «ФЁДОРОВ ДАНИЛ СЕРГЕЕВИЧ» · ИИН: 000708501515 · Kaspi Bank: KZ44722S000019492073</p>"
)

with open('admin.html', 'w', encoding='utf-8') as f:
    f.write(admin)
print("admin.html updated successfully!")

print("All files successfully updated with Dis Cleaning brand & requisites!")
