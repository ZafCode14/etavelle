import Block from "@/app/blog/[slug]/Block"
import { Button } from "@/components/ui/button"
import { Content, Post } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import '../../blog/blog.css'

type Props = {
  post: Post;
}
export default function PostAdmin({ post }: Props) {
  return (
    <main className="mx-auto px-4 flex flex-col">
      {post.hero_image?.fileUrl &&
      <Image
        src={post.hero_image.fileUrl}
        alt={post.hero_image.alt}
        width={1200}
        height={630}
        className="my-4 w-[1200px] max-w-full h-auto object-contain rounded-md mx-auto"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      }
      <article className="w-3xl max-w-full mx-auto flex flex-col">
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
          <Image
            alt="authors image"
            src="/images/clients/photo.jpg"
            width={100}
            height={100}
            className="w-15 h-15 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold !my-0">Written by</p>
            <p className="text-base font-bold !my-0">{post.user.name}</p>
            <p className="text-sm !my-0">{post.user.role}</p>
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
    </main>
  )
}
