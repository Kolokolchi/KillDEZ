with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update B2B Section
old_b2b_block = """      <div class="b2b-cta">
        <h3 data-i18n="b2b.cta.t">Нужно регулярное обслуживание объекта?</h3>
        <p data-i18n="b2b.cta.d">Оставьте заявку — подготовим коммерческое предложение с графиком ТО и тарифами под ваш объект в течение 24 часов.</p>
        <button class="btn btn-green" onclick="openModal('order')">
          <span data-i18n="b2b.cta.btn">Получить КП</span>
        </button>
        <div class="b2b-docs">
          <span>Договор</span><span>Счёт</span><span>АВР</span><span>ЭСФ</span><span>Акт обработки</span>
        </div>
      </div>"""

new_b2b_block = """      <div class="b2b-contract-badge">
        <div class="b2b-badge-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <div class="b2b-badge-info">
          <h4>Официальный договор с юридическими лицами (ИП, ТОО)</h4>
          <p>Работаем официально через <strong>ИП «ФЁДОРОВ ДАНИЛ СЕРГЕЕВИЧ»</strong> (ИИН/БИН: 000708501515). Оплата на расчётный счёт в <strong>АО "Kaspi Bank"</strong> (IBAN: KZ44722S000019492073, БИК: CASPKZKA, КБе: 19). Предоставляем полный пакет закрывающих документов: ЭСФ, АВР и санитарные акты СанПиН.</p>
        </div>
      </div>

      <div class="b2b-cta">
        <h3 data-i18n="b2b.cta.t">Нужно регулярное обслуживание объекта?</h3>
        <p data-i18n="b2b.cta.d">Оставьте заявку — подготовим коммерческое предложение с графиком ТО и тарифами под ваш объект в течение 24 часов.</p>
        <button class="btn btn-green" onclick="openModal('order', 'B2B (Коммерческое предложение)')">
          <span data-i18n="b2b.cta.btn">Получить КП</span>
        </button>
        <div class="b2b-docs">
          <span>Договор</span><span>Счёт</span><span>АВР</span><span>ЭСФ</span><span>Акт СанПиН</span><span>Kaspi Bank</span>
        </div>
      </div>"""

assert old_b2b_block in html, "old_b2b_block not found in index.html"
html = html.replace(old_b2b_block, new_b2b_block)

# 2. Update Footer Brand Column & Requisites Card
old_foot_col = """      <div class="foot-col">
        <div class="foot-brand-wide">
          <img src="images/logo-wide.png" alt="Sanitex">
        </div>
        <div class="foot-tag" data-i18n="foot.tag">— Дезинфекция нового уровня —</div>
        <p style="margin-top:14px" data-i18n="foot.desc">Профессиональная дезинфекция, дезинсекция и дератизация в Алматы и области. Сертифицированные средства, гарантия, договор.</p>
        <div class="foot-social">
          <a href="https://wa.me/77076203813" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.38c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.09-.16.19-.33.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.33.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.47l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.97.95-.97 2.31 0 1.36 1 2.67 1.14 2.85.14.19 1.96 3 4.75 4.21.66.29 1.18.46 1.58.59.67.21 1.27.18 1.75.11.53-.08 1.66-.68 1.89-1.33.23-.65.23-1.2.16-1.33-.06-.12-.25-.2-.53-.34zM12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 1.76.46 3.45 1.33 4.95L2 22l5.22-1.36c1.45.79 3.08 1.21 4.78 1.21 5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.17-2.92-7.05C17.17 3.07 14.66 2.04 12 2.04"/></svg></a>
          <a href="tel:+77076203813" aria-label="Телефон"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></a>
        </div>
      </div>"""

new_foot_col = """      <div class="foot-col foot-brand-col">
        <div class="foot-brand-wide">
          <img src="images/logo-wide.png" alt="Dis Cleaning" style="max-height: 52px; width: auto;">
        </div>
        <div class="foot-tag" data-i18n="foot.tag">— Профессиональная дезинфекция и клининг —</div>
        <p style="margin-top:10px; margin-bottom:14px;" data-i18n="foot.desc">Профессиональная дезинфекция, дезинсекция, дератизация и клининг в Кордае, Алматы и области. Официальный договор, Kaspi Bank, гарантия качества.</p>
        
        <!-- Official Requisites Card -->
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

        <div class="foot-social" style="margin-top: 14px;">
          <a href="https://wa.me/77076203813" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.38c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.09-.16.19-.33.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.33.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.47l-.54-.01c-.18 0-.48.07-.74.35-.26.28-.97.95-.97 2.31 0 1.36 1 2.67 1.14 2.85.14.19 1.96 3 4.75 4.21.66.29 1.18.46 1.58.59.67.21 1.27.18 1.75.11.53-.08 1.66-.68 1.89-1.33.23-.65.23-1.2.16-1.33-.06-.12-.25-.2-.53-.34zM12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 1.76.46 3.45 1.33 4.95L2 22l5.22-1.36c1.45.79 3.08 1.21 4.78 1.21 5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.03-5.17-2.92-7.05C17.17 3.07 14.66 2.04 12 2.04"/></svg></a>
          <a href="tel:+77076203813" aria-label="Телефон"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></a>
        </div>
      </div>"""

assert old_foot_col in html, "old_foot_col not found in index.html"
html = html.replace(old_foot_col, new_foot_col)

# 3. Update Districts in Footer
old_districts = """      <div class="foot-col">
        <h4 data-i18n="foot.h2">Районы</h4>
        <ul>
          <li><a href="#services">Алмалинский</a></li>
          <li><a href="#services">Ауэзовский</a></li>
          <li><a href="#services">Бостандыкский</a></li>
          <li><a href="#services">Жетысуский</a></li>
          <li><a href="#services">Медеуский</a></li>
          <li><a href="#services">Наурызбайский</a></li>
          <li><a href="#services">Турксибский</a></li>
          <li><a href="#services">Алатауский</a></li>
        </ul>
      </div>"""

new_districts = """      <div class="foot-col">
        <h4 data-i18n="foot.h2">География выезда</h4>
        <ul>
          <li><a href="#services">Кордай и район</a></li>
          <li><a href="#services">Алматы и область</a></li>
          <li><a href="#services">Алмалинский р-н</a></li>
          <li><a href="#services">Бостандыкский р-н</a></li>
          <li><a href="#services">Медеуский р-н</a></li>
          <li><a href="#services">Ауэзовский р-н</a></li>
          <li><a href="#services">Жетысуский р-н</a></li>
          <li><a href="#services">Пригороды и дачи</a></li>
        </ul>
      </div>"""

assert old_districts in html, "old_districts not found in index.html"
html = html.replace(old_districts, new_districts)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully injected B2B badge, official requisites, and updated regions into index.html!")
