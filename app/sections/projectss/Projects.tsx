import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Towns And Seas",
      link: "https://www.townsandseas.com/",
      image: "/images/projects/townsandseas.jpg"
    },
    {
      title: "Blackeels",
      link: "https://www.blackeels.com/",
      image: "/images/projects/blackeels.jpg"
    },
    {
      title: "Waxio",
      link: "https://waxio.ru/",
      image: "/images/projects/waxio.jpg"
    },
    {
      title: "Bravo",
      link: "https://www.bravo-link.com/en",
      image: "/images/projects/bravo.jpg"
    },
    {
      title: "Felofarms",
      link: "https://www.felofarms.com/",
      image: "/images/projects/felofarms.jpg"
    },
    {
      title: "Golverd",
      link: "https://www.golverd.com/",
      image: "/images/projects/golverd.jpg"
    },
    {
      title: "Zeus",
      link: "https://gym-demo-project.netlify.app/",
      image: "/images/projects/zeus.jpg"
    },
  ]
  return (
    <section className="py-20" id="projects">
      <div className="w-[700px] max-w-full px-3">
        <AnimateIn y={100}>
          <h2>Our Recent Projects -<br/> Real Results, Real Impact</h2>
        </AnimateIn>
        <AnimateIn y={100}>
          <p>At Etavelle, we take pride in crafting websites that not only look great but also deliver exceptional performance. Explore our recent projects to see how we’ve helped businesses succeed online.</p>
        </AnimateIn>
      </div>
      <AnimateIn y={100}>
        <Carousel className="w-full flex flex-col">
          <CarouselContent className="mr-3 px-3 my-10">
          {
            projects.map((project, index) => {
              return (
                <CarouselItem className="md:basis-1/2 lg:basis-[33.3%]" key={index}>
                  <Container className="w-full" key={index}>
                    <div className="w-full h-[300px] bg-[#dbdbdb] rounded-t-2xl overflow-hidden">
                      <Image
                        src={project.image}
                        alt="project image"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col">
                      <h3>{project.title}</h3>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="self-end mt-5">
                        <Button variant="outline">
                          View Project
                        </Button>
                      </a>
                    </div>
                  </Container>
                </CarouselItem>
              )
            })
          }
          </CarouselContent>
          <div className="flex justify-center gap-10">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </AnimateIn>
    </section>
  );
}