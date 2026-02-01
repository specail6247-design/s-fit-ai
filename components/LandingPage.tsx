import React from 'react';
import { ModeSelector } from './ModeSelector';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-void-black text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center gap-12 py-20">
        <header className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic">
            S_FIT <span className="text-stroke text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">AI</span>
          </h1>
          <p className="text-sm md:text-base text-soft-gray uppercase tracking-[0.5em] font-medium">
            Next-Gen Virtual Fitting Protocol
          </p>
        </header>

        <ModeSelector />

        <div className="mt-12 flex gap-4">
            <Link href="/luxury" className="px-6 py-3 border border-luxury-gold/30 text-luxury-gold rounded-full hover:bg-luxury-gold/10 transition-colors uppercase text-xs tracking-widest">
                Enter Luxury Mode
            </Link>
             <Link href="/spa" className="px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors uppercase text-xs tracking-widest">
                SPA Collection
            </Link>
            {/* Keeping a link to RealLifeFitting if needed, usually mapped to a mode */}
        </div>
      </div>

      <footer className="absolute bottom-6 text-[10px] text-gray-600 font-mono">
        SYSTEM_READY // V.2.4.0
      </footer>
    </main>
  );
}
