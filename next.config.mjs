/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isVercel = process.env.VERCEL === '1';

// BasePath: Empty for Vercel and local development.
// Only used if explicitly configured or running in GitHub Actions for GitHub Pages.
const basePath = isGithubActions && !isVercel
  ? (process.env.NEXT_PUBLIC_BASE_PATH || '/ahc-go-care')
  : (process.env.NEXT_PUBLIC_BASE_PATH || '');

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  ...(basePath ? { basePath, trailingSlash: true } : {}),
  // On Vercel, standard Next.js SSR and Serverless API routes are supported.
  // Static export is only used when building for GitHub Pages.
  ...(isGithubActions && !isVercel ? { output: 'export' } : {})
};

export default nextConfig;
