'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import StaggeredText from '@/components/masterpiece/StaggeredText';
import { useStore } from '@/store/useStore';

export default function LuxuryLiveFitting() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFitting, setIsFitting] = useState(false);
  const [showMirror, setShowMirror] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setShowMirror(true);

    // Simulate digital mirror
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsFitting(true);

      setTimeout(() => {
        setIsFitting(false);
        setShowMirror(false);
      }, 4000);
    }, 3000);
  };

  // Digital Mirror state logic - fade out all UI
  const uiOpacity = showMirror ? 'opacity-0' : 'opacity-100';

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,171,19,0.15)_0%,transparent_70%)]" />
      </div>

      {/* Top Navigation */}
      <div className={`fixed top-0 z-50 w-full transition-opacity duration-1000 ${uiOpacity}`}>
        <div className="flex items-center p-6 justify-between max-w-4xl mx-auto">
          <Link href="/luxury" className="group text-white flex size-12 shrink-0 items-center justify-center rounded-full border border-white/10 hover:border-[#ecab13]/50 hover:bg-[#ecab13]/10 transition-all duration-500">
            <span className="material-symbols-outlined text-[#ecab13] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </Link>
          <h2 className="text-[#ecab13] font-cinzel text-lg font-bold tracking-[0.3em] uppercase flex-1 text-center">S_FIT Atelier</h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex size-12 items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-all duration-500 group">
              <span className="material-symbols-outlined text-white/70 group-hover:text-white transition-colors">tune</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto pt-24 pb-32 px-6 h-screen flex flex-col justify-center relative">

        {/* Digital Mirror Overlay */}
        <AnimatePresence>
          {showMirror && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-black"
            >
              <div className="relative w-full h-full max-w-lg mx-auto flex flex-col items-center justify-center">
                {/* Camera Viewport Simulation */}
                <div className="w-full aspect-[3/4] border border-[#ecab13]/20 rounded-2xl relative overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(236,171,19,0.05)_50%,transparent_100%)] animate-[scan_3s_ease-in-out_infinite]" />

                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 border-t-2 border-[#ecab13] rounded-full animate-spin mx-auto mb-6" />
                      <p className="font-cinzel text-[#ecab13] tracking-[0.2em] uppercase text-sm mb-2">Analyzing Proportions</p>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest">Calibrating Physics Mesh</p>
                    </motion.div>
                  )}

                  {isFitting && (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center w-full h-full"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E")',
                          filter: 'saturate(0.9) contrast(1.1)'
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`transition-opacity duration-1000 ${uiOpacity} flex flex-col md:flex-row gap-12 items-center`}>
          {/* Garment Preview */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E")',
                  filter: 'saturate(0.9) contrast(1.1)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[#ecab13] text-xs font-bold tracking-[0.3em] uppercase mb-2">Selected Garment</p>
                <h1 className="font-cinzel text-white text-3xl mb-4">Metallic Silk Blazer</h1>
                <div className="flex gap-4">
                  <span className="text-white/50 text-xs uppercase tracking-widest">IT 48</span>
                  <span className="text-white/50 text-xs uppercase tracking-widest">Slim Fit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <div>
              <StaggeredText
                text="The Digital Mirror"
                className="font-cinzel text-4xl md:text-5xl text-white mb-4"
                wordMode
              />
              <StaggeredText
                text="Step into our AI-powered atelier. Your proportions, mapped with sub-millimeter accuracy for a perfect drape."
                className="text-white/60 text-sm md:text-base leading-relaxed max-w-md"
                delay={0.5}
                wordMode
              />
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={startAnalysis}
                className="group relative overflow-hidden bg-white text-black h-16 rounded-full flex items-center justify-center gap-4 hover:scale-[1.02] transition-all duration-500 ease-out"
              >
                <span className="font-bold text-sm tracking-[0.2em] uppercase z-10">Initiate Fitting</span>
                <span className="material-symbols-outlined text-sm z-10 group-hover:rotate-180 transition-transform duration-700">camera_front</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ecab13] to-[#e8d282] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>

              <p className="text-center text-white/30 text-[10px] uppercase tracking-widest font-bold">
                Requires Camera Permission
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
