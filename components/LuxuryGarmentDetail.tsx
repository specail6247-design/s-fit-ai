'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LuxuryImageDistortion from './masterpiece/LuxuryImageDistortion';

export default function LuxuryGarmentDetail() {
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
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900 group">
          <LuxuryImageDistortion
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E"
            className="absolute inset-0 z-0"
          />
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none z-10"
            style={{ 
              backgroundImage: 'linear-gradient(to bottom, rgba(10,10,10,0) 70%, rgba(10,10,10,1) 100%)'
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
              className="min-w-[160px] aspect-square rounded-lg bg-zinc-800 bg-cover bg-center border border-[#2d2d2d] luxury-asset"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXruL0skVnUrOc5YpZ2nWDsWEX5ZxZ_JP5fjjc87VGL1Or3ZQLYga9h4-5QB_opRCAPjcpA3wXJv0uA2GNRmveI81vtVYwA6M6hy9N0o30Q3Culn7Si9HtP9yc9SCNUIWlqMCFvMgYQvi3T2jxQFFPdPDkhH4Wu4UWLKxrKm1YNIHPQBN5HrffgMF9LqvAmurBbvAOJYWZS8huThjtvEvSDXcccjmAY8SKX4gjtuaGrNd5fNc0Aqd-nIwVSL91bzJVXnNMzrE1xgU")' }}
            />
            <div 
              className="min-w-[160px] aspect-square rounded-lg bg-zinc-800 bg-cover bg-center border border-[#2d2d2d] luxury-asset"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNDky8wcMr6IK9CsH5lHzP94q1xpgzj4sRCwHxgBWqLc4bhwFC8wVPIX4A2ale1spgQJk6lEtR4Mf0mCG37C472JNMeZq_wm2AVX1NajotLS_B5KG84rqBjAb0hJ5bFvwqOFWmJ9VMqD-XEpESBv6RThxTv4WJTrcMde1L9BvbZjeHKxhKv-qw0gwOK03_YR1dqSy_c1YLMtdsLGRMR3psVHe8np-XEjOll6sldTVo9-9zduCb3RbuXjsiyVRTGv4ZJcY4hBUZQ24")' }}
            />
            <div 
              className="min-w-[160px] aspect-square rounded-lg bg-zinc-800 bg-cover bg-center border border-[#2d2d2d] luxury-asset"
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
