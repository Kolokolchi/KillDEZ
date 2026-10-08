import routing from './lib/public-routes.cjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  agentRules: false,
  allowedDevOrigins: ['127.0.0.1'],
  // The catalog shares its name with the objects/ directory on Apache/nginx.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      ...Object.entries(routing.contentRoutes).map(([destination, route]) => ({
        source: '/' + route,
        destination,
        permanent: true,
      })),
      ...Object.keys(routing.contentRoutes).filter(path => path !== '/').map(destination => ({
        // Next makes redirect sources accept an optional slash. Anchor the
        // catalog's source so its final /objects/ URL never matches itself.
        source: destination.endsWith('/') ? destination.slice(0, -1) + ':ending($)' : destination + '/',
        destination,
        permanent: true,
      })),
      { source: '/admin.html', destination: '/admin', permanent: true },
      { source: '/admin/', destination: '/admin', permanent: true },
    ];
  },
};

export default nextConfig;
