import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "../blog.css";

export const metadata: Metadata = {
  title: "Why Next.js Is the Best Framework for SEO and Website Speed",
  description:
    "Learn how Next.js supercharges your SEO strategy and site performance. Discover server-side rendering, static generation, and SEO best practices.",
  openGraph: {
    title: "Why Next.js Is the Best Framework for SEO and Website Speed",
    description:
      "Learn how Next.js supercharges your SEO strategy and site performance. Discover server-side rendering, static generation, and SEO best practices.",
    siteName: "Etavelle",
    images: [
      {
        url: "https://www.etavelle.com/images/blogs/nextjs-seo-website-speed/og.jpg",
        width: 1200,
        height: 630,
        alt: "Next.js SEO and Speed",
      },
    ],
    locale: "en_US",
    type: "article",
  },
};

export default function WhyNextJs() {
  return (
    <main className="mx-auto px-4 py-10 pt-20 flex flex-col">
      <Image
        alt="nextjs seo website speed"
        src="/images/blogs/nextjs-seo-website-speed/hero.jpg"
        width={1300}
        height={630}
        className="w-[1200px] h-auto object-contain mx-auto rounded-2xl"
        priority
      />

      <article className="max-w-3xl mx-auto flex flex-col">
        <p className="self-end mt-10">Published on <time dateTime="2025-04-23">April 23, 2025</time></p>

        <h1 className="text-center">
          Why Next.js Is the Best Framework for SEO and Website Speed
        </h1>

        <p>
          At Etavelle, we build <strong>SEO-optimized</strong>, <strong>high-performance websites</strong> using Next.js — a powerful React framework that makes modern websites faster, more scalable, and more visible in search engines. In this article, we’ll walk through how Next.js boosts SEO and performance using cutting-edge web technologies.
        </p>

        <h2>Understanding SEO: Key Concepts and Metrics</h2>
        <p>
          SEO (Search Engine Optimization) refers to the strategies and techniques used to increase your website’s visibility on search engines. Key metrics include:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>Core Web Vitals</strong> – Page load speed, interactivity, and visual stability</li>
          <li><strong>Crawlability</strong> – How easily search engines can index your content</li>
          <li><strong>Metadata and Structure</strong> – Titles, descriptions, headings, and schema markup</li>
        </ul>

        <h2>How Next.js Enhances SEO Performance</h2>
        <p>
          Next.js addresses many of the pain points developers face when building SEO-friendly sites. With built-in features like <strong>server-side rendering</strong>, <strong>static site generation</strong>, and <strong>clean routing</strong>, it provides a strong foundation for long-term organic growth.
        </p>

        <h2>The Role of Server-Side Rendering in Next.js</h2>
        <p>
          SSR allows pages to be rendered on the server and sent as fully rendered HTML. This means search engine bots can crawl complete pages instantly — no waiting for JavaScript to load, improving indexing and keyword visibility.
        </p>

        <h2>Optimizing Website Speed with Next.js Features</h2>
        <p>
          Performance is critical for both SEO and conversions. Next.js includes performance-boosting features such as:
        </p>
        <ul className="list-disc list-inside mb-6 text-lg space-y-1">
          <li><strong>Automatic Image Optimization</strong> – Resizes, compresses, and lazy-loads images</li>
          <li><strong>Code Splitting</strong> – Loads only what’s needed per page</li>
          <li><strong>Incremental Static Regeneration</strong> – Keeps pages fresh without rebuilding everything</li>
        </ul>

        <h2>Next.js and Static Site Generation: A Winning Combination</h2>
        <p>
          With SSG, pages are pre-built at compile time and served instantly to users. This results in near-zero latency and top Core Web Vitals scores — a key ranking factor for Google.
        </p>

        <h2>Best Practices for SEO with Next.js</h2>
        <ul className="list-disc list-inside mb-6 text-lg space-y-1">
          <li>Use the <code>metadata</code> API to set dynamic titles, descriptions, and Open Graph data</li>
          <li>Implement clean, semantic HTML and proper heading structure (H1-H3)</li>
          <li>Use <code>next/image</code> for optimized images</li>
          <li>Generate an XML sitemap and robots.txt</li>
          <li>Implement structured data using JSON-LD</li>
        </ul>

        <h2>Tools and Resources for Next.js SEO Optimization</h2>
        <ul className="list-disc list-inside mb-6 text-lg space-y-1">
          <li><strong>Lighthouse / PageSpeed Insights</strong> – Measure SEO and speed scores</li>
          <li><strong>Ahrefs / SEMrush</strong> – Analyze keywords and backlinks</li>
          <li><strong>Next.js Analytics</strong> – Get performance insights directly from your app</li>
        </ul>

        <h2>Conclusion: The Future of SEO and Web Speed with Next.js</h2>
        <p>
          If you’re serious about growing your business through organic traffic and user-friendly experiences, <strong>Next.js is the future</strong>. From server-side rendering to optimized image delivery, it’s the framework that helps developers and marketers win together.
        </p>

        <p>
          Curious how your website stacks up? Check out our live site{" "}
          <Link
            href="https://pagespeed.web.dev/analysis/https-etavelle-com/raflh4y2p5?form_factor=mobile"
            className="text-blue-600 underline"
          >
            performance
          </Link>{" "}
          results.
        </p>
      </article>

      <div className="mt-16 border-t pt-8 w-3xl max-w-full mx-auto">
        <div className="flex items-center gap-4">
          <Image
            src="/images/clients/photo.jpg"
            alt="Mohamed Elzaafarani"
            width={100}
            height={100}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">Written by</p>
            <p className="text-base font-bold">Mohamed Elzaafarani</p>
            <p className="text-sm">Founder at Etavelle</p>
          </div>
        </div>
      </div>

      <div className="mt-14 bg-gray-100 p-6 rounded-xl shadow-sm max-w-3xl mx-auto flex flex-col">
        <h4 className="!text-xl font-semibold mb-2">Want an SEO-First Website?</h4>
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
          headline: "Why Next.js Is the Best Framework for SEO and Website Speed",
          author: {
            "@type": "Person",
            name: "Mohamed Elzaafarani",
          },
          publisher: {
            "@type": "Organization",
            name: "Etavelle",
            logo: {
              "@type": "ImageObject",
              url: "https://www.etavelle.com/favicon.ico",
            },
          },
          datePublished: "2025-04-23",
          image: "https://www.etavelle.com/images/blogs/nextjs-seo-website-speed/og.jpg",
        })
      }} />
    </main>
  );
}