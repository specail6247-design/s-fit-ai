"use client";

import React, { useState, useEffect } from "react";
import { Space_Grotesk, Cinzel } from "next/font/google";
import LuxuryImageDistortion from "./LuxuryImageDistortion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });

export default function LuxuryLiveFitting() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [offsetY, setOffsetY] = useState(0);

  const brand = {
    name: "Maison Margiela",
    description: "Avant-garde luxury fashion house known for unconventional aesthetics.",
    bannerImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2000"
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setOffsetY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => setIsLoading(false), 2500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={`relative flex h-screen w-full items-center justify-center bg-[#0A0A0A] ${cinzel.className}`}>
        <div className="relative w-64 h-96 flex flex-col items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect
              x="0" y="0" width="100" height="100"
              fill="none" stroke="#C9B037" strokeWidth="0.5"
              className="animate-[draw_2s_ease-in-out_infinite]"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
          </svg>
          <style jsx global>{`
            @keyframes draw {
              0% { stroke-dashoffset: 400; }
              50% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -400; }
            }
          `}</style>
          <h2 className="text-[#C9B037] text-2xl tracking-[0.2em] animate-pulse">LUXURY</h2>
          <p className="text-[#F4E4BC]/60 text-sm mt-4 tracking-widest uppercase">Atelier</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-white cursor-none ${spaceGrotesk.className}`}>

      {/* Custom Cursor */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full border border-[#C9B037] transition-transform duration-75 ease-out"
        style={{ width: '40px', height: '40px', left: cursorPos.x - 20, top: cursorPos.y - 20 }}
      />

      {/* Brand Parallax Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 z-0">
        <div
           className="w-full h-[120%] bg-cover bg-center transition-transform duration-1000"
           style={{ backgroundImage: `url(${brand.bannerImage})`, transform: `translateY(-${offsetY * 0.2}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/50 to-[#0A0A0A] z-0" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex h-full w-full">

        {/* Left/Main Visual Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-12">
            <div className="w-full max-w-2xl aspect-[3/4] relative rounded-sm overflow-hidden shadow-[0_0_40px_rgba(201,176,55,0.1)]">
               <LuxuryImageDistortion
                 src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
               />

               {/* Overlay Elements */}
               <div className="absolute top-8 w-full flex justify-between px-8">
                  <h1 className={`${cinzel.className} text-3xl font-bold tracking-widest text-[#C9B037]`}>
                    LIVE FIT
                  </h1>
               </div>

               <div className="absolute bottom-8 w-full px-8 text-center">
                   <h2 className={`${cinzel.className} text-4xl tracking-widest text-white mb-4 drop-shadow-lg`}>
                       {brand.name}
                   </h2>
                   <p className="text-[#F4E4BC] text-sm tracking-wider max-w-md mx-auto leading-relaxed">
                       {brand.description}
                   </p>
               </div>
            </div>
        </div>

        {/* Right Sidebar - Vertical Masonry Product Cards */}
        <div className="w-[400px] h-full bg-[#0A0A0A]/80 backdrop-blur-xl border-l border-[#C9B037]/20 p-8 overflow-y-auto scrollbar-hide">
            <h3 className={`${cinzel.className} text-xl text-[#C9B037] mb-8 tracking-widest text-center border-b border-[#C9B037]/20 pb-4`}>
              THE COLLECTION
            </h3>

            <div className="flex flex-col gap-10">
                {[
                  { name: "Aura Blazer", price: "$2,400", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" },
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
                ].map((item, i) => (
                    <div key={i} className="group relative flex flex-col gap-4 cursor-none transition-all duration-1000 hover:-translate-y-2">
                        <div className="aspect-[3/4] w-full overflow-hidden bg-[#1a1a1a]">
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.img})` }}
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className={`${cinzel.className} text-lg tracking-widest text-white group-hover:text-[#C9B037] transition-colors duration-1000`}>
                                {item.name}
                            </p>
                            <p className="text-sm tracking-widest text-[#F4E4BC]">
                                {item.price}
                            </p>
                        </div>
                        <div className="absolute inset-0 border border-transparent group-hover:border-[#C9B037]/30 pointer-events-none transition-colors duration-1000" />
                    </div>
                ))}
            </div>

            {/* Capture Controls */}
            <div className="mt-16 flex flex-col items-center gap-6 pb-12">
                <button className="relative flex size-20 items-center justify-center rounded-full border border-[#C9B037] bg-transparent hover:bg-[#C9B037]/10 transition-colors duration-1000 group cursor-none">
                    <span className="material-symbols-outlined text-3xl text-[#C9B037] group-hover:scale-110 transition-transform duration-1000">camera</span>
                    <div className="absolute -inset-2 rounded-full border border-[#C9B037]/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                </button>
                <span className={`${cinzel.className} text-xs tracking-[0.3em] text-[#C9B037]`}>CAPTURE FIT</span>
            </div>
        </div>

      </div>
    </div>
  );
}
