import MovingStripe from "@/components/MovingStripe";
import Service from "./Service";
import GraphicalElement from "../whyEtavelle/GraphicalElement";
import AnimateIn from "@/components/AnimateIn";

export default function Services(){
  const services = [
    {
      icon: "/icons/services/webDevelopment.svg",
      title: "Web Development",
      text: "We build fast, scalable websites using modern frameworks like Next.js, ensuring clean code, responsive layouts, and top-tier performance. Every project is optimized for SEO, usability, and future scalability."
    },
    {
      icon: "/icons/services/seoOptimization.svg",
      title: "SEO Optimization",
      text: "We optimize your website from the ground up — improving on-page SEO, technical structure, page speed, and keyword relevance to boost your visibility and rankings on Google and other search engines."
    },
    {
      icon: "/icons/services/maintenanceSupport.svg",
      title: "Maintenance & Support",
      text: "We provide ongoing website maintenance, security updates, bug fixes, and performance monitoring to ensure your site remains fast, secure, and fully functional after launch."
    },
    {
      icon: "/icons/services/uiuxDesign.svg",
      title: "UX/UI Design",
      text: "We craft clean, modern user interfaces that prioritize user behavior and business goals. Our design approach ensures intuitive navigation, high engagement, and seamless brand consistency."
    },
    {
      icon: "/icons/services/appDevelopment.svg",
      title: "App Development",
      text: "We develop custom mobile and web apps for iOS, Android, and cross-platform use. Each solution is tailored for performance, scalability, and user-centric design aligned with your business goals."
    },
    {
      icon: "/icons/services/hosting.svg",
      title: "Hosting Solutions",
      text: "We offer fast, secure, and scalable hosting tailored for modern websites and applications — including deployment, monitoring, uptime management, and CDN integration for maximum performance."
    }
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
      <div className="w-[700px] max-w-full relative">
        <AnimateIn y={100}>
          <h2>Web Development & SEO Services <br/>for High-Performance Websites</h2>
        </AnimateIn>
        <AnimateIn y={100}>
          <p>At Etavelle, we deliver high-performance websites and apps with a focus on UX/UI design, web development, and SEO. Our solutions are crafted to improve user experience, drive higher conversions, and ensure long-term growth with top-tier performance and SEO strategies.</p>
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