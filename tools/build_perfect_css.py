import re

with open('backup/style_0.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update TOKENS
old_tokens = re.search(r'/\* ========== TOKENS ========== \*/[\s\S]*?:root\{[\s\S]*?\}', css)
assert old_tokens, "Tokens not found!"

new_tokens = """/* ========== TOKENS (Dis Cleaning Blue & Green Identity) ========== */
:root{
  --bg:#ffffff;
  --bg-2:#f8fafc;
  --bg-3:#f0f7ff;
  --ink:#0a192f;
  --ink-2:#1e293b;
  --ink-3:#475569;
  --mute:#64748b;
  --line:#e2e8f0;
  --line-2:#cbd5e1;

  /* Dis Cleaning Royal Azure Blue */
  --blue:#0066cc;
  --blue-d:#004bb5;
  --blue-l:#38bdf8;
  --blue-soft:#eef6ff;
  --blue-tint:#f4f9ff;
  --blue-glow:rgba(0,102,204,.18);

  /* Dis Cleaning Fresh Eco Green */
  --green:#16a34a;
  --green-d:#15803d;
  --green-l:#22c55e;
  --green-soft:#ecfdf5;
  --green-tint:#f0fdf4;
  --green-glow:rgba(22,163,74,.18);

  /* Gradients */
  --grad-brand:linear-gradient(135deg,#0066cc 0%,#16a34a 100%);
  --grad-brand-h:linear-gradient(135deg,#004bb5 0%,#15803d 100%);

  --black:#0a192f;
  --black-2:#050b14;
  --r:16px;
  --r-sm:10px;
  --r-lg:24px;
  --container:1240px;
  --header-h:74px;
  --shadow-sm:0 2px 4px rgba(10,25,47,.04);
  --shadow:0 8px 30px -8px rgba(0,102,204,.12),0 4px 12px -4px rgba(22,163,74,.08);
  --shadow-lg:0 20px 50px -12px rgba(0,102,204,.20),0 8px 24px -6px rgba(22,163,74,.14);
  --shadow-black:0 10px 35px -10px rgba(10,25,47,.25);
}"""

css = css.replace(old_tokens.group(0), new_tokens)

# 2. Add Brand typography helpers
brand_helpers = """
/* ========== BRAND TYPOGRAPHY ========== */
.brand-dis{color:var(--blue) !important;font-weight:800}
.brand-clean{color:var(--green) !important;font-weight:800}
.b{color:var(--blue)}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:9999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(12px);color:#fff;font-size:13px;font-weight:600;margin-bottom:18px}
.hero-badge .sparkle{color:var(--blue-l);font-size:14px}
"""
css = brand_helpers + css

# 3. Update Hero background gradient to blue & green ambient light
old_hero_bg = re.search(r'background:\s*radial-gradient\(ellipse 80% 60% at 50% 30%[\s\S]*?linear-gradient\(180deg, #0a0a0a 0%, #050505 100%\);', css)
if old_hero_bg:
    new_hero_bg = """background:
    radial-gradient(ellipse 70% 60% at 25% 25%, rgba(0,102,204,.45) 0%, transparent 60%),
    radial-gradient(ellipse 65% 55% at 80% 35%, rgba(22,163,74,.35) 0%, transparent 60%),
    linear-gradient(180deg, #071324 0%, #030811 100%);"""
    css = css.replace(old_hero_bg.group(0), new_hero_bg)

# 4. Update Header phone button to Royal Blue
css = css.replace('.phone-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;\n  background:var(--green);', '.phone-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;\n  background:var(--blue);')
css = css.replace('.phone-btn:hover{background:var(--green-d);box-shadow:0 6px 16px -4px var(--green-glow)}', '.phone-btn:hover{background:var(--blue-d);box-shadow:0 6px 20px -4px var(--blue-glow)}')

# 5. Add B2B Contract Badge and Footer Requisites Card styles
extra_components = """
/* ========== B2B CONTRACT BADGE ========== */
.b2b-contract-badge{display:flex;align-items:center;gap:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:var(--r);padding:22px 26px;margin-bottom:24px;backdrop-filter:blur(10px)}
@media(max-width:640px){.b2b-contract-badge{flex-direction:column;align-items:flex-start;gap:12px;padding:18px}}
.b2b-badge-icon{width:52px;height:52px;border-radius:12px;background:var(--blue);color:#fff;display:grid;place-items:center;flex-shrink:0}
.b2b-badge-info h4{font-size:17px;font-weight:800;color:#fff;margin-bottom:4px}
.b2b-badge-info p{font-size:13.5px;color:rgba(255,255,255,.85);line-height:1.5}

/* ========== FOOTER REQUISITES CARD ========== */
.foot-req-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:var(--r);padding:18px 20px;margin-top:14px}
.foot-req-header{display:flex;align-items:center;gap:8px;color:#ffffff;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.1)}
.foot-req-header svg{color:var(--green-l)}
.foot-req-body{font-size:12px;line-height:1.6;color:#cbd5e1}
.foot-req-body p{margin-bottom:6px}
.foot-req-company{color:#ffffff;font-size:13px;font-weight:800}
.foot-req-body span{color:#94a3b8}
.iban-code{color:var(--green-l);font-family:monospace;font-size:12.5px;letter-spacing:.03em}

/* ========== MODAL & INPUT FOCUS ========== */
.ffield input:focus,.ffield select:focus,.ffield textarea:focus{border-color:var(--blue) !important;box-shadow:0 0 0 3px var(--blue-glow)}
.fsubmit{background:var(--grad-brand) !important;box-shadow:0 6px 20px var(--blue-glow)}
.fsubmit:hover{background:var(--grad-brand-h) !important}
.btt{background:var(--grad-brand) !important}
"""
css += extra_components

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("css/style.css perfectly rebuilt based on original layout structure!")
