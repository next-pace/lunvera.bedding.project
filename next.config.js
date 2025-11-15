/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⚠️ Do NOT set: output: 'export'
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.hizliresim.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'nextpace.agency' },
    ],
  },
};

module.exports = nextConfig;