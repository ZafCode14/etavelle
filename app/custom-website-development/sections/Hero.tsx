import { Button } from "@/components/ui/button";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="pt-14 md:pt-20 md:h-[600px] relative">
      <Image
        alt="custom website development" 
        src={'/images/customwebsitedevelopment.png'}
        width={1000}
        height={616}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px"
        className="
          w-full h-full max-h-[500px] object-contain object-right
        "
      />

      {/** Content Container */}
      <div className={`
        relative md:absolute top-0
        flex flex-col
        w-full h-full justify-center
        md:bg-[linear-gradient(to_right,white_0%,white_40%,transparent_100%)]
        px-3
      `}>

        <AnimateIn x={-100}>
          <h1 className="relative font-bold text-[#3D3D3D] max-w-full mt-5 md:leading-14">
            Best <span className="text-[#1A7A85]">Custom</span> <br />
            Website <span className="text-[#1A7A85]">Development</span> <br />
            That Fits You
          </h1>
          <p className="
            relative z-10 max-w-full w-130 my-5 md:my-10 !text-xl
          "><i>We build from scratch to match your brand, your audience, and your exact requirements. No templates. No compromises</i></p>
        </AnimateIn>

        {/** Hero Buttons Container */}
        <AnimateIn className="flex gap-4 md:gap-10 relative z-10" y={50}>
          <Link href="/custom-website-development/#contact" passHref>
            <Button size="lg" className="bg-[#BC44B1] text-xl uppercase px-14 py-7">Get In Touch</Button>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}