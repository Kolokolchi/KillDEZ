import re
import json

print("Starting Dis Cleaning theme generation...")

# ================= 1. GENERATE CSS =================
css_content = """/**
 * Dis Cleaning — Профессиональная дезинфекция, дезинсекция и клининг
 * Stylesheet (Dis Cleaning Blue & Green Brand Theme)
 */

/* ========== RESET ========== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: var(--ink);
  background: var(--bg);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  max-width: 100vw;
}
img {
  max-width: 100%;
  display: block;
}
a {
  color: inherit;
  text-decoration: none;
}
button {
  font-family: inherit;
  cursor: pointer;
  border: 0;
  background: none;
  color: inherit;
}
input, select, textarea {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

/* ========== DIS CLEANING BRAND TOKENS ========== */
:root {
  --bg: #ffffff;
  --bg-2: #f8fafc;
  --bg-3: #f0f7ff;
  --bg-alt: #f0fdf4;

  --ink: #0a192f;
  --ink-2: #1e293b;
  --ink-3: #475569;
  --mute: #64748b;
  --line: #e2e8f0;
  --line-2: #cbd5e1;

  /* Blue - House & 'Dis' */
  --blue: #0066cc;
  --blue-d: #004bb5;
  --blue-l: #38bdf8;
  --blue-soft: #eef6ff;
  --blue-tint: #f4f9ff;
  --blue-glow: rgba(0, 102, 204, 0.18);

  /* Green - Leaves & 'Cleaning' */
  --green: #16a34a;
  --green-d: #15803d;
  --green-l: #22c55e;
  --green-soft: #ecfdf5;
  --green-tint: #f0fdf4;
  --green-glow: rgba(22, 163, 74, 0.18);

  /* Gradients */
  --grad-brand: linear-gradient(135deg, #0066cc 0%, #16a34a 100%);
  --grad-brand-h: linear-gradient(135deg, #004bb5 0%, #15803d 100%);
  --grad-text: linear-gradient(135deg, #0066cc 0%, #16a34a 100%);
  --grad-soft: linear-gradient(135deg, #eef6ff 0%, #ecfdf5 100%);

  --black: #0a192f;
  --black-2: #050b14;

  /* Shapes & Radii */
  --r-sm: 10px;
  --r: 16px;
  --r-lg: 24px;
  --r-pill: 9999px;

  --container: 1240px;
  --header-h: 74px;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(10, 25, 47, 0.04);
  --shadow: 0 8px 30px -8px rgba(0, 102, 204, 0.12), 0 4px 12px -4px rgba(22, 163, 74, 0.08);
  --shadow-lg: 0 20px 50px -12px rgba(0, 102, 204, 0.20), 0 8px 24px -6px rgba(22, 163, 74, 0.14);
  --shadow-black: 0 10px 35px -10px rgba(10, 25, 47, 0.25);
}

/* ========== BRAND ACCENTS ========== */
.brand-dis {
  color: var(--blue) !important;
  font-weight: 800;
}
.brand-clean {
  color: var(--green) !important;
  font-weight: 800;
}
.g {
  color: var(--green);
}
.b {
  color: var(--blue);
}
.grad-txt {
  background: var(--grad-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ========== LAYOUT ========== */
.wrap {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 24px;
}
@media (max-width: 480px) {
  .wrap {
    padding: 0 16px;
  }
}
section {
  padding: 76px 0;
  position: relative;
}
@media (max-width: 767px) {
  section {
    padding: 48px 0;
  }
}

.s-head {
  margin-bottom: 44px;
  text-align: center;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 767px) {
  .s-head {
    margin-bottom: 30px;
  }
}
.s-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--blue);
  background: var(--blue-soft);
  padding: 6px 14px;
  border-radius: var(--r-pill);
  margin-bottom: 14px;
  border: 1px solid rgba(0, 102, 204, 0.15);
}
.s-head h2 {
  font-weight: 800;
  font-size: clamp(28px, 4.2vw, 46px);
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--ink);
}
.s-head .lead {
  color: var(--ink-3);
  font-size: clamp(15px, 1.4vw, 17px);
  margin-top: 16px;
  line-height: 1.6;
}

/* ========== HEADER ========== */
header {
  position: sticky;
  top: 0;
  z-index: 900;
  height: var(--header-h);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 102, 204, 0.08);
  box-shadow: 0 4px 20px -8px rgba(0, 102, 204, 0.06);
}
.hrow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  font-size: 23px;
  letter-spacing: -0.02em;
  color: var(--ink);
  transition: opacity 0.15s ease;
}
.brand:hover {
  opacity: 0.92;
}
.brand .mark {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0, 102, 204, 0.12);
  border: 1px solid rgba(0, 102, 204, 0.1);
}
.brand .mark img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.brand .name {
  font-weight: 800;
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
}
@media (max-width: 380px) {
  .brand .name {
    font-size: 19px;
  }
  .brand .mark {
    width: 42px;
    height: 42px;
  }
}

nav.nav {
  display: flex;
  gap: 4px;
  align-items: center;
}
nav.nav a {
  padding: 8px 14px;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--ink-2);
  border-radius: var(--r-sm);
  transition: all 0.2s ease;
}
nav.nav a:hover {
  color: var(--blue);
  background: var(--blue-soft);
}

.h-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lang-switch {
  display: flex;
  border: 1.5px solid var(--line);
  border-radius: var(--r-sm);
  overflow: hidden;
  background: #fff;
}
.lang-switch button {
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-2);
  letter-spacing: 0.05em;
  transition: all 0.15s ease;
}
.lang-switch button.active {
  background: var(--blue);
  color: #fff;
}
.lang-switch button:not(.active):hover {
  background: var(--blue-soft);
  color: var(--blue);
}

.phone-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--blue);
  color: #fff;
  border-radius: var(--r-sm);
  font-size: 14px;
  font-weight: 700;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px var(--blue-glow);
}
.phone-btn:hover {
  background: var(--blue-d);
  box-shadow: 0 6px 20px -4px var(--blue-glow);
  transform: translateY(-1px);
}
.phone-btn svg {
  width: 16px;
  height: 16px;
}

.burger {
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--ink);
  color: #fff;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.burger:hover {
  background: var(--blue);
}
.burger svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 1023px) {
  nav.nav {
    display: none;
  }
  .burger {
    display: inline-flex;
  }
}
@media (max-width: 560px) {
  .phone-btn span {
    display: none;
  }
  .phone-btn {
    padding: 10px 12px;
  }
}

/* ========== HERO (Dis Cleaning Dual Ambient Lighting) ========== */
.hero {
  position: relative;
  min-height: calc(88vh - var(--header-h));
  max-height: 780px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background:
    radial-gradient(ellipse 70% 60% at 25% 25%, rgba(0, 102, 204, 0.45) 0%, transparent 60%),
    radial-gradient(ellipse 65% 55% at 80% 35%, rgba(22, 163, 74, 0.35) 0%, transparent 60%),
    linear-gradient(180deg, #071324 0%, #030811 100%);
}
@media (max-width: 767px) {
  .hero {
    min-height: 520px;
    max-height: none;
  }
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  object-position: center top;
  opacity: 0.85;
}
.hero-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(7, 19, 36, 0.2) 0%, rgba(7, 19, 36, 0.5) 45%, rgba(7, 19, 36, 0.85) 80%, #071324 100%);
}
.hero::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  z-index: 2;
  background: linear-gradient(to bottom, transparent, var(--bg));
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 3;
  width: 100%;
  padding: 80px 0 70px;
}
@media (max-width: 767px) {
  .hero-inner {
    padding: 50px 0 50px;
  }
}

.hero-content {
  max-width: 740px;
  text-align: left;
}
@media (max-width: 767px) {
  .hero-content {
    text-align: center;
    margin: 0 auto;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(12px);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 18px;
}
.hero-badge .sparkle {
  color: var(--blue-l);
  font-size: 14px;
}

.hero h1 {
  font-weight: 900;
  font-size: clamp(34px, 5.8vw, 68px);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 18px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.hero h1 .g {
  color: var(--green-l);
}
.hero h1 .b {
  color: var(--blue-l);
}
.hero .lead {
  font-size: clamp(16px, 1.8vw, 21px);
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.9);
  max-width: 620px;
  margin-bottom: 30px;
  font-weight: 400;
}
@media (max-width: 767px) {
  .hero .lead {
    margin-left: auto;
    margin-right: auto;
  }
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
@media (max-width: 767px) {
  .hero-actions {
    justify-content: center;
  }
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 26px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  transition: all 0.2s ease;
}
.hero-btn.wa {
  background: #25d366;
  color: #ffffff;
  box-shadow: 0 10px 28px -6px rgba(37, 211, 102, 0.4);
}
.hero-btn.wa:hover {
  background: #20ba5a;
  transform: translateY(-2px);
  box-shadow: 0 14px 34px -6px rgba(37, 211, 102, 0.5);
}
.hero-btn.call {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
}
.hero-btn.call:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
}

.hero-trust {
  display: flex;
  gap: 20px;
  margin-top: 36px;
  flex-wrap: wrap;
}
@media (max-width: 767px) {
  .hero-trust {
    justify-content: center;
    gap: 12px;
  }
}
.trust-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 13.5px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.08);
  padding: 6px 14px;
  border-radius: var(--r-pill);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
}
.trust-item svg {
  color: var(--green-l);
  flex-shrink: 0;
}

/* ========== SERVICES CATALOG (19 SERVICES) ========== */
#services {
  background: var(--bg);
}
.svc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 22px;
}
@media (max-width: 640px) {
  .svc-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}
@media (max-width: 420px) {
  .svc-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}

.svc {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: var(--r);
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-sm);
  position: relative;
}
.svc:hover {
  transform: translateY(-5px);
  border-color: var(--blue-l);
  box-shadow: 0 16px 36px -10px var(--blue-glow);
}

.svc-img {
  position: relative;
  width: 100%;
  aspect-ratio: 426 / 284;
  overflow: hidden;
  background: var(--bg-2);
}
.svc-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.svc:hover .svc-img img {
  transform: scale(1.05);
}

.svc-body {
  padding: 16px 18px 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
@media (max-width: 640px) {
  .svc-body {
    padding: 12px 14px 16px;
  }
}

.svc-pre {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--blue);
  margin-bottom: 4px;
}
.svc-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.25;
  margin-bottom: 14px;
  transition: color 0.15s ease;
}
.svc:hover .svc-title {
  color: var(--blue);
}
@media (max-width: 640px) {
  .svc-title {
    font-size: 15px;
    margin-bottom: 10px;
  }
}

.svc-bot {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid var(--line);
}
.svc-act {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: var(--green);
  transition: gap 0.2s ease, color 0.2s ease;
}
.svc:hover .svc-act {
  gap: 8px;
  color: var(--green-d);
}

/* ========== METHODS SECTION ========== */
#methods {
  background: var(--bg-2);
}
.met-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 22px;
}
.met-c {
  background: #ffffff;
  border-radius: var(--r-lg);
  padding: 30px 26px;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.25s ease;
}
.met-c:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--blue);
}
.met-num {
  font-size: 12px;
  font-weight: 800;
  color: var(--blue);
  background: var(--blue-soft);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
}
.met-c h3 {
  font-size: 21px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 12px;
}
.met-c p {
  font-size: 14px;
  color: var(--ink-3);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}
.met-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.met-tag {
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: var(--r-pill);
  background: var(--bg-2);
  color: var(--ink-2);
}
.met-c:nth-child(even) .met-tag {
  background: var(--green-soft);
  color: var(--green-d);
}
.met-c:nth-child(odd) .met-tag {
  background: var(--blue-soft);
  color: var(--blue-d);
}

/* ========== WHY CHOOSE US (8 ADVANTAGES) ========== */
#why {
  background: var(--bg);
}
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
}
.why-c {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 26px 24px;
  transition: all 0.2s ease;
}
.why-c:hover {
  background: #ffffff;
  border-color: var(--blue);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
.why-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--blue-soft);
  color: var(--blue);
  display: grid;
  place-items: center;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}
.why-c:hover .why-icon {
  background: var(--grad-brand);
  color: #ffffff;
}
.why-c:nth-child(even) .why-icon {
  background: var(--green-soft);
  color: var(--green);
}
.why-c:nth-child(even):hover .why-icon {
  background: var(--grad-brand);
  color: #ffffff;
}
.why-icon svg {
  width: 24px;
  height: 24px;
}
.why-c h4 {
  font-size: 17px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 8px;
}
.why-c p {
  font-size: 13.5px;
  color: var(--ink-3);
  line-height: 1.55;
}

/* ========== TEAM SECTION ========== */
#team {
  background: var(--bg-2);
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.team-c {
  background: #ffffff;
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  transition: all 0.25s ease;
}
.team-c:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
  border-color: var(--blue-l);
}
.team-img {
  width: 100%;
  aspect-ratio: 4 / 5;
  background: var(--bg-3);
  overflow: hidden;
}
.team-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.team-body {
  padding: 22px 24px;
}
.team-body h4 {
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 4px;
}
.team-role {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--blue);
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}
.team-exp {
  font-size: 13.5px;
  color: var(--ink-3);
  line-height: 1.55;
}

/* ========== PROCESS (5 STEPS) ========== */
#process {
  background: var(--bg);
}
.proc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 18px;
}
.proc-c {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 24px 20px;
  position: relative;
  transition: all 0.2s ease;
}
.proc-c:hover {
  border-color: var(--green);
  background: #ffffff;
  box-shadow: var(--shadow);
}
.proc-num {
  font-size: 24px;
  font-weight: 900;
  color: var(--green);
  margin-bottom: 10px;
  opacity: 0.85;
}
.proc-c h4 {
  font-size: 16.5px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 8px;
}
.proc-c p {
  font-size: 13px;
  color: var(--ink-3);
  line-height: 1.55;
}

/* ========== CERTIFICATES & LIGHTBOX ========== */
#certificates {
  background: var(--bg-2);
}
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
}
.cert {
  background: #ffffff;
  border-radius: var(--r);
  overflow: hidden;
  border: 1px solid var(--line);
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}
.cert:hover {
  transform: translateY(-4px);
  border-color: var(--blue);
  box-shadow: var(--shadow);
}
.cert-img {
  aspect-ratio: 3 / 4;
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-2);
}
.cert-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(8px);
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.lightbox.open {
  display: flex;
}
.lightbox img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
}

/* ========== B2B SECTION (ЮРИДИЧЕСКИМ ЛИЦАМ) ========== */
#b2b {
  background: var(--bg);
}
.b2b-card {
  background: linear-gradient(135deg, #0a192f 0%, #050b14 100%);
  border-radius: var(--r-lg);
  color: #ffffff;
  padding: 50px 48px;
  box-shadow: var(--shadow-black);
}
@media (max-width: 767px) {
  .b2b-card {
    padding: 32px 24px;
  }
}
.b2b-head {
  max-width: 720px;
  margin-bottom: 32px;
}
.b2b-head h3 {
  font-size: clamp(26px, 3.5vw, 38px);
  font-weight: 800;
  margin-bottom: 14px;
  color: #fff;
}
.b2b-head p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 15.5px;
  line-height: 1.6;
}
.b2b-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 36px;
}
.b2b-li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.9);
}
.b2b-li svg {
  color: var(--green-l);
  flex-shrink: 0;
  margin-top: 2px;
}

/* Dedicated B2B Legal Banner */
.b2b-contract-badge {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--r);
  padding: 22px 26px;
  margin-bottom: 32px;
  backdrop-filter: blur(10px);
}
@media (max-width: 640px) {
  .b2b-contract-badge {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 18px;
  }
}
.b2b-badge-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--blue);
  color: #fff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.b2b-badge-info h4 {
  font-size: 17px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 4px;
}
.b2b-badge-info p {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
}

.b2b-cta-box {
  background: rgba(0, 102, 204, 0.18);
  border: 1px solid rgba(0, 102, 204, 0.35);
  border-radius: var(--r);
  padding: 26px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}
.b2b-cta-text h4 {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 4px;
}
.b2b-cta-text p {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.8);
}
.b2b-cta-btn {
  padding: 13px 26px;
  background: var(--grad-brand);
  color: #fff;
  border-radius: 10px;
  font-weight: 800;
  font-size: 14.5px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 18px rgba(0, 102, 204, 0.4);
}
.b2b-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 102, 204, 0.5);
}

/* ========== FAQ ACCORDION ========== */
#faq {
  background: var(--bg-2);
}
.faq-wrap {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.faq-i {
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: var(--r);
  overflow: hidden;
  transition: all 0.2s ease;
}
.faq-i:hover {
  border-color: var(--blue-l);
}
.faq-i.open {
  border-color: var(--blue);
  box-shadow: 0 6px 20px -6px var(--blue-glow);
}
.faq-q {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 16.5px;
  font-weight: 700;
  color: var(--ink);
  gap: 16px;
  user-select: none;
}
.faq-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--blue-soft);
  color: var(--blue);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: transform 0.25s ease, background 0.2s ease, color 0.2s ease;
}
.faq-i.open .faq-icon {
  transform: rotate(45deg);
  background: var(--blue);
  color: #fff;
}
.faq-a {
  display: none;
  padding: 0 24px 22px;
  font-size: 14.5px;
  color: var(--ink-3);
  line-height: 1.65;
  border-top: 1px solid var(--blue-soft);
  padding-top: 16px;
}
.faq-i.open .faq-a {
  display: block;
}

/* ========== CONTACTS & FINAL CTA ========== */
#contacts {
  background: var(--bg);
}
.fc-card {
  background: linear-gradient(135deg, #071324 0%, #0a192f 100%);
  border-radius: var(--r-lg);
  padding: 56px 44px;
  text-align: center;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-black);
}
.fc-card::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -20%;
  width: 140%;
  height: 200%;
  background:
    radial-gradient(ellipse at 30% 30%, rgba(0, 102, 204, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(22, 163, 74, 0.2) 0%, transparent 50%);
  pointer-events: none;
}
.fc-inner {
  position: relative;
  z-index: 2;
  max-width: 720px;
  margin: 0 auto;
}
.fc-inner h2 {
  font-size: clamp(30px, 4.5vw, 48px);
  font-weight: 900;
  margin-bottom: 16px;
  line-height: 1.1;
}
.fc-inner p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 32px;
}
.fc-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.fc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  text-align: left;
}
.fc-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--r);
  padding: 18px 20px;
  backdrop-filter: blur(10px);
}
.fc-item .t {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--blue-l);
  margin-bottom: 4px;
  letter-spacing: 0.05em;
}
.fc-item .v {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}
.fc-item a.v {
  color: #fff;
  transition: color 0.15s ease;
}
.fc-item a.v:hover {
  color: var(--green-l);
}

/* ========== FOOTER ========== */
footer {
  background: #050b14;
  color: #94a3b8;
  padding: 60px 0 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.foot-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.8fr;
  gap: 36px;
  margin-bottom: 40px;
}
@media (max-width: 900px) {
  .foot-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}
@media (max-width: 580px) {
  .foot-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.foot-brand-wide {
  margin-bottom: 14px;
}
.foot-brand-wide img {
  max-width: 220px;
  height: auto;
}
.foot-tag {
  font-size: 12px;
  font-weight: 700;
  color: var(--green-l);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
}
.foot-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 16px;
}

.foot-col h4 {
  font-size: 14px;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.foot-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.foot-col ul a {
  font-size: 13.5px;
  color: #94a3b8;
  transition: color 0.15s ease;
}
.foot-col ul a:hover {
  color: var(--blue-l);
}

/* Dedicated Legal Requisites Card in Footer */
.foot-req-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--r);
  padding: 18px 20px;
}
.foot-req-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.foot-req-header svg {
  color: var(--green-l);
}
.foot-req-body {
  font-size: 12px;
  line-height: 1.6;
  color: #cbd5e1;
}
.foot-req-body p {
  margin-bottom: 6px;
}
.foot-req-company {
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
}
.foot-req-body span {
  color: #94a3b8;
}
.iban-code {
  color: var(--green-l);
  font-family: monospace;
  font-size: 12.5px;
  letter-spacing: 0.03em;
}

.foot-bot {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  font-size: 12px;
  color: #64748b;
}
.foot-bot a {
  color: #94a3b8;
  transition: color 0.15s ease;
}
.foot-bot a:hover {
  color: var(--blue-l);
}

/* ========== FLOATING WIDGETS & BUTTONS ========== */
.btt {
  position: fixed;
  right: 24px;
  bottom: 28px;
  z-index: 850;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--grad-brand);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 24px var(--blue-glow);
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btt.show {
  opacity: 1;
  visibility: visible;
}
.btt:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px var(--blue-glow);
}
.btt svg {
  width: 22px;
  height: 22px;
}
@media (max-width: 767px) {
  .btt {
    bottom: 84px;
    right: 14px;
    width: 44px;
    height: 44px;
  }
}

/* Mobile Bottom Bar */
.mbb {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 800;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid var(--line);
  padding: 6px 4px calc(6px + env(safe-area-inset-bottom, 0px));
}
.mbb-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}
.mbb-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px 4px;
  border-radius: 8px;
  color: var(--ink-2);
  font-size: 10.5px;
  font-weight: 700;
  transition: all 0.15s ease;
}
.mbb-btn svg {
  width: 20px;
  height: 20px;
}
.mbb-btn:active {
  background: var(--blue-soft);
}
.mbb-btn.r {
  color: var(--blue);
}
.mbb-btn.w {
  color: #25d366;
}
@media (max-width: 767px) {
  .mbb {
    display: block;
  }
  body {
    padding-bottom: 70px;
  }
}

/* Burger Mobile Menu Drawer */
.bmenu {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: none;
}
.bmenu.open {
  display: block;
}
.bmenu-ov {
  position: absolute;
  inset: 0;
  background: rgba(10, 25, 47, 0.6);
  backdrop-filter: blur(4px);
}
.bmenu-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(420px, 92vw);
  background: #fff;
  overflow-y: auto;
  box-shadow: -14px 0 40px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.25s ease;
}
@keyframes slideIn {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.bmenu-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
}
.bmenu-close {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg-2);
  color: var(--ink);
  display: grid;
  place-items: center;
  transition: all 0.2s ease;
}
.bmenu-close:hover {
  background: var(--blue);
  color: #fff;
}
.bmenu-body {
  padding: 20px 24px 32px;
}
.bmenu-grp {
  margin-bottom: 24px;
}
.bmenu-grp h5 {
  font-size: 11px;
  font-weight: 800;
  color: var(--mute);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 10px;
  padding: 0 4px;
}
.bmenu-grp a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  border-radius: 8px;
  font-size: 14.5px;
  color: var(--ink);
  font-weight: 600;
  transition: all 0.15s ease;
}
.bmenu-grp a:hover {
  background: var(--blue-soft);
  color: var(--blue);
}
.bmenu-lang {
  display: flex;
  gap: 6px;
  justify-content: center;
  padding: 14px;
  background: var(--bg-2);
  border-radius: 10px;
  margin-top: 18px;
}
.bmenu-lang button {
  flex: 1;
  padding: 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-2);
  border-radius: 6px;
  letter-spacing: 0.05em;
}
.bmenu-lang button.active {
  background: var(--blue);
  color: #fff;
}

/* ========== MODAL & FORMS ========== */
.modal {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal.open {
  display: flex;
}
.modal-ov {
  position: absolute;
  inset: 0;
  background: rgba(10, 25, 47, 0.65);
  backdrop-filter: blur(6px);
}
.modal-box {
  position: relative;
  background: #ffffff;
  border-radius: var(--r-lg);
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  border: 1px solid var(--line);
}
.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 26px;
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
}
.modal-head h3 {
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.015em;
}
.modal-close {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--bg-2);
  color: var(--ink);
  display: grid;
  place-items: center;
  transition: all 0.15s ease;
}
.modal-close:hover {
  background: var(--blue);
  color: #fff;
}
.modal-body {
  padding: 24px 26px 28px;
}
.frow {
  display: grid;
  gap: 12px;
  margin-bottom: 12px;
}
.frow.two {
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 480px) {
  .frow.two {
    grid-template-columns: 1fr;
  }
}
.ffield label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-2);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.ffield input,
.ffield select,
.ffield textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  background: #fff;
  color: var(--ink);
  font-size: 14px;
  transition: all 0.15s ease;
}
.ffield input:focus,
.ffield select:focus,
.ffield textarea:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 3px var(--blue-glow);
}
.ffield textarea {
  min-height: 80px;
  resize: vertical;
}
.fsubmit {
  width: 100%;
  padding: 15px;
  background: var(--grad-brand);
  color: #fff;
  border-radius: 10px;
  font-weight: 800;
  font-size: 15.5px;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
  box-shadow: 0 6px 20px var(--blue-glow);
}
.fsubmit:hover {
  background: var(--grad-brand-h);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px var(--blue-glow);
}
.fnote {
  text-align: center;
  font-size: 11.5px;
  color: var(--mute);
  margin-top: 12px;
  line-height: 1.5;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%) translateY(140px);
  background: var(--grad-brand);
  color: #fff;
  padding: 14px 24px;
  border-radius: 12px;
  box-shadow: 0 10px 30px var(--blue-glow);
  font-weight: 700;
  font-size: 14px;
  z-index: 1300;
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s ease;
  max-width: 90vw;
  text-align: center;
}
.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
  pointer-events: auto;
}
@media (max-width: 767px) {
  .toast {
    bottom: 140px;
    font-size: 13px;
    padding: 12px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
"""

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)
print("css/style.css updated successfully!")

