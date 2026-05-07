'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface StaggeredRevealProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  as?: React.ElementType;
}

export const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = '',
  as: Component = 'div',
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Wrap text nodes in motion elements if needed, or assume children are already properly wrapped
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        // Split string into words for word-by-word reveal
        return child.split(' ').map((word, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ));
      }

      // If it's a valid element, clone it with variants
      if (React.isValidElement(child)) {
        return (
          <motion.div variants={itemVariants}>
            {child}
          </motion.div>
        );
      }

      return child;
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {renderChildren()}
    </motion.div>
  );
};

export default StaggeredReveal;
