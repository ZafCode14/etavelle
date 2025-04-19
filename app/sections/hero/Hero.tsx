import HeorImage from "./HeroImage";
import MainHeading from "./MainHeading";
import { Button } from "@/components/ui/button";
import AnimateIn from "@/components/AnimateIn";

export default function Hero() {
  return (
    <section id="hero" className="pt-14 md:pt-20 md:h-[600px] relative">
      <HeorImage/>

      {/** Content Container */}
      <div className={`
        relative md:absolute top-0
        flex flex-col
        w-full h-full justify-center
        md:bg-[linear-gradient(to_right,white_0%,white_40%,transparent_100%)]
        px-3
      `}>

        <AnimateIn x={-100}>
          <MainHeading/>
          <p className="
            relative z-10 max-w-full w-[600px] my-5 md:my-10
          ">At Etavelle, we design lightning-fast, SEO-driven websites<br/> built to rank higher, convert better, and scale effortlessly.</p>
        </AnimateIn>

        {/** Hero Buttons Container */}
        <AnimateIn className="flex gap-4 md:gap-10 relative z-10" y={50}>
          <a href="#contact">
            <Button size="lg">
              Get In Touch
            </Button>
          </a>
          <a href="#projects">
            <Button variant="outline" size="lg">
              View Our Work
            </Button>
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}