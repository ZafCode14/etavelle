import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

const oldBlogSlugs = [
  'seo-optimized-websites',
  'technical-seo-services',
  'nextjs-seo-performance',
  'what-is-on-page-seo-and-why-it-matters',
  'nextjs-seo-website-speed',
  'improve-core-web-vitals-website-performance-seo',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strip leading slash
  const slug = pathname.slice(1);

  // If it's an old blog slug (and not already under /blog/)
  if (oldBlogSlugs.includes(slug)) {
    const redirectUrl = new URL(`/blog/${slug}`, request.url);
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Continue with Supabase session handling
  return await updateSession(request);
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - site.webmanifest (manifest file)
     * - images like svg, png, jpg, jpeg, gif, webp
     */
    '/((?!_next/static|_next/image|favicon.ico|site\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}