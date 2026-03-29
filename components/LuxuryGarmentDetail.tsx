'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LuxuryGarmentDetail() {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [timeLeft, setTimeLeft] = useState("02:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let [h, m, s] = prev.split(':').map(Number);
        if (h === 0 && m === 0 && s === 0) {
          clearInterval(timer);
          return "00:00:00";
        }
        if (s === 0) {
          if (m === 0) {
            h -= 1;
            m = 59;
          } else {
            m -= 1;
          }
          s = 59;
        } else {
          s -= 1;
        }
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f7f6] dark:bg-[#0a0a0a] text-slate-900 dark:text-white font-sans">
      {/* Top Navigation */}
      <div className="fixed top-0 z-50 w-full bg-[#f8f7f6]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <Link href="/" className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className="text-slate-900 dark:text-white text-sm font-bold tracking-[0.2em] uppercase flex-1 text-center">S_FIT AI</h2>
          <div className="flex gap-2 items-center justify-end">
            <button aria-label="Vault" onClick={() => setIsVaultOpen(true)} className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined">view_carousel</span>
            </button>
            <button aria-label="Share" className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container (Mobile Optimized) */}
      <main className="max-w-md mx-auto pt-16 pb-32">
        {/* 3D Interactive Viewport (Hero Image) */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: 'linear-gradient(to bottom, rgba(10,10,10,0) 70%, rgba(10,10,10,1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E")' 
            }}
          />
          
          {/* 3D UI Overlays */}
          <div className="absolute bottom-6 left-4 right-4 flex justify-between items-end">
            <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 flex flex-col gap-2 border border-white/10">
              <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded"><span className="material-symbols-outlined text-sm">zoom_in</span></button>
              <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded"><span className="material-symbols-outlined text-sm">360</span></button>
              <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded"><span className="material-symbols-outlined text-sm">light_mode</span></button>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="flex justify-end w-full mb-2">
                <button
                  aria-label="Save Look"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors ${isSaved ? 'bg-[#ecab13] text-black border-[#ecab13]' : 'bg-black/40 text-white border-white/20 hover:bg-white/10'}`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isSaved ? 'bookmark' : 'bookmark_border'}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {isSaved ? 'Saved to Vault' : 'Save Look'}
                  </span>
                </button>
              </div>
              <p className="text-[#ecab13] text-[10px] font-bold tracking-widest uppercase mb-1">Authentic Render</p>
              <h1 className="text-white text-3xl font-extralight leading-tight">Metallic Silk <br/><span className="font-bold">Evening Blazer</span></h1>
            </div>
          </div>
        </div>

        {/* Material Stats */}
        <div className="px-4 -mt-4 relative z-10">
          <div className="flex flex-wrap gap-3 bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#2d2d2d] p-4 rounded-xl">
            <div className="flex min-w-[80px] flex-1 flex-col gap-1 items-center text-center">
              <p className="text-[#ecab13] text-xl font-bold leading-tight">99.8%</p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Realism</p>
            </div>
            <div className="w-px h-10 bg-[#2d2d2d] self-center"></div>
            <div className="flex min-w-[80px] flex-1 flex-col gap-1 items-center text-center">
              <p className="text-white text-xl font-bold leading-tight">High</p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Metalness</p>
            </div>
            <div className="w-px h-10 bg-[#2d2d2d] self-center"></div>
            <div className="flex min-w-[80px] flex-1 flex-col gap-1 items-center text-center">
              <p className="text-white text-xl font-bold leading-tight">0.85</p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Clearcoat</p>
            </div>
          </div>
        </div>

        {/* Material Science Description */}
        <div className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Material Science</h2>
            <span className="text-[#ecab13] material-symbols-outlined">info</span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Engineered with S_FIT AI&apos;s proprietary light-refraction engine. This fabric blends high-twist Italian silk with microscopic aluminum particles, creating a finish that flows like liquid metal under studio lighting.
          </p>
          
          {/* AI Stylist Note */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#1a1a1a] to-[#222222] border border-[#333333] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-[#ecab13]"></div>
             <div className="flex items-start gap-3">
               <span className="material-symbols-outlined text-[#ecab13] text-lg mt-0.5">auto_awesome</span>
               <div>
                 <p className="text-white text-[10px] font-bold uppercase tracking-widest mb-1">AI Stylist Note</p>
                 <p className="text-zinc-300 text-sm italic">&quot;Pair this with structured denim for a balanced silhouette.&quot;</p>
               </div>
             </div>
          </div>

          {/* Chips */}
          <div className="flex gap-2 flex-wrap mb-8">
            <div className="flex h-8 items-center justify-center rounded-full border border-[#ecab13]/30 bg-[#ecab13]/10 px-4">
              <p className="text-[#ecab13] text-[11px] font-bold uppercase tracking-wider">Brushed Aluminum Finish</p>
            </div>
            <div className="flex h-8 items-center justify-center rounded-full border border-[#2d2d2d] bg-[#1a1a1a] px-4">
              <p className="text-zinc-300 text-[11px] font-bold uppercase tracking-wider">Clearcoat Tech</p>
            </div>
            <div className="flex h-8 items-center justify-center rounded-full border border-[#2d2d2d] bg-[#1a1a1a] px-4">
              <p className="text-zinc-300 text-[11px] font-bold uppercase tracking-wider">Silk Blend</p>
            </div>
          </div>
        </div>

        {/* Macro Gallery */}
        <div className="mb-8">
          <div className="px-4 flex items-center justify-between mb-4">
            <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Detail Macro View</h2>
            <p className="text-zinc-500 text-xs">4K Textures</p>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar pb-2">
            <div 
              className="min-w-[160px] aspect-square rounded-lg bg-zinc-800 bg-cover bg-center border border-[#2d2d2d]" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXruL0skVnUrOc5YpZ2nWDsWEX5ZxZ_JP5fjjc87VGL1Or3ZQLYga9h4-5QB_opRCAPjcpA3wXJv0uA2GNRmveI81vtVYwA6M6hy9N0o30Q3Culn7Si9HtP9yc9SCNUIWlqMCFvMgYQvi3T2jxQFFPdPDkhH4Wu4UWLKxrKm1YNIHPQBN5HrffgMF9LqvAmurBbvAOJYWZS8huThjtvEvSDXcccjmAY8SKX4gjtuaGrNd5fNc0Aqd-nIwVSL91bzJVXnNMzrE1xgU")' }}
            />
            <div 
              className="min-w-[160px] aspect-square rounded-lg bg-zinc-800 bg-cover bg-center border border-[#2d2d2d]" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNDky8wcMr6IK9CsH5lHzP94q1xpgzj4sRCwHxgBWqLc4bhwFC8wVPIX4A2ale1spgQJk6lEtR4Mf0mCG37C472JNMeZq_wm2AVX1NajotLS_B5KG84rqBjAb0hJ5bFvwqOFWmJ9VMqD-XEpESBv6RThxTv4WJTrcMde1L9BvbZjeHKxhKv-qw0gwOK03_YR1dqSy_c1YLMtdsLGRMR3psVHe8np-XEjOll6sldTVo9-9zduCb3RbuXjsiyVRTGv4ZJcY4hBUZQ24")' }}
            />
            <div 
              className="min-w-[160px] aspect-square rounded-lg bg-zinc-800 bg-cover bg-center border border-[#2d2d2d]" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqkn4HFnxWGVtmWbfYSHCV_0_Eix7IhuazsGoJhX_mZ0YSMRUig_BHDMoHIAapobfGWThLoMAvthdSMIT6zWhWTFp8GxOJe9a0NYtCwiUlYeJgFDX6uf47SweuwPSw0ifCVSal7eP6WDO1pyzOpMYk-TECLTV3Il19DmBV5p8acsIruMpV5hpoay7GQLfUQFZr1AMRddi5grhGdrPXb-TbjULkGcldw5FZg81mGVBmRGEfOT_KrdMTUPs9rPuDcgFxbGZ-rA_imkk")' }}
            />
          </div>
        </div>

        {/* Comparison Table */}
        <div className="px-4 py-4 bg-[#1a1a1a]/30 border-y border-[#2d2d2d] mb-8">
          <div className="flex justify-between items-center py-2">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Weight</span>
            <span className="text-white text-sm">240 GSM</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-[#2d2d2d]/50">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Composition</span>
            <span className="text-white text-sm">70% Silk, 30% Metallic Alloy</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-[#2d2d2d]/50">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Physics Mesh</span>
            <span className="text-white text-sm">12,400 Polygons</span>
          </div>
        </div>

        {/* Exclusive Access (Drops) */}
        <div className="px-4 mb-8">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Exclusive Drop</h2>
             <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">lock</span>
                Locked
             </span>
           </div>

           <div className="relative overflow-hidden rounded-xl border border-[#2d2d2d] bg-[#1a1a1a] p-4 group">
             <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none"></div>
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-lg bg-zinc-800 bg-cover bg-center border border-[#333] grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqkn4HFnxWGVtmWbfYSHCV_0_Eix7IhuazsGoJhX_mZ0YSMRUig_BHDMoHIAapobfGWThLoMAvthdSMIT6zWhWTFp8GxOJe9a0NYtCwiUlYeJgFDX6uf47SweuwPSw0ifCVSal7eP6WDO1pyzOpMYk-TECLTV3Il19DmBV5p8acsIruMpV5hpoay7GQLfUQFZr1AMRddi5grhGdrPXb-TbjULkGcldw5FZg81mGVBmRGEfOT_KrdMTUPs9rPuDcgFxbGZ-rA_imkk")' }}></div>
               <div className="flex-1">
                 <h3 className="text-white text-sm font-bold mb-1">Obsidian Void Blazer</h3>
                 <div className="flex items-center gap-2 text-zinc-400 text-xs">
                   <span className="material-symbols-outlined text-[14px]">timer</span>
                   <span>Available in <span className="text-white font-mono font-bold tracking-wider">{timeLeft}</span></span>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </main>

      {/* The Vault Drawer */}
      {isVaultOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsVaultOpen(false)}></div>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[85%] max-w-sm h-full bg-[#111] border-l border-[#2d2d2d] shadow-2xl relative z-10 flex flex-col"
          >
            <div className="p-6 border-b border-[#2d2d2d] flex justify-between items-center">
              <h2 className="text-white text-sm font-bold tracking-[0.2em] uppercase">The Vault</h2>
              <button aria-label="Close Vault" onClick={() => setIsVaultOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
               {isSaved ? (
                 <div className="flex items-center gap-4 p-3 rounded-xl border border-[#2d2d2d] bg-[#1a1a1a] hover:border-[#ecab13]/50 transition-colors cursor-pointer">
                   <div className="w-16 h-16 rounded-lg bg-zinc-800 bg-cover bg-center border border-[#333]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E")' }}></div>
                   <div>
                     <h3 className="text-white text-xs font-bold mb-1">Metallic Silk Evening Blazer</h3>
                     <p className="text-[#ecab13] text-[10px] font-bold uppercase tracking-widest">Saved</p>
                   </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center h-40 text-center text-zinc-500">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">auto_awesome_mosaic</span>
                    <p className="text-xs uppercase tracking-widest font-bold">Vault is Empty</p>
                 </div>
               )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 w-full p-4 pb-8 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-[#2d2d2d] flex gap-4 items-center z-50">
        <div className="flex flex-col flex-1">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Starting at</span>
          <p className="text-white text-xl font-bold">$2,850</p>
        </div>
        <Link href="/luxury/fitting" className="flex-[2] bg-gradient-to-br from-[#ecab13] to-[#c48a0a] text-[#0a0a0a] h-14 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(236,171,19,0.3)] hover:scale-[1.02] transition-transform">
          <span className="material-symbols-outlined font-bold">person_add_alt</span>
          <span className="font-bold text-sm tracking-widest uppercase">Try on Mannequin</span>
        </Link>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
