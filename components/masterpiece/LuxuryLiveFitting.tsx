"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import LuxuryCursor from "./LuxuryCursor";

const PRODUCT_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g";

export default function LuxuryLiveFitting() {
  const [isChecked, setIsChecked] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFitting, setIsFitting] = useState(false);

  // Simulated flow
  const handleConfirm = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsFitting(true);
      setTimeout(() => {
        setIsFitting(false);
      }, 3000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
    },
    exit: {
      opacity: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.5 } as any
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
    }
  };

  const isImmersive = isAnalyzing || isFitting;

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white">
      <LuxuryCursor />

      {/* Background with Distortion */}
      <div className="absolute inset-0 z-0">
        <LuxuryImageDistortion imageUrl={PRODUCT_IMAGE_URL} />

        {/* Scanning/Immersive Overlay */}
        <AnimatePresence>
          {isImmersive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px]"
            >
              <div
                className="absolute top-[40%] h-[2px] w-full"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
                  boxShadow: "0 0 20px #D4AF37",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UI Layer */}
      <AnimatePresence>
        {!isImmersive && (
          <motion.div
            className="relative z-20 flex h-full flex-col p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="flex size-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer">
                <span className="material-symbols-outlined text-white">arrow_back</span>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-normal tracking-widest text-[#D4AF37]" style={{ fontFamily: 'var(--font-cinzel), serif' }}>S_FIT AI</h2>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Masterpiece Collection</span>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer">
                <span className="material-symbols-outlined text-white">info</span>
              </div>
            </motion.div>

            {/* Product Info - Staggered Reveal */}
            <motion.div variants={itemVariants} className="mt-8 max-w-sm">
               <div className="backdrop-blur-md bg-black/40 p-6 rounded-none border-l-2 border-[#D4AF37]">
                 <h1 className="text-4xl text-white mb-2" style={{ fontFamily: 'var(--font-cinzel), serif' }}>Metallic Liquid Silk</h1>
                 <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                   Experience the fluidity of digital couture. Our proprietary physics engine simulates 42,000 polygons of pure luxury.
                 </p>
               </div>
            </motion.div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Controls */}
            <motion.div variants={itemVariants} className="space-y-4 max-w-md ml-auto w-full">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                 <span className="text-xs uppercase tracking-widest text-[#D4AF37]">Fitting Options</span>
                 <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded">PRO</span>
              </div>

              <div className="group flex items-center justify-between p-4 bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#D4AF37]">thermostat</span>
                  <div>
                    <p className="text-lg" style={{ fontFamily: 'var(--font-cinzel), serif' }}>Tension Map</p>
                    <p className="text-xs text-white/50" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Visualize fit pressure points</p>
                  </div>
                </div>
                <div className="relative">
                   <input
                     type="checkbox"
                     checked={isChecked}
                     onChange={() => setIsChecked(!isChecked)}
                     className="peer sr-only"
                   />
                   <div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full h-16 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#C5A028] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
              >
                Start Fitting Analysis
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analyzing/Fitting Overlay */}
      <AnimatePresence>
        {isImmersive && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <h2 className="text-5xl text-white mb-4 tracking-widest" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                {isAnalyzing ? "ANALYZING" : "FITTING"}
              </h2>
              <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto mb-4" />
              <p className="text-sm text-white/60 tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                {isAnalyzing ? "Scanning Body Geometry" : "Calculating Fabric Physics"}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
