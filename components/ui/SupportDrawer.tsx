'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:border-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg group"
        aria-label="Support Hub"
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
              transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-xl font-serif text-[#C9B037] uppercase tracking-widest">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors p-2"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-[#C9B037] border-b-2 border-[#C9B037] bg-white/5' : 'text-white/50 hover:bg-white/5'}`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors ${activeTab === 'qa' ? 'text-[#C9B037] border-b-2 border-[#C9B037] bg-white/5' : 'text-white/50 hover:bg-white/5'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 text-sm text-white/80">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                       <h3 className="text-white uppercase tracking-widest text-xs border-l-2 border-[#C9B037] pl-3">Step 1: Frontal Pose</h3>
                       <div className="bg-white/5 p-4 border border-white/10 rounded-lg">
                         Stand straight facing the camera. Keep your arms slightly away from your body.
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-white uppercase tracking-widest text-xs border-l-2 border-[#C9B037] pl-3">Step 2: Upload Garment</h3>
                       <div className="bg-white/5 p-4 border border-white/10 rounded-lg">
                         Use a clear, front-facing image of the clothing item for the best results.
                       </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h3 className="text-[#ff4444] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                        <span>⚠️</span> Caution
                      </h3>
                      <ul className="space-y-3 text-white/60">
                        <li className="flex items-start gap-3">
                          <span className="mt-0.5">💡</span>
                          <span>Ensure even lighting. Avoid strong shadows across your body.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="mt-0.5">📷</span>
                          <span>Keep the camera at chest height, about 2 meters away.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-4">
                    <details className="group bg-white/5 border border-white/10 rounded-lg">
                      <summary className="p-4 cursor-pointer font-medium text-white/90 group-open:text-[#C9B037] transition-colors">
                        How long does fitting take?
                      </summary>
                      <div className="p-4 pt-0 text-white/60">
                        Results are typically generated within 10-15 seconds using our advanced AI.
                      </div>
                    </details>
                    <details className="group bg-white/5 border border-white/10 rounded-lg">
                      <summary className="p-4 cursor-pointer font-medium text-white/90 group-open:text-[#C9B037] transition-colors">
                        What photos work best?
                      </summary>
                      <div className="p-4 pt-0 text-white/60">
                        High contrast between your clothes and background, well-lit, and front-facing photos yield the most realistic results.
                      </div>
                    </details>
                    <details className="group bg-white/5 border border-white/10 rounded-lg">
                      <summary className="p-4 cursor-pointer font-medium text-white/90 group-open:text-[#C9B037] transition-colors">
                        Is my data saved?
                      </summary>
                      <div className="p-4 pt-0 text-white/60">
                        No. Photos are processed in real-time and deleted immediately. We do not store your images.
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
