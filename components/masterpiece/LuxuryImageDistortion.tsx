"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface LuxuryImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function LuxuryImageDistortion({ src, alt, className = "", priority = false }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#101922] ${className}`}
    >
      <motion.div
        className="absolute inset-0 h-[130%] w-full"
        style={{ y, scale }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle overlay for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 mix-blend-multiply" />
      </motion.div>
    </div>
  );
}
