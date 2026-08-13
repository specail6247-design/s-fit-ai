import React from 'react';
import { motion } from 'framer-motion';
import { ModeSelector } from './ModeSelector';
import { LegalModal } from './ui/LegalModal';
import { SupportHub } from './ui/SupportHub';
import { useState } from 'react';

export function LandingPage() {
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  return (
    <div className="min-h-screen bg-void-black text-pure-white overflow-hidden relative selection:bg-cyber-lime selection:text-black">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-cyber-lime/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 flex flex-col items-center relative z-10">
        
        {/* Brand Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="text-[10vw] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl">
            S_FIT
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="h-[1px] w-12 bg-cyber-lime/50"></span>
            <p className="text-sm md:text-base font-mono text-cyber-lime tracking-[0.3em] uppercase">
              Virtual Try-On Protocol <span className="animate-pulse">_v2.0</span>
            </p>
            <span className="h-[1px] w-12 bg-cyber-lime/50"></span>
          </div>
        </motion.div>

        {/* Value Prop */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="text-soft-gray text-center max-w-2xl text-sm md:text-lg mb-20 leading-relaxed"
        >
          Experience the future of fashion. 
          <span className="text-white font-bold block mt-2">
            No endless scrolling. No returns. Just perfect fits.
          </span>
        </motion.p>

        {/* 3-Tier Selector */}
        <ModeSelector />

      </main>

      {/* Footer / Social Proof */}
      <footer className="w-full border-t border-white/5 bg-black/50 backdrop-blur-md py-8 mt-20">
        <div className="container mx-auto px-4 flex flex-col items-center gap-6 text-xs text-soft-gray">
          {/* Data Safety Badge */}
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="text-cyber-lime">🔒</span>
            <span className="font-medium">Data Safety:</span>
            <span>Photos are processed securely and not shared.</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>System Operational</span>
            </div>

            <div className="flex gap-6 uppercase tracking-widest font-bold opacity-50">
              <span>Powered by</span>
              <span className="text-white">Ready Player Me</span>
              <span className="text-white">Three.js</span>
              <span className="text-white">Next.js 15</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 border-t border-white/5 pt-4">
            <p>© 2026 Antigravity. All rights reserved.</p>
            <div className="flex gap-4">
              <button onClick={() => setLegalType('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setLegalType('terms')} className="hover:text-white transition-colors">Terms of Service</button>
              <button onClick={() => setIsSupportOpen(true)} className="hover:text-white transition-colors text-cyber-lime">Report Issue</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LegalModal
        isOpen={legalType !== null}
        onClose={() => setLegalType(null)}
        type={legalType || 'privacy'}
      />
      <SupportHub
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}
