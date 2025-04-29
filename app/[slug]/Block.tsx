import Image from "next/image";
import React from "react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  block: any;
};

export default function Block({ block }: Props) {
  if (!block) return null;

  switch (block.type) {
    case "h1":
      return <h1 className="text-center" dangerouslySetInnerHTML={{ __html: block.value }}/>
    case "h2":
      return <h2 dangerouslySetInnerHTML={{ __html: block.value }}/>
    case "h3":
      return <h3 dangerouslySetInnerHTML={{ __html: block.value }}/>
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: block.value }}/>

    case "ul":
      return (
        <ul className="list-disc pl-6">
          {block.value.split("\n").map((item: string, i:number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="list-decimal pl-6">
          {block.value.split("\n").map((item: string, i:number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );

    case "image":
      return (
        <Image
          src={block.value.fileUrl}
          alt={block.value.altText || "Image"}
          width={800}
          height={500}
          className="my-4 w-full h-auto object-contain rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
        />
      );

    default:
      return <div dangerouslySetInnerHTML={{ __html: block.value }} />;
  }
}