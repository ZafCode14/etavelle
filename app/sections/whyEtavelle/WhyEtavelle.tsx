import Container from "@/components/Container";
import Image from "next/image";
import GraphicalElement from "./GraphicalElement";
import AnimateIn from "@/components/AnimateIn";

export default function WhyEtavelle() {
  const points = [
    {
      icon: '/icons/points/rocket.svg',
      text: '95+ Google PageSpeed Score across all projects.'
    },
    {
      icon: '/icons/points/seo.svg',
      text: 'SEO-Ready — Rank Higher, Convert Better.'
    },
    {
      icon: '/icons/points/tool.svg',
      text: 'Clean, scalable code for long-term growth.'
    },
    {
      icon: '/icons/points/cloud.svg',
      text: 'Transparent pricing and quick turnaround'
    },
  ]
  return (
    <section className="bg-[#F7F7FD] px-10 py-20 rounded-3xl flex flex-col items-center w-full overflow-hidden">
      <GraphicalElement
        className="right-10 top-0"
        height="h-[50px]"
        x={-100} 
        color="Purple"
      />
      <GraphicalElement 
        className="-left-10 bottom-44"
        height="h-[40px]"
        x={100} 
        color="Purple"
      />
      <GraphicalElement 
        className="-right-0 bottom-0"
        height="h-[100px]"
        x={100} 
        color="Purple"
      />
      <div className="w-[700px] max-w-full mb-10 relative text-center">
        <AnimateIn y={100}>
          <h2>Why Etavelle? The Choice of <br/>High-Performance Website Solutions</h2>
        </AnimateIn>
        <AnimateIn y={100}>
          <p>At Etavelle, we create high-performance websites that drive results and elevate your online presence.</p>
        </AnimateIn>
      </div>
      <div className="flex justify-center gap-3 flex-wrap relative">
      {
        points.map((point, index) => {
          return (
            <AnimateIn y={100} key={index} className="w-full md:w-auto">
              <Container className="w-full max-w-full flex md:flex-col items-center py-2 md:py-5 text-center bg-[white] px-3 md:px-5">
                <Image
                  alt="point icon"
                  src={point.icon}
                  height={0}
                  width={0}
                  className="h-20 w-20"
                />
                <p className="md:w-50">{point.text}</p>
              </Container>
            </AnimateIn>
          )
        })
      }
      </div>

    </section>
  )
}