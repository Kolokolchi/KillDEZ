import re

# Read the original style_0.css which had complete layout rules
with open('backup/style_0.css', 'r', encoding='utf-8') as f:
    base_css = f.read()

# Replace color palette with Dis Cleaning theme
base_css = base_css.replace(
    '--green:#00a651;\n  --green-d:#007a3d;\n  --green-l:#33c574;\n  --green-soft:#e6f7ed;\n  --green-tint:#f0faf4;\n  --green-glow:rgba(0,166,81,.12);',
    '''--green:#16a34a;
  --green-d:#15803d;
  --green-l:#22c55e;
  --green-soft:#ecfdf5;
  --green-tint:#f0fdf4;
  --green-glow:rgba(22,163,74,.18);
  --blue:#0066cc;
  --blue-d:#004bb5;
  --blue-l:#38bdf8;
  --blue-soft:#eef6ff;
  --blue-tint:#f4f9ff;
  --blue-glow:rgba(0,102,204,.18);
  --grad-brand:linear-gradient(135deg,#0066cc 0%,#16a34a 100%);
  --grad-brand-h:linear-gradient(135deg,#004bb5 0%,#15803d 100%);'''
)

# Update hero background
base_css = re.sub(
    r'background:\s*radial-gradient\(ellipse 80% 60% at 50% 30%[\s\S]*?linear-gradient\(180deg, #0a0a0a 0%, #050505 100%\);',
    '''background:
    radial-gradient(ellipse 70% 60% at 25% 25%, rgba(0,102,204,.45) 0%, transparent 60%),
    radial-gradient(ellipse 65% 55% at 80% 35%, rgba(22,163,74,.35) 0%, transparent 60%),
    linear-gradient(180deg, #071324 0%, #030811 100%);''',
    base_css
)

# Header phone button to royal blue
base_css = base_css.replace('background:var(--green);color:#fff;border-radius:8px;\n  font-size:14px;font-weight:700;', 'background:var(--blue);color:#fff;border-radius:8px;\n  font-size:14px;font-weight:700;')
base_css = base_css.replace('.phone-btn:hover{background:var(--green-d);box-shadow:0 6px 16px -4px var(--green-glow)}', '.phone-btn:hover{background:var(--blue-d);box-shadow:0 6px 20px -4px var(--blue-glow)}')

# Update brand typography & elements
brand_extra = """
/* Dis Cleaning Brand Tokens & Additions */
.brand-dis{color:var(--blue) !important;font-weight:800}
.brand-clean{color:var(--green) !important;font-weight:800}
.b{color:var(--blue)}

/* Service Card rules matching other agent markup */
.svc-body{padding:14px 16px 18px;display:flex;flex-direction:column;flex-grow:1}
.svc-pre{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--blue);margin-bottom:2px}
.svc-title{font-size:17px;font-weight:800;color:var(--ink);line-height:1.25;margin-bottom:12px}
.svc:hover .svc-title{color:var(--blue)}
.svc-bot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid var(--line)}
.svc-price{font-size:14px;font-weight:800;color:var(--green)}
.svc-act{display:inline-flex;align-items:center;gap:4px;font-size:12.5px;font-weight:700;color:var(--blue);transition:gap .2s ease}
.svc:hover .svc-act{gap:7px;color:var(--blue-d)}

/* B2B Contract Badge */
.b2b-contract-badge{display:flex;align-items:center;gap:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:var(--r);padding:22px 26px;margin-bottom:24px;backdrop-filter:blur(10px)}
@media(max-width:640px){.b2b-contract-badge{flex-direction:column;align-items:flex-start;gap:12px;padding:18px}}
.b2b-badge-icon{width:52px;height:52px;border-radius:12px;background:var(--blue);color:#fff;display:grid;place-items:center;flex-shrink:0}
.b2b-badge-info h4{font-size:17px;font-weight:800;color:#fff;margin-bottom:4px}
.b2b-badge-info p{font-size:13.5px;color:rgba(255,255,255,.85);line-height:1.5}

/* Footer Requisites Card */
.foot-brand-col{display:flex;flex-direction:column}
.foot-req-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:var(--r);padding:18px 20px;margin-top:14px}
.foot-req-header{display:flex;align-items:center;gap:8px;color:#ffffff;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.1)}
.foot-req-header svg{color:var(--green-l)}
.foot-req-body{font-size:12px;line-height:1.6;color:#cbd5e1}
.foot-req-body p{margin-bottom:6px}
.foot-req-company{color:#ffffff;font-size:13px;font-weight:800}
.foot-req-body span{color:#94a3b8}
.iban-code{color:var(--green-l);font-family:monospace;font-size:12.5px;letter-spacing:.03em}

/* Modal focus and CTA enhancements */
.ffield input:focus,.ffield select:focus,.ffield textarea:focus{border-color:var(--blue) !important;box-shadow:0 0 0 3px var(--blue-glow)}
.fsubmit{background:var(--grad-brand) !important;box-shadow:0 6px 20px var(--blue-glow)}
.fsubmit:hover{background:var(--grad-brand-h) !important}
.btt{background:var(--grad-brand) !important}
.tstrip-item .ic{background:var(--blue-soft) !important;color:var(--blue) !important}
.why:nth-child(odd) .why-num{background:var(--blue-soft) !important;color:var(--blue) !important}
.why:nth-child(even) .why-num{background:var(--green-soft) !important;color:var(--green) !important}
"""

final_css = base_css + brand_extra

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(final_css)

print("Unified style.css written successfully!")
