const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
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
            value: process.env.YOUR_WEBSITE_URL === 'http://localhost:3000' ? '': `default-src 'self' ${process.env.SERVER_ADDRESS};  style-src 'self' 'unsafe-inline'  ${process.env.SERVER_ADDRESS} fonts.googleapis.com www.youtube.com trends.google.com; script-src 'self' ${process.env.SERVER_ADDRESS} 'unsafe-inline' ssl.google-analytics.com www.googletagmanager.com www.google-analytics.com trends.google.com; img-src 'self' ${process.env.SERVER_ADDRESS} https://www.googletagmanager.com https://www.google-analytics.com www.google-analytics.com data:; connect-src 'self' ${process.env.SERVER_ADDRESS} https://www.google-analytics.com www.google-analytics.com; font-src fonts.gstatic.com; frame-src 'self' ${process.env.SERVER_ADDRESS} https://www.youtube.com/embed/ https://trends.google.com`,
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
