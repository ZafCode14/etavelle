import Hero from "./sections/hero/Hero";
import Services from "./sections/servicess/Services";
import WhyEtavelle from "./sections/whyEtavelle/WhyEtavelle";
import Projects from "./sections/projectss/Projects";
import Contact from "./sections/contact/Contact";
import Testimonials from "./sections/testimonials/Testimonials";

export default function Home() {
  return (
    <main className="text-gray-950 flex flex-col items-center w-full">
      <Hero/>
      <Services/>
      <WhyEtavelle/>
      <Projects/>
      <Contact/>
      <Testimonials/>
    </main>
  );
}