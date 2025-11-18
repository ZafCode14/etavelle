import GraphicalElement from "@/app/sections/whyEtavelle/GraphicalElement";
import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WhyCustom() {
  const services = [
    {
      number: 1,
      title: "Tailored to Your Brand",
      text: "Your website should feel unmistakably yours. We design every pixel to reflect your identity — from colors and typography to layout and tone.k"
    },
    {
      number: 2,
      title: "Built Around Your Goals",
      text: "Whether you're selling products, booking clients, or telling your story, we build the site to serve your specific business objectives"
    },
    {
      number: 3,
      title: "Flexible to Any Requirement",
      text: "Need a booking system? A multilingual blog? A custom animation? We don’t force you into pre-built themes — we build what you need."
    },
    {
      number: 4,
      title: "No Templates. No Limits.",
      text: "We start with a blank canvas and code every section to fit your brand, not someone else's idea of what a site should look like."
    },
  ];

  return (
    <section className="py-20 overflow-hidden px-3" id="services">
      <GraphicalElement 
        height="h-20" 
        className="right-5 top-70" 
        x={-300} 
        color="Purple"
      />
      <GraphicalElement 
        height="h-20" 
        className="left-5 bottom-70" 
        x={300} 
        color="Blue"
      />
      <div className="w-full flex justify-center relative mb-10">
        <AnimateIn y={100}>
          <h2 className="!text-2xl md:!text-4xl !text-[#1A7A85]">Why Custom Matters?</h2>
        </AnimateIn>
      </div>

      <div className="flex justify-center gap-3 md:gap-6 flex-wrap mb-20">
        {services.map((service, index) => {
          return (
            <AnimateIn y={100} key={index} className="basis-[100%] md:basis-[47%]">
              <Container className={`
                px-4 py-3 md:py-5
                w-full 
                duration-300
                relative overflow-hidden
                flex flex-col bg-white
              `}>
                <p className="font-black h-10 w-10 !text-2xl rounded-full border-4 border-[#BC44B1] !text-[#BC44B1] flex justify-center items-center absolute left-5 top-5">{service.number}</p>
                <h3 className="mb-5 self-center text-center mt-4 md:mt-2">{service.title}</h3>
                <p className="!text-[13px] md:!text-[1.6vw] lg:!text-[1.4vw] xl:!text-[16px]">{service.text}</p>
              </Container>
            </AnimateIn>
          )
        })}
      </div>
      <AnimateIn className="flex gap-4 md:gap-10 relative z-10 mx-auto w-full justify-center items-center" y={50}>
        <Link href="/custom-website-development/#contact" passHref>
          <Button size="lg" className="bg-[#1A7A85] text-xl uppercase px-14 py-7">CONTACT US</Button>
        </Link>
      </AnimateIn>
    </section>
  );
}
