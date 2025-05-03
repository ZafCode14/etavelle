import { SitemapStream, streamToPromise } from 'sitemap';
import { getAllSlugs } from '../actions/getSlugs';

export async function generateSitemap() {
  let posts = [];

  try {
    posts = await getAllSlugs(); // Fetch slugs dynamically from your DB
  } catch (error) {
    console.error("Failed to fetch slugs:", error);
    return ''; // Return empty sitemap or handle as needed
  }

  const sitemap = new SitemapStream({
    hostname: 'https://www.etavelle.com',
  });

  // Add the homepage to the sitemap
  sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 });
  sitemap.write({ url: '/blog', changefreq: 'monthly', priority: 0.7 });

  // Add dynamic pages (e.g., blog posts)
  for (const post of posts) {
    sitemap.write({
      url: `/blog/${post.slug}`,
      changefreq: 'daily', // Adjust based on your content update frequency
      priority: 0.7,
      lastmod: post.updated_at, // Optional: Add last modification date
    });
  }

  sitemap.end();

  // Convert the sitemap stream to XML and return
  const sitemapXML = await streamToPromise(sitemap);
  return sitemapXML.toString();
}