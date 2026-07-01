"use client";

import React from "react";
import { Cinzel } from "next/font/google";
import { useStore } from "@/store/useStore";
import { brands } from "@/data/mockData";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const cinzel = Cinzel({ subsets: ["latin"], display: "optional" });

export default function LuxuryLiveFitting() {
  const { selectedBrand } = useStore();
  const activeBrand = brands.find((b) => b.id === selectedBrand);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-black text-white ${cinzel.className}`}>
      {/* Custom Cursor */}
      <div className="pointer-events-none fixed z-50 h-8 w-8 rounded-full border-2 border-[#ecab13] transition-transform duration-700 ease-out" style={{ left: mousePosition.x, top: mousePosition.y, transform: "translate(-50%, -50%)" }}></div>

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
      >
        <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />

        {/* Brand Parallax Banner */}
        {activeBrand && (
          <div className="absolute top-0 left-0 w-full h-48 z-0">
            <div
              className="absolute inset-0 bg-fixed bg-cover bg-center opacity-40 transition-opacity duration-1000 mask-image-b"
              style={{ backgroundImage: `url(${activeBrand.bannerImage || 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80'})`, maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)" }}
            ></div>
            <div className="absolute bottom-4 left-6 max-w-sm">
                <p className="text-xs text-white/80 font-light tracking-wide leading-relaxed" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                  {activeBrand.description || 'Exclusive collection.'}
                </p>
            </div>
          </div>
        )}

        {/* Scanning Effect Overlay (Tracing Box Animation) */}
        <div className="absolute top-[40%] w-full flex justify-center opacity-80 z-10 pointer-events-none">
          <div className="relative w-64 h-64 border border-[#ecab13]/20">
            {/* Top Line */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-[#ecab13]"
              style={{ boxShadow: "0 0 15px #ecab13" }}
              animate={{ width: ["0%", "100%", "100%", "100%"], left: ["0%", "0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Right Line */}
            <motion.div
              className="absolute top-0 right-0 w-[2px] bg-[#ecab13]"
              style={{ boxShadow: "0 0 15px #ecab13" }}
              animate={{ height: ["0%", "100%", "100%", "100%"], top: ["0%", "0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            {/* Bottom Line */}
            <motion.div
              className="absolute bottom-0 right-0 h-[2px] bg-[#ecab13]"
              style={{ boxShadow: "0 0 15px #ecab13" }}
              animate={{ width: ["0%", "100%", "100%", "100%"], right: ["0%", "0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            {/* Left Line */}
            <motion.div
              className="absolute bottom-0 left-0 w-[2px] bg-[#ecab13]"
              style={{ boxShadow: "0 0 15px #ecab13" }}
              animate={{ height: ["0%", "100%", "100%", "100%"], bottom: ["0%", "0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 3 }}
            />
          </div>
        </div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-full px-6 py-2 transition-all duration-700" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-[#ecab13]"></div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-white">{activeBrand ? activeBrand.name : 'LUXURY FIT AI'}</h2>
            </div>
            {activeBrand && <p className="text-[8px] text-[#ecab13] uppercase tracking-[0.2em]">Authentic Render</p>}
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
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
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">98%</span>
              <span className="text-[10px] font-bold text-green-400">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">94%</span>
              <span className="text-[10px] font-bold text-green-400">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-[10px] font-bold uppercase text-white/60">Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel (Vertical) */}
          <div className="flex flex-col h-full overflow-y-auto px-6 py-6 scrollbar-hide transition-all duration-1000 z-20 pointer-events-auto" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex flex-col gap-6">
              <div className="flex w-48 flex-col gap-3 rounded-xl border-2 border-[#ecab13] bg-[#ecab13]/10 p-2 backdrop-blur-md transition-all duration-700 hover:bg-[#ecab13]/20 cursor-pointer">
                <div
                  className="aspect-[4/5] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-1 pb-1">
                  <p className="truncate text-[10px] font-bold uppercase text-white">Aura Blazer</p>
                  <p className="text-[10px] font-bold text-[#ecab13]">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex w-48 flex-col gap-3 rounded-xl p-2 opacity-80 transition-all duration-700 hover:opacity-100 hover:scale-105 cursor-pointer" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div
                    className="aspect-[4/5] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-1 pb-1">
                    <p className="truncate text-[10px] font-bold uppercase text-white">{item.name}</p>
                    <p className="text-[10px] font-bold text-white/50">{item.price}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/30 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#ecab13] bg-white">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#101922]/10">
                  <span className="material-symbols-outlined text-4xl text-[#101922]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecab13]">Fit Snap</span>
              </div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
