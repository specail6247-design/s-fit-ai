"use client";

import React, { useEffect, useState } from "react";
import { Cinzel } from "next/font/google";
import { motion, useMotionValue, useSpring } from 'framer-motion';
import LuxuryImageDistortion from './masterpiece/LuxuryImageDistortion';

const cinzel = Cinzel({ subsets: ["latin"] });

interface Brand {
  name: string;
  desc: string;
  banner: string;
}

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const brands: Brand[] = [{name: 'Gucci', desc: 'Italian Luxury', banner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000'}];

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className={`relative flex min-h-screen w-full flex-col bg-[#0a0a0a] text-[#ecab13] ${cinzel.className}`}>
      <style>{`* { cursor: none; }`}</style>
      <motion.div className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#ecab13] pointer-events-none z-[9999]" style={{ x: cursorXSpring, y: cursorYSpring }} />
      {/* Main AR Viewport Container */}
      <div
        className="fixed inset-0"
        data-alt="User reflection with AR garment overlay"
      >
        {selectedBrand ? (
          <div className="fixed inset-0 z-[-1]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selectedBrand.banner} alt={selectedBrand.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute top-1/4 left-0 right-0 text-center z-10 text-white">
              <h1 className="text-4xl">{selectedBrand.name}</h1>
              <p>{selectedBrand.desc}</p>
            </div>
          </div>
        ) : (
          <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" alt="User reflection with AR garment overlay" />
        )}
        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[2px] opacity-60"
            style={{
                background: "linear-gradient(90deg, transparent, #2b8cee, transparent)",
                boxShadow: "0 0 15px #2b8cee"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-[#ecab13]">Luxury Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="absolute top-24 left-0 mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-tighter text-white">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#ecab13]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#ecab13]" style={{ width: "95%" }}></div>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <span className="material-symbols-outlined text-[12px]">target</span>
                MediaPipe Locked
              </p>
            </div>
          </div>
        </div>

        {/* Floating Fit Stats Sidebar (Right) */}
        <div className="absolute right-4 top-1/4 z-10 flex flex-col gap-3">
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">98%</span>
              <span className="text-[10px] font-bold text-green-400">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">94%</span>
              <span className="text-[10px] font-bold text-green-400">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="absolute bottom-0 w-full pb-10 z-10 flex flex-col items-center pointer-events-none">
          <div className="w-full flex justify-center pointer-events-auto mb-4">
            {brands.map((b, i) => (
              <button key={i} onClick={() => setSelectedBrand(b)} className="px-4 py-2 border border-[#ecab13] text-[#ecab13] rounded-full mx-2 uppercase text-xs tracking-widest bg-black/50 hover:bg-[#ecab13] hover:text-black transition-colors duration-1000">
                {b.name}
              </button>
            ))}
            <button onClick={() => setSelectedBrand(null)} className="px-4 py-2 border border-white/30 text-white rounded-full mx-2 uppercase text-xs tracking-widest bg-black/50 hover:bg-white hover:text-black transition-colors duration-1000">
              Clear
            </button>
          </div>
          {/* Garment Carousel */}
          <div className="w-full max-h-[50vh] overflow-y-auto pointer-events-auto">
            <div className="grid grid-cols-1 gap-6 px-4 py-8">
              <div className="flex w-full flex-col gap-2 rounded-xl border-2 border-[#ecab13] bg-[#ecab13]/10 p-2 backdrop-blur-md">
                <div
                  className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat transition-all duration-1000 hover:scale-105"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-2 pb-2 mt-2">
                  <p className="truncate text-sm font-bold uppercase text-white">Aura Blazer</p>
                  <p className="text-sm font-bold text-[#ecab13]">$12,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$13,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              ].map((item, i) => (
                <div key={i} className="flex w-full flex-col gap-2 rounded-xl p-2 opacity-80 transition-all duration-1000 hover:opacity-100" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
                    <div
                    className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat transition-all duration-1000 hover:scale-105"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-2 pb-2 mt-2">
                    <p className="truncate text-sm font-bold uppercase text-white">{item.name}</p>
                    <p className="text-sm font-bold text-[#ecab13]">{item.price}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4 pointer-events-auto mt-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group">
              <div className="absolute inset-0 border border-[#ecab13] animate-[pulse_2s_ease-in-out_infinite] rounded-full blur-sm"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#ecab13] bg-[#0a0a0a] transition-all duration-700 group-hover:scale-105 group-hover:bg-[#ecab13] text-[#ecab13] group-hover:text-[#0a0a0a]">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#ecab13]/30">
                  <span className="material-symbols-outlined text-4xl">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecab13]">Fit Snap</span>
              </div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(236, 171, 19, 0.3)" }}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-2 w-32 rounded-full bg-[#ecab13]/20 z-20 pointer-events-none"></div>
      </div>
    </div>
  );
}
