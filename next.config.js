/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-supabase-storage-domain.com'], // Replace with your actual Supabase storage domain
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'formidable'];
    return config;
  },
};

module.exports = nextConfig;