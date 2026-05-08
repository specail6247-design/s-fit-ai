'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 z-40 group"
        aria-label="Help & Support"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">?</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">S_FIT CONCIERGE</h2>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Support Protocol</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/5">
                {(['guide', 'caution', 'qa'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === tab ? 'text-[#C9B037] border-b-2 border-[#C9B037]' : 'text-gray-500 hover:text-white'}`}
                  >
                    {tab === 'qa' ? 'Q&A' : tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center border border-white/5">
                        <span className="text-4xl">📸</span>
                      </div>
                      <h3 className="text-lg font-bold">1. The Perfect Setup</h3>
                      <p className="text-sm text-gray-400">Ensure well-lit environment. Avoid harsh backlighting.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center border border-white/5">
                        <span className="text-4xl">🧍</span>
                      </div>
                      <h3 className="text-lg font-bold">2. Full Body Frame</h3>
                      <p className="text-sm text-gray-400">Position camera at waist height. Keep head to toes visible.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-4">
                      <span className="text-red-500 text-xl">⚠️</span>
                      <div>
                        <h4 className="font-bold text-red-500 text-sm">Poor Lighting Detected</h4>
                        <p className="text-xs text-gray-400 mt-1">Extreme shadows will reduce AI synthesis quality.</p>
                      </div>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex gap-4">
                      <span className="text-orange-500 text-xl">📏</span>
                      <div>
                        <h4 className="font-bold text-orange-500 text-sm">Optimal Distance</h4>
                        <p className="text-xs text-gray-400 mt-1">Maintain 2-3 meters from the camera lens.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-4">
                    {[
                      { q: "How accurate is the sizing?", a: "Our AI model boasts a 94% spatial accuracy for standard garments." },
                      { q: "Is my data stored?", a: "Photos are processed in memory and immediately discarded. We value your privacy." },
                      { q: "Can I try luxury items?", a: "Yes, access the Luxury Line from the main terminal for premium brands." }
                    ].map((faq, i) => (
                      <details key={i} className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                        <summary className="p-4 cursor-pointer font-bold text-sm hover:text-[#C9B037] transition-colors list-none flex justify-between">
                          {faq.q}
                          <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
