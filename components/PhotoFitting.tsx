"use client";

import React, { useState, useEffect, useRef } from "react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function PhotoFitting() {
  const [isChecked, setIsChecked] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log('Audio play prevented', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#f5f6f8] text-white dark:bg-[#101622] ${spaceGrotesk.className}`}>
      {/* Sensory Ambience */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
      {/* Top App Bar */}
      <div className="z-50 flex items-center justify-between bg-transparent p-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#101622]/40 text-white backdrop-blur-md">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white">S_FIT AI</h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#256af4]">Photo Fitting v1.0</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#101622]/40 text-white backdrop-blur-md hover:bg-[#101622]/60 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">{isMuted ? 'volume_off' : 'volume_up'}</span>
          </button>
          <button
            onClick={() => setIsVaultOpen(true)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#101622]/40 text-white backdrop-blur-md hover:bg-[#101622]/60 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">inventory_2</span>
          </button>
        </div>
      </div>

      {/* Main Viewport (Photo Fitting Canvas) */}
      <div className="absolute inset-0 z-0">
        <div
          className="relative h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGfKW7fSSx0BbN4w9CP-cPpb_GgcZgK3IAWtBDg18Z4EDDIvAvw0CYBp2ynyLSCTfQa3XtdTA5PTl7gZiCiugdiuuJGRvvmUlvjBFrWthED8dEe3CP3REf2b2s3LD1jlGYxcOkEBqgVsRXmY3sN7_6LsADaLzbcd5SrJPyiMiop4OSdYyRPcnzNh9Boe6dav_PUsJn_t0Fo1urrSzWCUnXU8cLgZY7rJmKnal8LfghoMed8GtjDMO9ruztSGEQMUNqhhkDtR0k60g")',
          }}
        >
          {/* Scanning Effect */}
          <div
            className="absolute top-[40%] z-20 h-[2px] w-full"
            style={{
              background: "linear-gradient(180deg, transparent 0%, #256af4 50%, transparent 100%)",
              boxShadow: "0 0 15px #256af4",
            }}
          ></div>

          {/* HUD Overlays */}
          <div className="glass-panel absolute left-4 top-24 rounded-lg p-3" style={{ background: "rgba(16, 22, 35, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(49, 67, 104, 0.5)" }}>
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-[#256af4]"></div>
              <p className="text-[10px] font-bold uppercase tracking-tighter text-[#90a4cb]">Real-time Simulation</p>
            </div>
            <p className="mt-1 text-xs">
              Fabric: <span className="text-[#256af4]">Metallic Liquid Silk</span>
            </p>
          </div>
          <div className="glass-panel absolute right-4 top-24 rounded-lg p-3 text-right" style={{ background: "rgba(16, 22, 35, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(49, 67, 104, 0.5)" }}>
            <p className="text-[10px] font-bold uppercase tracking-tighter text-[#90a4cb]">Mesh Density</p>
            <p className="mt-1 text-xs">42,000 Polygons</p>
          </div>
        </div>
      </div>

      {/* Processing State (Overlay) */}
      <div className="absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6">
        <div className="glass-panel mx-auto max-w-sm rounded-xl p-6 shadow-2xl" style={{ background: "rgba(16, 22, 35, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(49, 67, 104, 0.5)" }}>
          <div className="flex flex-col gap-3">
            <div className="flex items-end justify-between gap-6">
              <div className="flex flex-col">
                <p className="text-xl font-bold leading-none tracking-tight text-white">Processing...</p>
                <p className="mt-1 text-xs font-normal italic text-[#90a4cb]">3D Draping Engine Active</p>
              </div>
              <p className="text-2xl font-bold leading-none text-[#256af4]">82%</p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#314368]">
              <div className="h-full rounded-full bg-[#256af4] shadow-[0_0_10px_#256af4]" style={{ width: "82%" }}></div>
            </div>
            <p className="mt-1 text-center text-[11px] font-medium leading-normal text-[#90a4cb]">Analyzing body dimensions and metallic fabric drape physics</p>
          </div>
        </div>
      </div>

      {/* Controls Footer */}
      <div className="mt-auto space-y-4 p-4 z-40">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-bold leading-tight tracking-wider uppercase text-white">Fitting Controls</h3>
          <span className="rounded bg-[#256af4]/20 px-2 py-0.5 text-[10px] text-[#256af4]">ADVANCED</span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="glass-panel group flex items-center justify-between rounded-xl p-4" style={{ background: "rgba(16, 22, 35, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(49, 67, 104, 0.5)" }}>
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#256af4]/20 text-[#256af4]">
                <span className="material-symbols-outlined">thermostat</span>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold leading-tight text-white">Fit Heatmap</p>
                <p className="text-[11px] font-normal leading-normal text-[#90a4cb]">Show tension areas on body</p>
              </div>
            </div>
            <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-none bg-[#222f49] p-0.5 transition-all has-[:checked]:justify-end has-[:checked]:bg-[#256af4]">
              <div className="h-full w-[24px] rounded-full bg-white shadow-lg"></div>
              <input checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="invisible absolute" type="checkbox" />
            </label>
          </div>
          <div className="glass-panel flex items-center justify-between rounded-xl p-4" style={{ background: "rgba(16, 22, 35, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(49, 67, 104, 0.5)" }}>
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#256af4]/20 text-[#256af4]">
                <span className="material-symbols-outlined">waves</span>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold leading-tight text-white">Fabric Physics</p>
                <p className="text-[11px] font-normal leading-normal text-[#90a4cb]">Simulate movement & weight</p>
              </div>
            </div>
            <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-none bg-[#222f49] p-0.5 transition-all has-[:checked]:justify-end has-[:checked]:bg-[#256af4]">
              <div className="h-full w-[24px] rounded-full bg-white shadow-lg"></div>
              <input className="invisible absolute" type="checkbox" />
            </label>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsVaultOpen(true)}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            <span className="material-symbols-outlined">bookmark_add</span>
            Save Look
          </button>
          <button className="flex h-14 flex-[2] items-center justify-center gap-2 rounded-xl bg-[#256af4] text-sm font-bold text-white shadow-lg shadow-[#256af4]/20 transition-colors hover:bg-blue-600">
            <span className="material-symbols-outlined">check_circle</span>
            Proceed to Checkout
          </button>
        </div>
        <div className="h-4"></div>
      </div>

      {/* The Vault Drawer */}
      {isVaultOpen && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setIsVaultOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-[70] flex max-h-[80vh] flex-col rounded-t-[32px] bg-[#101622] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/10 transition-transform duration-300">
            <div className="flex items-center justify-between p-6 pb-2">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white">The Vault</h3>
                <p className="text-xs font-medium text-[#90a4cb] uppercase tracking-widest mt-1">Digital Wardrobe</p>
              </div>
              <button onClick={() => setIsVaultOpen(false)} className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                   <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5m1trvvOgtFQZrHz7J1_8YKjIyJFwuTm6b_C9mQJtDJDsOl_xtHZHfLA3MDVgFSQv4zos6OnEPUwen36ZcXZRERoj4Bj3o87kdcXjQWJ8YNc33SLIAqJUET6o0yOwx_pVzx0OswcPQw2ivo6sLma8xEumxoFQDfDsbpY-obuXwXx9h6QOzOhEDJvrFuPoRkbJEz-kJUE5bbVxawyJiFfEmGOi47n8Jrh8-zVHq14XQL_snfcQ2Ia117Mk5S2bn_rRht21zxTm58E")' }} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                   <div className="absolute bottom-3 left-3 right-3">
                     <p className="text-[10px] font-bold text-[#ecab13] uppercase tracking-wider mb-0.5">Saved Look</p>
                     <p className="text-xs font-medium text-white truncate">Metallic Silk Evening Blazer</p>
                   </div>
                </div>
                <div className="flex aspect-[3/4] items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex-col gap-2">
                  <span className="material-symbols-outlined text-white/40 text-3xl">add</span>
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Empty Slot</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Heatmap Legend */}
      <div className="glass-panel absolute bottom-64 left-4 z-40 flex flex-col gap-1.5 rounded-lg p-2" style={{ background: "rgba(16, 22, 35, 0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(49, 67, 104, 0.5)" }}>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-red-500"></div>
          <span className="text-[9px] font-bold uppercase text-white">Tight</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-green-500"></div>
          <span className="text-[9px] font-bold uppercase text-white">Perfect</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-blue-500"></div>
          <span className="text-[9px] font-bold uppercase text-white">Loose</span>
        </div>
      </div>
    </div>
  );
}
