"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LuxuryImageDistortion({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 h-full w-full bg-cover bg-center"
      data-alt={alt}
      animate={{
        backgroundPosition: `${50 + (mousePosition.x / (typeof window !== "undefined" ? window.innerWidth : 1000) - 0.5) * 5}% ${50 + (mousePosition.y / (typeof window !== "undefined" ? window.innerHeight : 1000) - 0.5) * 5}%`
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 1 }}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imageUrl}')`
      }}
    />
  );
}