/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        process.env.NEXTAUTH_URL,
        process.env.URL,
        process.env.DEPLOY_PRIME_URL,
      ].filter(Boolean),
    },
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/System Volume Information/**',
        ],
      };
    }
    return config;
  },
};

module.exports = nextConfig;
