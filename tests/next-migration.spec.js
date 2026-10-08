const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const routes = require('../content/routes.json');
const seo = require('../content/seo.json');
const guide = require('../content/guide-translations.json').ru;
const { publicPath } = require('../lib/public-routes.cjs');

test('Every accepted URL is server-rendered by Next with its original SEO and content', async ({ request, page }) => {
  for (const route of routes) {
    const response = await request.get(publicPath(route));
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    const original = route === 'instructions.html' ? null : fs.readFileSync(route, 'utf8');
    expect(html, route).toContain('/_next/static/');
    expect(html, route).toMatch(/<main id="main-content"(?:>| )/);
    expect(html.match(/<title>(.*?)<\/title>/s)?.[1], route).toBe(seo[route].metadata.title);
    const schemas = text => [...text.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
    expect(schemas(html), route).toEqual(seo[route].schema);
    if (original) {
    const headings = await page.evaluate(({ html, original }) => [html, original].map(source => {
      const document = new DOMParser().parseFromString(source, 'text/html');
      return [...document.querySelectorAll('main h1, main h2, main h3')].map(element => element.textContent);
    }), { html, original });
    // Owner-requested homepage copy refresh; all other headings retain the accepted baseline.
    const homeCopy = {
      "Чистое пространство. Спокойствие каждый день.": "Дезинфекция и борьба с вредителями",
      "Вы заботитесь о гостях. Мы — о пространстве.": "Санитарная обработка для вашего бизнеса",
      "Порядок в доме. Комфорт за его пределами.": "Защита дома начинается с очага проблемы",
      "Чистота в деталях ↗": "До и после обработки ↗",
      "Выезд в день заявки": "Время выезда по согласованию",
      "Сертификаты СЭС": "Метод под вашу задачу",
      "Гарантия до 6 мес.": "Понятный объём работ",
      "Безопасно для семьи": "Подготовка без догадок",
      "Опытные мастера": "Внимание к очагам",
      "Конфиденциально": "Доступ к нужным зонам",
      "Без предоплаты": "Цена до начала работ",
      "Консультация": "Оценка и стоимость",
      "Гарантия": "После обработки",
      "Избавим от любых вредителей": "Узнайте стоимость обработки"
};
    const expected = headings[1].map(text => route === 'index.html' ? (homeCopy[text] || text) : text);
    expect(headings[0], route).toEqual(expected);
    } else {
      expect(html).toContain(guide['guide.title']);
      expect(html).toContain('id="before-treatment"');
      expect(html).toContain('id="after-treatment"');
    }
    expect(html).not.toMatch(/<script[^>]*src="(?:\.\.\/)?js\/(?:main|interactions)\.js"/);
  }
  expect((await request.get('/')).status()).toBe(200);
  for (const route of ['/does-not-exist.html', '/services/missing.html', '/price.html', '/services/cleaning.html', '/services/zapakh.html', '/services/kroty.html', '/services/zmei.html', '/.git/config', '/leads.json', '/server.js', '/package.json']) {
    expect((await request.get(route)).status(), route).toBe(404);
  }
});

test('Next API keeps the local order contract with isolated test storage', async ({ request }) => {
  expect((await request.fetch('/api/order', { method: 'OPTIONS' })).status()).toBe(204);
  const invalid = await request.post('/api/order', { data: '{', headers: { 'Content-Type': 'application/json' } });
  expect(invalid.status()).toBe(400);
  const responses = await Promise.all([1, 2, 3].map(number => request.post('/api/order', { data: { name: `Migration fixture ${number}`, phone: '+7 (000) 000-00-00', comment: '& # + 10%' } })));
  const ids = [];
  for (const response of responses) {
    expect(response.status()).toBe(200);
    expect(response.headers()['access-control-allow-origin']).toBe('*');
    const body = await response.json();
    expect(body.success).toBe(true);
    ids.push(body.lead_id);
  }
  expect(new Set(ids).size).toBe(3);
  const response = await request.get('/api/leads');
  expect(response.headers()['cache-control']).toBe('no-store');
  const leads = await response.json();
  expect(leads.filter(lead => ids.includes(lead.id))).toHaveLength(3);
  for (const lead of leads) {
    expect(lead.status).toBe('new');
    expect(lead.received_at).toBeTruthy();
  }
});

test('React admin preserves local search, filters, status, CSV and deletion', async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
  await page.route('**/api/leads', route => route.fulfill({ json: [] }));
  await page.addInitScript(() => localStorage.setItem('sanitex_leads', JSON.stringify([
    { id: 'one', name: 'Тест <img src=x>', phone: '+7 (707) 123-45-67', service: 'Клининг', city: 'Алматы', status: 'new' },
    { id: 'two', name: 'Другой клиент', service: 'Обработка', status: 'done' },
  ])));
  await page.goto('/admin.html');
  await expect(page.locator('#statTotal')).toHaveText('2');
  await expect(page.locator('#leadsTableBody tr')).toHaveCount(2);
  await expect(page.locator('#leadsTableBody img')).toHaveCount(0);
  await page.locator('#searchInput').fill('Клининг');
  await expect(page.locator('#leadsTableBody tr')).toHaveCount(1);
  await page.locator('.status-select').selectOption('in_progress');
  await expect(page.locator('#statProgress')).toHaveText('1');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('sanitex_leads'))[0].status)).toBe('in_progress');
  await page.locator('#searchInput').fill('');
  await page.locator('[data-filter="done"]').click();
  await expect(page.locator('#leadsTableBody')).toContainText('Другой клиент');
  await expect(page.locator('#leadsTableBody tr')).toHaveCount(1);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Экспорт CSV' }).click();
  const download = await downloadPromise;
  const csv = fs.readFileSync(await download.path(), 'utf8');
  expect(csv).toContain('Тест <img src=x>');
  expect(csv).toContain('Другой клиент');
  page.on('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Удалить', exact: true }).click();
  await expect(page.locator('#statTotal')).toHaveText('1');
  await page.getByRole('button', { name: 'Очистить базу' }).click();
  await expect(page.locator('#statTotal')).toHaveText('0');
  await expect(page.locator('#emptyState')).toBeVisible();
});

test('Hydration, remembered language and back navigation do not duplicate handlers', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && /hydration|react|mismatch/i.test(message.text())) errors.push(message.text()); });
  await page.route('https://**/*', route => route.abort());
  await page.goto('/');
  await expect(page.locator('body')).toHaveAttribute('data-site-ready', 'true');
  await page.locator('[data-slide-to="1"]').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#slide-count')).toHaveText('02 / 03');
  const russianSlides = await page.locator('[data-slide] h2').allTextContents();
  await page.locator('header [data-lang="kz"]').click();
  await page.locator('header a[href="/objects/"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'kk');
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('lang', 'kk');
  await page.locator('header [data-lang="ru"]').click();
  expect(await page.locator('[data-slide] h2').allTextContents()).toEqual(russianSlides);
  expect(errors).toEqual([]);
});
