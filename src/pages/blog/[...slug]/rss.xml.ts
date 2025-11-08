import type { APIRoute } from 'astro';

// Redirect blog post RSS requests to the main RSS feed
export const GET: APIRoute = async ({ redirect, site, url }) => {
  // Get the base URL from site or current URL
  const baseUrl = site || new URL('/', url).toString();
  // Redirect to the main RSS feed
  return redirect(`${baseUrl}rss.xml`, 301);
};

