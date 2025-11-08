import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Generate static paths for all blog posts
export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');
  
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
  }));
}

// Redirect blog post RSS requests to the main RSS feed
export const GET: APIRoute = async ({ redirect, site, url }) => {
  // Get the base URL from site or current URL
  const baseUrl = site || new URL('/', url).toString();
  // Redirect to the main RSS feed
  return redirect(`${baseUrl}rss.xml`, 301);
};

