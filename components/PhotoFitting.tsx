"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryCursor from "./masterpiece/LuxuryCursor";
import { motion, AnimatePresence } from "framer-motion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function PhotoFitting() {
  const [isChecked, setIsChecked] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate initial analysis
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
  };

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className} cursor-none`}>
      <LuxuryCursor />

      {/* Top App Bar */}
      <AnimatePresence>
        {!isAnalyzing && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="z-50 flex items-center justify-between bg-transparent p-4 absolute top-0 w-full"
          >
            <motion.div variants={itemVariants} className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#101622]/40 text-white backdrop-blur-md hover:bg-[#D4AF37]/20 transition-colors interactive">
              <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <h2 className={`${cinzel.className} text-xl font-bold leading-tight tracking-wider text-[#D4AF37]`}>S_FIT LUXE</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Masterpiece Edition</span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex w-12 items-center justify-end">
              <button className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#101622]/40 text-white backdrop-blur-md hover:bg-[#D4AF37]/20 transition-colors interactive">
                <span className="material-symbols-outlined">info</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewport (Photo Fitting Canvas) */}
      <div className="absolute inset-0 z-0">
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g")',
            filter: isAnalyzing ? 'grayscale(0.8) brightness(0.7)' : 'saturate(0.9) contrast(1.1)',
          }}
        >
          {/* Scanning Effect */}
          <AnimatePresence>
            {isAnalyzing && (
                <motion.div
                    initial={{ opacity: 0, top: "0%" }}
                    animate={{ opacity: 1, top: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute z-20 h-[2px] w-full"
                    style={{
                    background: "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
                    boxShadow: "0 0 20px #D4AF37",
                    }}
                ></motion.div>
            )}
          </AnimatePresence>

          {/* HUD Overlays */}
          <AnimatePresence>
            {!isAnalyzing && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-panel absolute left-4 top-24 rounded-lg p-3 border border-white/10 bg-black/40 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-2">
                      <div className="size-2 animate-pulse rounded-full bg-[#D4AF37]"></div>
                      <p className="text-[10px] font-bold uppercase tracking-tighter text-white/60">Real-time Simulation</p>
                    </div>
                    <p className={`mt-1 text-xs ${cinzel.className} text-[#D4AF37]`}>
                      Metallic Liquid Silk
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-panel absolute right-4 top-24 rounded-lg p-3 text-right border border-white/10 bg-black/40 backdrop-blur-md"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-white/60">Mesh Density</p>
                    <p className={`mt-1 text-xs ${cinzel.className} text-[#D4AF37]`}>42,000 Polygons</p>
                  </motion.div>
                </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Processing State (Overlay) */}
      <AnimatePresence>
        {isAnalyzing && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                className="absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6"
            >
                <div className="glass-panel mx-auto max-w-sm rounded-xl p-8 shadow-2xl border border-[#D4AF37]/30 bg-black/80 backdrop-blur-xl">
                <div className="flex flex-col gap-4">
                    <div className="flex items-end justify-between gap-6">
                    <div className="flex flex-col">
                        <p className={`text-2xl font-bold leading-none tracking-tight text-white ${cinzel.className}`}>Analyzing...</p>
                        <p className="mt-2 text-xs font-normal italic text-[#D4AF37]">Digital Mirror Initialization</p>
                    </div>
                    </div>
                    <div className="h-0.5 overflow-hidden w-full bg-white/10">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="h-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]"
                    ></motion.div>
                    </div>
                </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Footer */}
      <AnimatePresence>
        {!isAnalyzing && (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="mt-auto space-y-4 p-4 z-40 w-full bg-gradient-to-t from-black/90 to-transparent"
            >
                <motion.div variants={itemVariants} className="flex items-center justify-between px-2">
                <h3 className={`text-sm font-bold leading-tight tracking-wider uppercase text-white ${cinzel.className}`}>Fitting Controls</h3>
                <span className="rounded border border-[#D4AF37] px-2 py-0.5 text-[10px] text-[#D4AF37]">PRO</span>
                </motion.div>
                <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3">
                <div className="glass-panel group flex items-center justify-between rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors interactive">
                    <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                        <span className="material-symbols-outlined">thermostat</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold leading-tight text-white">Fit Heatmap</p>
                        <p className="text-[11px] font-normal leading-normal text-white/60">Show tension areas on body</p>
                    </div>
                    </div>
                    <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-none bg-white/10 p-0.5 transition-all has-[:checked]:justify-end has-[:checked]:bg-[#D4AF37]">
                    <div className="h-full w-[24px] rounded-full bg-white shadow-lg"></div>
                    <input checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="invisible absolute" type="checkbox" />
                    </label>
                </div>
                <div className="glass-panel flex items-center justify-between rounded-xl p-4 border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors interactive">
                    <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                        <span className="material-symbols-outlined">waves</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold leading-tight text-white">Fabric Physics</p>
                        <p className="text-[11px] font-normal leading-normal text-white/60">Simulate movement & weight</p>
                    </div>
                    </div>
                    <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-none bg-white/10 p-0.5 transition-all has-[:checked]:justify-end has-[:checked]:bg-[#D4AF37]">
                    <div className="h-full w-[24px] rounded-full bg-white shadow-lg"></div>
                    <input className="invisible absolute" type="checkbox" />
                    </label>
                </div>
                </motion.div>
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] text-base font-bold text-black shadow-lg shadow-[#D4AF37]/20 transition-colors hover:bg-[#b5952f] interactive"
                >
                <span className="material-symbols-outlined">check_circle</span>
                Confirm & Proceed
                </motion.button>
                <div className="h-4"></div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Heatmap Legend */}
      <AnimatePresence>
        {!isAnalyzing && isChecked && (
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.8 }}
                className="glass-panel absolute bottom-64 left-4 z-40 flex flex-col gap-1.5 rounded-lg p-2 border border-white/10 bg-black/40 backdrop-blur-md"
            >
                <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red-500"></div>
                <span className="text-[9px] font-bold uppercase text-white">Tight</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500"></div>
                <span className="text-[9px] font-bold uppercase text-white">Perfect</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-500"></div>
                <span className="text-[9px] font-bold uppercase text-white">Loose</span>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
