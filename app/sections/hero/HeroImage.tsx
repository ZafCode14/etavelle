import Lighthouse from "@/components/Lighthouse";
import Image from "next/image";

export default function HeorImage() {
  return (
    <div className="relative">
      <div className="
        absolute bottom-0 right-0 w-full z-10
        flex justify-center md:justify-end items-end
        p-2
        bg-[linear-gradient(to_top,#ffffff_0%,#ffffffcc_40%,transparent_100%)]
        h-full md:h-auto
        md:bg-[linear-gradient(to_top,#ffffff_0%,#ffffffcc_100%,transparent_100%)]
      ">
        <Lighthouse/>
      </div>
      <Image
        alt="hero image" 
        src={'/images/heroImage.jpg'}
        width={1000}
        height={616}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px"
        className="
          w-full h-full max-h-[500px] object-contain object-right
        "
      />
    </div>
  )
}