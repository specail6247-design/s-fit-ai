"use client";

import React, { useState } from "react";
import LuxuryImageDistortion from "./masterpiece/LuxuryImageDistortion";
import GoldRingCursor from "./masterpiece/GoldRingCursor";

export default function LuxuryLiveFitting() {
  const [selectedBrand] = useState<{
    name: string;
    description: string;
    bannerImage: string;
  } | null>({
    name: "AURA LUXE",
    description: "Defining modern elegance with timeless silhouettes and cutting-edge materials. Experience the intersection of heritage and innovation.",
    bannerImage: "https://images.unsplash.com/photo-1549298240-0d8e60513026?auto=format&fit=crop&q=80&w=2000"
  });

  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white`}>
      <GoldRingCursor />

      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 animate-[spin_2s_linear_infinite] border-t-2 border-r-2 border-[#ecab13] rounded-sm opacity-80"></div>
            <div className="absolute inset-2 animate-[spin_3s_linear_infinite_reverse] border-b-2 border-l-2 border-[#ecab13] rounded-sm opacity-60"></div>
          </div>
        </div>
      )}

      <div
        className="relative flex h-screen w-full flex-col duration-1000 ease-in-out transition-opacity"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <div className="absolute inset-0 z-0 opacity-40">
           <LuxuryImageDistortion imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" />
        </div>

        {selectedBrand && (
          <div className="absolute top-0 w-full h-1/3 z-0 overflow-hidden opacity-30 pointer-events-none">
            <div
              className="w-full h-[150%] bg-cover bg-center bg-no-repeat duration-1000"
              style={{
                backgroundImage: `url(${selectedBrand.bannerImage})`,
                transform: 'translateY(-10%)'
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
          </div>
        )}

        <div className="z-10 flex items-center justify-between p-6 pt-12">
          <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#ecab13]/50">
            <span className="material-symbols-outlined text-white/80">close</span>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-serif text-xl font-medium tracking-[0.2em] uppercase text-[#ecab13]">S_FIT AI</h2>
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Luxury Fitting</span>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#ecab13]/50">
            <span className="material-symbols-outlined text-white/80">flash_on</span>
          </div>
        </div>

        {selectedBrand && (
          <div className="mt-8 px-8 z-10 duration-1000 animate-fade-in-up">
            <h1 className="font-serif text-3xl font-light tracking-wide text-white mb-2">{selectedBrand.name}</h1>
            <p className="max-w-md text-xs leading-relaxed text-white/60 font-light tracking-wide">{selectedBrand.description}</p>
          </div>
        )}

        <div className="mt-auto pb-12 z-10 px-6">
          <div className="flex overflow-x-auto gap-6 py-8 scrollbar-hide snap-x snap-mandatory" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <div className="snap-center shrink-0 flex w-48 flex-col gap-4 rounded-sm border border-[#ecab13]/30 bg-black/60 p-2 backdrop-blur-xl transition-all duration-700 hover:border-[#ecab13] hover:-translate-y-2 group cursor-pointer">
                <div className="overflow-hidden rounded-sm relative aspect-[3/4]">
                  <div
                    className="absolute inset-0 w-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
                <div className="px-2 pb-2 text-center">
                  <p className="font-serif text-sm tracking-widest uppercase text-white/90">Aura Blazer</p>
                  <p className="mt-1 text-xs tracking-wider text-[#ecab13]">$2,400</p>
                </div>
              </div>

              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0" },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA" },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk" },
              ].map((item, i) => (
                <div key={i} className="snap-center shrink-0 flex w-40 flex-col gap-4 rounded-sm border border-white/10 bg-black/40 p-2 backdrop-blur-md transition-all duration-700 hover:border-[#ecab13]/50 hover:-translate-y-2 group cursor-pointer opacity-70 hover:opacity-100">
                    <div className="overflow-hidden rounded-sm relative aspect-[3/4]">
                      <div
                        className="absolute inset-0 w-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
                        style={{ backgroundImage: `url("${item.img}")` }}
                      ></div>
                    </div>
                    <div className="px-2 pb-2 text-center">
                    <p className="font-serif text-xs tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">{item.name}</p>
                    <p className="mt-1 text-[10px] tracking-wider text-white/40 group-hover:text-[#ecab13]/80 transition-colors">{item.price}</p>
                    </div>
                </div>
              ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-12">
            <button className="group flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-transparent transition-all duration-700 hover:border-[#ecab13] hover:bg-[#ecab13]/10">
              <span className="material-symbols-outlined text-white/60 transition-colors group-hover:text-[#ecab13]">photo_library</span>
            </button>
            <div className="relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#ecab13]/20 blur-2xl transition-all duration-700 group-hover:bg-[#ecab13]/40 group-hover:blur-3xl"></div>
              <button className="relative flex size-24 shrink-0 items-center justify-center rounded-full border border-[#ecab13]/50 bg-black/40 backdrop-blur-md transition-transform duration-700 group-hover:scale-105">
                <div className="flex size-20 items-center justify-center rounded-full border-2 border-[#ecab13]">
                  <span className="material-symbols-outlined text-4xl text-[#ecab13] font-light">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-8 flex flex-col items-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#ecab13]">Capture</span>
              </div>
            </div>
            <button className="group flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-transparent transition-all duration-700 hover:border-[#ecab13] hover:bg-[#ecab13]/10">
              <span className="material-symbols-outlined text-white/60 transition-colors group-hover:text-[#ecab13]">refresh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
