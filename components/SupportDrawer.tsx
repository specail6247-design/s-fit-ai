'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/50 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 shadow-2xl group"
        aria-label="Support Hub"
      >
        <span className="font-serif text-lg group-hover:scale-110 transition-transform">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md">
                <h2 className="text-xl font-serif text-white tracking-wide">SUPPORT HUB</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close Support Hub"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10 text-xs tracking-widest uppercase font-medium">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-center transition-colors ${activeTab === 'guide' ? 'text-white border-b-2 border-white bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Guide & Caution
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 py-4 text-center transition-colors ${activeTab === 'qa' ? 'text-white border-b-2 border-white bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {activeTab === 'guide' ? (
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span>📸</span> How to Fit
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white/5 p-4 border border-white/5">
                          <p className="text-xs text-gray-300"><span className="text-white font-bold mr-2">01</span> Upload a clear, front-facing photo.</p>
                        </div>
                        <div className="bg-white/5 p-4 border border-white/5">
                          <p className="text-xs text-gray-300"><span className="text-white font-bold mr-2">02</span> Select the garment you want to try on.</p>
                        </div>
                        <div className="bg-white/5 p-4 border border-white/5">
                          <p className="text-xs text-gray-300"><span className="text-white font-bold mr-2">03</span> Wait for the AI to process and visualize.</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-sm font-bold text-red-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span>⚠️</span> Caution
                      </h3>
                      <div className="bg-red-950/20 border border-red-500/20 p-5 space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="text-lg mt-0.5">💡</span>
                          <div>
                            <p className="text-sm text-white font-medium mb-1">Good Lighting</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Ensure you are in a well-lit environment. Avoid harsh shadows or strong backlighting.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-lg mt-0.5">📏</span>
                          <div>
                            <p className="text-sm text-white font-medium mb-1">Camera Distance</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Stand approximately 1.5 - 2 meters from the camera for optimal proportion analysis.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-lg mt-0.5">👕</span>
                          <div>
                            <p className="text-sm text-white font-medium mb-1">Form-Fitting Clothes</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Wear form-fitting clothes in your base photo for the most accurate fit results.</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <details className="group bg-white/5 border border-white/5 p-4 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-white">
                        <span>Is my data secure?</span>
                        <span className="transition group-open:rotate-180 text-gray-500">▼</span>
                      </summary>
                      <div className="text-xs text-gray-400 mt-4 leading-relaxed">
                        Yes, your uploaded photos are processed securely and are not used to train our AI models without explicit consent.
                      </div>
                    </details>

                    <details className="group bg-white/5 border border-white/5 p-4 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-white">
                        <span>How long does processing take?</span>
                        <span className="transition group-open:rotate-180 text-gray-500">▼</span>
                      </summary>
                      <div className="text-xs text-gray-400 mt-4 leading-relaxed">
                        Standard processing takes about 10-15 seconds depending on server load.
                      </div>
                    </details>

                    <details className="group bg-white/5 border border-white/5 p-4 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-white">
                        <span>Can I try multiple items at once?</span>
                        <span className="transition group-open:rotate-180 text-gray-500">▼</span>
                      </summary>
                      <div className="text-xs text-gray-400 mt-4 leading-relaxed">
                        Currently, our system supports one garment at a time for optimal quality, but outfit combinations are coming soon.
                      </div>
                    </details>
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
