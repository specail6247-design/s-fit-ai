"use client";
import React from "react";
import { motion } from "framer-motion";

export const LuxuryLoading = () => {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#2d2d2d]">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(45deg, transparent 40%, rgba(212, 175, 55, 0.05) 50%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["200% 0%", "-200% 0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
      />
      <div className="relative z-10 w-16 h-16">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.rect
            x="10"
            y="10"
            width="80"
            height="80"
            fill="none"
            stroke="#d4af37"
            strokeWidth="1.5"
            strokeDasharray="320"
            initial={{ strokeDashoffset: 320 }}
            animate={{ strokeDashoffset: [320, 0, -320] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
          <motion.rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="none"
            stroke="rgba(212, 175, 55, 0.3)"
            strokeWidth="1"
            strokeDasharray="240"
            initial={{ strokeDashoffset: 240 }}
            animate={{ strokeDashoffset: [240, 0, -240] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
      </div>
    </div>
  );
};
