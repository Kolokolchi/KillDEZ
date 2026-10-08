// Stage only public assets. Never copy HTML, source code, backups or customer data.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const target = path.join(root, 'public');
fs.mkdirSync(target, { recursive: true });
for (const name of ['css', 'images', 'favicon.ico', 'favicon.png', 'apple-touch-icon.png', 'robots.txt', 'sitemap.xml']) {
  fs.cpSync(path.join(root, name), path.join(target, name), { recursive: true });
}
console.log('Next.js public assets prepared.');
