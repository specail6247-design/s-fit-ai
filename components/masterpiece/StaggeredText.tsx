'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function StaggeredText({ text, className = '', delay = 0, once = true }: StaggeredTextProps) {
  // Split text into words for word-level animation
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block mr-1 lg:mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
