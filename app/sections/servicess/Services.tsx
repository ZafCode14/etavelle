import MovingStripe from "@/components/MovingStripe";
import Service from "./Service";
import GraphicalElement from "../whyEtavelle/GraphicalElement";
import AnimateIn from "@/components/AnimateIn";

export default function Services(){
  const services = [
    {
      icon: "/icons/services/webDevelopment.svg",
      title: "Web Development",
      text: "Our web development team builds responsive, mobile-first websites optimized for user experience and search engine performance. We ensure clean, scalable code that delivers seamless functionality and fast load times."
    },
    {
      icon: "/icons/services/seoOptimization.svg",
      title: "SEO Optimization",
      text: "We create intuitive, visually appealing user interfaces and user experiences that engage visitors and enhance usability, ensuring that your site is both attractive and easy to navigate."
    },
    {
      icon: "/icons/services/maintenanceSupport.svg",
      title: "Maintenance & Support",
      text: "Our web development team builds responsive, mobile-first websites optimized for user experience and search engine performance. We ensure clean, scalable code that delivers seamless functionality and fast load times."
    },
    {
      icon: "/icons/services/uiuxDesign.svg",
      title: "UX/UI Design",
      text: "We create intuitive, visually appealing user interfaces and user experiences that engage visitors and enhance usability, ensuring that your site is both attractive and easy to navigate."
    },
    {
      icon: "/icons/services/appDevelopment.svg",
      title: "App Development",
      text: "We specialize in high-performance mobile app development, delivering seamless functionality on Android and iOS platforms tailored to your business needs."
    },
    {
      icon: "/icons/services/hosting.svg",
      title: "Hosting Solutions",
      text: "We specialize in high-performance mobile app development, delivering seamless functionality on Android and iOS platforms tailored to your business needs."
    },
  ]
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
      <div className="w-[700px] max-w-full relative">
        <AnimateIn y={100}>
          <h2>Our Website Solutions -<br/> Speed & SEO Excellence</h2>
        </AnimateIn>
        <AnimateIn y={100}>
          <p>At Etavelle, we focus on combining exceptional UX/UI design with advanced web development, app development, and SEO strategies. Our goal is to create websites and apps that not only look great but also perform exceptionally well, driving conversions and ensuring long-term success.</p>
        </AnimateIn>
      </div>

      <div className="flex justify-center gap-3 md:gap-6 flex-wrap mt-10 md:mt-20 mb-20">
        {services.map((service, index) => {
          return (
            <AnimateIn y={100} key={index} className="basis-[100%] md:basis-[47%] lg:basis-[30%]">
              <Service
                icon={service.icon}
                title={service.title}
                text={service.text}
              />
            </AnimateIn>
          )
        })}
      </div>
      <AnimateIn y={100}>
        <MovingStripe/>
      </AnimateIn>
    </section>
  );
}