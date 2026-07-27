"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const LuxuryImageDistortion = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 group-hover:blur-[2px]"
        style={{ backgroundImage: `url("${src}")` }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
    </div>
  );
};

export default function LuxuryLiveFitting() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand] = useState("GUCCI");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center bg-[#0a0a0a]">
        <div className="relative size-32">
          <div className="absolute inset-0 border border-[#ecab13]/20"></div>
          <div className="absolute top-0 left-0 h-[1px] bg-[#ecab13] animate-[traceTop_2s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 right-0 w-[1px] bg-[#ecab13] animate-[traceRight_2s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 right-0 h-[1px] bg-[#ecab13] animate-[traceBottom_2s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 left-0 w-[1px] bg-[#ecab13] animate-[traceLeft_2s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className={`text-[#ecab13] text-sm tracking-[0.2em] uppercase ${playfair.className}`}>S_FIT</span>
          </div>
        </div>
        <style jsx>{`
          @keyframes traceTop { 0% { width: 0; } 25% { width: 100%; } 100% { width: 100%; } }
          @keyframes traceRight { 0% { height: 0; } 25% { height: 0; } 50% { height: 100%; } 100% { height: 100%; } }
          @keyframes traceBottom { 0% { width: 0; } 50% { width: 0; } 75% { width: 100%; } 100% { width: 100%; } }
          @keyframes traceLeft { 0% { height: 0; } 75% { height: 0; } 100% { height: 100%; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white ${spaceGrotesk.className}`}>
      <div className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300" style={{ opacity: 1 }}>
        <div
          className={`absolute size-8 rounded-full border border-[#ecab13] transition-transform duration-100 ${isHovering ? 'scale-150 bg-[#ecab13]/10' : 'scale-100'}`}
          style={{ left: cursorPos.x, top: cursorPos.y, transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}` }}
        />
        <div
          className="absolute size-1.5 rounded-full bg-[#ecab13]"
          style={{ left: cursorPos.x, top: cursorPos.y, transform: "translate(-50%, -50%)" }}
        />
      </div>

      <div className="relative flex h-screen w-full flex-col">
        <div className="absolute inset-x-0 top-0 h-[40vh] overflow-hidden opacity-40">
           <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 translate-y-[-10%]" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542340916-25925a1f6492?auto=format&fit=crop&q=80&w=2000")' }} />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        </div>

        <div className="z-20 flex items-center justify-between p-8">
          <Link href="/" className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-colors duration-700 hover:bg-[#ecab13]/20" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <span className="material-symbols-outlined text-white">close</span>
          </Link>
          <div className="flex flex-col items-center">
             <h2 className={`text-2xl font-bold tracking-[0.2em] text-[#ecab13] ${playfair.className}`}>{selectedBrand}</h2>
             <span className="text-[10px] uppercase tracking-widest text-white/60 mt-1">High-Fidelity Fitting</span>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-colors duration-700 hover:bg-[#ecab13]/20" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <span className="material-symbols-outlined text-white">tune</span>
          </div>
        </div>

        <div className="z-10 px-8 pt-4 max-w-lg mx-auto text-center">
            <p className={`text-white/80 text-sm leading-relaxed ${playfair.className} italic`}>
              &quot;Elegance is not about being noticed, it&apos;s about being remembered.&quot; Experience our latest collection with cinematic precision.
            </p>
        </div>

        <div className="absolute inset-0 z-0 flex items-center justify-center pt-20">
           <LuxuryImageDistortion src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" alt="Luxury Fashion Fitting" className="w-full max-w-md aspect-[3/4] opacity-80" />
        </div>

        <div className="absolute left-8 top-1/3 z-10 flex flex-col gap-6">
          <div className="flex min-w-[140px] flex-col gap-2 rounded-none border-l-2 border-[#ecab13] bg-black/40 p-4 backdrop-blur-md">
            <p className={`text-xs uppercase tracking-widest text-[#ecab13] ${playfair.className}`}>Material</p>
            <span className="text-sm tracking-wider text-white">Silk Blend</span>
          </div>
          <div className="flex min-w-[140px] flex-col gap-2 rounded-none border-l-2 border-[#ecab13] bg-black/40 p-4 backdrop-blur-md">
            <p className={`text-xs uppercase tracking-widest text-[#ecab13] ${playfair.className}`}>Fit Status</p>
            <span className="text-sm tracking-wider text-white">Perfectly Tailored</span>
          </div>
        </div>

        <div className="mt-auto z-10 pb-12 w-full max-w-5xl mx-auto">
          <div className="flex items-end justify-between px-8 mb-6">
             <h3 className={`text-xl text-[#ecab13] ${playfair.className} italic`}>Curated for you</h3>
             <span className="text-xs uppercase tracking-[0.2em] text-white/50 border-b border-white/20 pb-1">View Collection</span>
          </div>
          <div className="flex gap-6 overflow-x-auto px-8 pb-4 scrollbar-hide">
            {[
              { name: "Aura Blazer", price: 2400, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
              { name: "Silk Gown", price: 3100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
              { name: "Tech Coat", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
            ].map((item, i) => (
              <div key={i} className="group flex min-w-[200px] flex-col gap-4 cursor-pointer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-[#1a1a1a]">
                  <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" style={{ backgroundImage: `url("${item.img}")` }} />
                  {i === 0 && (
                    <div className="absolute top-3 left-3 bg-[#ecab13] text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1">Selected</div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className={`text-lg text-white transition-colors duration-700 group-hover:text-[#ecab13] ${playfair.className}`}>{item.name}</p>
                  <p className="text-sm tracking-wider text-white/50">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
