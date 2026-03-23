"use client";

import React, { useEffect, useState } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import { motion } from "framer-motion";
import { LuxuryImageDistortion } from "./masterpiece/LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#f6f7f8] text-white dark:bg-[#0a0a0a] cursor-none ${spaceGrotesk.className}`}>
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-[#ecab13] bg-[#ecab13]/10"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          width: 48,
          height: 48,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <div className="size-1 rounded-full bg-[#ecab13]" />
      </motion.div>

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >
        {/* Scanning Effect Overlay */}
        <div
            className="absolute top-[40%] w-full h-[2px] opacity-60"
            style={{
                background: "linear-gradient(90deg, transparent, #ecab13, transparent)",
                boxShadow: "0 0 15px #ecab13"
            }}
        ></div>

        {/* Brand Banner Parallax */}
        <div
          className="absolute top-0 left-0 w-full h-48 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=2000')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
          }}
        />

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-3 rounded-full px-4 py-2" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            {/* Sophisticated Loading Animation */}
            <div className="relative size-3 flex items-center justify-center">
              <svg className="absolute inset-0 size-full animate-[spin_3s_linear_infinite]" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" stroke="rgba(236,171,19,0.2)" strokeWidth="1" />
                <path d="M2 2h6v20H2z" fill="url(#goldGradient)" className="animate-[pulse_2s_ease-in-out_infinite]" />
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ecab13" />
                    <stop offset="1" stopColor="#ecab13" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="size-1 bg-[#ecab13] shadow-[0_0_8px_#ecab13] animate-pulse"></div>
            </div>
            <h2 className={`text-sm font-bold tracking-widest uppercase text-white ${cinzel.className}`}>Masterpiece Fit</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Brand Info & Upper HUD */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="text-center mb-6">
            <h1 className={`text-4xl tracking-widest text-[#ecab13] uppercase ${cinzel.className}`} style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>Gucci</h1>
            <p className="text-xs tracking-widest text-white/70 uppercase mt-2">Authentic Luxury Fitting</p>
          </div>

          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className={`text-xs font-medium uppercase tracking-tighter text-white ${cinzel.className}`}>Body Stability</p>
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
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className={`text-[10px] font-bold uppercase text-white/60 ${cinzel.className}`}>Shoulder</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">98%</span>
              <span className="text-[10px] font-bold text-green-400">+2%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className={`text-[10px] font-bold uppercase text-white/60 ${cinzel.className}`}>Waist</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">94%</span>
              <span className="text-[10px] font-bold text-green-400">+1%</span>
            </div>
          </div>
          <div className="flex min-w-[120px] flex-col gap-1 rounded-lg p-3" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className={`text-[10px] font-bold uppercase text-white/60 ${cinzel.className}`}>Hem Line</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold">100%</span>
              <span className="material-symbols-outlined text-[14px] text-[#ecab13]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-4 py-6 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-6">
              <LuxuryImageDistortion className="flex min-w-[200px] flex-col gap-3 rounded-2xl border border-[#ecab13] bg-[#ecab13]/10 p-2 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13]/50">
                <div
                  className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat shadow-[0_0_20px_rgba(236,171,19,0.2)]"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-2 pb-2 text-center">
                  <p className={`truncate text-xs tracking-widest uppercase text-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-sm font-light text-[#ecab13] tracking-widest mt-1">$2,400</p>
                </div>
              </LuxuryImageDistortion>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-[200px] flex-col gap-3 rounded-2xl p-2 opacity-60 transition-all duration-1000 hover:opacity-100" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <div
                    className="aspect-[3/4] w-full rounded-xl bg-cover bg-center bg-no-repeat mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-2 pb-2 text-center">
                    <p className={`truncate text-xs tracking-widest uppercase text-white/80 ${cinzel.className}`}>{item.name}</p>
                    <p className="text-sm font-light text-[#ecab13]/60 tracking-widest mt-1">{item.price}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-center gap-10 p-4">
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center">
              {/* Sophisticated Gold Line Tracing Ring */}
              <div className="absolute inset-[-4px] animate-[spin_4s_linear_infinite] rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 0 340deg, #ecab13 360deg)" }}></div>
              <div className="absolute inset-[-4px] animate-[spin_4s_linear_infinite] rounded-full blur-sm opacity-50" style={{ background: "conic-gradient(from 0deg, transparent 0 340deg, #ecab13 360deg)" }}></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] border border-[#ecab13]/30 shadow-[0_0_30px_rgba(236,171,19,0.15)] transition-all duration-700 hover:shadow-[0_0_40px_rgba(236,171,19,0.3)] hover:scale-105">
                <div className="flex size-16 items-center justify-center rounded-full border border-white/5">
                  <span className="material-symbols-outlined text-3xl text-[#ecab13] font-light">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center w-max">
                <span className={`text-[10px] uppercase tracking-[0.4em] text-[#ecab13]/80 ${cinzel.className}`}>Capture Fit</span>
              </div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(10, 10, 10, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
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
