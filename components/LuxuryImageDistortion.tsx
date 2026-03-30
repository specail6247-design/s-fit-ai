"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  imageUrl: string;
  alt?: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, alt = "", className = "" }: Props) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-[-10%] bg-cover bg-center"
        animate={{
          x: mousePos.x * -20,
          y: mousePos.y * -20,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 1 }}
        style={{ backgroundImage: `url("${imageUrl}")` }}
        data-alt={alt}
      />
    </div>
  );
}