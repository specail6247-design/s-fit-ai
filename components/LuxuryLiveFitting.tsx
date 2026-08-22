"use client";

import React from "react";
import { Playfair_Display, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";
import { useState, useEffect } from "react";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], display: "swap" });

export default function LuxuryLiveFitting() {
  const [selectedBrand, setSelectedBrand] = useState("Aura");

  const brandData: Record<string, { desc: string, banner: string }> = {
    Aura: {
      desc: "Exclusive collection blending traditional craftsmanship with avant-garde AI styling.",
      banner: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=2000&q=80"
    },
    Maison: {
      desc: "Elegance refined. Maison crafts garments focusing on flowing silhouettes.",
      banner: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
    },
    "L'Atelier": {
      desc: "Structured modernity in every thread, designed for the bold.",
      banner: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2000&q=80"
    },
    Noir: {
      desc: "Cutting-edge minimalist streetwear using technical fabrics.",
      banner: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=2000&q=80"
    }
  };

  const currentBrandInfo = brandData[selectedBrand] || brandData.Aura;

  useEffect(() => {
    const cursor = document.getElementById("luxury-cursor");
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#f6f7f8] text-white dark:bg-[#101922] ${playfair.className}`}>
            {/* Custom Cursor (Gold Ring) */}
      <style dangerouslySetInnerHTML={{__html: `
        * { cursor: none !important; }
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border: 1px solid #ecab13;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, background-color 0.3s;
          mix-blend-mode: difference;
        }
        .custom-cursor::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background-color: #ecab13;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
      `}} />
      <div className="custom-cursor" id="luxury-cursor"></div>

      {/* Main AR Viewport Container */}
      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        {/* Luxury Background Distillery */}
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />
        </div>

        {/* Scanning Effect Overlay (Gold) */}
        <div
            className="absolute top-[40%] w-full h-[1px] opacity-60 z-10 duration-1000 transition-all"
            style={{
                background: "linear-gradient(90deg, transparent, #ecab13, transparent)",
                boxShadow: "0 0 10px #ecab13"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className={`text-sm font-bold tracking-widest uppercase text-[#ecab13] ${cinzel.className}`}>Live Fit AI</h2>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">flash_on</span>
          </div>
        </div>

        {/* Brand Parallax Experience */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20 transition-opacity duration-1000"
             style={{
               backgroundImage: `url("${currentBrandInfo.banner}")`,
               backgroundSize: 'cover',
               backgroundAttachment: 'fixed',
               backgroundPosition: 'center',
             }}
        />

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
          {/* Brand Description */}
          <div className="px-6 pb-4">
             <h3 className={`text-lg text-[#ecab13] ${cinzel.className}`}>{selectedBrand}</h3>
             <p className="text-xs text-white/70 max-w-sm mt-1 leading-relaxed transition-all duration-1000">{currentBrandInfo.desc}</p>
          </div>

          {/* Garment Carousel - Luxury Layout */}
          <div className="flex overflow-x-auto px-6 py-4 scrollbar-hide gap-6" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-6">
              <div
                className="flex w-40 flex-col gap-4 rounded-xl border border-[#ecab13]/50 bg-black/40 p-2 backdrop-blur-xl transition-all duration-700 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedBrand("Aura")}
              >
                <div
                  className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                ></div>
                <div className="px-2 pb-2 text-center">
                  <p className={`truncate text-xs tracking-wider uppercase text-white ${cinzel.className}`}>Aura Blazer</p>
                  <p className="text-sm mt-1 text-[#ecab13] font-serif">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$3,100", brand: "Maison", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", brand: "L'Atelier", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", brand: "Noir", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex w-40 flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl transition-all duration-1000 hover:scale-105 hover:border-[#ecab13]/50 cursor-pointer"
                  onClick={() => setSelectedBrand(item.brand)}
                >
                    <div
                    className="aspect-[3/4] w-full rounded-lg bg-cover bg-center bg-no-repeat opacity-80 hover:opacity-100 transition-opacity duration-700"
                    style={{ backgroundImage: `url("${item.img}")` }}
                    ></div>
                    <div className="px-2 pb-2 text-center">
                    <p className={`truncate text-xs tracking-wider uppercase text-white/80 ${cinzel.className}`}>{item.name}</p>
                    <p className="text-sm mt-1 text-white/50 font-serif">{item.price}</p>
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
              <svg className="absolute inset-0 w-full h-full animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="#ecab13" strokeWidth="1" strokeDasharray="300" strokeDashoffset="150" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-[#ecab13]/10 blur-xl transition-all duration-1000"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#ecab13] bg-white">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#101922]/10">
                  <span className="material-symbols-outlined text-4xl text-[#101922]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecab13] ${cinzel.className}`}>Fit Snap</span>
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
