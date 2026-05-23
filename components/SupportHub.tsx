'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [openQAIndex, setOpenQAIndex] = useState<number | null>(null);

  const toggleQA = (index: number) => {
    setOpenQAIndex(openQAIndex === index ? null : index);
  };

  const qaData = [
    { q: "How long does a try-on take?", a: "With Vibe Check, it takes under 3 seconds. The full Digital Twin mode takes about 10 seconds for detailed 3D processing." },
    { q: "What kind of photos work best?", a: "Use a clear, well-lit photo of yourself against a plain background. Make sure the garment photo is flat and clearly shows the item." },
    { q: "Are my photos stored?", a: "We process your photos securely for the try-on and they are deleted immediately unless you choose to save them to your Vault." },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 border border-white/20 shadow-xl backdrop-blur-md transition-all group"
        aria-label="Open Support Hub"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'guide' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Guide
                </button>
                <button
                  onClick={() => setActiveTab('caution')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'caution' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Caution
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'qa' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">How to Fit</h3>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">1</div>
                          <div>
                            <h4 className="font-bold mb-1">Select Item</h4>
                            <p className="text-sm text-gray-400">Choose a garment from the catalog or upload your own.</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">2</div>
                          <div>
                            <h4 className="font-bold mb-1">Upload Photo</h4>
                            <p className="text-sm text-gray-400">Provide a clear, front-facing photo of yourself.</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">3</div>
                          <div>
                            <h4 className="font-bold mb-1">View Result</h4>
                            <p className="text-sm text-gray-400">Wait a few seconds for the AI to generate your virtual fitting.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-8">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Best Practices</h3>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-start">
                      <span className="text-2xl">☀️</span>
                      <div>
                        <h4 className="font-bold mb-1">Lighting Matters</h4>
                        <p className="text-sm text-gray-400">Avoid harsh shadows or backlighting. Natural, even lighting produces the most realistic results.</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-start">
                      <span className="text-2xl">📸</span>
                      <div>
                        <h4 className="font-bold mb-1">Camera Distance</h4>
                        <p className="text-sm text-gray-400">Stand about 3-5 feet from the camera. Ensure your full upper body (or full body for twin mode) is visible.</p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-start">
                      <span className="text-2xl">👕</span>
                      <div>
                        <h4 className="font-bold mb-1">Clothing</h4>
                        <p className="text-sm text-gray-400">Wear form-fitting clothes in your source photo for the most accurate drape and sizing.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-2">
                    {qaData.map((item, index) => (
                      <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleQA(index)}
                          className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="font-bold text-sm pr-4">{item.q}</span>
                          <span className="text-gray-500 transform transition-transform duration-200" style={{ transform: openQAIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            ▼
                          </span>
                        </button>
                        <AnimatePresence>
                          {openQAIndex === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-sm text-gray-400 border-t border-white/10 mt-2">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/10 bg-black/40 text-center">
                <p className="text-xs text-gray-500 tracking-widest uppercase">
                  Trust & Growth
                </p>
                <div className="flex justify-center gap-4 mt-2 text-[10px] text-gray-600">
                  <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                  <span>|</span>
                  <a href="#" className="hover:text-gray-300">Terms of Service</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
