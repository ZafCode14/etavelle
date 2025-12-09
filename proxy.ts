import type { NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

const oldBlogSlugs = [
  'seo-optimized-websites',
  'technical-seo-services',
  'nextjs-seo-performance',
  'what-is-on-page-seo-and-why-it-matters',
  'nextjs-seo-website-speed',
  'improve-core-web-vitals-website-performance-seo',
]

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Strip leading slash
  const slug = pathname.startsWith('/') ? pathname.slice(1) : pathname

  // Old blog slug redirect
  if (oldBlogSlugs.includes(slug)) {
    const redirectUrl = new URL(`/blog/${slug}`, req.url)
    return Response.redirect(redirectUrl, 301)
  }

  // Supabase session handling
  return await updateSession(req)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|site\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
