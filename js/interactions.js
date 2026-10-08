// Shared behavior for the homepage, price list and all service pages.
Object.assign(i18n.ru, {
  'nav.objects': 'Объекты',
  'svc.title': 'Услуги для дома и бизнеса',
  'svc.lead': 'Дезинфекция, клининг и 19 направлений контроля вредителей. Выберите задачу — расскажем о порядке работ и подготовке.',
  'trust.1': 'Под ваш объект', 'trust.3': 'Инструкции по подготовке',
  'b2b.l1': 'План работ под особенности объекта',
  'b2b.l2': 'Разовый выезд или регулярное обслуживание',
  'b2b.l3': 'Согласование стоимости до начала работ',
  'b2b.l4': 'Учёт графика сотрудников и посетителей',
  'b2b.l5': 'Согласованный доступ к каждой зоне',
  'b2b.l6': 'Рекомендации после обработки',
  'faq.1.a': 'Порядок подготовки, время отсутствия людей и животных, проветривание и уборка зависят от метода и применяемого средства. Перед выездом специалист передаст инструкцию для вашего объекта.',
  'foot.desc': 'Дезинфекция, контроль вредителей и клининг. Для дома и бизнеса в Алматы.'
});
Object.assign(i18n.kz, {
  'nav.objects': 'Нысандар',
  'svc.title': 'Үй мен бизнеске арналған қызметтер',
  'svc.lead': 'Дезинфекция, клининг және зиянкестермен күрестің 19 бағыты. Қажетті қызметті таңдаңыз — жұмыс тәртібі мен дайындық туралы айтамыз.',
  'trust.1': 'Нысаныңызға сай', 'trust.3': 'Дайындық нұсқаулығы',
  'b2b.l1': 'Нысан ерекшеліктеріне сай жұмыс жоспары',
  'b2b.l2': 'Бір реттік немесе тұрақты қызмет көрсету',
  'b2b.l3': 'Бағаны жұмыс басталғанға дейін келісу',
  'b2b.l4': 'Қызметкерлер мен келушілер кестесін ескеру',
  'b2b.l5': 'Әр аймаққа кіру тәртібін келісу',
  'b2b.l6': 'Өңдеуден кейінгі ұсыныстар',
  'faq.1.a': 'Дайындық, адамдар мен жануарлардың болмау уақыты, желдету және тазалау тәртібі қолданылатын әдіс пен құралға байланысты. Маман нысаныңызға арналған нұсқаулық береді.',
  'foot.desc': 'Дезинфекция, зиянкестермен күрес және клининг. Алматыдағы үй мен бизнеске арналған.',
  'slide.1.eyebrow': 'DIS CLEANING · АЛМАТЫ',
  'slide.1.title': 'Таза кеңістік.<br>Күн сайынғы тыныштық.',
  'slide.1.desc': 'Дезинфекция, зиянкестермен күрес және клининг.<br>Үйіңіз бен бизнесіңіз үшін.',
  'slide.1.cta': 'Қызметті таңдау ↗',
  'slide.2.eyebrow': 'БИЗНЕСКЕ АРНАЛҒАН ШЕШІМДЕР',
  'slide.2.title': 'Сіз қонақтарды ойлайсыз.<br>Біз — кеңістікті.',
  'slide.2.desc': 'Шағын кафеден қонақүйге дейін.<br>Жұмысты бизнес кестесіне сай келісеміз.',
  'slide.2.cta': 'Нысанды таңдау ↗',
  'slide.3.eyebrow': 'ҮЙ ЖӘНЕ ОНЫҢ АУМАҒЫ',
  'slide.3.title': 'Үйдегі тәртіп.<br>Ауладағы жайлылық.',
  'slide.3.desc': 'Бөлмелерді, шаруашылық жайлар мен аумақты өңдеу.<br>Міндетіңіз бен маусымға сай шешім.',
  'slide.3.cta': 'Жеке үй үшін ↗',
  'slider.location': 'Алматы'
});
// Preserve authored Russian slide copy for switching back from Kazakh.
document.querySelectorAll('.visual-hero [data-i18n]').forEach(el => { i18n.ru[el.dataset.i18n] = el.innerHTML; });
Object.assign(i18n.ru, {
  'hero.eyebrow': 'Dis Cleaning · Алматы',
  'hero.note': 'Выезд в день обращения · Работаем по договору',
  'form.submit': 'Продолжить в WhatsApp',
  'form.note': 'Откроется WhatsApp с готовым текстом. Отправьте сообщение менеджеру, чтобы подтвердить заявку.',
  'toast': 'Отправьте подготовленное сообщение в WhatsApp.',
  'nav.b2b': 'Юрлицам'
});
Object.assign(i18n.kz, {
  'hero.eyebrow': 'Dis Cleaning · Алматы',
  'hero.note': 'Өтінім күні шығу · Келісімшарт бойынша жұмыс',
  'form.submit': 'WhatsApp-та жалғастыру',
  'form.note': 'WhatsApp дайын мәтінмен ашылады. Өтінімді растау үшін менеджерге хабарламаны жіберіңіз.',
  'toast': 'Дайын хабарламаны WhatsApp арқылы жіберіңіз.',
  'nav.b2b': 'Заңды тұлғаларға'
});
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* Private mode. */ } }
};
let currentLang = storage.get('stx-lang') || 'ru';
function applyLang(lang) {
  currentLang = i18n[lang] ? lang : 'ru';
  storage.set('stx-lang', currentLang);
  document.documentElement.lang = currentLang === 'kz' ? 'kk' : 'ru';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = i18n[currentLang][el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === currentLang);
    el.setAttribute('aria-pressed', String(el.dataset.lang === currentLang));
  });
}
document.querySelectorAll('[data-lang]').forEach(el => el.addEventListener('click', () => applyLang(el.dataset.lang)));
applyLang(currentLang);

