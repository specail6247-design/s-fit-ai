"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], display: "swap" });

export default function LuxuryLiveFitting() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFitting, setIsFitting] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use document.getElementById for direct DOM manipulation of cursor to avoid React state lag
      const cursor = document.getElementById("luxury-cursor");
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [isClicking, setIsClicking] = useState(false);

  const handleStartAnalysis = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 200);

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsFitting(true);
      setTimeout(() => {
        setIsFitting(false);
      }, 3000);
    }, 2000);
  };

  const hideUI = isAnalyzing || isFitting;

  const garmentImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E";

  return (
    <div className={`relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden ${spaceGrotesk.className} cursor-none`}>
      {/* Custom Gold Ring Cursor */}
      <div
        id="luxury-cursor"
        className={`fixed z-[9999] pointer-events-none rounded-full border border-[#ecab13] transition-transform duration-300 ease-out flex items-center justify-center`}
        style={{
          width: isHoveringClickable ? '60px' : '30px',
          height: isHoveringClickable ? '60px' : '30px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHoveringClickable ? 'rgba(236,171,19,0.1)' : 'transparent',
          mixBlendMode: 'difference'
        }}
      >
        {isHoveringClickable && <div className="w-1.5 h-1.5 bg-[#ecab13] rounded-full" />}
      </div>

      {/* Main Background Image / 3D Viewer */}
      <div className={`fixed inset-0 z-0 transition-transform duration-500 ${isClicking ? "scale-95 opacity-80" : "scale-100 opacity-100"}`}>
        <LuxuryImageDistortion imageUrl={garmentImageUrl} />
      </div>

      {/* Overlay to fade out UI during "Digital Mirror" state */}
      <AnimatePresence>
        {!hideUI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 min-h-screen flex flex-col justify-between p-8"
          >
            {/* Header */}
            <header className="flex justify-between items-center">
              <div
                className="flex items-center gap-4 cursor-pointer"
                onMouseEnter={() => setIsHoveringClickable(true)}
                onMouseLeave={() => setIsHoveringClickable(false)}
              >
                <div className="flex size-10 items-center justify-center rounded-full border border-white/20 hover:border-[#ecab13] hover:bg-[#ecab13]/10 transition-colors duration-500">
                  <span className="material-symbols-outlined text-sm font-light">arrow_back</span>
                </div>
                <h1 className={`text-xs tracking-[0.3em] uppercase ${cinzel.className}`}>S_FIT AI</h1>
              </div>

              <div
                className="text-xs tracking-[0.2em] uppercase text-white/50 cursor-pointer hover:text-[#ecab13] transition-colors duration-500"
                onMouseEnter={() => setIsHoveringClickable(true)}
                onMouseLeave={() => setIsHoveringClickable(false)}
              >
                Menu
              </div>
            </header>

            {/* Main Content (Staggered Reveal) */}
            <div className="max-w-xl self-start mt-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[#ecab13] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Masterpiece Collection</p>
                <h2 className={`${cinzel.className} text-5xl md:text-7xl font-light leading-tight mb-6`}>
                  Metallic Silk<br />Evening Blazer
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-md font-light">
                  Engineered with microscopic aluminum particles, creating a finish that flows like liquid metal under studio lighting. Designed for the bold.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-8"
              >
                <button
                  onClick={handleStartAnalysis}
                  onMouseEnter={() => setIsHoveringClickable(true)}
                  onMouseLeave={() => setIsHoveringClickable(false)}
                  className="group relative overflow-hidden bg-transparent border border-[#ecab13] text-[#ecab13] px-8 py-4 uppercase text-xs tracking-[0.2em] transition-all duration-500 hover:text-[#0a0a0a]"
                >
                  <div className="absolute inset-0 bg-[#ecab13] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-0"></div>
                  <span className="relative z-10 font-bold">Try on Masterpiece</span>
                </button>
                <div className="text-xl font-light tracking-wide">$2,850</div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase">Discover</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Fitting State / Digital Mirror Overlay */}
      <AnimatePresence>
        {hideUI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            {isAnalyzing && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 border border-[#ecab13] rounded-full flex items-center justify-center relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-2 border-[#ecab13] rounded-full"
                  />
                  <span className="material-symbols-outlined text-[#ecab13]">auto_awesome</span>
                </div>
                <p className={`${cinzel.className} text-[#ecab13] text-sm tracking-[0.3em] uppercase`}>Scanning Proportions</p>
              </motion.div>
            )}

            {isFitting && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-2 mt-auto mb-32"
              >
                <p className={`${cinzel.className} text-white text-lg tracking-[0.2em] uppercase`}>Masterpiece Fitting</p>
                <p className="text-white/50 text-xs tracking-widest uppercase">Calibrating Light Physics...</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extended Content to demonstrate smooth scrolling */}
      {!hideUI && (
        <div className="relative z-10 bg-[#0a0a0a] border-t border-white/10 mt-[100vh] py-32 px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <h3 className={`${cinzel.className} text-3xl font-light mb-6 text-[#ecab13]`}>The Craftsmanship</h3>
              <p className="text-white/60 font-light leading-relaxed mb-8">
                Every thread is meticulously rendered to capture the true essence of high-fashion luxury. The silk-metal alloy behaves dynamically, responding to environmental light with unparalleled realism.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between border-b border-white/10 py-4">
                  <span className="text-xs uppercase tracking-widest text-white/40">Material</span>
                  <span className="text-sm font-light">70% Italian Silk, 30% Metallic Alloy</span>
                </div>
                <div className="flex justify-between border-b border-white/10 py-4">
                  <span className="text-xs uppercase tracking-widest text-white/40">Physics Mesh</span>
                  <span className="text-sm font-light">12,400 Polygons</span>
                </div>
                <div className="flex justify-between border-b border-white/10 py-4">
                  <span className="text-xs uppercase tracking-widest text-white/40">Light Response</span>
                  <span className="text-sm font-light">Dynamic Raytracing</span>
                </div>
              </div>
            </div>
            <div className="aspect-[3/4] bg-zinc-900 border border-white/5 relative overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${garmentImageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
