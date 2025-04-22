"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MovingStripe() {
  const icons = [
    "/icons/technologies/figma.svg",
    "/icons/technologies/firebase.svg",
    "/icons/technologies/flutter.svg",
    "/icons/technologies/github.svg",
    "/icons/technologies/typescript.svg",
    "/icons/technologies/next.svg",
    "/icons/technologies/nodejs.svg",
    "/icons/technologies/react.svg",
    "/icons/technologies/tailwind.svg",
    "/icons/technologies/vercel.svg",
    "/icons/technologies/figma.svg",
    "/icons/technologies/firebase.svg",
    "/icons/technologies/flutter.svg",
    "/icons/technologies/github.svg",
    "/icons/technologies/typescript.svg",
    "/icons/technologies/next.svg",
    "/icons/technologies/nodejs.svg",
    "/icons/technologies/react.svg",
    "/icons/technologies/tailwind.svg",
    "/icons/technologies/vercel.svg",
  ]
  return (
      <motion.div 
        className={`py-5 text-[20px] self-start flex justify-between w-[2500px] md:w-[3000px] lg:w-[4000px] xl:w-[4500px] bg-[#fafafa] border border-[#e4e4e4]`}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20, // Adjust the speed of the animation
          ease: "linear",
        }}
      >
        {icons.map((icon, index) => {
          return (
            <div key={index}>
              <Image
                alt='tech icon'
                src={icon}
                width={0}
                height={0}
                className='md:w-15 md:h-15 h-10 w-10'
              />
            </div>
          )
        })}
        <div></div>
      </motion.div>
  )
}
