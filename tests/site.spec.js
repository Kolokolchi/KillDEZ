const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const pages = require('../content/routes.json');
const { publicPath } = require('../lib/public-routes.cjs');

// Keep checks reproducible and never send test traffic to analytics/integrations.
test.beforeEach(async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
});

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`All public pages fit ${width}px and load their assets`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route('https://fonts.googleapis.com/**', route => route.abort());
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', response => {
      if (response.url().startsWith('http://127.0.0.1') && response.status() >= 400) errors.push(response.url());
    });
    for (const path of pages) {
      await page.goto(publicPath(path), { waitUntil: 'load' });
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toHaveCount(1);
      const overflow = await page.evaluate(() => [...document.querySelectorAll('main *,header *,footer *')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.width && r.right > innerWidth + 1 && !el.closest('.price-summary-table-wrap,.cert-grid') && getComputedStyle(el).position !== 'absolute';
      }).map(el => `${el.tagName}.${el.className}`).slice(0, 10));
      expect(overflow, `${path} at ${width}px`).toEqual([]);
      expect(await page.locator('img').evaluateAll(imgs => imgs.filter(img => img.getAttribute("src") && img.complete && !img.naturalWidth).map(img => img.src)), path).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test('Order selection, validation, encoded WhatsApp handoff and keyboard focus', async ({ page }) => {
  await page.goto('/services/klopy.html');
  await page.evaluate(() => { window.open = (url) => { window.lastHandoff = url; }; });
  const trigger = page.locator('[data-action="order"][data-service]').first();
  await trigger.click();
  await expect(page.locator('#modalOrder')).toBeVisible();
  await expect(page.locator('#orderService')).toHaveValue('Уничтожение постельных клопов');
  await page.locator('#orderForm [name="name"]').fill('Тест & Проверка');
  await page.locator('#orderForm [name="phone"]').fill('7707');
  await page.locator('#orderForm [type="submit"]').click();
  expect(await page.evaluate(() => window.lastHandoff)).toBeUndefined();
  await page.locator('#orderForm [name="phone"]').fill('87071234567');
  await page.locator('#orderForm [name="comment"]').fill('Площадь 50 м² & #1 + 10%');
  await page.locator('#orderForm [type="submit"]').click();
  const url = new URL(await page.evaluate(() => window.lastHandoff));
  expect(url.protocol).toBe('whatsapp:');
  expect(url.searchParams.get('phone')).toBe('77076203813');
  expect(url.searchParams.get('text')).toContain('Площадь 50 м² & #1 + 10%');
  expect(url.searchParams.get('text')).toContain('Тест & Проверка');
  await expect(page.locator('#orderForm [name="phone"]')).toHaveValue('+7 (707) 123-45-67');
  await page.keyboard.press('Escape');
  await expect(page.locator('#modalOrder')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('Slider controls, language, reduced motion and object order context', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-slide].is-active')).toHaveCount(1);
  await page.locator('[data-slide-to="1"]').click();
  await expect(page.locator('#slide-count')).toHaveText('02 / 03');
  await expect(page.locator('[data-slide].is-active a')).toHaveAttribute('href','/objects/');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#slide-count')).toHaveText('03 / 03');
  await page.locator('[data-slide-to="0"]').click();
  await expect(page.locator('#slide-count')).toHaveText('01 / 03');
  await page.locator('[data-slide-play]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-slide-play]')).toHaveAttribute('aria-pressed','true');
  await page.locator('[data-slide-to="1"]').click();
  await expect(page.locator('[data-slide-play]')).toHaveAttribute('aria-pressed','false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('[data-slide-play]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-slide-play]')).toHaveAttribute('aria-pressed','false');
  await page.locator('header [data-lang="kz"]').click();
  await expect(page.locator('[data-slide].is-active h2')).toContainText('Бизнес нысанын');
  await page.locator('header [data-lang="ru"]').click();
  await expect(page.locator('[data-slide].is-active h2')).toContainText('Санитарная обработка');
  await page.goto('/objects.html');
  await expect(page.locator('.object-card')).toHaveCount(11);
  await page.locator('.object-card[href="/objects/medicine"]').click();
  await expect(page.locator('.facility-row')).toHaveCount(4);
  await page.locator('.facility-row[href="/objects/dentistry"]').click();
  await page.locator('.detail-actions button').click();
  await expect(page.locator('#orderService')).toHaveValue('Обработка объекта: Стоматологии');
  await page.evaluate(() => { window.open = url => { window.lastHandoff = url; }; });
  await page.locator('#orderForm [name="name"]').fill('Проверка объекта');
  await page.locator('#orderForm [name="phone"]').fill('87071234567');
  await page.locator('#orderForm [type="submit"]').click();
  expect(new URL(await page.evaluate(() => window.lastHandoff)).searchParams.get('text')).toContain('Стоматологии');
});

test('Visual review artifacts', async ({page}) => {
  await page.route('https://fonts.googleapis.com/**', route => route.abort());
  for (const width of [390,1440]) {
    await page.setViewportSize({width,height:900});
    for (const [path,name] of [['/','home'],['/objects.html','catalog'],['/objects/dentistry.html','object'],['/services/klopy.html','service']]) {
      await page.goto(path);
      await page.locator('.object-card-photo img').evaluateAll(async imgs => {
        imgs.forEach(img => { img.loading = 'eager'; });
        await Promise.all(imgs.map(img => img.decode()));
      });
      await page.screenshot({path:`artifacts/${name}-${width}.png`,fullPage: name !== 'home'});
    }
  }
});

test('Mobile navigation, FAQ and remembered language', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#burgerBtn').click();
  await expect(page.locator('#burgerBtn')).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#burgerMenu a[href="#services"]').first().click();
  await expect(page.locator('#burgerMenu')).toBeHidden();
  await page.locator('.faq-q').first().click();
  await expect(page.locator('.faq-q').first()).toHaveAttribute('aria-expanded', 'true');
  await page.locator('header [data-lang="kz"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'kk');
  await page.goto('/objects.html');
  await expect(page.locator('html')).toHaveAttribute('lang', 'kk');
  await page.locator('header [data-lang="ru"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
});
