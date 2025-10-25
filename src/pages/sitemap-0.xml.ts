import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');
  
  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/tags', priority: '0.7', changefreq: 'weekly' }
  ];
  
  // Blog posts
  const blogPages = posts
    .filter(post => !post.data.draft)
    .map(post => ({
      url: `/blog/${post.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: post.data.updatedDate || post.data.pubDate
    }));
  
  // Tag pages
  const allTags = [...new Set(posts.flatMap(post => post.data.tags || []))];
  const tagPages = allTags.map(tag => ({
    url: `/tags/${encodeURIComponent(tag)}`,
    priority: '0.6',
    changefreq: 'monthly'
  }));
  
  const allPages = [...staticPages, ...blogPages, ...tagPages];
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${page.lastmod ? new Date(page.lastmod).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
