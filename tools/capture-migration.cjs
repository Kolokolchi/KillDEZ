// Capture the live site before/after migration under identical browser conditions.
const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const [base = 'http://127.0.0.1:8081', phase = 'before'] = process.argv.slice(2);
  const dir = path.join('artifacts', 'next-migration', phase);
  fs.mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  await context.route('https://**/*', route => route.abort());
  await context.route('**/api/leads', route => route.fulfill({ json: [] }));
  const page = await context.newPage();
  const pages = ['index.html', 'objects.html', ...['services', 'objects'].flatMap(dir => fs.readdirSync(dir).filter(f => f.endsWith('.html')).map(f => `${dir}/${f}`))];
  const snapshots = {};
  for (const route of pages) {
    await page.goto(`${base}/${route}`);
    await page.waitForFunction(() => document.querySelector('header [data-lang="ru"][aria-pressed="true"]'));
    snapshots[route] = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      schema: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent)),
      text: document.querySelector('main').textContent.replace(/\s+/g, ' ').trim(),
      links: [...document.querySelectorAll('a')].map(el => el.getAttribute('href')),
      images: [...document.querySelectorAll('img')].map(el => ({ src: el.getAttribute('src'), alt: el.alt })),
    }));
  }
  fs.writeFileSync(path.join(dir, 'pages.json'), JSON.stringify(snapshots, null, 2));
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, name] of [['/', 'home'], ['/objects.html', 'catalog'], ['/objects/medicine.html', 'industry'], ['/objects/dentistry.html', 'object'], ['/services/klopy.html', 'service'], ['/admin.html', 'admin']]) {
      await page.goto(base + route);
      if (name !== 'admin') await page.waitForFunction(() => document.querySelector('header [data-lang="ru"][aria-pressed="true"]'));
      else await page.waitForFunction(() => getComputedStyle(document.getElementById('emptyState')).display !== 'none');
      await page.locator('img').evaluateAll(async imgs => {
        imgs.forEach(img => { img.loading = 'eager'; });
        await Promise.all(imgs.map(img => img.decode().catch(() => {})));
      });
      await page.screenshot({ path: path.join(dir, `${name}-${width}.png`), fullPage: true, animations: 'disabled' });
    }
  }
  await browser.close();
  console.log(`Captured ${pages.length} page snapshots and 12 screenshots in ${dir}`);
})().catch(error => { console.error(error); process.exitCode = 1; });
