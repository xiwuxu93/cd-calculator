const withNextIntl = require('next-intl/plugin')('./src/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    const apex = process.env.NEXT_PUBLIC_SITE_URL || 'https://mycdcalc.com';
    const host = apex.replace(/^https?:\/\//, '');
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: `www.${host}` }],
        destination: `${apex}/:path*`,
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(config);
