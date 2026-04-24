'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordMode?: boolean;
}

export default function StaggeredText({ text, className = '', delay = 0, wordMode = false }: StaggeredTextProps) {
  const words = text.split(' ');
  const characters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: wordMode ? 0.05 : 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
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
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {wordMode
        ? words.map((word, index) => (
            <motion.span variants={child} key={index} style={{ marginRight: '0.25em' }}>
              {word}
            </motion.span>
          ))
        : characters.map((char, index) => (
            <motion.span variants={child} key={index}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
    </motion.div>
  );
}
