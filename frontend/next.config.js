/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Memory kullanımını azalt
    optimizePackageImports: true,
  },
  // Production için image optimization'ı devre dışı bırak (sharp yokken)
  images: {
    unoptimized: true,
  },
  // Output standalone için (Docker'da daha az memory kullanır)
  output: 'standalone',
};

module.exports = nextConfig;
