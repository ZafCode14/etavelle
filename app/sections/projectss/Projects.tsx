import AnimateIn from "@/components/AnimateIn";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Towns And Seas",
      description: "Towns & Seas is a design-driven development studio inspired by the world’s most remarkable cities and coastlines. They craft architectural spaces that honor cultural heritage while embracing contemporary living, creating environments that tell stories and resonate with a sense of place.",
      link: "https://www.townsandseas.com/",
      image: "/images/projects/townsandseas.jpg"
    },
    {
      title: "Blackeels",
      description: "Blackeels Productions is a team of passionate storytellers specializing in creating visually stunning films, commercials, and branded content. Their mission is to deliver high-quality, creative work that connects deeply with audiences, bringing compelling narratives to life with precision and artistry.",
      link: "https://www.blackeels.com/",
      image: "/images/projects/blackeels.jpg"
    },
    {
      title: "Waxio",
      description: "Waxio is a contemporary jewelry brand emphasizing individuality and modern style. With a focus on unique designs that enhance personal expression, Waxio creates pieces that reflect both outer elegance and inner essence, inspiring confidence and creativity in every customer.",
      link: "https://waxio.ru/",
      image: "/images/projects/waxio.jpg"
    },
    {
      title: "Bravo",
      description: "Bravo Link is a free scanner app designed for teams to organize and manage notes efficiently. Integrated with Bravo Smart Notebook, it offers document organization, calendar syncing, flashcard creation, and Gemini AI-powered productivity tools, merging physical and digital workflows.",
      link: "https://www.bravo-link.com/en",
      image: "/images/projects/bravo.jpg"
    },
    {
      title: "Felofarms",
      description: "Felofarms is a pioneering exporter of premium fresh fruits, committed to quality and sustainability. They grow and curate diverse fruit selections, ensuring every piece delivers exceptional taste. Felofarms bridges orchards and tables with care and excellence, enriching global connections.",
      link: "https://www.felofarms.com/",
      image: "/images/projects/felofarms.jpg"
    },
    {
      title: "Golverd",
      description: "Golverd is Egypt's first virtual jewelry mall, curating a selection of renowned brands on one accessible online platform. Offering a diverse range of pieces, Golverd delivers a seamless shopping experience, enabling customers to explore and purchase stunning jewelry from the comfort of their homes.",
      link: "https://www.golverd.com/",
      image: "/images/projects/golverd.jpg"
    },
    {
      title: "Zeus",
      description: "Zeus Gym is a modern fitness center dedicated to health and wellness. Offering state-of-the-art equipment, expert trainers, and tailored programs, Zeus provides an inspiring workout environment. The brand emphasizes community, motivation, and helping members achieve their fitness goals.",
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
                      <h3 className="!text-[20px] font-bold">{project.title}</h3>
                      <p className="!text-[14px] h-34">{project.description}</p>
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