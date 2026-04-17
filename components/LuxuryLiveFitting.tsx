"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";

export default function LuxuryLiveFitting() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFitting, setIsFitting] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById("luxury-cursor");
    if (!cursor) return;
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px";
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest(".group")) {
        cursor.classList.add("scale-150", "border-[#ecab13]", "bg-[#ecab13]/10");
        cursor.classList.remove("border-white/50", "bg-transparent");
      } else {
        cursor.classList.remove("scale-150", "border-[#ecab13]", "bg-[#ecab13]/10");
        cursor.classList.add("border-white/50", "bg-transparent");
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const handleTryOn = () => {
    setIsAnalyzing(true);
    setTimeout(() => { setIsAnalyzing(false); setIsFitting(true); setTimeout(() => setIsFitting(false), 3000); }, 2000);
  };

  const isDigitalMirrorActive = isAnalyzing || isFitting;

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#050505] text-white font-sans">
      <div id="luxury-cursor" className="pointer-events-none fixed z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-transparent transition-all duration-300 ease-out hidden md:block" />
      <div className="absolute inset-0 z-0">
        <LuxuryImageDistortion imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E" className="absolute inset-0 z-0 h-full w-full opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
      </div>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: isDigitalMirrorActive ? 0 : 1 }} transition={{ duration: 1 }} className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between bg-transparent p-6">
          <Link href="/luxury" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:border-[#ecab13] transition-colors"><span className="material-symbols-outlined">arrow_back</span></Link>
          <div className="flex flex-col items-center"><h2 className="font-cinzel text-xl font-bold leading-tight tracking-widest text-white">S_FIT AI</h2><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecab13]">Atelier Fitting</span></div>
          <div className="flex w-12 items-center justify-end"><button className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:border-[#ecab13] transition-colors group"><span className="material-symbols-outlined group-hover:text-[#ecab13] transition-colors">info</span></button></div>
        </div>
        <div className="mt-auto p-6 pb-12">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col gap-6">
            <div className="text-center"><h1 className="font-cinzel text-3xl font-light text-white">Digital Mirror</h1><p className="mt-2 text-sm text-zinc-400 tracking-wider">Step into the masterpiece.</p></div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleTryOn} className="flex h-16 w-full items-center justify-center gap-3 rounded-none border border-[#ecab13] bg-[#ecab13]/10 text-sm font-bold tracking-[0.2em] uppercase text-[#ecab13] backdrop-blur-md transition-all hover:bg-[#ecab13] hover:text-black"><span className="material-symbols-outlined">auto_awesome</span> Commence Fitting</motion.button>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isDigitalMirrorActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-4"><div className="size-16 rounded-full border-t-2 border-[#ecab13] animate-spin" /><p className="font-cinzel text-xl tracking-[0.3em] text-[#ecab13] uppercase">{isAnalyzing ? "Analyzing form..." : "Applying Garment..."}</p></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
