const { test, expect } = require('@playwright/test');
const routes = require('../content/routes.json');
const { publicPath } = require('../lib/public-routes.cjs');

// Prevent native calls and app launches while checking the actual clicked URL.
const captureNativeLinks = () => {
  window.nativeLinks = [];
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (link && /^(tel:|whatsapp:)/.test(link.href)) {
      window.nativeLinks.push(link.href);
      event.preventDefault();
    }
  }, true);
};

test.beforeEach(async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
  await page.addInitScript(captureNativeLinks);
});

test('Every public page separates calls and native WhatsApp chats, including RU/KZ', async ({ page }) => {
  await page.goto('/');
  for (const lang of ['ru', 'kz']) {
    await page.locator(`header [data-lang="${lang}"]`).click();
    for (const route of routes) {
      await page.goto(publicPath(route));
      await page.waitForFunction(() => document.body.dataset.siteReady === 'true');
      const phones = await page.locator('a[href^="tel:"]').evaluateAll(els => els.map(el => el.getAttribute('href')));
      expect(phones.length, route).toBeGreaterThanOrEqual(5);
      expect(phones.every(href => href === 'tel:+77076203813')).toBe(true);
      const links = await page.locator('[data-whatsapp-contact]').evaluateAll(els => els.map(el => ({ href: el.href, target: el.target, rel: el.rel })));
      expect(links.length, route).toBeGreaterThanOrEqual(5);
      for (const link of links) {
        const url = new URL(link.href);
        expect(url.protocol).toBe('whatsapp:');
        expect(url.hostname).toBe('send');
        expect(url.searchParams.get('phone')).toBe('77076203813');
        expect(url.searchParams.get('text')).toContain(lang === 'ru' ? 'Здравствуйте! Хочу заказать обработку в Алматы.' : 'Сәлеметсіз бе! Алматыда өңдеу қызметіне тапсырыс бергім келеді.');
        expect(url.searchParams.get('text')).toContain(lang === 'ru' ? 'Тип объекта: ...\nПлощадь: ... м²' : 'Нысан түрі: ...\nАуданы: ... м²');
        expect(link.target).toBe('');
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#contacts .fc-card').filter({ hasText: 'Чатқа жазу' }).focus();
  await page.keyboard.press('Enter');
  const requested = await page.evaluate(() => window.nativeLinks);
  expect(requested).toHaveLength(1);
  expect(new URL(requested[0]).searchParams.get('text')).toContain('Сәлеметсіз бе!');
  await expect(page.locator('.modal.open')).toHaveCount(0);
  await page.locator('.mbb-btn.r').click();
  expect(await page.evaluate(() => window.nativeLinks.at(-1))).toBe('tel:+77076203813');
  await expect(page.locator('#contacts [data-whatsapp-contact]')).toHaveCount(1);
  await expect(page.locator('#contacts a[href^="tel:"]')).toHaveCount(1);
  await expect(page.locator('#contacts .fc-row a')).toHaveCount(0);
});

test('Android and iOS keep the app link and template instead of desktop Web', async ({ browser, baseURL }) => {
  for (const userAgent of [
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  ]) {
    const context = await browser.newContext({ userAgent, isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });
    await context.addInitScript(captureNativeLinks);
    await context.route('https://**/*', route => route.abort());
    const page = await context.newPage();
    await page.goto(baseURL);
    await page.waitForFunction(() => document.body.dataset.siteReady === 'true');
    const link = page.locator('#contacts .fc-card').filter({ hasText: 'Написать в чат' });
    const url = new URL(await link.getAttribute('href'));
    expect(url.protocol).toBe('whatsapp:');
    expect(url.searchParams.get('phone')).toBe('77076203813');
    expect(url.searchParams.get('text')).toContain('Здравствуйте!');
    await link.click();
    const handoff = await page.evaluate(() => window.nativeLinks.at(-1));
    expect(new URL(handoff).searchParams.get('text')).toBe(url.searchParams.get('text'));
    expect(context.pages()).toHaveLength(1);
    await context.close();
  }
});

test('WhatsApp links include a usable template before JavaScript runs', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route('https://**/*', route => route.abort());
  const page = await context.newPage();
  for (const path of ['/', '/services/pauki', '/objects/dentistry', '/instructions']) {
    await page.goto(`${baseURL}${path}`);
    await expect(page.locator('.phone-btn')).toHaveAttribute('href', 'tel:+77076203813');
    const href = await page.locator('[data-whatsapp-contact]').first().getAttribute('href');
    expect(new URL(href).protocol).toBe('whatsapp:');
    expect(new URL(href).searchParams.get('text')).toContain('Здравствуйте!');
  }
  await context.close();
});

test('Persistent contact control supports keyboard, Escape, outside click and mobile spacing', async ({ page }) => {
  for (const width of [320,390,1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.waitForFunction(() => document.body.dataset.siteReady === 'true');
    const summary = page.locator('#quickContact summary');
    await expect(summary).toBeVisible();
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(summary).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#quickContactPanel')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.locator('.quick-contact-call')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('.quick-contact-chat')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(summary).toBeFocused();
    await expect(summary).toHaveAttribute('aria-expanded', 'false');
    await summary.click();
    await page.locator('header .brand').click();
    await expect(page.locator('#quickContact')).not.toHaveAttribute('open', '');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await summary.click();
    const layout = await page.evaluate(() => {
      const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
      return { icon: rect('#quickContact summary'), panel: rect('#quickContactPanel'), top: rect('#bttBtn'), mobile: rect('.mbb') };
    });
    expect(layout.panel.left).toBeGreaterThanOrEqual(0);
    expect(layout.panel.right).toBeLessThanOrEqual(width);
    expect(layout.icon.bottom).toBeLessThan(layout.top.top);
    if (width < 768) expect(layout.icon.bottom).toBeLessThan(layout.mobile.top);
    await page.locator('.quick-contact-call').click();
    expect(await page.evaluate(() => window.nativeLinks.at(-1))).toBe('tel:+77076203813');
    await expect(summary).toHaveAttribute('aria-expanded', 'false');
  }
});

test('Contact control remains compact and functional with cached theme CSS', async ({ page }) => {
  const fs = require('node:fs');
  const staleTheme = fs.readFileSync('css/theme.css', 'utf8').replace(/@import url\('\.\/quick-contact\.css'\);/, '');
  await page.route('**/css/theme.css', route => route.fulfill({ contentType: 'text/css', body: staleTheme }));
  // The component must not depend on a second public CSS request from an old theme.
  await page.route('**/css/quick-contact.css', route => route.abort());
  for (const width of [320,390,1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/objects/', '/objects/medicine', '/objects/dentistry', '/services/klopy']) {
      await page.goto(path);
      await page.waitForFunction(() => document.body.dataset.siteReady === 'true');
      const summary = page.locator('#quickContact summary');
      const bounds = await summary.boundingBox();
      expect(bounds.width, path).toBe(54);
      expect(bounds.height, path).toBe(54);
      expect(bounds.x + bounds.width, path).toBeLessThanOrEqual(width);
      expect(await page.locator('#quickContact').evaluate(el => getComputedStyle(el).position)).toBe('fixed');
      await summary.click();
      await expect(page.locator('#quickContactPanel')).toBeVisible();
      await page.locator('.quick-contact-chat').click();
      expect(new URL(await page.evaluate(() => window.nativeLinks.at(-1))).searchParams.get('text')).toContain('Здравствуйте!');
      await expect(summary).toHaveAttribute('aria-expanded', 'false');
    }
  }
});

test('Legal entities use a separate form, validation, template and saved draft', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { window.handoffs = []; window.open = url => window.handoffs.push(url); });
  await page.locator('#contacts [data-action="order"]').click();
  await page.locator('#orderForm [name="name"]').fill('Личная заявка');
  await page.keyboard.press('Escape');
  const trigger = page.locator('#b2b button');
  await trigger.click();
  const form = page.locator('#businessForm');
  await expect(page.locator('#modalBusiness')).toBeVisible();
  await expect(page.locator('#modalOrder')).toBeHidden();
  await expect(form.locator('[name="organization"]')).toBeFocused();
  await form.locator('[type="submit"]').click();
  expect(await page.evaluate(() => window.handoffs)).toEqual([]);
  await form.locator('[name="organization"]').fill('ТОО «Тест & #1 + 10%»');
  await form.locator('[name="name"]').fill('Контактное лицо');
  await form.locator('[name="phone"]').fill('8707');
  await form.locator('[type="submit"]').click();
  expect(await page.evaluate(() => window.handoffs)).toEqual([]);
  await form.locator('[name="phone"]').fill('87071234567');
  await form.locator('[name="object"]').fill('Кафе');
  await form.locator('[name="area"]').fill('150');
  await form.locator('[name="address"]').fill('Алматы, адрес теста');
  await form.locator('[name="service"]').fill('Дезинсекция');
  await form.locator('[name="frequency"]').selectOption('regular');
  await form.locator('[name="comment"]').fill('После 20:00\nЗона & #2');
  await form.locator('[type="submit"]').click();
  let handoffs = await page.evaluate(() => window.handoffs);
  expect(handoffs).toHaveLength(1);
  let text = new URL(handoffs[0]).searchParams.get('text');
  expect(new URL(handoffs[0]).protocol).toBe('whatsapp:');
  expect(new URL(handoffs[0]).searchParams.get('phone')).toBe('77076203813');
  expect(text).toContain('Заявка юридического лица');
  expect(text).toContain('Организация: ТОО «Тест & #1 + 10%»');
  expect(text).toContain('Контактное лицо: Контактное лицо');
  expect(text).toContain('Регулярное обслуживание');
  expect(text).toContain('После 20:00\nЗона & #2');
  const leads = await page.evaluate(() => JSON.parse(localStorage.getItem('sanitex_leads')));
  expect(leads[0]).toMatchObject({ requestType: 'business', organization: 'ТОО «Тест & #1 + 10%»', object: 'Кафе', area: '150' });
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await page.locator('header [data-lang="kz"]').click();
  await trigger.click();
  await expect(page.locator('#businessTitle')).toHaveText('Заңды тұлғаға арналған өтінім');
  await expect(form.locator('[name="frequency"]')).toHaveValue('regular');
  await expect(form.locator('[name="organization"]')).toHaveValue('ТОО «Тест & #1 + 10%»');
  await form.locator('[type="submit"]').click();
  handoffs = await page.evaluate(() => window.handoffs);
  expect(handoffs).toHaveLength(2);
  text = new URL(handoffs[1]).searchParams.get('text');
  expect(text).toContain('заңды тұлғаның өтінімі');
  expect(text).toContain('Тұрақты қызмет көрсету');
  await page.keyboard.press('Escape');
  await page.locator('#contacts [data-action="order"]').click();
  await expect(page.locator('#modalBusiness')).toBeHidden();
  await expect(page.locator('#orderForm [name="name"]')).toHaveValue('Личная заявка');
});
