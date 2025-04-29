// File: app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import "./blog.css";
import { createClient } from "@/utils/supabase/server";
import Block from "./Block";
import { Content } from "@/lib/types";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const prms = await params;

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('posts')
    .select('*, user:users(*)')
    .eq('slug', prms.slug)
    .eq('active', true)
    .single();

  if (error) {
    console.error('Error fetching posts:', error.message);
  }

  if (!post) return notFound();

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      siteName: "Etavelle",
      images: [
        {
          url: post.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const prms = await params;

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('posts')
    .select('*, user:users(*)')
    .eq('slug', prms.slug)
    .single();

  if (error) {
    console.error('Error fetching posts:', error.message);
  }

  if (!post) return notFound();

  const publishedDate = new Date(post.created_at).toISOString();

  return (
    <main className="mx-auto px-4 py-10 pt-20 flex flex-col">
      <Image
        src={post.hero_image.fileUrl}
        alt={post.hero_image.alt}
        width={1200}
        height={630}
        className="my-4 w-full h-auto object-contain rounded-md"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      <article className="max-w-3xl mx-auto flex flex-col">
        <p className="self-end mt-10">
          Published on{" "}
          <time dateTime={new Date(post.created_at).toISOString()}>
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>

        {
          post.content.map((block: Content, index: number) => {
            return (
              <Block key={index} block={block}/>
            )
          })
        }
      </article>

      <div className="mt-16 border-t pt-8 w-3xl max-w-full flex justify-center mx-auto">
        <div className="flex items-center gap-4 w-full">
          <div>
            <p className="text-sm font-semibold">Written by</p>
            <p className="text-base font-bold">{post.user.name}</p>
            <p className="text-sm">{post.user.role}</p>
          </div>
          <Link href={post.user.url} className="flex-1 flex justify-center">
            <Button variant="outline">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-14 bg-gray-100 p-6 rounded-xl shadow-sm max-w-3xl mx-auto flex flex-col">
        <h2 className="!text-xl font-semibold mb-2">Want an SEO-First Website?</h2>
        <p className="mb-4">
          We build <strong>SEO-optimized</strong>, <strong>fast-loading</strong> websites using Next.js for founders, brands, and marketers. Let’s grow your business together.
        </p>
        <Link href="/#contact" className="self-end">
          <Button>Let’s Talk</Button>
        </Link>
      </div>

      {/* JSON-LD Schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.user.title,
          "author": {
            "@type": "Person",
            "name": post.user.name,
            "url": "https://www.etavelle.com/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Etavelle",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.etavelle.com/icons/logo.png",
              "width": 200,
              "height": 200
            }
          },
          "datePublished": publishedDate,
          "image": post.og_image.fileUrl
        })
      }} />
    </main>
  );
}