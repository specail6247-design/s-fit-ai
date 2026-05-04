"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 z-40 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all"
        aria-label="Open Support Guide"
      >
        <span className="text-xl">ℹ️</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-lg font-black tracking-widest uppercase text-white">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-soft-gray hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10">
                {(['guide', 'caution', 'qa'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                      activeTab === tab ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-soft-gray hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    <h3 className="text-sm font-bold text-[#007AFF] mb-4">How to Fit - Step by Step</h3>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white font-mono text-xs">1</div>
                      <div>
                        <h4 className="text-white font-bold mb-1">Select Garment</h4>
                        <p className="text-soft-gray text-xs">Choose the item you want to try on from the catalog. Ensure it&apos;s a front-facing image.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white font-mono text-xs">2</div>
                      <div>
                        <h4 className="text-white font-bold mb-1">Upload Photo</h4>
                        <p className="text-soft-gray text-xs">Upload a clear, full-body photo of yourself. Good lighting is key.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white font-mono text-xs">3</div>
                      <div>
                        <h4 className="text-white font-bold mb-1">AI Processing</h4>
                        <p className="text-soft-gray text-xs">Wait a few seconds while our AI engine seamlessly fits the garment onto your photo.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-6">
                     <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-4 items-start">
                        <span className="text-2xl mt-1">⚠️</span>
                        <div>
                          <h4 className="text-white font-bold mb-1 text-sm">Lighting Warning</h4>
                          <p className="text-soft-gray text-xs">Avoid harsh shadows or extreme backlighting. Soft, even lighting produces the best AI fitting results.</p>
                        </div>
                     </div>
                     <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex gap-4 items-start">
                        <span className="text-2xl mt-1">📸</span>
                        <div>
                          <h4 className="text-white font-bold mb-1 text-sm">Camera Distance</h4>
                          <p className="text-soft-gray text-xs">Stand 1.5 - 2 meters away from the camera. Ensure your entire body (head to toe) is visible in the frame.</p>
                        </div>
                     </div>
                     <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-4 items-start">
                        <span className="text-2xl mt-1">👕</span>
                        <div>
                          <h4 className="text-white font-bold mb-1 text-sm">Clothing Posture</h4>
                          <p className="text-soft-gray text-xs">Wear form-fitting clothes for the base photo. Baggy clothes may distort the final generated image.</p>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-2">
                    {[
                      { q: "How accurate is the AI fitting?", a: "Our AI uses advanced 3D mesh recovery and image synthesis, achieving highly realistic results. However, fabric drape may slightly vary." },
                      { q: "Is my uploaded photo saved?", a: "No. Photos are processed in memory and immediately deleted after the rendering is complete. We do not store your images." },
                      { q: "Why is the generation slow?", a: "High-fidelity rendering requires significant GPU power. It typically takes 10-20 seconds depending on server load." }
                    ].map((faq, i) => (
                      <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <summary className="p-4 cursor-pointer text-sm font-bold text-white flex justify-between items-center outline-none">
                          {faq.q}
                          <span className="text-soft-gray transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div className="p-4 pt-0 text-xs text-soft-gray bg-white/5">
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
