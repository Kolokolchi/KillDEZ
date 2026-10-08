const { test, expect } = require('@playwright/test');

test('Homepage catalog and FAQ schema match rendered content', async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
  await page.goto('/');
  for (const language of ['ru', 'kz', 'ru']) {
    await page.locator(`header [data-lang="${language}"]`).click();
  }
  const graph = await page.locator('script[type="application/ld+json"]').evaluate(el => JSON.parse(el.textContent)['@graph']);
  const business = graph.find(node => node['@type'] === 'LocalBusiness');
  const offers = business.hasOfferCatalog.itemListElement;
  const cards = await page.locator('#services a.svc, #services .work-overview a[href^="/services/"]').evaluateAll(elements => elements.map(el => ({
    url: el.getAttribute('href'),
    price: el.querySelector('.svc-price')?.textContent.trim() || null
  })));
  expect(offers.map(offer => offer.url)).toEqual(cards.map(card => new URL(card.url, business.url).href));
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].price) {
      expect(offers[i].priceSpecification.minPrice).toBe(Number(cards[i].price.replace(/\D/g, '')));
    } else {
      expect(offers[i].priceSpecification).toBeUndefined();
    }
  }
  const faq = graph.find(node => node['@type'] === 'FAQPage');
  const visibleFaq = await page.locator('#faq .faq-i').evaluateAll(items => items.map(item => ({
    question: item.querySelector('[data-i18n$=".q"]').textContent.trim(),
    answer: item.querySelector('[data-i18n$=".a"]').textContent.trim()
  })));
  expect(faq.mainEntity.map(item => ({question: item.name, answer: item.acceptedAnswer.text}))).toEqual(visibleFaq);
});

test('Almaty geography survives language changes and navigation', async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
  for (const path of ['/', '/objects.html', '/objects/medicine.html', '/objects/dentistry.html', '/services/klopy.html']) {
    await page.goto(path);
    for (const language of ['ru', 'kz', 'ru']) {
      await page.locator(`header [data-lang="${language}"]`).click();
      await expect(page.locator('html')).toHaveAttribute('lang', language === 'kz' ? 'kk' : 'ru');
      await expect(page.locator('footer')).toContainText('Алматы');
      await expect(page.locator('body')).not.toContainText(/Корда[йеяю]|Қордай|облыс|пригород|Алматинск\S* област|Жамбыл/i);
      await expect(page.locator('.mbb a.r')).toHaveAttribute('href', 'tel:+77076203813');
      await expect(page.locator('.mbb a.w[data-whatsapp-contact]')).toHaveAttribute('href', /^whatsapp:\/\/send\?phone=77076203813&text=.+/);
    }
  }
});
