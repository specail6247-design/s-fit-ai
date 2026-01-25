import React from 'react';
import { motion } from 'framer-motion';
import { ModeSelector } from './ModeSelector';
import { SupportHub } from './ui/SupportHub';

export function LandingPage() {
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
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-soft-gray">
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
          <p>© 2026 Antigravity. All rights reserved.</p>
        </div>
      </footer>

      {/* Support Hub (Floating Trigger) */}
      <SupportHub />
    </div>
  );
}
