'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function LuxuryGarmentDetail() {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToVault = () => {
    setIsSaved(true);
    setIsVaultOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f6] dark:bg-[#0a0a0a] text-slate-900 dark:text-white font-sans">
      {/* Top Navigation */}
      <div className="fixed top-0 z-50 w-full bg-[#f8f7f6]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <Link href="/" className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className="text-slate-900 dark:text-white text-sm font-bold tracking-[0.2em] uppercase flex-1 text-center">S_FIT AI</h2>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
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
            <div className="text-right">
              <p className="text-[#ecab13] text-[10px] font-bold tracking-widest uppercase mb-1">Authentic Render</p>
              <h1 className="text-white text-3xl font-extralight leading-tight">Metallic Silk <br/><span className="font-bold">Evening Blazer</span></h1>
            </div>
          </div>
        </div>

        {/* Exclusive Access (Drops) Banner */}
        <div className="px-4 -mt-4 relative z-20 mb-4">
          <div className="flex items-center justify-between rounded-lg bg-black/80 backdrop-blur-md border border-[#ecab13]/30 px-4 py-3 shadow-[0_0_15px_rgba(236,171,19,0.1)]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ecab13] text-lg">lock</span>
              <span className="text-[#ecab13] text-xs font-bold uppercase tracking-widest">Exclusive Drop</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-white/50 text-sm">schedule</span>
              <span className="text-white text-xs font-mono tracking-wider">Available in 02:00:00</span>
            </div>
          </div>
        </div>

        {/* Material Stats */}
        <div className="px-4 relative z-10">
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
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Engineered with S_FIT AI&apos;s proprietary light-refraction engine. This fabric blends high-twist Italian silk with microscopic aluminum particles, creating a finish that flows like liquid metal under studio lighting.
          </p>
          
          {/* Stylist Note */}
          <div className="mb-6 rounded-lg border border-[#ecab13]/20 bg-[#ecab13]/5 p-3 flex gap-3 items-start">
            <span className="material-symbols-outlined text-[#ecab13] text-sm mt-0.5">auto_awesome</span>
            <div>
              <p className="text-[#ecab13] text-[10px] font-bold uppercase tracking-widest mb-1">Stylist Note</p>
              <p className="text-zinc-300 text-xs italic">&quot;Pair this with structured denim for a balanced silhouette.&quot;</p>
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
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 w-full p-4 pb-8 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-[#2d2d2d] flex gap-4 items-center z-50">
        <div className="flex flex-col flex-1">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Starting at</span>
          <p className="text-white text-xl font-bold">$2,850</p>
        </div>
        <div className="flex-[2] flex gap-2 h-14">
          <button
            onClick={handleSaveToVault}
            aria-label="Save Look to Vault"
            className={`flex size-14 shrink-0 items-center justify-center rounded-xl border transition-colors focus-visible:ring-2 focus-visible:ring-[#ecab13] outline-none ${isSaved ? 'border-[#ecab13] bg-[#ecab13] text-black' : 'border-[#ecab13]/30 bg-[#1a1a1a] text-[#ecab13] hover:bg-[#2d2d2d]'}`}
          >
            <span className="material-symbols-outlined font-bold">{isSaved ? 'bookmark_added' : 'bookmark'}</span>
          </button>
          <Link href="/luxury/fitting" className="flex-1 bg-gradient-to-br from-[#ecab13] to-[#c48a0a] text-[#0a0a0a] rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(236,171,19,0.3)] hover:scale-[1.02] transition-transform">
            <span className="material-symbols-outlined font-bold">person_add_alt</span>
            <span className="font-bold text-sm tracking-widest uppercase">Try on Mannequin</span>
          </Link>
        </div>
      </div>

      {/* The Vault Drawer */}
      <AnimatePresence>
        {isVaultOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsVaultOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[70] max-h-[80vh] min-h-[50vh] overflow-y-auto rounded-t-3xl border-t border-[#2d2d2d] bg-[#0a0a0a] px-6 pb-12 pt-6 shadow-2xl"
            >
              <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-zinc-700" />
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-light text-white tracking-widest uppercase">The Vault</h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Digital Wardrobe</p>
                </div>
                <button
                  onClick={() => setIsVaultOpen(false)}
                  className="flex size-8 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              {/* Vault Content */}
              {isSaved ? (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 rounded-xl border border-[#ecab13]/30 bg-[#1a1a1a] p-4">
                    <div className="size-20 shrink-0 rounded-lg bg-zinc-800 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E")' }} />
                    <div className="flex flex-col justify-center">
                      <p className="text-[#ecab13] text-[10px] font-bold uppercase tracking-widest mb-1">Saved Look</p>
                      <h4 className="text-white text-sm font-bold">Metallic Silk Evening Blazer</h4>
                      <p className="text-zinc-500 text-xs mt-1">$2,850</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full border border-[#2d2d2d] bg-[#1a1a1a]">
                    <span className="material-symbols-outlined text-3xl text-zinc-600">inventory_2</span>
                  </div>
                  <p className="mb-2 text-sm font-bold tracking-widest uppercase text-white">Vault is Empty</p>
                  <p className="text-xs text-zinc-500 max-w-[200px] leading-relaxed">Save looks to compare and curate your masterpiece collection.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
