'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cinzel, Space_Grotesk } from 'next/font/google';
import LuxuryImageDistortion from './masterpiece/LuxuryImageDistortion';

const cinzel = Cinzel({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function LuxuryLiveFitting() {
  const [isFitting, setIsFitting] = useState(false);

  // Custom Cursor Tracking
  useEffect(() => {
    const cursor = document.getElementById('luxury-cursor');
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height (assuming 40x40px cursor) to center it
      cursor.style.left = `${e.clientX - 20}px`;
      cursor.style.top = `${e.clientY - 20}px`;

      // Check for clickable elements to magnetize/expand cursor
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button') || target.closest('a');
      if (isClickable) {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#ffffff';
      } else {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#ecab13';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Staggered reveal animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    },
    exit: { opacity: 0, transition: { duration: 1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className} cursor-none`}>
      {/* Custom Gold Ring Cursor */}
      <div
        id="luxury-cursor"
        className="pointer-events-none fixed z-[100] size-10 rounded-full border border-[#ecab13] transition-transform duration-200 ease-out flex items-center justify-center mix-blend-difference"
      >
        <div className="size-1 rounded-full bg-[#ecab13]" />
      </div>

      {/* Main Background: Distorted Image or Digital Mirror */}
      <div className="absolute inset-0 z-0">
        <LuxuryImageDistortion
          imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]" />
      </div>

      {/* UI Overlay conditional on isFitting */}
      <AnimatePresence>
        {!isFitting && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Top Navigation */}
            <motion.div variants={itemVariants} className="flex items-center p-6 justify-between pointer-events-auto">
              <Link href="/luxury" aria-label="Go Back" className="text-white flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 focus-visible:ring-2 outline-none">
                <span className="material-symbols-outlined font-light">arrow_back</span>
              </Link>
              <div className="flex flex-col items-center">
                <h2 className={`text-lg tracking-[0.3em] uppercase text-white ${cinzel.className}`}>S_FIT AI</h2>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#ecab13]">Private Fitting</span>
              </div>
              <div className="flex w-12 items-center justify-end">
                <button aria-label="Info" className="flex size-12 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10 focus-visible:ring-2 outline-none">
                  <span className="material-symbols-outlined font-light">info</span>
                </button>
              </div>
            </motion.div>

            {/* Title / Info */}
            <div className="absolute left-6 top-32 max-w-sm">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
                <div className="size-1.5 rounded-full bg-[#ecab13] animate-pulse" />
                <span className="text-[#ecab13] text-[10px] uppercase tracking-[0.2em]">Studio Mirror Active</span>
              </motion.div>
              <motion.h1 variants={itemVariants} className={`text-4xl font-extralight leading-tight mb-4 ${cinzel.className}`}>
                Bespoke <br/><span className="font-medium">Tailoring</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-zinc-400 text-xs leading-relaxed max-w-[250px]">
                Initiate the digital mirror sequence to overlay the selected garment onto your physical reflection.
              </motion.p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto p-6 pointer-events-auto">
              <motion.div variants={itemVariants} className="flex justify-center">
                <button
                  onClick={() => setIsFitting(true)}
                  className="group relative flex h-16 w-full max-w-md items-center justify-center overflow-hidden rounded-none border border-[#ecab13]/50 bg-[#0a0a0a]/80 backdrop-blur-md transition-all hover:border-[#ecab13] hover:bg-[#ecab13]/10 active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ecab13]/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
                  <span className={`text-[#ecab13] text-sm tracking-[0.2em] uppercase ${cinzel.className}`}>Initiate Fitting</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Fitting State Indicator (Minimal) */}
      <AnimatePresence>
        {isFitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute bottom-10 left-0 right-0 flex justify-center z-20 pointer-events-auto"
          >
            <button
              onClick={() => setIsFitting(false)}
              className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 hover:bg-black/50 transition-colors"
            >
              <span className="size-2 rounded-full bg-red-500 animate-pulse" />
              <span className={`text-white/70 text-xs tracking-[0.2em] uppercase ${cinzel.className}`}>End Session</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
