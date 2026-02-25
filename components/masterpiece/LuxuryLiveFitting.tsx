"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g";

export default function LuxuryLiveFitting() {
  const { isAnalyzing, isFitting, setIsAnalyzing, setIsFitting } = useStore();

  // Simulate analysis/fitting process
  const handleTryOn = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
        setIsAnalyzing(false);
        setIsFitting(true);
        setTimeout(() => setIsFitting(false), 3000); // 3s fitting simulation
    }, 2000); // 2s analysis simulation
  };

  // UI elements fade out completely during immersive states
  const showUI = !isAnalyzing && !isFitting;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white font-sans">
      {/* Background / Product Image with Distortion */}
      <div className="absolute inset-0 z-0">
        <LuxuryImageDistortion
            image={DEFAULT_IMAGE}
            className="h-full w-full opacity-80" // slight dim for text readability
        />
        {/* Cinematic Vignette */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: 'radial-gradient(circle at center, transparent 0%, #000000 100%)' }}
        />
      </div>

      {/* Main UI Container */}
      <AnimatePresence>
        {showUI && (
          <motion.div
            className="relative z-10 flex h-full flex-col justify-between p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Header */}
            <header className="flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <button className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all hover:border-[#D4AF37] hover:bg-black/40">
                        <span className="material-symbols-outlined text-white transition-colors group-hover:text-[#D4AF37]">arrow_back</span>
                    </button>
                    <h1 className="font-serif text-xl tracking-[0.2em] text-[#D4AF37]">S_FIT MASTERPIECE</h1>
                 </div>
                 <div className="text-right">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50">Collection</p>
                    <p className="font-serif text-sm text-white">Ethereal Silk</p>
                 </div>
            </header>

            {/* Footer / Product Details */}
            <footer className="w-full max-w-7xl mx-auto">
                <div className="flex items-end justify-between border-t border-white/10 pt-8">
                    <div className="space-y-4 max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <h2 className="font-serif text-5xl leading-tight text-white mb-2">Midnight Silk Gown</h2>
                            <p className="font-sans text-sm text-white/70 leading-relaxed max-w-md">
                                A masterpiece of liquid silk that responds to your every movement.
                                Features our signature kinetic draping engine for hyper-realistic physics.
                            </p>
                        </motion.div>

                        <div className="flex gap-4 pt-2">
                             {['XS', 'S', 'M', 'L'].map((size) => (
                                 <button key={size} className="w-10 h-10 border border-white/20 flex items-center justify-center font-sans text-xs hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                                     {size}
                                 </button>
                             ))}
                        </div>
                    </div>

                    <motion.button
                        onClick={handleTryOn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex items-center gap-6 overflow-hidden bg-[#D4AF37] px-10 py-5 text-black transition-all hover:bg-white"
                    >
                        <div className="flex flex-col items-start">
                             <span className="relative z-10 font-sans text-[10px] font-bold tracking-widest uppercase opacity-60">
                                Virtual Fitting
                            </span>
                            <span className="relative z-10 font-serif text-lg font-bold tracking-wide">
                                INITIATE TRY-ON
                            </span>
                        </div>
                        <span className="material-symbols-outlined relative z-10 text-2xl transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </motion.button>
                </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive State Overlay (Digital Mirror) */}
      <AnimatePresence>
        {(isAnalyzing || isFitting) && (
            <motion.div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="relative">
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[#D4AF37]/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                     <motion.div
                        className="absolute inset-0 rounded-full border border-[#D4AF37]/50"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                    <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-[#D4AF37] bg-black/80 backdrop-blur-md">
                        <span className="material-symbols-outlined text-4xl text-[#D4AF37] animate-pulse">
                            {isAnalyzing ? "visibility" : "checkroom"}
                        </span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <h3 className="font-serif text-2xl tracking-[0.3em] text-white">
                        {isAnalyzing ? "ANALYZING PHYSIQUE" : "CALCULATING DRAPE"}
                    </h3>
                    <p className="mt-2 font-sans text-xs uppercase tracking-widest text-[#D4AF37]/80">
                        {isAnalyzing ? "Mapping 3D landmarks..." : "Applying fluid dynamics..."}
                    </p>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
