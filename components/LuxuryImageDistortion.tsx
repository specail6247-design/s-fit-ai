"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}

export default function LuxuryImageDistortion({
  imageUrl,
  alt = "Luxury Item",
  className = "",
}: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use framer motion values for performance on tracking mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();

      // Calculate normalized mouse position from center of container (-1 to 1)
      const x = (e.clientX - left - width / 2) / (width / 2);
      const y = (e.clientY - top - height / 2) / (height / 2);

      mouseX.set(x * -20); // Adjust multiplier for stronger/weaker effect
      mouseY.set(y * -20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          x: springX,
          y: springY,
        }}
        data-alt={alt}
        role="img"
        aria-label={alt}
      />
      {/* Optional luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}
