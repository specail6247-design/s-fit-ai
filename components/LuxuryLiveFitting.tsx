"use client";

import React, { useState, useEffect } from "react";
import { Cinzel, Space_Grotesk } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryCursor from "./ui/LuxuryCursor";
import Link from "next/link";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isChecked, setIsChecked] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate analyzing process
  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsAnalyzing(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Digital Mirror concept: if analyzing or fitting is active, we fade out UI
  const isImmersiveState = isAnalyzing; // You can expand this logic based on interactions
  const uiOpacity = isImmersiveState ? 0 : 1;
  const uiPointerEvents = isImmersiveState ? "none" : "auto";

  return (
    <div className={`relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>
      <LuxuryCursor />

      {/* Top App Bar - fades out in immersive state */}
      <motion.div
        animate={{ opacity: uiOpacity }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        style={{ pointerEvents: uiPointerEvents as "none" | "auto" }}
        className="z-50 flex items-center justify-between bg-transparent p-4 relative"
      >
        <Link href="/luxury" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-md hover:bg-white/10 transition-colors" aria-label="Go Back">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex flex-col items-center">
          <h2 className={`text-lg font-bold leading-tight tracking-[0.2em] uppercase text-white ${cinzel.className}`}>S_FIT AI</h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ecab13]">Immersive Mirror</span>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-md hover:bg-white/10 transition-colors" aria-label="Information">
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </motion.div>

      {/* Main Viewport (Photo Fitting Canvas) */}
      <div className="absolute inset-0 z-0">
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat saturate-[0.9] contrast-[1.1]"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g")',
          }}
        >
          {/* Scanning Effect during analysis */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute z-20 h-[2px] w-full"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, #ecab13 50%, transparent 100%)",
                  boxShadow: "0 0 15px #ecab13",
                }}
              />
            )}
          </AnimatePresence>

          {/* HUD Overlays - fade out in immersive state */}
          <motion.div
            animate={{ opacity: uiOpacity }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute left-4 top-24 rounded-lg p-3 border border-white/10 bg-black/40 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-[#ecab13]"></div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Authentic Simulation</p>
            </div>
            <p className="mt-1 text-xs">
              Fabric: <span className="text-[#ecab13] font-medium">Metallic Liquid Silk</span>
            </p>
          </motion.div>

          <motion.div
            animate={{ opacity: uiOpacity }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute right-4 top-24 rounded-lg p-3 text-right border border-white/10 bg-black/40 backdrop-blur-md"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Physics Mesh</p>
            <p className="mt-1 text-xs">42,000 Polygons</p>
          </motion.div>
        </div>
      </div>

      {/* Processing State (Overlay) */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6"
          >
            <div className="mx-auto max-w-sm rounded-xl p-6 shadow-2xl border border-white/10 bg-black/60 backdrop-blur-xl">
              <div className="flex flex-col gap-4">
                <div className="flex items-end justify-between gap-6">
                  <div className="flex flex-col">
                    <p className={`text-2xl font-bold leading-none tracking-tight text-white ${cinzel.className}`}>Calibrating...</p>
                    <p className="mt-2 text-xs font-light tracking-wider text-zinc-400 uppercase">3D Draping Engine</p>
                  </div>
                  <p className={`text-3xl font-bold leading-none text-[#ecab13] ${cinzel.className}`}>{progress}%</p>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[#ecab13] shadow-[0_0_10px_#ecab13]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-center text-[10px] tracking-widest uppercase font-medium leading-normal text-zinc-500">
                  Analyzing body dimensions and fabric physics
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Footer - fades out in immersive state */}
      <motion.div
        animate={{ opacity: uiOpacity, y: isImmersiveState ? 20 : 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        style={{ pointerEvents: uiPointerEvents as "none" | "auto" }}
        className="mt-auto space-y-4 p-4 z-40 relative"
      >
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-bold leading-tight tracking-[0.2em] uppercase text-white">Fitting Controls</h3>
          <span className="rounded border border-[#ecab13]/30 bg-[#ecab13]/10 px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase text-[#ecab13]">Couture Mode</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="group flex items-center justify-between rounded-xl p-4 border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-white">
                <span className="material-symbols-outlined">thermostat</span>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-tight text-white">Fit Heatmap</p>
                <p className="text-[11px] font-light leading-normal text-zinc-400">Show tension areas on body</p>
              </div>
            </div>
            <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border border-white/20 bg-black p-0.5 transition-all has-[:checked]:justify-end has-[:checked]:bg-[#ecab13] has-[:checked]:border-[#ecab13]">
              <div className="h-full w-[24px] rounded-full bg-white shadow-lg"></div>
              <input checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="invisible absolute" type="checkbox" />
            </label>
          </div>

          <div className="flex items-center justify-between rounded-xl p-4 border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-white">
                <span className="material-symbols-outlined">waves</span>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-tight text-white">Fabric Physics</p>
                <p className="text-[11px] font-light leading-normal text-zinc-400">Simulate movement & weight</p>
              </div>
            </div>
            <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border border-white/20 bg-black p-0.5 transition-all has-[:checked]:justify-end has-[:checked]:bg-[#ecab13] has-[:checked]:border-[#ecab13]">
              <div className="h-full w-[24px] rounded-full bg-white shadow-lg"></div>
              <input className="invisible absolute" type="checkbox" defaultChecked />
            </label>
          </div>
        </div>

        <button className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#ecab13] to-[#c48a0a] text-sm tracking-widest uppercase font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(236,171,19,0.2)] hover:shadow-[0_0_30px_rgba(236,171,19,0.4)] active:scale-95 transition-all">
          <span className="material-symbols-outlined">check_circle</span>
          Add to Collection
        </button>
        <div className="h-2"></div>
      </motion.div>

      {/* Heatmap Legend - fades out in immersive state */}
      <motion.div
        animate={{ opacity: uiOpacity }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute bottom-64 left-4 z-40 flex flex-col gap-2 rounded-lg p-3 border border-white/10 bg-black/40 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
          <span className="text-[9px] font-bold tracking-widest uppercase text-white">Tight</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
          <span className="text-[9px] font-bold tracking-widest uppercase text-white">Perfect</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <span className="text-[9px] font-bold tracking-widest uppercase text-white">Loose</span>
        </div>
      </motion.div>
    </div>
  );
}
