"use client";
import Container from "@/components/Container";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  icon: string;
  title: string;
  text: string;
}
export default function Service({ icon, title, text }: Props) {
  const [showText, setShowText] = useState(false);
  return (
    <div onClick={() => setShowText(!showText)}>
      <Container className={`
        px-4 py-3 md:py-5
        w-full ${showText ? "h-[180px]" : "h-[68px]"} 
        sm:h-[20vw] lg:h-[22vw] xl:h-[230px]
        duration-300
        relative overflow-hidden
        flex flex-col bg-white
      `}>
        <Image
          src={icon}
          alt={`${title} Icon`}
          width={0}
          height={0}
          className="w-auto h-[40px] lg:h-[3.7vw] xl:h-[44px] absolute left-5 top-4 object-contain"
        />
        <h3 className="mb-5 self-center text-center mt-4 md:mt-2">{title}</h3>
        <p className="!text-[13px] md:!text-[1.6vw] lg:!text-[1.4vw] xl:!text-[16px]">{text}</p>
        <Plus className={`
          absolute top-6 right-5 text-[#178d9c]
          ${showText && "rotate-45"}
          duration-300 md:hidden
        `}/>
      </Container>
    </div>
  )
}