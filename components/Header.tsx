"use client";
import Image from "next/image";
import AnimateIn from "./AnimateIn";
import { useEffect, useState } from "react";

function Header() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial value

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const style = `
    flex justify-center
    flex-1 px-3 py-2
    hover:bg-[#d2e0e2] active:bg-[#d2e0e2]
    duration-300 transition-all
  `;

  return (
    <header className={`
      fixed top-0 z-20
      flex justify-center 
      w-full h-[70px]
      text-black
      transition-colors duration-300
      px-3 backdrop-blur-lg
    `}>
      <AnimateIn className="
        flex justify-end items-center 
        md:justify-center 
        w-[1200px] max-w-full relative
      " y={-50}>
        <a href="#hero" className={`
          flex items-center 
          ${scrollPercent < 10 ?  "bg-[#e3eef0]" : "bg-[white]"}
          hover:bg-[#d2e0e2] active:bg-[#d2e0e2]
          absolute left-0 top-0 pt-4 px-5 pb-4 rounded-b-full
        `}
          style={{
            boxShadow: "0px 3px 15px 0px #00000022"
          }}
        >
          <Image 
            src={"/icons/logo.svg"} 
            alt={"Logo"} 
            width={"36"} 
            height={"36"} 
            className="h-7 w-7" 
            priority
          />
        </a>
        <div 
          className={`
            flex justify-center items-center
            bg-[#ffffff] 
            font-bold
            rounded-full !text-sm
          `}
          style={{
            boxShadow: "0px 3px 15px 0px #00000022"
          }}
        >
          <a href="#services" className={`
            ${style} rounded-l-full px-5
            ${scrollPercent >= 10 && scrollPercent < 50 ?  "bg-[#e3eef0]" : "bg-[white]"}
            `}>Services</a>
          <a href="#projects" className={`
            ${style} px-5
            ${scrollPercent >= 50 && scrollPercent < 70 ?  "bg-[#e3eef0]" : "bg-[white]"}
          `}>Projects</a>
          <a href="#contact" className={`
            ${style} rounded-r-full px-5
            ${scrollPercent >= 70 ?  "bg-[#e3eef0]" : "bg-[white]"}
          `}>Contact</a>
        </div>
      </AnimateIn>

      {/* Optional: Display the scroll percent for dev */}
      {/* <div className="fixed bottom-2 right-2 text-xs text-gray-500">{scrollPercent.toFixed(0)}%</div> */}
    </header>
  );
}

export default Header;