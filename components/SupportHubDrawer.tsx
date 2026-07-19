'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHubDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');

  const faqs = [
    { q: "How do I get the best fit?", a: "Ensure good lighting and wear tight-fitting clothes for your source photo." },
    { q: "Is my data secure?", a: "We process images in real-time and do not store your personal photos on our servers." },
    { q: "What brands are supported?", a: "We currently support SPA brands and a select range of Luxury items." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110"
        aria-label="Support Hub"
      >
        <span className="text-xl">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-xl font-bold tracking-widest text-white">SUPPORT HUB</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors p-2"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10 bg-black/30">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white'}`}
                >
                  Guide
                </button>
                <button
                  onClick={() => setActiveTab('caution')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'caution' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white'}`}
                >
                  Caution
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'faq' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">How to Fit</h3>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center font-bold shrink-0">1</div>
                        <div>
                          <p className="text-sm font-bold text-white">Upload Your Photo</p>
                          <p className="text-xs text-white/60 mt-1">Take a clear, full-body or half-body shot against a plain background.</p>
                        </div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                          <p className="text-sm font-bold text-white">Select a Garment</p>
                          <p className="text-xs text-white/60 mt-1">Choose from our SPA or Luxury collection, or upload a target garment.</p>
                        </div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center font-bold shrink-0">3</div>
                        <div>
                          <p className="text-sm font-bold text-white">Generate Try-On</p>
                          <p className="text-xs text-white/60 mt-1">Our AI processes the fit and fabric drape in seconds.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Important Cautions</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex flex-col items-center text-center gap-3">
                        <span className="text-2xl">💡</span>
                        <p className="text-xs text-white/80">Avoid harsh shadows or backlighting.</p>
                      </div>
                      <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex flex-col items-center text-center gap-3">
                        <span className="text-2xl">📏</span>
                        <p className="text-xs text-white/80">Keep camera at chest height for best results.</p>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex flex-col items-center text-center gap-3">
                        <span className="text-2xl">👕</span>
                        <p className="text-xs text-white/80">Wear form-fitting clothes underneath.</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex flex-col items-center text-center gap-3">
                        <span className="text-2xl">📷</span>
                        <p className="text-xs text-white/80">Ensure lens is clean and focused.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Frequently Asked Questions</h3>
                    {faqs.map((faq, i) => (
                      <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <summary className="p-4 cursor-pointer font-bold text-sm text-white flex justify-between items-center list-none">
                          {faq.q}
                          <span className="text-white/50 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="p-4 pt-0 text-xs text-white/60 leading-relaxed bg-black/20">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/10 bg-black/50 text-center">
                <p className="text-[10px] text-white/40 uppercase tracking-widest">S_FIT AI Support System v2.0</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
