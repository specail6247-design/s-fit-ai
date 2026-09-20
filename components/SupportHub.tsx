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
        className="fixed bottom-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-40 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-50 p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-serif italic text-[#C9B037]">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-xl">✕</span>
                </button>
              </div>

              <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`text-sm tracking-wide uppercase font-medium transition-colors ${activeTab === 'guide' ? 'text-white border-b-2 border-[#C9B037] pb-4 -mb-[18px]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  User Guide
                </button>
                <button
                  onClick={() => setActiveTab('caution')}
                  className={`text-sm tracking-wide uppercase font-medium transition-colors ${activeTab === 'caution' ? 'text-white border-b-2 border-[#C9B037] pb-4 -mb-[18px]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Caution
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`text-sm tracking-wide uppercase font-medium transition-colors ${activeTab === 'qa' ? 'text-white border-b-2 border-[#C9B037] pb-4 -mb-[18px]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="text-gray-300 text-sm space-y-6">
                {activeTab === 'guide' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#C9B037]"></div>
                      <p className="font-serif italic text-xl text-white mb-2">01. Identification</p>
                      <p className="text-gray-400 leading-relaxed">Upload a clear, front-facing photo of yourself. For best results, ensure good lighting and neutral clothing.</p>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#C9B037]"></div>
                      <p className="font-serif italic text-xl text-white mb-2">02. Selection</p>
                      <p className="text-gray-400 leading-relaxed">Choose a target garment from our collections or upload your own. High-resolution front views work best.</p>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#C9B037]"></div>
                      <p className="font-serif italic text-xl text-white mb-2">03. Realization</p>
                      <p className="text-gray-400 leading-relaxed">Initiate the try-on process. Our engine will synthesize a personalized fit taking physics and textures into account.</p>
                    </div>
                  </motion.div>
                )}
                {activeTab === 'caution' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="p-6 border border-yellow-500/30 rounded-xl bg-yellow-500/5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">💡</span>
                        <p className="font-serif italic text-xl text-yellow-500">Lighting Matters</p>
                      </div>
                      <p className="text-gray-400 leading-relaxed">Ensure even, natural lighting on your face and body. Avoid harsh shadows or strong backlighting.</p>
                    </div>
                    <div className="p-6 border border-yellow-500/30 rounded-xl bg-yellow-500/5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">📷</span>
                        <p className="font-serif italic text-xl text-yellow-500">Distance & Angle</p>
                      </div>
                      <p className="text-gray-400 leading-relaxed">Stand about 3-5 feet from the camera. The lens should be roughly at chest level for accurate proportions.</p>
                    </div>
                    <div className="p-6 border border-yellow-500/30 rounded-xl bg-yellow-500/5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">👕</span>
                        <p className="font-serif italic text-xl text-yellow-500">Base Clothing</p>
                      </div>
                      <p className="text-gray-400 leading-relaxed">Wear form-fitting clothes in your base photo. Baggy or heavy layers will interfere with the digital drape.</p>
                    </div>
                  </motion.div>
                )}
                {activeTab === 'qa' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <details className="group border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                      <summary className="cursor-pointer font-medium p-5 hover:bg-white/5 transition-colors flex justify-between items-center outline-none">
                        <span>How long does processing take?</span>
                        <span className="text-[#C9B037] group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-white/10 mt-2">
                        Processing typically takes between 10-15 seconds depending on the complexity of the garment and current server load.
                      </div>
                    </details>
                    <details className="group border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                      <summary className="cursor-pointer font-medium p-5 hover:bg-white/5 transition-colors flex justify-between items-center outline-none">
                        <span>Can I save my try-on results?</span>
                        <span className="text-[#C9B037] group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-white/10 mt-2">
                        Yes, once the render is complete, you can use the share button or right-click the image to save your personalized result.
                      </div>
                    </details>
                    <details className="group border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                      <summary className="cursor-pointer font-medium p-5 hover:bg-white/5 transition-colors flex justify-between items-center outline-none">
                        <span>What formats are supported?</span>
                        <span className="text-[#C9B037] group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-white/10 mt-2">
                        We currently support standard JPG and PNG formats up to 5MB in size for both user photos and target garments.
                      </div>
                    </details>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}