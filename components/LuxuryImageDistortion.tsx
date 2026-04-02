"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface LuxuryImageDistortionProps {
  imageUrl: string;
  altText: string;
}

export default function LuxuryImageDistortion({ imageUrl, altText }: LuxuryImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position relative to center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth mouse position
  const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 });

  // Map mouse position to rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Parallax translation
  const translateX = useTransform(mouseX, [-0.5, 0.5], ["-15px", "15px"]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], ["-15px", "15px"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // In a full-screen app, window might be a better target, but let's stick to container or window.
      // Instructions mention memory tip: "When implementing custom cursor tracking in React components... attach a mousemove event listener on the window"
      // Wait, that's for the custom cursor. For parallax, we can track mouse over the window too.
      const relativeX = e.clientX / window.innerWidth - 0.5;
      const relativeY = e.clientY / window.innerHeight - 0.5;

      x.set(relativeX);
      y.set(relativeY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden [perspective:1000px] z-0"
    >
      <motion.div
        className="relative h-[110%] w-[110%]"
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-label={altText}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30 opacity-90" />
        </div>
      </motion.div>
    </div>
  );
}
