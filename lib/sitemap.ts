// lib/sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { getAllSlugs } from '../actions/getSlugs';

export async function generateSitemap() {
  const slugs = await getAllSlugs();

  const sitemap = new SitemapStream({
    hostname: 'https://www.etavelle.com',
  });

  // Add the homepage to the sitemap
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });

  // Add dynamic pages (e.g., blog posts)
  for (const slug of slugs) {
    sitemap.write({ url: `/blog/${slug}`, changefreq: 'daily', priority: 0.8 });
  }

  sitemap.end();

  // Convert the sitemap stream to XML
  const sitemapXML = await streamToPromise(sitemap);
  return sitemapXML.toString();
}