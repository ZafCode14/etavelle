// app/blog/page.tsx
import Link from 'next/link'
import './blog.css'
import Image from 'next/image'
import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: "Blog | Etavelle – SEO & Performance-Focused Web Development",
  description:
    "Read expert articles on SEO optimization, fast-loading websites, Next.js development, and high-converting web design by Etavelle.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Etavelle Blog – SEO, Performance, and Web Development Tips",
    description:
      "Insights and tutorials on building high-performance, SEO-optimized websites with Next.js. Stay ahead with Etavelle's expert web development advice.",
    url: "https://www.etavelle.com/blog",
    siteName: "Etavelle",
    images: [
      {
        url: "https://www.etavelle.com/images/blogHome.jpeg",
        width: 1200,
        height: 630,
        alt: "Etavelle - Blog Posts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "/site.webmanifest",
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug, title, description, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return <p className="text-center mt-10">Failed to load blog posts.</p>
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 pt-20">
      <Image
        src={'/images/blogHero.jpeg'}
        alt={"image representing the blog posts page"}
        width={1200}
        height={630}
        className="my-4 w-[1200px] max-w-full h-auto object-contain rounded-md mx-auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      <div className='max-w-4xl mx-auto px-4'>
        <h1 className="text-3xl font-bold mb-8 text-center mt-10">Latest Blog Posts</h1>

        {posts?.length === 0 ? (
          <p>No blog posts yet. Stay tuned!</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug} className="border-b pb-6">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-700">{post.description}</p>
                <Link href={`/blog/${post.slug}`}>
                  <p className="text-blue-600 hover:underline mt-2 inline-block">Read more →</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}