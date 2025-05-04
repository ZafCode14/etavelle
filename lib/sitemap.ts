import { SitemapStream, streamToPromise } from 'sitemap';
import { getAllSlugs } from '../actions/getSlugs';

export async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: 'https://www.etavelle.com',
  });

  // Static pages
  sitemap.write({
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString(),
  });

  sitemap.write({
    url: '/blog',
    changefreq: 'dayly',
    priority: 0.7,
    lastmod: new Date().toISOString(),
  });

  try {
    const posts = await getAllSlugs();

    for (const post of posts) {
      sitemap.write({
        url: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: post.updated_at ? new Date(post.updated_at).toISOString() : undefined,
      });
    }
  } catch (error) {
    console.error("Failed to fetch slugs:", error);
    // Still return basic sitemap
  }

  sitemap.end();
  const sitemapXML = await streamToPromise(sitemap);
  return sitemapXML.toString();
}