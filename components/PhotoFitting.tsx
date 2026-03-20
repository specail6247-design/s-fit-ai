"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function PhotoFitting() {
  const [isChecked, setIsChecked] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsAnalyzing(false), 500);
            return 100;
          }
          return p + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>

      {/* Top App Bar - fades out during analysis */}
      <AnimatePresence>
        {!isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="z-50 flex items-center justify-between bg-transparent p-4"
          >
            <div data-luxury-hover className="flex size-12 shrink-0 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold leading-tight tracking-[0.2em] text-white font-cinzel">S_FIT AI</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ecab13]">Digital Mirror</span>
            </div>
            <div className="flex w-12 items-center justify-end">
              <button data-luxury-hover className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined">info</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewport (Photo Fitting Canvas) */}
      <div className="absolute inset-0 z-0 bg-black">
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g")',
            filter: 'saturate(0.9) contrast(1.1)',
            transform: isAnalyzing ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          {/* Scanning Effect - only active during analysis */}
          {isAnalyzing && (
            <motion.div
              initial={{ top: '0%', opacity: 0 }}
              animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute z-20 h-[2px] w-full"
              style={{
                background: "linear-gradient(180deg, transparent 0%, #ecab13 50%, transparent 100%)",
                boxShadow: "0 0 15px #ecab13",
              }}
            />
          )}

          {/* HUD Overlays - fades out during analysis */}
          <AnimatePresence>
            {!isAnalyzing && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute left-4 top-24 rounded-lg p-3 bg-black/40 backdrop-blur-md border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-2 animate-pulse rounded-full bg-[#ecab13]"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Real-time Simulation</p>
                  </div>
                  <p className="mt-1 text-xs font-cinzel">
                    Fabric: <span className="text-[#ecab13]">Metallic Liquid Silk</span>
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute right-4 top-24 rounded-lg p-3 text-right bg-black/40 backdrop-blur-md border border-white/10"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Mesh Density</p>
                  <p className="mt-1 text-xs font-cinzel text-white">42,000 Polygons</p>
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6"
          >
            <div className="mx-auto max-w-sm rounded-xl p-6 shadow-2xl bg-black/60 backdrop-blur-xl border border-white/10">
              <div className="flex flex-col gap-3">
                <div className="flex items-end justify-between gap-6">
                  <div className="flex flex-col">
                    <p className="text-xl font-bold leading-none tracking-tight text-white font-cinzel">Analyzing Fit...</p>
                    <p className="mt-1 text-xs font-normal italic text-zinc-400">3D Draping Engine Active</p>
                  </div>
                  <p className="text-2xl font-bold leading-none text-[#ecab13] font-cinzel">{progress}%</p>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[#ecab13] shadow-[0_0_10px_#ecab13]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1 text-center text-[11px] font-medium leading-normal text-zinc-400 uppercase tracking-wider">Calibrating metallic fabric drape physics</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Footer - fades out during analysis */}
      <AnimatePresence>
        {!isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-auto space-y-4 p-4 z-40"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold leading-tight tracking-[0.2em] uppercase text-white font-cinzel">Fitting Controls</h3>
              <span className="rounded border border-[#ecab13]/30 bg-[#ecab13]/10 px-2 py-0.5 text-[10px] text-[#ecab13] uppercase tracking-widest font-bold">Advanced</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="group flex items-center justify-between rounded-xl p-4 bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-white">
                    <span className="material-symbols-outlined">thermostat</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold leading-tight text-white font-cinzel tracking-wide">Fit Heatmap</p>
                    <p className="text-[11px] font-normal leading-normal text-zinc-400">Show tension areas on body</p>
                  </div>
                </div>
                <label data-luxury-hover className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border border-white/20 bg-black/50 p-0.5 transition-all has-[:checked]:justify-end has-[:checked]:bg-[#ecab13]/20 has-[:checked]:border-[#ecab13]/50">
                  <motion.div
                    layout
                    className={`h-full w-[24px] rounded-full shadow-lg ${isChecked ? 'bg-[#ecab13]' : 'bg-zinc-500'}`}
                  />
                  <input checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="invisible absolute" type="checkbox" />
                </label>
              </div>

              <div className="flex items-center justify-between rounded-xl p-4 bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-white">
                    <span className="material-symbols-outlined">waves</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold leading-tight text-white font-cinzel tracking-wide">Fabric Physics</p>
                    <p className="text-[11px] font-normal leading-normal text-zinc-400">Simulate movement & weight</p>
                  </div>
                </div>
                <label data-luxury-hover className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border border-white/20 bg-black/50 p-0.5 transition-all has-[:checked]:justify-end has-[:checked]:bg-[#ecab13]/20 has-[:checked]:border-[#ecab13]/50">
                  <motion.div
                    layout
                    className="h-full w-[24px] rounded-full bg-zinc-500 shadow-lg"
                  />
                  <input className="invisible absolute" type="checkbox" />
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                data-luxury-hover
                onClick={() => {
                  setIsAnalyzing(true);
                  setProgress(0);
                }}
                className="flex-1 h-14 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">refresh</span>
                <span className="font-bold text-xs tracking-widest uppercase">Re-Analyze</span>
              </button>

              <button data-luxury-hover className="flex-[2] h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#ecab13] to-[#c48a0a] text-black shadow-[0_0_20px_rgba(236,171,19,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98] flex relative overflow-hidden group">
                <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-full transition-transform duration-300 opacity-0 group-active:opacity-100"></span>
                <span className="material-symbols-outlined relative z-10">check_circle</span>
                <span className="font-bold text-sm tracking-widest uppercase relative z-10">Confirm Fit</span>
              </button>
            </div>
            <div className="h-4"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heatmap Legend - fades out during analysis */}
      <AnimatePresence>
        {!isAnalyzing && isChecked && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-64 left-4 z-40 flex flex-col gap-1.5 rounded-lg p-2 bg-black/40 backdrop-blur-md border border-white/10"
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white">Tight</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white">Perfect</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-white">Loose</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
