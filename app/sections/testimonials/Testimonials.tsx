"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useRef } from "react";
import AnimateIn from "@/components/AnimateIn";

export default function Testimonials() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const carouselRef = useRef<any>(null); // Access the carousel instance

  const testimonials = [
    {
      text: "Working with Etavelle was a game-changer. In just three months, our site traffic tripled—and the quality of leads improved dramatically.",
      name: "Emily Carter",
      clientTitle: "Head of Digital Marketing, GreenTech Solutions",
      image: "/images/clients/EmilyCarter.jpg"
    },
    {
      text: "Our old website wasn’t doing us any favors. Etavelle completely reimagined it—and now it's fast, intuitive, and actually converts. We’re thrilled.",
      name: "Liam Rodriguez",
      clientTitle: "Co-Founder, EcoRide Bikes",
      image: "/images/clients/LiamRodriguez.jpg"
    },
    {
      text: "They delivered ahead of schedule, nailed the vision, and were incredibly responsive throughout. Honestly, the best agency experience I’ve had.",
      name: "Sofia Nguyen",
      clientTitle: "CEO, Bloom Online Boutique",
      image: "/images/clients/SofiaNguyen.jpg"
    },
    {
      text: "Etavelle didn’t just build a site—they helped define our entire digital strategy. Their insights shaped everything from branding to launch.",
      name: "Daniel Kim",
      clientTitle: "Founder, StartRight Academy",
      image: "/images/clients/DanielKim.jpg"
    },
    {
      text: "We’ve seen a 40% bump in conversions since going live. Their SEO work and attention to user flow made all the difference.",
      name: "Isabelle Moreau",
      clientTitle: "Marketing Lead, VinoVibe",
      image: "/images/clients/IsabelleMoreau.jpg"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      if (carousel.canScrollNext()) {
        carousel.scrollNext();
      } else {
        carousel.scrollTo(0); // go back to the first item
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="md:py-20 py-10">
      <AnimateIn y={100}>
        <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
      </AnimateIn>
      <AnimateIn y={100}>
        <p className="text-center mb-10 px-3">See what our clients have to say about working with us. <br/>We are proud to help them achieve their goals.</p>
      </AnimateIn>
      
      <AnimateIn y={100}>
        <Carousel setApi={(api) => (carouselRef.current = api)}>
          <CarouselContent className="px-5">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 p-4">
                <Card className="h-full border-none rounded-2xl shadow-lg bg-[#fafafa]">
                  <CardContent className="p-6 flex flex-col justify-between h-full pt-0">
                    <Image
                      src={"/icons/graphicalElements/quotes.svg"}
                      alt="Quotes"
                      width={0}
                      height={0}
                      className="w-10 h-10 self-center mb-5"
                    />
                    <p className="text-gray-800 text-lg leading-relaxed italic mb-6">“{testimonial.text}”</p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.image}
                        alt="client image"
                        width={100}
                        height={100}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.clientTitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 gap-10">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </AnimateIn>
    </section>
  );
}