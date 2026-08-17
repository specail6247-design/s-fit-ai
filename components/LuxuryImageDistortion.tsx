"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LuxuryImageDistortion({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden group">
      <motion.div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
        initial={{ filter: "brightness(0.8) contrast(1.2)" }}
        whileHover={{ filter: "brightness(1) contrast(1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 pointer-events-none mix-blend-overlay" />
    </div>
  );
}
