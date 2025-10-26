import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react'; // Add this line

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
  vite: {
    // Ensure environment variables are passed to client
    define: {
      'import.meta.env.SPOTIFY_CLIENT_ID': JSON.stringify(process.env.SPOTIFY_CLIENT_ID),
      'import.meta.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(process.env.SPOTIFY_CLIENT_SECRET),
      'import.meta.env.SPOTIFY_REFRESH_TOKEN': JSON.stringify(process.env.SPOTIFY_REFRESH_TOKEN),
    },
  },
  // Security headers
  security: {
    checkOrigin: true,
  },
  // Output configuration
  output: 'static',
  // Build configuration
  build: {
    assets: '_astro',
  },
});