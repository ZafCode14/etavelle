'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import Link from 'next/link';

const lighthouse = ["Performance", "Accessibility", "Best Practices", "SEO"];

export default function Lighthouse() {
  return (
    <div className="flex gap-5">
      {lighthouse.map((el, index) => (
        <LighthouseIndicator key={index} label={el} />
      ))}
    </div>
  );
}

function LighthouseIndicator({ label }: { label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, 100, {
        duration: 2,
        ease: "easeOut",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Link href={'https://pagespeed.web.dev/analysis/https-etavelle-com/raflh4y2p5?form_factor=mobile'} target='_blank' ref={ref} className="flex flex-col items-center">
      <div className="relative h-13 w-13 bg-[#67bb6546] rounded-full">
        {/* Background Circle */}
        <div className="absolute inset-0 rounded-full border-4 md:border-2 border-gray-300" />

        {/* Animated Progress Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 md:border-5 border-[#30af30]"
          style={{
            clipPath: 'inset(0 round 9999px)',
            rotate: '-90deg',
            maskImage: `conic-gradient(#000 0%, transparent 0%)`,
            WebkitMaskImage: `conic-gradient(#000 0%, transparent 0%)`,
          }}
          animate={
            inView
              ? {
                  maskImage: `conic-gradient(#000 100%, transparent 0%)`,
                  WebkitMaskImage: `conic-gradient(#000 100%, transparent 0%)`,
                }
              : {}
          }
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Animated Number */}
        <motion.p
          className="absolute inset-0 flex items-center justify-center !text-[#30af30] font-bold !text-xl"
        >
          {rounded}
        </motion.p>
      </div>
      <p className="!text-xs md:!text-md mt-2 font-bold">{label}</p>
    </Link>
  );
}