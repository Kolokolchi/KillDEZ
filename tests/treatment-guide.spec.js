const { test, expect } = require('@playwright/test');
const routes = require('../content/routes.json');
const translations = require('../content/guide-translations.json');

test('Public catalog has only retained treatment services and no obsolete offers', async ({ request, page }) => {
  await page.route('https://**/*', route => route.abort());
  for (const route of routes) {
    const response = await request.get('/' + route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    expect(html, route).not.toMatch(/services\/(cleaning|zapakh|kroty|zmei)(?:\.html)?(?:["#]|$)|клининг|выведение кротов|отлов змей/i);
  }
  for (const language of ['ru', 'kz', 'ru']) {
    await page.goto('/');
    await page.locator(`header [data-lang="${language}"]`).click();
    await expect(page.locator('body')).not.toContainText(/клининг|кротов|змей|көртышқан|жылан/i);
    await expect(page.locator('#services a.svc')).toHaveCount(16);
    await expect(page.locator('#services a[href="/instructions"]')).toBeVisible();
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/instructions');
  expect(sitemap).not.toMatch(/\/(cleaning|zapakh|kroty|zmei)(?:\.html)?(?:<|$)/);
});

test('Guide translates all steps, preserves safety conditions and loads both illustrations', async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
  await page.goto('/instructions.html');
  for (const language of ['ru', 'kz', 'ru']) {
    await page.locator(`header [data-lang="${language}"]`).click();
    await expect(page.locator('#before-treatment .guide-steps li')).toHaveCount(6);
    await expect(page.locator('#after-treatment .guide-steps li')).toHaveCount(5);
    for (const [key, text] of Object.entries(translations[language])) {
      const elements = page.locator(`[data-i18n="${key}"]`);
      expect(await elements.count(), key).toBeGreaterThan(0);
      for (const element of await elements.all()) await expect(element).toHaveText(text);
    }
  }
  const pictures = page.locator('main figure img');
  await pictures.evaluateAll(async imgs => { for (const img of imgs) { img.loading = 'eager'; await img.decode(); } });
  expect(await pictures.evaluateAll(imgs => imgs.every(img => img.naturalWidth > 0))).toBe(true);
  await page.locator('a[href="#after-treatment"]').click();
  await expect(page).toHaveURL(/#after-treatment$/);
  await expect(page.locator('main')).toContainText('Отсутствие запаха не доказывает');
  await expect(page.locator('main')).toContainText('Не смешивайте');
  await expect(page.locator('main')).toContainText('Не закрывайте животных герметично');
});
