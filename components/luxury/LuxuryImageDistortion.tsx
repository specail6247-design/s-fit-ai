"use client";
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface Props {
  imageUrl: string;
  alt: string;
  className?: string;
}

export const LuxuryImageDistortion: React.FC<Props> = ({ imageUrl, alt, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          rotateX,
          rotateY,
          scale: 1.05,
          transition: "transform 0.1s ease-out",
        }}
        title={alt}
      />
    </motion.div>
  );
};
