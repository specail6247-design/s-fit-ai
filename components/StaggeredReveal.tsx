'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface StaggeredRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function StaggeredReveal({ text, className = '', delay = 0 }: StaggeredRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      custom={1}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-1">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
