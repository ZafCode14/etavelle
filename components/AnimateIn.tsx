"use client";
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  x?: number
  y?: number
  className?: string;
}

export default function AnimateIn({ children, x = 0, y = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}