// Manual by default; autoplay is an explicit choice and stops on interaction.
const carousel = document.querySelector('.visual-hero');
if (carousel) {
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const play = carousel.querySelector('[data-slide-play]');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0, timer = null, pointerX = null;
  const show = index => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== active; });
    document.getElementById('slide-count').textContent = `${String(active + 1).padStart(2, '0')} / 03`;
  };
  const stop = () => {
    clearInterval(timer); timer = null; play.textContent = '▶';
    play.setAttribute('aria-pressed', 'false');
    play.setAttribute('aria-label', 'Включить автопрокрутку');
  };
  const move = direction => { stop(); show(active + direction); };
  carousel.querySelector('[data-slide-prev]').addEventListener('click', () => move(-1));
  carousel.querySelector('[data-slide-next]').addEventListener('click', () => move(1));
  play.addEventListener('click', () => {
    if (timer) return stop();
    if (reduceMotion.matches) return;
    timer = setInterval(() => show(active + 1), 6500);
    play.textContent = 'Ⅱ'; play.setAttribute('aria-pressed', 'true');
    play.setAttribute('aria-label', 'Остановить автопрокрутку');
  });
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  carousel.addEventListener('pointerdown', event => { if (event.pointerType !== 'mouse') pointerX = event.clientX; });
  carousel.addEventListener('pointerup', event => {
    if (pointerX !== null && Math.abs(event.clientX - pointerX) > 60) move(event.clientX < pointerX ? 1 : -1);
    pointerX = null;
  });
  carousel.addEventListener('pointercancel', () => { pointerX = null; });
  carousel.addEventListener('focusin', event => { if (event.target !== play) stop(); });
  carousel.addEventListener('mouseenter', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  reduceMotion.addEventListener('change', stop);
}

// One overlay lifecycle: focus, Escape, Tab containment and scroll restoration.
let activeOverlay = null;
let returnFocus = null;
const focusable = 'a[href],button:not([disabled]),input:not([type="hidden"]),select,textarea,[tabindex="0"]';
function closeOverlay() {
  if (!activeOverlay) return;
  activeOverlay.classList.remove('open');
  activeOverlay = null;
  document.body.style.overflow = '';
  document.getElementById('burgerBtn')?.setAttribute('aria-expanded', 'false');
  returnFocus?.focus({ preventScroll: true });
}
function showOverlay(el) {
  if (!el) return;
  const trigger = activeOverlay ? returnFocus : document.activeElement;
  closeOverlay();
  returnFocus = trigger;
  activeOverlay = el;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  (el.querySelector('input:not([type="hidden"])') || el.querySelector(focusable))?.focus({ preventScroll: true });
}
function openModal(type, service = '') {
  const sel = document.getElementById('orderService');
  if (sel && service) {
    const target = service.toLowerCase().trim();
    const match = [...sel.options].find(o => o.value &&
      (o.value.toLowerCase() === target || o.text.toLowerCase().includes(target)));
    if (match) sel.value = match.value;
    else {
      let custom = sel.querySelector('[data-custom]');
      if (!custom) { custom = new Option(); custom.dataset.custom = ''; sel.add(custom); }
      custom.text = service; custom.value = service; sel.value = service;
    }
  }
  showOverlay(document.getElementById('modalOrder'));
}
function closeModal() { closeOverlay(); }
function openServiceModal(service) { openModal('order', service); }
function closeServiceModal() { closeOverlay(); }
function closeBurger() { if (activeOverlay?.id === 'burgerMenu') closeOverlay(); }
const burgerBtn = document.getElementById('burgerBtn');
burgerBtn?.setAttribute('aria-controls', 'burgerMenu');
burgerBtn?.setAttribute('aria-expanded', 'false');
burgerBtn?.addEventListener('click', () => {
  showOverlay(document.getElementById('burgerMenu'));
  burgerBtn.setAttribute('aria-expanded', 'true');
});
function openLightbox(src) {
  const img = document.getElementById('lightboxImg');
  if (img) { img.src = src; showOverlay(document.getElementById('lightbox')); }
}
function closeLightbox() { if (activeOverlay?.id === 'lightbox') closeOverlay(); }
document.addEventListener('keydown', e => {
  if (!activeOverlay) return;
  if (e.key === 'Escape') { e.preventDefault(); closeOverlay(); }
  if (e.key === 'Tab' && activeOverlay) {
    const items = [...activeOverlay.querySelectorAll(focusable)].filter(el => el.getClientRects().length);
    const first = items[0], last = items.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  }
});
document.querySelectorAll('.faq-i').forEach((item, index) => {
  const q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
  if (!q || !a) return;
  a.id = `faq-answer-${index}`;
  q.setAttribute('aria-controls', a.id);
  q.setAttribute('aria-expanded', String(item.classList.contains('open')));
  q.addEventListener('click', () => {
    const opening = !item.classList.contains('open');
    document.querySelectorAll('.faq-i').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
    });
    item.classList.toggle('open', opening);
    q.setAttribute('aria-expanded', String(opening));
  });
});

