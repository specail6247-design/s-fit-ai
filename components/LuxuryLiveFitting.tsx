"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "@/components/masterpiece/LuxuryImageDistortion";
import GoldRingCursor from "@/components/ui/GoldRingCursor";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9]
    }
  }
};

export default function LuxuryLiveFitting() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFitting, setIsFitting] = useState(false);
  // Default image (Liquid Silk example from PhotoFitting)
  const [imageSrc, setImageSrc] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g");

  // Simulate analysis/fitting process
  useEffect(() => {
    if (isAnalyzing) {
        const timer = setTimeout(() => {
            setIsAnalyzing(false);
            setIsFitting(true);
        }, 3000); // 3 seconds analysis
        return () => clearTimeout(timer);
    }
  }, [isAnalyzing]);

  const handleStartFitting = () => {
      setIsAnalyzing(true);
  };

  const toggleUI = () => {
      if (isFitting) {
        setIsFitting(false);
      }
  };

  const showUI = !isAnalyzing && !isFitting;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-[#ecab13] selection:text-black">
      {/* Background with Distortion */}
      <div className="absolute inset-0 z-0 cursor-pointer" onClick={toggleUI}>
        <LuxuryImageDistortion imageSrc={imageSrc} className="h-full w-full" />

        {/* Cinematic Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        {/* Grain Overlay provided by layout, but can reinforce here if needed */}
      </div>

      {/* Gold Ring Cursor */}
      <GoldRingCursor />

      {/* UI Layer */}
      <AnimatePresence mode="wait">
        {showUI && (
          <motion.div
            key="ui-layer"
            className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <motion.header variants={itemVariants} className="pointer-events-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors hover:border-[#ecab13] hover:text-[#ecab13]">
                  <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1" aria-hidden="true">arrow_back</span>
                  <span className="sr-only">Go Back</span>
                </button>
                <h1 className="font-cinzel text-2xl font-bold tracking-widest text-white">
                  S_FIT <span className="text-[#ecab13]">LUXURY</span>
                </h1>
              </div>
              <div className="flex gap-4">
                 <button className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors hover:border-[#ecab13] hover:text-[#ecab13]">
                  <span className="material-symbols-outlined" aria-hidden="true">shopping_bag</span>
                   <span className="sr-only">Cart</span>
                </button>
              </div>
            </motion.header>

            {/* Center Info - Staggered */}
            <div className="pointer-events-auto absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-8 text-right">
                <motion.div variants={itemVariants} className="flex flex-col items-end">
                    <span className="font-space-grotesk text-xs font-bold uppercase tracking-[0.2em] text-[#ecab13]">Collection</span>
                    <h2 className="font-cinzel text-5xl font-bold leading-tight text-white">Midnight<br/>Velvet</h2>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-end gap-1">
                     <span className="font-space-grotesk text-xs font-bold uppercase tracking-[0.2em] text-white/60">Material</span>
                     <p className="font-space-grotesk text-sm">Liquid Silk / 98% Mulberry</p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-end gap-1">
                     <span className="font-space-grotesk text-xs font-bold uppercase tracking-[0.2em] text-white/60">Price</span>
                     <p className="font-space-grotesk text-xl font-bold text-white">$12,500</p>
                </motion.div>
            </div>

            {/* Footer Controls */}
            <motion.div variants={itemVariants} className="pointer-events-auto flex flex-col gap-6">
               <div className="flex items-center justify-between">
                   <div className="flex gap-4">
                       <button className="rounded-full border border-white/20 bg-black/40 px-6 py-3 font-space-grotesk text-sm backdrop-blur-md transition-all hover:bg-[#ecab13] hover:text-black hover:border-[#ecab13]">
                           Size Guide
                       </button>
                        <button className="rounded-full border border-white/20 bg-black/40 px-6 py-3 font-space-grotesk text-sm backdrop-blur-md transition-all hover:bg-[#ecab13] hover:text-black hover:border-[#ecab13]">
                           Details
                       </button>
                   </div>

                   <button
                        onClick={handleStartFitting}
                        className="group relative overflow-hidden rounded-full bg-[#ecab13] px-12 py-4 font-space-grotesk font-bold text-black transition-transform hover:scale-105"
                   >
                       <span className="relative z-10 flex items-center gap-2">
                           START FITTING
                           <span className="material-symbols-outlined text-lg" aria-hidden="true">auto_awesome</span>
                       </span>
                       <div className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                   </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
            <motion.div
                key="analyzing-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
                <div className="flex flex-col items-center gap-6">
                    {/* Minimalist Spinner */}
                    <div className="size-16 rounded-full border-2 border-white/10 border-t-[#ecab13] animate-spin" />
                    <p className="font-space-grotesk text-sm font-bold tracking-widest text-[#ecab13] uppercase animate-pulse">Analyzing Geometry</p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
