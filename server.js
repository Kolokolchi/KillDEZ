const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DIRECTORY = __dirname;
const LEADS_FILE = path.join(DIRECTORY, 'leads.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API endpoints
  if (req.url === '/api/order' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const lead = JSON.parse(body);
        lead.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        lead.received_at = new Date().toISOString();
        lead.status = 'new';

        let leads = [];
        if (fs.existsSync(LEADS_FILE)) {
          try {
            leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
          } catch (e) {
            leads = [];
          }
        }
        leads.unshift(lead);
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, lead_id: lead.id }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (req.url === '/api/leads' && req.method === 'GET') {
    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
      try {
        leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
      } catch (e) {
        leads = [];
      }
    }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(leads));
    return;
  }

  // Static file serving
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(DIRECTORY, decodeURIComponent(reqPath));

  // Security check to avoid path traversal
  if (!filePath.startsWith(DIRECTORY)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Node Server running at http://localhost:${PORT}/`);
  console.log(`📁 Serving directory: ${DIRECTORY}`);
});
