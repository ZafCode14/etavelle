import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import WhatYouGet from "./sections/WhatYouGet";
import WhyCustom from "./sections/WhyCustom";

export async function generateMetadata() {
  const post = {
    title: "Custom Website Development Tailored to Your Brand",
    description:
      "Get a fully custom website built from scratch to match your brand, audience, and business goals. No templates — just your vision, realized.",
  };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      siteName: "Etavelle",
      images: [
        {
          url: "https://www.etavelle.com/images/ogCustom.jpg",
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

export default function page() {
  return (
    <main className="flex flex-col items-center">
      <Hero/>
      <WhyCustom/>
      <WhatYouGet/>
      <Contact/>
    </main>
  )
}