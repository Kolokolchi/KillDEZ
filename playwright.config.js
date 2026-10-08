const { defineConfig } = require('@playwright/test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const port = process.env.TEST_PORT || '8082';
const baseURL = `http://127.0.0.1:${port}`;
const testData = fs.mkdtempSync(path.join(os.tmpdir(), 'dis-cleaning-next-tests-'));
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: { baseURL, headless: true },
  webServer: {
    command: `node node_modules/next/dist/bin/next start --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    env: { LEADS_FILE: path.join(testData, 'leads.json') },
  },
});
