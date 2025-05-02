// app/api/sitemap/route.js
import { generateSitemap } from '@/lib/sitemap';

export async function GET() {
  const sitemap = await generateSitemap();

  // Set the correct headers for XML
  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
