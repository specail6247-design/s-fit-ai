import React from 'react';
import { motion } from 'framer-motion';
import { ModeSelector } from './ModeSelector';

export function LandingPage() {
  const [showPrivacyModal, setShowPrivacyModal] = React.useState(false);
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

      {/* Privacy & Terms */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-4 text-xs text-soft-gray">
        <button onClick={() => setShowPrivacyModal(true)} className="hover:text-white transition-colors">Privacy Policy & Terms</button>
      </div>

      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowPrivacyModal(false)}>
          <div className="bg-void-black border border-white/10 rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold">Privacy Policy & Terms</h2>
              <button onClick={() => setShowPrivacyModal(false)} className="text-soft-gray hover:text-white">✕</button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-soft-gray space-y-4">
              <h3 className="text-white font-bold">1. Data Privacy</h3>
              <p>We respect your privacy. Photos uploaded for virtual fitting are processed securely and are never shared or sold to third parties.</p>

              <h3 className="text-white font-bold">2. Data Safety</h3>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-2xl">🛡️</span>
                <p className="text-xs">
                  <strong className="text-white block">Secure Processing</strong>
                  Photos are processed securely and not shared. Built for trust.
                </p>
              </div>

              <h3 className="text-white font-bold">3. Terms of Service</h3>
              <p>By using S_FIT, you agree to our terms of service regarding acceptable use and intellectual property.</p>
            </div>
            <div className="p-4 border-t border-white/10 flex justify-end">
              <button onClick={() => setShowPrivacyModal(false)} className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">Accept & Close</button>
            </div>
          </div>
        </div>
      )}


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
    </div>
  );
}
