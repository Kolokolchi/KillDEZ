const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
});

test('Hero automatically cycles all three frames and crossfades without exposing inactive links', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await expect(page.locator('[data-slide-play]')).toHaveAttribute('aria-pressed', 'true');
  for (const number of ['02', '03', '01']) {
    await page.clock.runFor(7100);
    await expect(page.locator('#slide-count')).toHaveText(`${number} / 03`);
    await expect(page.locator('[data-slide][inert]')).toHaveCount(2);
    await expect(page.locator('[data-slide][aria-hidden="false"]')).toHaveCount(1);
  }
  const duration = await page.locator('.hero-slide').first().evaluate(el => getComputedStyle(el).transitionDuration);
  expect(duration).toContain('1.2s');
  await page.locator('[data-slide-play]').focus();
  await page.keyboard.press('Enter');
  await page.clock.runFor(15000);
  await expect(page.locator('#slide-count')).toHaveText('01 / 03');
  await page.locator('[data-slide-to="1"]').click();
  await expect(page.locator('#slide-count')).toHaveText('02 / 03');
  await page.locator('[data-slide-to="2"]').click();
  await expect(page.locator('#slide-count')).toHaveText('03 / 03');
  await expect(page.locator('[data-slide-to="2"]')).toHaveAttribute('aria-current', 'true');
  await page.locator('[data-slide-to="0"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#slide-count')).toHaveText('01 / 03');
});

test('Touch swipe and crossfade preserve the controls and render both images during transition', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/');
  await expect(page.locator('body')).toHaveAttribute('data-site-ready', 'true');
  await expect(page.locator('.hero-slide.is-active')).toHaveCSS('opacity', '1');
  const hero = page.locator('.visual-hero');
  await hero.dispatchEvent('pointerdown', { pointerType: 'touch', clientX: 310 });
  await hero.dispatchEvent('pointerup', { pointerType: 'touch', clientX: 80 });
  await expect(page.locator('#slide-count')).toHaveText('02 / 03');
  await expect.poll(() => page.locator('.hero-slide').evaluateAll(slides => slides.filter(el => {
    const opacity = Number(getComputedStyle(el).opacity);
    return opacity > 0 && opacity < 1;
  }).length)).toBe(2);
  await expect(page.locator('[data-slide-to]')).toHaveCount(3);
  for (const lang of ['kz', 'ru']) {
    await page.locator(`header [data-lang="${lang}"]`).click();
    expect(await page.locator('[aria-label="Выбор слайда"]').evaluate(el => el.getBoundingClientRect().right)).toBeLessThanOrEqual(390);
  }
});

test('Hero pauses for reading and keyboard focus, respects reduced motion and opens the real enquiry form', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.locator('.visual-hero').hover();
  await page.clock.runFor(15000);
  await expect(page.locator('#slide-count')).toHaveText('01 / 03');
  await page.mouse.move(0, 0);
  await page.clock.runFor(7100);
  await expect(page.locator('#slide-count')).toHaveText('02 / 03');
  await expect(page.locator('.is-active a')).toBeVisible();
  await page.locator('.is-active a').focus();
  await expect(page.locator('.is-active a')).toBeFocused();
  await page.clock.runFor(15000);
  await expect(page.locator('#slide-count')).toHaveText('02 / 03');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-slide-play]')).toHaveAttribute('aria-pressed', 'false');
  await page.clock.runFor(15000);
  await expect(page.locator('#slide-count')).toHaveText('01 / 03');
  await page.locator('.is-active a').click();
  await expect(page.locator('#orderTitle')).toHaveText('Узнать стоимость обработки');
  await page.keyboard.press('Escape');
  await expect(page.locator('.is-active a')).toBeFocused();
  for (const lang of ['kz', 'ru']) {
    await page.locator(`header [data-lang="${lang}"]`).click();
    await expect(page.locator('body')).not.toContainText(/бесплат|тегін/i);
  }
});
