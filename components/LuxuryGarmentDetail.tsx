'use client';

import React from 'react';
import Link from 'next/link';
import { Cinzel, Space_Grotesk } from 'next/font/google';
import LuxuryImageDistortion from './masterpiece/LuxuryImageDistortion';
import TextReveal from './masterpiece/TextReveal';
import LuxuryCursor from './masterpiece/LuxuryCursor';
import SmoothScrollProvider from './masterpiece/SmoothScrollProvider';

const cinzel = Cinzel({ subsets: ['latin'], display: 'optional' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'optional' });

export default function LuxuryGarmentDetail() {
  return (
    <SmoothScrollProvider>
    <div className={`min-h-screen bg-[#050505] text-white ${spaceGrotesk.className} cursor-none`}>
      <LuxuryCursor />
      {/* Top Navigation */}
      <div className="fixed top-0 z-50 w-full bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <Link href="/" className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors active:scale-95">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className={`text-white text-sm font-bold tracking-[0.2em] uppercase flex-1 text-center ${cinzel.className}`}>S_FIT AI</h2>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors active:scale-95">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container (Mobile Optimized) */}
      <main className="max-w-md mx-auto pt-16 pb-32">
        {/* 3D Interactive Viewport (Hero Image) */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
          <LuxuryImageDistortion imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] to-transparent z-10" />
          
          {/* 3D UI Overlays */}
          <div className="absolute bottom-6 left-4 right-4 flex justify-between items-end z-20 pointer-events-none">
            <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 flex flex-col gap-2 border border-white/10 pointer-events-auto">
              <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded"><span className="material-symbols-outlined text-sm">zoom_in</span></button>
              <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded"><span className="material-symbols-outlined text-sm">360</span></button>
              <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded"><span className="material-symbols-outlined text-sm">light_mode</span></button>
            </div>
            <div className="text-right pointer-events-auto">
              <TextReveal delay={0.2}>
              <p className="text-[#d4af37] text-[10px] font-bold tracking-widest uppercase mb-1">Authentic Render</p>
              </TextReveal>
              <TextReveal delay={0.4}>
              <h1 className={`text-white text-4xl leading-tight ${cinzel.className}`}>Metallic Silk <br/><span className="italic">Evening Blazer</span></h1>
              </TextReveal>
            </div>
          </div>
        </div>

        {/* Material Stats */}
        <div className="px-4 mt-8 relative z-10">
          <TextReveal delay={0.1}>
          <div className="flex flex-wrap gap-3 bg-[#0a0a0a] border border-white/10 p-6 rounded-none">
            <div className="flex min-w-[80px] flex-1 flex-col gap-1 items-center text-center">
              <p className={`text-[#d4af37] text-2xl font-bold leading-tight ${cinzel.className}`}>99.8%</p>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Realism</p>
            </div>
            <div className="w-px h-10 bg-[#2d2d2d] self-center"></div>
            <div className="flex min-w-[80px] flex-1 flex-col gap-1 items-center text-center">
              <p className={`text-white text-2xl font-bold leading-tight ${cinzel.className}`}>High</p>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Metalness</p>
            </div>
            <div className="w-px h-10 bg-[#2d2d2d] self-center"></div>
            <div className="flex min-w-[80px] flex-1 flex-col gap-1 items-center text-center">
              <p className={`text-white text-2xl font-bold leading-tight ${cinzel.className}`}>0.85</p>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Clearcoat</p>
            </div>
          </div>
          </TextReveal>
        </div>

        {/* Material Science Description */}
        <div className="mt-12 px-4">
          <TextReveal delay={0.2}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-white text-sm font-bold tracking-[0.2em] uppercase ${cinzel.className}`}>Material Science</h2>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-light">
            Engineered with S_FIT AI&apos;s proprietary light-refraction engine. This fabric blends high-twist Italian silk with microscopic aluminum particles, creating a finish that flows like liquid metal under studio lighting.
          </p>
          </TextReveal>
          
          {/* Chips */}
          <TextReveal delay={0.3}>
          <div className="flex gap-2 flex-wrap mb-12">
            <div className="flex h-8 items-center justify-center border border-[#d4af37]/50 bg-[#d4af37]/10 px-4">
              <p className="text-[#d4af37] text-[10px] uppercase tracking-widest">Brushed Aluminum Finish</p>
            </div>
            <div className="flex h-8 items-center justify-center border border-white/20 bg-white/5 px-4">
              <p className="text-zinc-300 text-[10px] uppercase tracking-widest">Clearcoat Tech</p>
            </div>
            <div className="flex h-8 items-center justify-center border border-white/20 bg-white/5 px-4">
              <p className="text-zinc-300 text-[10px] uppercase tracking-widest">Silk Blend</p>
            </div>
          </div>
          </TextReveal>
        </div>

        {/* Macro Gallery */}
        <div className="mb-12">
          <TextReveal delay={0.1}>
          <div className="px-4 flex items-center justify-between mb-4">
            <h2 className={`text-white text-sm font-bold tracking-[0.2em] uppercase ${cinzel.className}`}>Detail Macro View</h2>
            <p className="text-zinc-500 text-xs">4K Textures</p>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar pb-2">
            <div 
              className="min-w-[200px] aspect-[4/5] bg-zinc-800 bg-cover bg-center filter saturate-[0.9] contrast-[1.1]"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXruL0skVnUrOc5YpZ2nWDsWEX5ZxZ_JP5fjjc87VGL1Or3ZQLYga9h4-5QB_opRCAPjcpA3wXJv0uA2GNRmveI81vtVYwA6M6hy9N0o30Q3Culn7Si9HtP9yc9SCNUIWlqMCFvMgYQvi3T2jxQFFPdPDkhH4Wu4UWLKxrKm1YNIHPQBN5HrffgMF9LqvAmurBbvAOJYWZS8huThjtvEvSDXcccjmAY8SKX4gjtuaGrNd5fNc0Aqd-nIwVSL91bzJVXnNMzrE1xgU")' }}
            />
            <div 
              className="min-w-[200px] aspect-[4/5] bg-zinc-800 bg-cover bg-center filter saturate-[0.9] contrast-[1.1]"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNDky8wcMr6IK9CsH5lHzP94q1xpgzj4sRCwHxgBWqLc4bhwFC8wVPIX4A2ale1spgQJk6lEtR4Mf0mCG37C472JNMeZq_wm2AVX1NajotLS_B5KG84rqBjAb0hJ5bFvwqOFWmJ9VMqD-XEpESBv6RThxTv4WJTrcMde1L9BvbZjeHKxhKv-qw0gwOK03_YR1dqSy_c1YLMtdsLGRMR3psVHe8np-XEjOll6sldTVo9-9zduCb3RbuXjsiyVRTGv4ZJcY4hBUZQ24")' }}
            />
            <div 
              className="min-w-[200px] aspect-[4/5] bg-zinc-800 bg-cover bg-center filter saturate-[0.9] contrast-[1.1]"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqkn4HFnxWGVtmWbfYSHCV_0_Eix7IhuazsGoJhX_mZ0YSMRUig_BHDMoHIAapobfGWThLoMAvthdSMIT6zWhWTFp8GxOJe9a0NYtCwiUlYeJgFDX6uf47SweuwPSw0ifCVSal7eP6WDO1pyzOpMYk-TECLTV3Il19DmBV5p8acsIruMpV5hpoay7GQLfUQFZr1AMRddi5grhGdrPXb-TbjULkGcldw5FZg81mGVBmRGEfOT_KrdMTUPs9rPuDcgFxbGZ-rA_imkk")' }}
            />
          </div>
          </TextReveal>
        </div>

        {/* Comparison Table */}
        <TextReveal delay={0.2}>
        <div className="px-4 py-8 bg-[#0a0a0a] border-y border-white/10 mb-8">
          <div className="flex justify-between items-center py-2">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Weight</span>
            <span className="text-white text-sm">240 GSM</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-white/5">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Composition</span>
            <span className="text-white text-sm">70% Silk, 30% Metallic Alloy</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-white/5">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Physics Mesh</span>
            <span className="text-white text-sm">12,400 Polygons</span>
          </div>
        </div>
        </TextReveal>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 w-full p-4 pb-8 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 flex gap-4 items-center z-50">
        <div className="flex flex-col flex-1">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Starting at</span>
          <p className={`text-white text-xl font-bold ${cinzel.className}`}>$2,850</p>
        </div>
        <Link href="/luxury/fitting" className="flex-[2] bg-white text-black h-14 flex items-center justify-center gap-3 hover:bg-zinc-200 transition-colors active:scale-95 duration-300 group">
          <span className="material-symbols-outlined font-light group-hover:scale-110 transition-transform">person_add_alt</span>
          <span className="text-[11px] tracking-[0.2em] uppercase font-bold">Try on Mannequin</span>
        </Link>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
    </SmoothScrollProvider>
  );
}
