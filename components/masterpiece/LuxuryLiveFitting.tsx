'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cinzel, Space_Grotesk } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

const cinzel = Cinzel({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// A subtle distortion effect component for the background
const LuxuryImageDistortion = React.lazy(() => import('./LuxuryImageDistortion'));

export default function LuxuryLiveFitting() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFitting, setIsFitting] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        setCursorHover(true);
      } else {
        setCursorHover(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update cursor position directly via DOM for performance
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${cursorPos.x}px`;
      cursorRef.current.style.top = `${cursorPos.y}px`;

      if (cursorHover) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorRef.current.style.borderColor = 'rgba(236, 171, 19, 1)';
        cursorRef.current.style.backgroundColor = 'rgba(236, 171, 19, 0.1)';
      } else {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRef.current.style.borderColor = 'rgba(236, 171, 19, 0.5)';
        cursorRef.current.style.backgroundColor = 'transparent';
      }
    }
  }, [cursorPos, cursorHover]);

  // Simulate analysis -> fitting flow
  useEffect(() => {
    if (isAnalyzing) {
      const timer1 = setTimeout(() => {
        setIsAnalyzing(false);
        setIsFitting(true);
      }, 3000);
      return () => clearTimeout(timer1);
    }
  }, [isAnalyzing]);

  useEffect(() => {
    if (isFitting) {
      const timer2 = setTimeout(() => {
        setIsFitting(false);
      }, 5000);
      return () => clearTimeout(timer2);
    }
  }, [isFitting]);

  const uiOpacity = isAnalyzing || isFitting ? 0 : 1;
  const isImmersive = isAnalyzing || isFitting;

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    })
  };

  return (
    <ReactLenis root>
      <div className={`relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className} cursor-none`}>
        {/* Custom Cursor */}
        <div
          ref={cursorRef}
          className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border border-[#ecab13]/50 mix-blend-difference transition-transform duration-200 ease-out"
          style={{ transform: 'translate(-50%, -50%)' }}
        />

        {/* Background Image / Distortion */}
        <div className="absolute inset-0 z-0">
          <React.Suspense fallback={
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E")',
                filter: 'saturate(0.9) contrast(1.1)'
              }}
            />
          }>
            <LuxuryImageDistortion
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E"
              className="h-full w-full object-cover"
            />
          </React.Suspense>
        </div>

        {/* Top App Bar */}
        <motion.div
          className="fixed top-0 z-50 flex w-full items-center justify-between p-6 transition-opacity duration-1000"
          style={{ opacity: uiOpacity }}
          initial="hidden" animate="visible" variants={textVariants} custom={0}
        >
          <Link href="/luxury/detail" aria-label="Go back" className="flex size-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-95 active:scale-90 focus-visible:ring-2 outline-none">
            <span className="material-symbols-outlined font-light" aria-hidden="true">arrow_back</span>
          </Link>
          <h2 className={`${cinzel.className} text-sm font-bold tracking-[0.3em] uppercase`}>S_FIT AI</h2>
          <button aria-label="Information" className="flex size-12 items-center justify-center rounded-full bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-95 active:scale-90 focus-visible:ring-2 outline-none">
            <span className="material-symbols-outlined font-light" aria-hidden="true">info</span>
          </button>
        </motion.div>

        {/* Content Overlay */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-end p-8 pb-24 transition-opacity duration-1000 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          style={{ opacity: uiOpacity, pointerEvents: isImmersive ? 'none' : 'auto' }}
        >
          <div className="max-w-xl mx-auto w-full">
            <motion.p
              className="text-[#ecab13] text-xs font-bold tracking-[0.2em] uppercase mb-2"
              initial="hidden" animate="visible" variants={textVariants} custom={1}
            >
              Digital Atelier
            </motion.p>
            <motion.h1
              className={`${cinzel.className} text-4xl md:text-5xl font-light leading-tight mb-6`}
              initial="hidden" animate="visible" variants={textVariants} custom={2}
            >
              Immersive Fitting Experience
            </motion.h1>

            <motion.p
              className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-md"
              initial="hidden" animate="visible" variants={textVariants} custom={3}
            >
              Experience our proprietary light-refraction engine. The fabric flows like liquid metal, perfectly contouring to your unique physique.
            </motion.p>

            <motion.div
              initial="hidden" animate="visible" variants={textVariants} custom={4}
            >
              <button
                onClick={() => setIsAnalyzing(true)}
                className="group relative flex h-16 w-full md:w-auto items-center justify-center gap-4 overflow-hidden rounded-none border border-[#ecab13] bg-black/40 px-8 backdrop-blur-md transition-all hover:bg-[#ecab13]/10 active:scale-[0.98]"
              >
                <span className={`${cinzel.className} relative z-10 text-sm font-bold tracking-[0.2em] text-[#ecab13] uppercase`}>
                  Begin Analysis
                </span>
                <span className="material-symbols-outlined relative z-10 text-[#ecab13]">view_in_ar</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-[#ecab13]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Immersive States */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative size-32">
                  {/* Outer spinning ring */}
                  <div className="absolute inset-0 rounded-full border-[1px] border-[#ecab13]/20 border-t-[#ecab13] animate-spin" style={{ animationDuration: '3s' }} />
                  {/* Inner spinning ring */}
                  <div className="absolute inset-2 rounded-full border-[1px] border-[#ecab13]/20 border-b-[#ecab13] animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`${cinzel.className} text-[#ecab13] text-xl tracking-widest`}>S</span>
                  </div>
                </div>
                <p className={`${cinzel.className} text-[#ecab13] text-sm tracking-[0.3em] uppercase animate-pulse`}>
                  Analyzing Silhouette
                </p>
              </div>
            </motion.div>
          )}

          {isFitting && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
            >
               <p className={`${cinzel.className} text-white/50 text-sm tracking-[0.4em] uppercase`}>
                  Digital Mirror Active
                </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
}