document.querySelectorAll('form input, form select, form textarea').forEach((el, index) => {
  if (el.type === 'hidden') return;
  el.id ||= `field-${index}`;
  const label = el.parentElement.querySelector('label');
  if (label) label.htmlFor = el.id;
  if (el.name === 'name') el.autocomplete = 'name';
  if (el.name === 'phone') { el.autocomplete = 'tel'; el.inputMode = 'tel'; }
});
document.querySelectorAll('input[name="phone"]').forEach(input => {
  input.addEventListener('input', () => {
    input.setCustomValidity('');
    let digits = input.value.replace(/\D/g, '');
    if (!digits) { input.value = ''; return; }
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (!digits.startsWith('7')) digits = '7' + digits;
    digits = digits.slice(0, 11);
    let value = '+7';
    if (digits.length > 1) value += ' (' + digits.slice(1, 4);
    if (digits.length >= 5) value += ') ' + digits.slice(4, 7);
    if (digits.length >= 8) value += '-' + digits.slice(7, 9);
    if (digits.length >= 10) value += '-' + digits.slice(9, 11);
    input.value = value;
  });
});
let toastTimer;
function showToast(text) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.setAttribute('role', 'status');
  el.textContent = text || i18n[currentLang].toast;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 6500);
}
function saveLead(data) {
  let leads;
  try { leads = JSON.parse(storage.get('sanitex_leads') || '[]'); } catch { leads = []; }
  if (!Array.isArray(leads)) leads = [];
  leads.unshift({ ...data, id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), createdAt: new Date().toISOString(), status: 'new' });
  storage.set('sanitex_leads', JSON.stringify(leads.slice(0, 200)));
}
function submitOrder(e, defaultService = '') {
  e.preventDefault();
  const form = e.target;
  const phone = form.elements.phone;
  phone.setCustomValidity(phone.value.replace(/\D/g, '').length === 11 ? '' :
    (currentLang === 'kz' ? 'Телефон нөмірін толық енгізіңіз.' : 'Введите полный номер телефона: +7 и 10 цифр.'));
  if (!form.reportValidity()) return false;
  const data = Object.fromEntries(new FormData(form));
  data.name = data.name.trim();
  if (!data.name) { form.elements.name.focus(); return false; }
  data.service ||= defaultService;
  const lines = ['Заявка с сайта Dis Cleaning', `Имя: ${data.name}`, `Телефон: ${data.phone}`];
  for (const [key, label] of Object.entries({city:'Город',object:'Объект',service:'Услуга',area:'Площадь, м²',comment:'Комментарий'})) {
    if (data[key]) lines.push(`${label}: ${data[key]}`);
  }
  if (CONFIG.saveLeadsLocally) saveLead(data);
  if (CONFIG.webhookUrl) {
    fetch(CONFIG.webhookUrl, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    }).catch(error => console.warn('Configured webhook could not be reached:', error));
  }
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  // Keep entered values so a blocked or cancelled handoff is recoverable.
  window.open(url, '_blank', 'noopener,noreferrer');
  showToast();
  return false;
}
function handleServicePageOrder(e, service) { return submitOrder(e, service); }
function handleModalSubmit(e) { return submitOrder(e); }
document.querySelectorAll('.sec-cta-form button[type="submit"]').forEach(el => {
  el.textContent = i18n[currentLang]['form.submit'];
  el.dataset.i18n = 'form.submit';
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const btt = document.getElementById('bttBtn');
window.addEventListener('scroll', () => btt?.classList.toggle('show', scrollY > 400), { passive: true });
btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
document.querySelectorAll('.bmenu a[href]').forEach(el => el.addEventListener('click', closeBurger));
function filterPrices(category) {
  document.querySelectorAll('.price-card').forEach(el => { el.hidden = category !== 'all' && el.dataset.category !== category; });
  document.querySelectorAll('.price-tab-btn').forEach(el => {
    const selected = el.dataset.filter === category;
    el.classList.toggle('active', selected);
    el.setAttribute('aria-pressed', String(selected));
  });
}
filterPrices('all');
