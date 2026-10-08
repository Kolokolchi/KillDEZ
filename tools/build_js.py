import re

with open('main_script.js', 'r', encoding='utf-8') as f:
    js_raw = f.read()

# Let's extract the i18n dictionary cleanly
i18n_match = re.search(r'const i18n = \{[\s\S]*?\n\};', js_raw)
assert i18n_match, "i18n dictionary not found!"
i18n_code = i18n_match.group(0).strip()

new_js = f"""/**
 * Sanitex — Professional Disinfection & Pest Control
 * Main Application Logic & Interactivity
 */

// ================= GLOBAL CONFIGURATION =================
const CONFIG = {{
  companyName: 'Sanitex',
  phoneDisplay: '+7 707 620 38 13',
  phoneRaw: '+77076203813',
  whatsappNumber: '77076203813',
  city: 'Алматы',
  saveLeadsLocally: true, // Stores all submissions in localStorage for admin review
  webhookUrl: ''          // Optional: Add Telegram Bot / CRM webhook endpoint here
}};

{i18n_code}

let currentLang = localStorage.getItem('stx-lang') || 'ru';

/**
 * Apply language across all elements with [data-i18n]
 * @param {{'ru' | 'kz'}} lang 
 */
function applyLang(lang) {{
  if (!i18n[lang]) lang = 'ru';
  currentLang = lang;
  localStorage.setItem('stx-lang', lang);
  document.documentElement.lang = lang === 'kz' ? 'kk' : 'ru';

  document.querySelectorAll('[data-i18n]').forEach(el => {{
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key] !== undefined) {{
      el.innerHTML = i18n[lang][key];
    }}
  }});

  // Update language switcher buttons
  document.querySelectorAll('.lang-switch button, .bmenu-lang button').forEach(b => {{
    b.classList.toggle('active', b.dataset.lang === lang);
  }});
}}

// Initialize language switcher event listeners
document.querySelectorAll('.lang-switch button, .bmenu-lang button').forEach(b => {{
  b.addEventListener('click', () => applyLang(b.dataset.lang));
}});
applyLang(currentLang);


// ================= BACK TO TOP BUTTON =================
const bttBtn = document.getElementById('bttBtn');
if (bttBtn) {{
  window.addEventListener('scroll', () => {{
    if (window.scrollY > 400) {{
      bttBtn.classList.add('show');
    }} else {{
      bttBtn.classList.remove('show');
    }}
  }}, {{ passive: true }});

  bttBtn.addEventListener('click', () => {{
    window.scrollTo({{ top: 0, behavior: 'smooth' }});
  }});
}}


// ================= BURGER MOBILE MENU =================
const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');

if (burgerBtn && burgerMenu) {{
  burgerBtn.addEventListener('click', () => {{
    burgerMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }});
}}

function closeBurger() {{
  if (burgerMenu) {{
    burgerMenu.classList.remove('open');
    document.body.style.overflow = '';
  }}
}}
window.closeBurger = closeBurger;


// ================= LIGHTBOX (CERTIFICATES) =================
function openLightbox(src) {{
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (lb && img) {{
    img.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }}
}}

function closeLightbox() {{
  const lb = document.getElementById('lightbox');
  if (lb) {{
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }}
}}
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;


// ================= FAQ ACCORDION =================
document.querySelectorAll('.faq-i').forEach(item => {{
  const q = item.querySelector('.faq-q');
  if (q) {{
    q.addEventListener('click', () => {{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-i').forEach(i => i.classList.remove('open'));
      if (!isOpen) {{
        item.classList.add('open');
      }}
    }});
  }}
}});


// ================= MODAL DIALOGS =================
/**
 * Open Modal and optionally pre-select service
 * @param {{string}} type 
 * @param {{string}} service 
 */
function openModal(type, service = '') {{
  const m = document.getElementById('modalOrder');
  if (!m) return;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (service) {{
    const sel = document.getElementById('orderService');
    if (sel) {{
      let matched = false;
      const cleanTarget = service.toLowerCase().trim();
      for (const opt of sel.options) {{
        const optVal = opt.value.toLowerCase().trim();
        const optText = opt.text.toLowerCase().trim();
        if (optVal === cleanTarget || optText === cleanTarget || optText.includes(cleanTarget) || cleanTarget.includes(optText)) {{
          sel.value = opt.value;
          matched = true;
          break;
        }}
      }}
      if (!matched && service) {{
        // Set first non-empty option or add custom text if needed
        for (const opt of sel.options) {{
          if (opt.value && service.toLowerCase().includes(opt.value.toLowerCase())) {{
            sel.value = opt.value;
            break;
          }}
        }}
      }}
    }}
  }}
}}

function closeModal(type) {{
  const m = document.getElementById('modalOrder');
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}}
window.openModal = openModal;
window.closeModal = closeModal;

// Global Escape Key Listener
document.addEventListener('keydown', e => {{
  if (e.key === 'Escape') {{
    document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
    closeBurger();
    closeLightbox();
  }}
}});


// ================= PHONE INPUT MASK =================
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {{
  phoneInput.addEventListener('input', function(e) {{
    let val = this.value.replace(/\\D/g, '');
    if (!val) {{
      this.value = '';
      return;
    }}
    // Handle leading 7 or 8 for Kazakhstan/Russia
    if (val.startsWith('8')) val = '7' + val.substring(1);
    if (!val.startsWith('7')) val = '7' + val;

    let formatted = '+7';
    if (val.length > 1) formatted += ' (' + val.substring(1, 4);
    if (val.length >= 5) formatted += ') ' + val.substring(4, 7);
    if (val.length >= 8) formatted += '-' + val.substring(7, 9);
    if (val.length >= 10) formatted += '-' + val.substring(9, 11);

    this.value = formatted;
  }});
}}


// ================= TOAST NOTIFICATION =================
let toastTimer = null;
function showToast(text) {{
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text || (i18n[currentLang]['toast'] || 'Заявка отправлена!');
  t.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}}


// ================= LOCAL LEADS STORAGE =================
function saveLead(leadData) {{
  try {{
    const leads = JSON.parse(localStorage.getItem('sanitex_leads') || '[]');
    leads.unshift({{
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      createdAt: new Date().toISOString(),
      status: 'new',
      ...leadData
    }});
    // Keep max 200 leads locally
    if (leads.length > 200) leads.length = 200;
    localStorage.setItem('sanitex_leads', JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent('lead_saved', {{ detail: leadData }}));
  }} catch (err) {{
    console.warn('Could not save lead locally:', err);
  }}
}}


// ================= FORM SUBMISSION =================
function submitOrder(e) {{
  e.preventDefault();
  const f = e.target;
  const d = Object.fromEntries(new FormData(f).entries());

  // Save to local storage
  if (CONFIG.saveLeadsLocally) {{
    saveLead(d);
  }}

  // Send to webhook if configured
  if (CONFIG.webhookUrl) {{
    try {{
      fetch(CONFIG.webhookUrl, {{
        method: 'POST',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify(d)
      }}).catch(() => {{}});
    }} catch (err) {{}}
  }}

  // Format WhatsApp message
  let msg = `🟢 *Заявка с сайта ${{CONFIG.companyName}}*%0A`;
  msg += `👤 Имя: ${{d.name || '-'}}%0A`;
  msg += `📞 Телефон: ${{d.phone || '-'}}%0A`;
  if (d.city) msg += `🏙 Город: ${{d.city}}%0A`;
  if (d.object) msg += `🏠 Объект: ${{d.object}}%0A`;
  if (d.service) msg += `🛡 Услуга: ${{d.service}}%0A`;
  if (d.area) msg += `📐 Площадь: ${{d.area}} м²%0A`;
  if (d.comment) msg += `💬 Комментарий: ${{d.comment}}%0A`;

  const waPhone = CONFIG.whatsappNumber || '77076203813';
  window.open(`https://wa.me/${{waPhone}}?text=${{msg}}`, '_blank');

  showToast();
  closeModal('order');
  f.reset();
  return false;
}}
window.submitOrder = submitOrder;


// ================= FOOTER YEAR & SMOOTH SCROLL =================
const yearEl = document.getElementById('year');
if (yearEl) {{
  yearEl.textContent = new Date().getFullYear();
}}

document.querySelectorAll('a[href^="#"]').forEach(a => {{
  a.addEventListener('click', function(e) {{
    const id = this.getAttribute('href');
    if (id && id.length > 1) {{
      const target = document.querySelector(id);
      if (target) {{
        e.preventDefault();
        const headerOffset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({{ top: targetPosition, behavior: 'smooth' }});
        closeBurger();
      }}
    }}
  }});
}});
"""

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(new_js)

print("Generated js/main.js successfully!")
print(f"Total size: {len(new_js)} chars")
