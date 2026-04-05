"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Space_Grotesk, Cinzel } from "next/font/google";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFitting, setIsFitting] = useState(false);
  const [progress, setProgress] = useState(0);


  // Simulate fitting process
  const startFitting = () => {
    setIsAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setIsFitting(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // When fitting or analyzing, we want the "Digital Mirror" effect (UI opacity 0%)
  const isImmersive = isAnalyzing || isFitting;

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white cursor-none ${spaceGrotesk.className}`}>

      {/* Custom Cursor Component isolated to prevent re-renders */}
      <CustomCursor isImmersive={isImmersive} />

      {/* Main AR Viewport (Camera Mock) */}
      <div className="absolute inset-0 z-0 bg-zinc-900">
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(rgba(10,10,10,0.4), rgba(10,10,10,0.8)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            filter: 'saturate(0.9) contrast(1.1)'
          }}
        >
          {/* Scanning Effect during analysis */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] opacity-60 z-20"
                style={{
                  background: "linear-gradient(90deg, transparent, #ecab13, transparent)",
                  boxShadow: "0 0 15px #ecab13"
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* UI Overlay - Fades out in immersive state */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col pointer-events-none"
        animate={{ opacity: isImmersive ? 0 : 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Navigation */}
        <div className="flex items-center justify-between p-6 pointer-events-auto">
          <Link href="/luxury" className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 active:scale-95 transition-all">
            <span className="material-symbols-outlined">close</span>
          </Link>
          <div className="flex items-center gap-2 rounded-full px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10">
            <div className="size-2 animate-pulse rounded-full bg-[#ecab13]"></div>
            <h2 className={`text-sm font-bold tracking-[0.2em] uppercase text-white ${cinzel.className}`}>Digital Mirror</h2>
          </div>
          <button className="flex size-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 active:scale-95 transition-all">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>

        {/* Center Prompt */}
        <div className="flex-1 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h1 className={`text-3xl font-extralight text-white mb-4 ${cinzel.className}`}>Step into the frame</h1>
            <p className="text-zinc-400 text-sm tracking-widest uppercase">Align your body to begin</p>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="p-6 pb-12 mt-auto pointer-events-auto flex flex-col items-center gap-8">
          <button
            onClick={startFitting}
            className="group relative flex h-16 w-64 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#ecab13] to-[#c48a0a] text-[#0a0a0a] hover:scale-105 active:scale-95 transition-all"
          >
            <span className={`relative z-10 text-sm font-bold tracking-[0.2em] uppercase ${cinzel.className}`}>Initiate Fitting</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </motion.div>

      {/* Analyzing Progress UI - shown only when analyzing */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4 bg-black/40 p-8 rounded-2xl backdrop-blur-xl border border-white/10">
              <h2 className={`text-2xl text-white ${cinzel.className}`}>Analyzing Mesh</h2>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#ecab13]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[#ecab13] text-xs font-bold tracking-[0.2em]">{progress}%</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fitting Active UI - minimal escape hatch */}
      <AnimatePresence>
        {isFitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-6 right-6 z-30"
          >
            <button
              onClick={() => setIsFitting(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-sm">stop_circle</span>
              <span className="text-xs font-bold tracking-widest uppercase">End Session</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function CustomCursor({ isImmersive }: { isImmersive: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      // Throttle mousemove state updates with requestAnimationFrame
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        const target = e.target as HTMLElement;
        const isClickable = target.closest('button') || target.closest('a');
        setIsHovering(!!isClickable);
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[100] border border-[#ecab13] rounded-full mix-blend-difference flex items-center justify-center"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 16),
        y: mousePosition.y - (isHovering ? 24 : 16),
        width: isHovering ? 48 : 32,
        height: isHovering ? 48 : 32,
        backgroundColor: isHovering ? 'rgba(236,171,19,0.2)' : 'transparent',
        opacity: isImmersive ? 0 : 1 // Hide cursor in immersive mode if desired, or keep it. We keep it slightly visible.
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
    >
      {isHovering && <motion.div className="w-1.5 h-1.5 bg-[#ecab13] rounded-full" layoutId="cursor-dot-live" />}
    </motion.div>
  );
}
