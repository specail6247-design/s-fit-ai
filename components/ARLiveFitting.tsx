"use client";

import React, { useState, useEffect, useRef } from "react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function ARLiveFitting() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [savedLooks, setSavedLooks] = useState<any[]>([]);
  const [vaultOpen, setVaultOpen] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
    }
  }, [isMuted]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveLook = (item: any) => {
    setSavedLooks(prev => {
      if (!prev.find(i => i.name === item.name)) {
        return [...prev, item];
      }
      return prev;
    });
  };
  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#f6f7f8] text-white dark:bg-[#101922] ${spaceGrotesk.className}`}>
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
                background: "linear-gradient(90deg, transparent, #2b8cee, transparent)",
                boxShadow: "0 0 15px #2b8cee"
            }}
        ></div>

        {/* Top Navigation Bar */}
        <div className="z-10 flex items-center justify-between p-4 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <span className="material-symbols-outlined text-white">close</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="size-2 animate-pulse rounded-full bg-red-500"></div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-white">Live Fit AI</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex size-12 items-center justify-center rounded-full" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined text-white">{isMuted ? 'volume_off' : 'volume_up'}</span>
            </button>
            <button
              onClick={() => setVaultOpen(true)}
              className="flex size-12 items-center justify-center rounded-full relative" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined text-white">inventory_2</span>
              {savedLooks.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2b8cee] text-[8px] font-bold text-white">
                  {savedLooks.length}
                </span>
              )}
            </button>
          </div>


        </div>

        {/* Upper HUD: Stability & AI Status */}
        <div className="mt-4 space-y-4 px-4 z-10">
          <div className="max-w-[240px] rounded-xl p-4" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <p className="text-xs font-medium uppercase tracking-tighter text-white">Body Stability</p>
                <p className="text-xs font-bold leading-none text-[#2b8cee]">95%</p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#2b8cee]" style={{ width: "95%" }}></div>
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
              <span className="material-symbols-outlined text-[14px] text-[#2b8cee]">verified</span>
            </div>
          </div>
        </div>

        {/* Bottom UI Section */}
        <div className="mt-auto pb-10 z-10">
          {/* Garment Carousel */}
          <div className="flex overflow-x-auto px-2 py-4 scrollbar-hide" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="flex items-stretch gap-3">
              <div className="flex min-w-32 flex-col gap-2 rounded-xl border-2 border-[#2b8cee] bg-[#2b8cee]/20 p-1 backdrop-blur-md relative group">
                <div
                  className="aspect-[4/5] w-full rounded-lg bg-cover bg-center bg-no-repeat"
                  data-alt="Luxury blue blazer thumbnail"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0")' }}
                >
                  <button
                    onClick={() => handleSaveLook({ name: "Aura Blazer", price: "$2,400", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxY9ukq_0ezBp667eFIADjvwUjQD6k_aWyIwlge2wLlUgWbhdA1gtTzEhR229n3gi6b_q751PQ7AZTAuppJbH7LSBGieJ6fnaZgFR1Stfc5Xu61TKfxDAO6BI5AzhLLg-xBnLxCpaIgLHyINJ0_k6fmFBdGF200StfWVy9sEqOeGZALjLMC5sGzxvQxIsn5JAfLJ8cBVOAJGEvncLKFjP-ONwsQCxMvn1UIpnqJX8S_clsOsZ7opKl7E7mcblrM0jIJU1Odi6tn0" })}
                    className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                    aria-label="Save Look"
                  >
                    <span className="material-symbols-outlined text-[12px]">favorite_border</span>
                  </button>
                </div>
                <div className="px-1 pb-1 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <p className="truncate text-[10px] font-bold uppercase text-white">Aura Blazer</p>
                    <p className="text-[10px] font-bold text-[#2b8cee]">$2,400</p>
                  </div>
                  <p className="text-[8px] text-[#2b8cee] italic leading-tight">Pair with structured denim for a balanced silhouette.</p>
                </div>
              </div>
              
              {[
                  { name: "Silk Gown", price: "$3,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDuZWxVmd1NmjEA78u9Bug9IALerv3mXMc1jJvFfkpQU0KEpj8H61ezGs7q-hQ_LQRxtHc4H_QAcTqOu2tETfyqrqqB-aXKc3It-W2CEa6sQYIBEuVrJ3bD5_XTaA0GeVrfvnDnypd9so862LZS33A3sTJ-U845P-JhNQnT3cFcg8qcI-I8oVMkmM7fFRmlKYyMl1ej6WWWa3MkChOC6VmkauVlN4Z8jsBZoMcEUD9yXSwQ97ZkmgJJj2A6eIHMvudiZqjCSTgWh0", tip: "Elevate with minimalist silver accessories." },
                  { name: "Moto Jacket", price: "$1,800", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4WsO7nAvYpKcBO57jVyp0YklJpX_1jakpJ8Q8DHKRMnTuFiuqdMOMc5T8jm5VHhZfC00BeK-6O6b2UzIyeGN8OTo4vEWkA4n4WIeBHpjd0E882pLWtMQsFmLD9SSzggRQOqIp_f1PDthmab_IDQQjIlLRLz7awqLtNNwL4AwmMdO1C6Awys7X4XI2eHXujG3PA6q0PWyWDWnKH4UeydNguGQ3QoDfXb_iFtnnamfha3oliMDvJNKh0ziNwdhpcFqMa37R2dXgBTA", tip: "Layer over a soft knit for textural contrast." },
                  { name: "Tech Coat", price: "$4,500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjef1QH6Yj47WsC6tyzaVdCx8u_EHOntW_LwbQvYacs4OUrYqnxBZMKJswSTCNOYPADKBHdr3WRf86o9a3U7tbaZaUxv-0V1fPtVCbcDTFuYPBb5ITuO9bbrSgMckR3OQyQQ5N7b50Q7PWnohUhW10eJ4q0P_fzBprFGVMB3hRK2fwx_r3SrA9W8GcvFT54pPNxi0d2CgbAjYvsILAmB6MYKH6pyc8XhpbS2IlNVVjjFg8iC2t5PY2EsJD0mD7vgAWXN-rcW2ILAk", tip: "Unmatched weather resistance.", locked: true, countdown: "02:00:00" },
              ].map((item, i) => (
                <div key={i} className="flex min-w-32 flex-col gap-2 rounded-xl p-1 opacity-80 group relative" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div
                      className="aspect-[4/5] w-full rounded-lg bg-cover bg-center bg-no-repeat relative overflow-hidden"
                      style={{ backgroundImage: `url("${item.img}")` }}
                    >
                      {item.locked ? (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-2 text-center">
                          <span className="material-symbols-outlined text-white mb-1 text-xl">lock</span>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-white/70">Available in</span>
                          <span className="text-[10px] font-bold text-[#ecab13]">{item.countdown}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSaveLook(item)}
                          className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                          aria-label="Save Look"
                        >
                          <span className="material-symbols-outlined text-[12px]">favorite_border</span>
                        </button>
                      )}
                    </div>
                    <div className="px-1 pb-1 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <p className="truncate text-[10px] font-bold uppercase text-white">{item.name}</p>
                        <p className="text-[10px] font-bold text-white/50">{item.price}</p>
                      </div>
                      <p className="text-[8px] text-white/50 italic leading-tight">{item.tip}</p>
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
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#2b8cee]/30 blur-xl"></div>
              <button className="relative flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-[#2b8cee] bg-white">
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#101922]/10">
                  <span className="material-symbols-outlined text-4xl text-[#101922]">camera</span>
                </div>
              </button>
              <div className="absolute -bottom-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2b8cee]">Fit Snap</span>
              </div>
            </div>
            <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white" style={{ background: "rgba(16, 25, 34, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        {/* System UI Safe Area */}
        <div className="mx-auto mb-2 h-2 w-32 rounded-full bg-white/20"></div>

        {/* Sensory Ambience */}
        <audio ref={audioRef} loop src="data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" />

        {/* The Vault Drawer */}
        <div
          className={`absolute bottom-0 left-0 w-full bg-[#101922]/95 backdrop-blur-xl border-t border-white/10 transition-transform duration-500 ease-in-out z-50 ${vaultOpen ? 'translate-y-0' : 'translate-y-full'}`}
          style={{ height: '50vh' }}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold tracking-widest uppercase text-white flex items-center gap-2">
                <span className="material-symbols-outlined">inventory_2</span>
                The Vault
              </h3>
              <button onClick={() => setVaultOpen(false)} className="text-white/50 hover:text-white transition-colors" aria-label="Close Vault">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {savedLooks.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-white/40">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">wardrobe</span>
                <p className="text-sm tracking-widest uppercase">Your vault is empty</p>
                <p className="text-xs mt-1">Save looks to compare and curate.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-4 auto-rows-max">
                {savedLooks.map((look, idx) => (
                  <div key={idx} className="flex gap-3 bg-white/5 rounded-xl p-2 border border-white/10">
                    <div
                      className="w-16 h-20 rounded-lg bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url("${look.img}")` }}
                    />
                    <div className="flex flex-col justify-center">
                      <p className="text-xs font-bold uppercase text-white">{look.name}</p>
                      <p className="text-xs text-[#2b8cee] mt-1">{look.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
