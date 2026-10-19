/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ahc-go-care',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
