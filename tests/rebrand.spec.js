const { test, expect } = require('@playwright/test');
const routes = require('../content/routes.json');
const { publicPath } = require('../lib/public-routes.cjs');
const brand = require('../content/brand-translations.json');

test.beforeEach(async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
});

test('Every public route serves the new brand, local assets and unchanged contact destination', async ({ request }) => {
  for (const route of routes) {
    const response = await request.get(publicPath(route));
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    expect(html, route).toContain('class="rebrand"');
    expect(html.match(/<title>(.*?)<\/title>/s)?.[1], route).toContain('KILL DEZ');
    expect(html, route).toContain('/images/brand/wordmark.webp');
    expect(html, route).toContain('/images/brand/favicon.svg');
    expect(html, route).toContain('tel:+77076203813');
    expect(html, route).not.toMatch(/Dis Cleaning|DIS CLEANING|logo-lockup\.svg/);
  }
  for (const asset of ['wordmark.webp', 'skullbug.webp', 'Oswald-Variable.ttf', 'favicon.svg', 'guide-before.svg', 'guide-after.svg']) {
    expect((await request.get('/images/brand/' + asset)).status(), asset).toBe(200);
  }
});

test('RU and KZ posters fit small screens and keep artwork clear of the carousel controls', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('body')).toHaveAttribute('data-site-ready', 'true');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.fonts.check('20px "Kill Display"'))).toBe(true);
    for (const language of ['ru', 'kz', 'ru']) {
      await page.locator(`header [data-lang="${language}"]`).click();
      for (let index = 0; index < 3; index++) {
        await page.locator(`[data-slide-to="${index}"]`).click();
        const copy = page.locator('.is-active .brand-manifesto');
        const expectedText = brand[language][`brand.hero.${index + 1}`].replace(/<br>/g, '').replace(/<[^>]+>/g, '');
        await expect(copy).toHaveText(expectedText);
        const bounds = await page.evaluate(() => {
          const slide = document.querySelector('.hero-slide.is-active');
          const hero = document.querySelector('.visual-hero').getBoundingClientRect();
          const art = slide.querySelector('.hero-art').getBoundingClientRect();
          const caption = slide.querySelector('.hero-art-caption').getBoundingClientRect();
          const controls = document.querySelector('[aria-label="Выбор слайда"]').getBoundingClientRect();
          return { heroBottom: hero.bottom, artBottom: Math.max(art.bottom, caption.bottom), controlsTop: controls.top, controlsRight: controls.right, pageWidth: document.documentElement.scrollWidth };
        });
        expect(bounds.artBottom, `${language}, ${index + 1}, ${width}`).toBeLessThan(bounds.controlsTop);
        expect(bounds.controlsRight).toBeLessThanOrEqual(width);
        expect(bounds.pageWidth).toBe(width);
        expect(bounds.heroBottom).toBeGreaterThan(bounds.controlsTop);
      }
    }
    await expect(page.locator('[data-slide-play]')).toBeVisible();
  }
});
