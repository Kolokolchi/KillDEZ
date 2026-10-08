const routes = require('../content/routes.json');

// Content keeps its original keys; public addresses omit file extensions.
const publicPath = route => route === 'index.html' ? '/' : route === 'objects.html' ? '/objects/' : '/' + route.replace(/\.html$/, '');
const contentRoutes = Object.fromEntries(routes.map(route => [publicPath(route), route]));

module.exports = { publicPath, contentRoutes };
