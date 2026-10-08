import guideTranslations from "../content/guide-translations.json";
import brandTranslations from "../content/brand-translations.json";
import { CONFIG, i18n as translations } from "./site-config";
import { contactWhatsAppUrl, whatsAppAppUrl } from "./whatsapp";

const originalSlides = new WeakMap();

export function initializeSite() {
  const i18n = { ru: { ...translations.ru }, kz: { ...translations.kz } };
  Object.assign(i18n.ru, guideTranslations.ru);
  Object.assign(i18n.kz, guideTranslations.kz);
  Object.assign(i18n.ru, brandTranslations.ru);
  Object.assign(i18n.kz, brandTranslations.kz);
  const cleanups = [];
  const on = (target, type, listener, options) => {
    if (!target) return;
    target.addEventListener(type, listener, options);
    cleanups.push(() => target.removeEventListener(type, listener, options));
  };
  // Accepted public behavior, mounted once by the Next.js client lifecycle.
  Object.assign(i18n.ru, {
    "overview.guide.label": "02 / ПАМЯТКА",
    "overview.guide.title": "До и после обработки ↗",
    "overview.guide.text": "Как подготовить помещение и что делать после обработки.",
    "nav.objects": "Объекты",
    "svc.title": "Услуги для дома и бизнеса",
    "svc.lead":
      "Дезинфекция помещений, обработка от насекомых, грызунов, грибка и плесени. Выберите задачу — расскажем о порядке работ и подготовке.",
    "trust.1": "Под ваш объект",
    "trust.3": "Инструкции по подготовке",
    "b2b.l1": "План работ под особенности объекта",
    "b2b.l2": "Разовый выезд или регулярное обслуживание",
    "b2b.l3": "Согласование стоимости до начала работ",
    "b2b.l4": "Учёт графика сотрудников и посетителей",
    "b2b.l5": "Согласованный доступ к каждой зоне",
    "b2b.l6": "Рекомендации после обработки",
    "faq.1.a":
      "Порядок подготовки, время отсутствия людей и животных, проветривание и уборка зависят от метода и применяемого средства. Перед выездом специалист передаст инструкцию для вашего объекта.",
    "foot.desc":
      "Дезинфекция, дезинсекция и дератизация. Для дома и бизнеса в Алматы.",
  });
  Object.assign(i18n.kz, {
    "overview.guide.label": "02 / ЖАДЫНАМА",
    "overview.guide.title": "Өңдеуге дейін және кейін ↗",
    "overview.guide.text": "Бөлмені қалай дайындау және өңдеуден кейін не істеу керек.",
    "nav.objects": "Нысандар",
    "svc.title": "Үй мен бизнеске арналған қызметтер",
    "svc.lead":
      "Бөлмелерді дезинфекциялау, жәндіктерге, кеміргіштерге және зеңге қарсы өңдеу. Қажетті қызметті таңдаңыз — жұмыс тәртібі мен дайындық туралы айтамыз.",
    "trust.1": "Нысаныңызға сай",
    "trust.3": "Дайындық нұсқаулығы",
    "b2b.l1": "Нысан ерекшеліктеріне сай жұмыс жоспары",
    "b2b.l2": "Бір реттік немесе тұрақты қызмет көрсету",
    "b2b.l3": "Бағаны жұмыс басталғанға дейін келісу",
    "b2b.l4": "Қызметкерлер мен келушілер кестесін ескеру",
    "b2b.l5": "Әр аймаққа кіру тәртібін келісу",
    "b2b.l6": "Өңдеуден кейінгі ұсыныстар",
    "faq.1.a":
      "Дайындық, адамдар мен жануарлардың болмау уақыты, желдету және тазалау тәртібі қолданылатын әдіс пен құралға байланысты. Маман нысаныңызға арналған нұсқаулық береді.",
    "foot.desc":
      "Дезинфекция, дезинсекция және дератизация. Алматыдағы үй мен бизнеске арналған.",
    "slide.1.eyebrow": "KILL DEZ · АЛМАТЫ",
    "slide.1.title": "Дезинфекция және <br>зиянкестерге қарсы күрес",
    "slide.1.desc":
      "Қандала, тарақан, кеміргіштер немесе зең? Өңдеу аумағын анықтап, баға мен дайындықты келер алдында келісеміз.",
    "slide.1.cta": "Өңдеу бағасын білу ↗",
    "slide.2.eyebrow": "БИЗНЕСКЕ АРНАЛҒАН ШЕШІМДЕР",
    "slide.2.title": "Бизнес нысанын <br>өңдеуді жоспарлау",
    "slide.2.desc":
      "Кафе, қонақүй, дүкен немесе қойма. Өңдеу аймақтарын, бөлмелерге кіруді және қызметкерлердің оралу уақытын келісеміз.",
    "slide.2.cta": "Бизнеске арналған өңдеуді таңдау ↗",
    "slide.3.eyebrow": "ҮЙ ЖӘНЕ ОНЫҢ АУМАҒЫ",
    "slide.3.title": "Үйді қорғау зиянкес <br>ошағын анықтаудан басталады",
    "slide.3.desc":
      "Бөлмедегі жәндіктер, жертөледегі кеміргіштер, ауладағы кенелер — әртүрлі міндет. Қажетті аймаққа сай өңдеуді таңдаймыз.",
    "slide.3.cta": "Үйді өңдеу туралы білу ↗",
    "slider.location": "Алматы",
    "slider.tab.1": "Қызметтер",
    "slider.tab.2": "Бизнеске",
    "slider.tab.3": "Үй мен аула",
  });
  // Preserve authored Russian slide copy for switching back from Kazakh.
  document.querySelectorAll(".visual-hero [data-i18n]").forEach((el) => {
    if (!originalSlides.has(el)) originalSlides.set(el, el.innerHTML);
    i18n.ru[el.dataset.i18n] = originalSlides.get(el);
  });
  Object.assign(i18n.ru, {
    "hero.eyebrow": "KILL DEZ · Алматы",
    "hero.note": "Стоимость и время выезда согласуем заранее",
    "form.submit": "Продолжить в WhatsApp",
    "form.note":
      "Откроется WhatsApp с готовым текстом. Отправьте сообщение менеджеру, чтобы подтвердить заявку.",
    toast: "Отправьте подготовленное сообщение в WhatsApp.",
    "nav.b2b": "Юрлицам",
  });
  Object.assign(i18n.kz, {
    "hero.eyebrow": "KILL DEZ · Алматы",
    "hero.note": "Баға мен келу уақытын алдын ала келісеміз",
    "form.submit": "WhatsApp-та жалғастыру",
    "form.note":
      "WhatsApp дайын мәтінмен ашылады. Өтінімді растау үшін менеджерге хабарламаны жіберіңіз.",
    toast: "Дайын хабарламаны WhatsApp арқылы жіберіңіз.",
    "nav.b2b": "Заңды тұлғаларға",
  });
  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* Private mode. */
      }
    },
  };
  let currentLang = storage.get("stx-lang") || "ru";
  function applyLang(lang) {
    currentLang = i18n[lang] ? lang : "ru";
    storage.set("stx-lang", currentLang);
    document.documentElement.lang = currentLang === "kz" ? "kk" : "ru";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = i18n[currentLang][el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll("[data-lang]").forEach((el) => {
      el.classList.toggle("active", el.dataset.lang === currentLang);
      el.setAttribute("aria-pressed", String(el.dataset.lang === currentLang));
    });
    document.querySelectorAll("[data-whatsapp-contact]").forEach((el) => {
      el.href = contactWhatsAppUrl(currentLang);
      el.title = currentLang === "kz" ? "WhatsApp арқылы жазу" : "Написать в WhatsApp";
    });
  }
  document
    .querySelectorAll("[data-lang]")
    .forEach((el) => on(el, "click", () => applyLang(el.dataset.lang)));
  applyLang(currentLang);

  // Crossfade all three frames; inactive content stays outside the focus order.
  const carousel = document.querySelector(".visual-hero");
  if (carousel) {
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const play = carousel.querySelector("[data-slide-play]");
    const count = carousel.querySelector("#slide-count");
    const segments = [...carousel.querySelectorAll("[data-slide-to]")];
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let active = 0, timer = null, pointerX = null;
    let enabled = !reduceMotion.matches;
    let hovered = false, focused = false;
    const sync = () => {
      clearInterval(timer);
      timer = null;

      play.setAttribute("aria-pressed", String(enabled));
      play.setAttribute("aria-label", currentLang === "kz"
        ? (enabled ? "Автоматты ауысуды тоқтату" : "Автоматты ауысуды қосу")
        : (enabled ? "Остановить автопрокрутку" : "Включить автопрокрутку"));
      const running = enabled && !hovered && !focused && !document.hidden && !reduceMotion.matches;
      segments.forEach(button => button.setAttribute("aria-label", button.dataset[currentLang === "kz" ? "labelKz" : "labelRu"]));
      if (running) timer = setInterval(() => show(active + 1), 7000);
    };
    const show = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.hidden = false;
        slide.classList.toggle("is-active", i === active);
        slide.setAttribute("aria-hidden", String(i !== active));
        slide.inert = i !== active;
      });
      segments.forEach((button, i) => button.setAttribute("aria-current", String(i === active)));
      count.textContent = `${String(active + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    };
    const move = (direction) => {
      enabled = false;
      show(active + direction);
      sync();
    };
    show(0);
    sync();
    cleanups.push(() => clearInterval(timer));
    segments.forEach((button, index) => on(button, "click", () => {
      enabled = index === active ? !enabled && !reduceMotion.matches : false;
      show(index);
      sync();
    }));
    on(play, "click", () => {
      enabled = !enabled && !reduceMotion.matches;
      sync();
    });
    on(carousel, "keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
    });
    on(carousel, "pointerdown", (event) => {
      if (event.pointerType !== "mouse") pointerX = event.clientX;
    });
    on(carousel, "pointerup", (event) => {
      if (pointerX !== null && Math.abs(event.clientX - pointerX) > 60)
        move(event.clientX < pointerX ? 1 : -1);
      pointerX = null;
    });
    on(carousel, "pointercancel", () => { pointerX = null; });
    on(carousel, "focusin", (event) => {
      focused = event.target !== play;
      sync();
    });
    on(carousel, "focusout", (event) => {
      focused = carousel.contains(event.relatedTarget) && event.relatedTarget !== play;
      sync();
    });
    on(carousel, "mouseenter", () => { hovered = true; sync(); });
    on(carousel, "mouseleave", () => { hovered = false; sync(); });
    on(document, "visibilitychange", sync);
    on(reduceMotion, "change", () => {
      if (reduceMotion.matches) enabled = false;
      sync();
    });
    document.querySelectorAll("[data-lang]").forEach(el => on(el, "click", sync));
  }

  // One overlay lifecycle: focus, Escape, Tab containment and scroll restoration.
  const quickContact = document.getElementById("quickContact");
  const contactSummary = quickContact?.querySelector("summary");
  on(quickContact, "toggle", () => {
    contactSummary?.setAttribute("aria-expanded", String(quickContact.open));
  });
  on(quickContact, "focusout", (event) => {
    if (!quickContact.contains(event.relatedTarget)) quickContact.open = false;
  });
  let activeOverlay = null;
  let returnFocus = null;
  const focusable =
    'a[href],button:not([disabled]),input:not([type="hidden"]),select,textarea,[tabindex="0"]';
  function closeOverlay() {
    if (!activeOverlay) return;
    activeOverlay.classList.remove("open");
    activeOverlay = null;
    if (quickContact) quickContact.inert = false;
    document.body.style.overflow = "";
    document
      .getElementById("burgerBtn")
      ?.setAttribute("aria-expanded", "false");
    returnFocus?.focus({ preventScroll: true });
  }
  function showOverlay(el) {
    if (!el) return;
    const trigger = activeOverlay ? returnFocus : document.activeElement;
    closeOverlay();
    returnFocus = trigger;
    activeOverlay = el;
    if (quickContact) {
      quickContact.open = false;
      quickContact.inert = true;
    }
    el.classList.add("open");
    document.body.style.overflow = "hidden";
    (
      el.querySelector('input:not([type="hidden"])') ||
      el.querySelector(focusable)
    )?.focus({ preventScroll: true });
  }
  function openModal(type, service = "") {
    if (type === "business") {
      showOverlay(document.getElementById("modalBusiness"));
      return;
    }
    const sel = document.getElementById("orderService");
    if (sel && service) {
      const target = service.toLowerCase().trim();
      const match = [...sel.options].find(
        (o) =>
          o.value &&
          (o.value.toLowerCase() === target ||
            o.text.toLowerCase().includes(target)),
      );
      if (match) sel.value = match.value;
      else {
        let custom = sel.querySelector("[data-custom]");
        if (!custom) {
          custom = new Option();
          custom.dataset.custom = "";
          sel.add(custom);
        }
        custom.text = service;
        custom.value = service;
        sel.value = service;
      }
    }
    showOverlay(document.getElementById("modalOrder"));
  }
  function closeModal() {
    closeOverlay();
  }
  function openServiceModal(service) {
    openModal("order", service);
  }
  function closeServiceModal() {
    closeOverlay();
  }
  function closeBurger() {
    if (activeOverlay?.id === "burgerMenu") closeOverlay();
  }
  const burgerBtn = document.getElementById("burgerBtn");
  burgerBtn?.setAttribute("aria-controls", "burgerMenu");
  burgerBtn?.setAttribute("aria-expanded", "false");
  on(burgerBtn, "click", () => {
    showOverlay(document.getElementById("burgerMenu"));
    burgerBtn.setAttribute("aria-expanded", "true");
  });
  function openLightbox(src) {
    const img = document.getElementById("lightboxImg");
    if (img) {
      img.src = src;
      showOverlay(document.getElementById("lightbox"));
    }
  }
  function closeLightbox() {
    if (activeOverlay?.id === "lightbox") closeOverlay();
  }
  on(document, "keydown", (e) => {
    if (e.key === "Escape" && quickContact?.open) {
      e.preventDefault();
      quickContact.open = false;
      contactSummary?.focus({ preventScroll: true });
    }
    if (!activeOverlay) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeOverlay();
    }
    if (e.key === "Tab" && activeOverlay) {
      const items = [...activeOverlay.querySelectorAll(focusable)].filter(
        (el) => el.getClientRects().length,
      );
      const first = items[0],
        last = items.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  });
  document.querySelectorAll(".faq-i").forEach((item, index) => {
    const q = item.querySelector(".faq-q"),
      a = item.querySelector(".faq-a");
    if (!q || !a) return;
    a.id = `faq-answer-${index}`;
    q.setAttribute("aria-controls", a.id);
    q.setAttribute("aria-expanded", String(item.classList.contains("open")));
    on(q, "click", () => {
      const opening = !item.classList.contains("open");
      document.querySelectorAll(".faq-i").forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("open", opening);
      q.setAttribute("aria-expanded", String(opening));
    });
  });

  document
    .querySelectorAll("form input, form select, form textarea")
    .forEach((el, index) => {
      if (el.type === "hidden") return;
      el.id ||= `field-${index}`;
      const label = el.parentElement.querySelector("label");
      if (label) label.htmlFor = el.id;
      if (el.name === "name") el.autocomplete = "name";
      if (el.name === "phone") {
        el.autocomplete = "tel";
        el.inputMode = "tel";
      }
    });
  document.querySelectorAll('input[name="phone"]').forEach((input) => {
    on(input, "input", () => {
      input.setCustomValidity("");
      let digits = input.value.replace(/\D/g, "");
      if (!digits) {
        input.value = "";
        return;
      }
      if (digits.startsWith("8")) digits = "7" + digits.slice(1);
      if (!digits.startsWith("7")) digits = "7" + digits;
      digits = digits.slice(0, 11);
      let value = "+7";
      if (digits.length > 1) value += " (" + digits.slice(1, 4);
      if (digits.length >= 5) value += ") " + digits.slice(4, 7);
      if (digits.length >= 8) value += "-" + digits.slice(7, 9);
      if (digits.length >= 10) value += "-" + digits.slice(9, 11);
      input.value = value;
    });
  });
  let toastTimer;
  function showToast(text) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.setAttribute("role", "status");
    el.textContent = text || i18n[currentLang].toast;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 6500);
  }
  function saveLead(data) {
    let leads;
    try {
      leads = JSON.parse(storage.get("sanitex_leads") || "[]");
    } catch {
      leads = [];
    }
    if (!Array.isArray(leads)) leads = [];
    leads.unshift({
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      status: "new",
    });
    storage.set("sanitex_leads", JSON.stringify(leads.slice(0, 200)));
  }
  function submitOrder(e, defaultService = "") {
    e.preventDefault();
    const form = e.target;
    const phone = form.elements.phone;
    phone.setCustomValidity(
      phone.value.replace(/\D/g, "").length === 11
        ? ""
        : currentLang === "kz"
          ? "Телефон нөмірін толық енгізіңіз."
          : "Введите полный номер телефона: +7 и 10 цифр.",
    );
    if (!form.reportValidity()) return false;
    const data = Object.fromEntries(new FormData(form));
    const business = form.dataset.requestType === "business";
    data.name = data.name.trim();
    if (!data.name) {
      form.elements.name.focus();
      return false;
    }
    if (business) {
      data.organization = data.organization.trim();
      if (!data.organization) {
        form.elements.organization.focus();
        return false;
      }
      data.requestType = "business";
      if (data.frequency) data.frequency = i18n[currentLang][`business.frequency.${data.frequency}`];
    }
    data.service ||= defaultService;
    const lines = [
      business ? i18n[currentLang]["business.message"] : "Заявка с сайта KILL DEZ",
      `${business ? i18n[currentLang]["business.name"].replace(/\s*\*$/, "") : "Имя"}: ${data.name}`,
      `${business ? i18n[currentLang]["form.phone"].replace(/\s*\*$/, "") : "Телефон"}: ${data.phone}`,
    ];
    for (const [key, label] of Object.entries({
      ...(business ? { organization: i18n[currentLang]["business.organization.message"] } : {}),
      city: "Город",
      object: business ? i18n[currentLang]["business.object"] : "Объект",
      service: business ? i18n[currentLang]["business.service"] : "Услуга",
      area: business ? i18n[currentLang]["form.area"] : "Площадь, м²",
      ...(business ? { address: i18n[currentLang]["business.address"], frequency: i18n[currentLang]["business.frequency"] } : {}),
      comment: business ? i18n[currentLang]["business.comment"] : "Комментарий",
    })) {
      if (data[key]) lines.push(`${label}: ${data[key]}`);
    }
    if (CONFIG.saveLeadsLocally) saveLead(data);
    if (CONFIG.webhookUrl) {
      fetch(CONFIG.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch((error) =>
        console.warn("Configured webhook could not be reached:", error),
      );
    }
    const url = whatsAppAppUrl(lines.join("\n"));
    // Keep entered values so a blocked or cancelled handoff is recoverable.
    window.open(url, "_self");
    showToast();
    return false;
  }
  function handleServicePageOrder(e, service) {
    return submitOrder(e, service);
  }
  function handleModalSubmit(e) {
    return submitOrder(e);
  }
  document
    .querySelectorAll('.sec-cta-form button[type="submit"]')
    .forEach((el) => {
      el.textContent = i18n[currentLang]["form.submit"];
      el.dataset.i18n = "form.submit";
    });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const btt = document.getElementById("bttBtn");
  on(window, "scroll", () => btt?.classList.toggle("show", scrollY > 400), {
    passive: true,
  });
  on(btt, "click", () =>
    window.scrollTo({
      top: 0,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    }),
  );
  document
    .querySelectorAll(".bmenu a[href]")
    .forEach((el) => on(el, "click", closeBurger));
  function filterPrices(category) {
    document.querySelectorAll(".price-card").forEach((el) => {
      el.hidden = category !== "all" && el.dataset.category !== category;
    });
    document.querySelectorAll(".price-tab-btn").forEach((el) => {
      const selected = el.dataset.filter === category;
      el.classList.toggle("active", selected);
      el.setAttribute("aria-pressed", String(selected));
    });
  }
  filterPrices("all");

  // Declarative actions replace HTML inline handlers; no eval or duplicate form handler.
  on(document, "click", (event) => {
    if (quickContact?.open && (!quickContact.contains(event.target) || event.target.closest("a"))) {
      quickContact.open = false;
    }
    const trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    switch (trigger.dataset.action) {
      case "order":
        openModal(trigger.dataset.requestType === "business" ? "business" : "order", trigger.dataset.service || "");
        break;
      case "close":
        closeOverlay();
        break;
      case "close-menu":
        closeBurger();
        break;
    }
  });
  on(document, "submit", (event) => {
    if (event.target.matches("[data-order-form]")) submitOrder(event);
  });
  document.body.dataset.siteReady = "true";
  return () => {
    cleanups.forEach((cleanup) => cleanup());
    clearTimeout(toastTimer);
    closeOverlay();
    delete document.body.dataset.siteReady;
  };
}
