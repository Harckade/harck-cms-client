const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    if (process.env.ENVIRONMENT === 'PROD'){
      return [
        {
          source: '/robots.txt',
          destination: '/api/robots_prod'
        }
      ];
    }
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots_generic'
      }
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            //waiting for NextJs to fix this for SSG https://github.com/vercel/next.js/discussions/54907
            value: process.env.YOUR_WEBSITE_URL === 'http://localhost:3000' ? '': `default-src 'self' ${process.env.SERVER_ADDRESS};  style-src 'self' 'unsafe-inline' ${process.env.SERVER_ADDRESS} fonts.googleapis.com https://www.youtube.com https://trends.google.com; script-src 'self' ${process.env.SERVER_ADDRESS} https://ssl.google-analytics.com https://*.googletagmanager.com https://trends.google.com 'unsafe-inline'; img-src 'self' ${process.env.SERVER_ADDRESS} https://*.google-analytics.com https://*.googletagmanager.com data:; connect-src 'self' ${process.env.SERVER_ADDRESS} https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; font-src fonts.gstatic.com; frame-src 'self' ${process.env.SERVER_ADDRESS} https://www.youtube.com/embed/ https://trends.google.com`,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'cache-control',
            value: 'must-revalidate, max-age=3600',
          },
          {
            key: 'x-dns-prefetch-control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Expect-CT',
            value: `max-age=43200, enforce, report-uri='${process.env.YOUR_WEBSITE_URL}/en/contact'`,
          },
          {
            key: 'Permissions-Policy',
            value: "fullscreen=*, autoplay=*, web-share=*",
          },
          {
            key: 'X-Powered-By',
            value: ''
          }
        ],
      },
    ];
  }
}
