import GraphicalElement from "@/app/sections/whyEtavelle/GraphicalElement"
import AnimateIn from "@/components/AnimateIn"
import Container from "@/components/Container"
import Image from "next/image"

export default function WhatYouGet() {
  const points = [
    {
      icon: '/icons/points/design.svg',
      text: 'Custom Design aligned with your brand guidelines'
    },
    {
      icon: '/icons/points/components.svg',
      text: 'Modular components built for future flexibility'
    },
    {
      icon: '/icons/points/layout.svg',
      text: 'Responsive layouts tailored to your audience’s devices'
    },
    {
      icon: '/icons/points/search.svg',
      text: 'SEO-optimized structure from day one'
    },
    {
      icon: '/icons/points/code.svg',
      text: 'Clean, scalable code using modern frameworks like Next.js'
    },
    {
      icon: '/icons/points/cms.svg',
      text: 'Optional integrations (CRM, analytics, booking, e-commerce)'
    },
  ]
  return (
    <section className="bg-[#F7F7FD] px-3 py-20 rounded-3xl flex flex-col items-center w-full overflow-hidden">
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
          <h2>What You Get?</h2>
        </AnimateIn>
      </div>
      <div className="flex justify-center gap-3 flex-wrap relative">
      {
        points.map((point, index) => {
          return (
            <AnimateIn y={100} key={index} className="w-[48%] md:w-[30%]">
              <Container className="w-full max-w-full flex flex-col items-center py-2 md:py-5 text-center bg-[white] px-3 md:px-5">
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