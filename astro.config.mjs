import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

// Determine site URL based on environment
const getSiteURL = () => {
  // Production URL - Change this to your actual domain
  if (process.env.NODE_ENV === 'production') {
    return 'https://bitspace.software';
  }
  // For Vercel production deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // For Vercel preview deployment
  if (process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }
  // For local development
  return 'http://localhost:4321';
};

// https://astro.build/config
export default defineConfig({
  site: getSiteURL(),
  integrations: [
    tailwind(),
    react(),
  ],
  adapter: node({ mode: 'standalone' }),
  // Security headers
  security: {
    checkOrigin: true,
  },
  // Output configuration — hybrid: pages are static, API routes are server-rendered
  output: 'hybrid',
  // Build configuration
  build: {
    assets: '_astro',
  },
});