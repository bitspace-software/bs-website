import { defineConfig } from 'astro/config';

// Determine site URL based on environment
const getSiteURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://bitspace.software';
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }
  return 'http://localhost:4321';
};

// https://astro.build/config
export default defineConfig({
  site: getSiteURL(),
  // No UI framework, no Tailwind — the site is a self-contained
  // CSS-variable design system rendered to static HTML.
  integrations: [],
  output: 'static',
  build: {
    assets: '_astro',
  },
});
