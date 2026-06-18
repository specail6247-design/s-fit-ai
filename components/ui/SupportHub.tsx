'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const faqs = [
    { q: "How long does virtual try-on take?", a: "Typically under 10 seconds for standard items, and up to 15 seconds for complex luxury items requiring micro-fiber rendering." },
    { q: "Is my photo stored?", a: "No. Photos are processed securely in real-time and immediately deleted from our servers post-generation." },
    { q: "Why is the 3D model not matching my exact body shape?", a: "Ensure you upload a full-body, front-facing photo without baggy clothing for the most accurate body mesh generation." }
  ];

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-40 group"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined text-[20px]">help</span>
        {/* Tooltip */}
        <span className="absolute right-14 bg-black/80 px-3 py-1.5 rounded-md text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
          Support Hub
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-widest uppercase">Support Hub</h2>
                <button onClick={toggleDrawer} className="text-white/50 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white'}`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'qa' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <AnimatePresence mode="wait">
                  {activeTab === 'guide' ? (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      {/* Step 1 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[#007AFF]">
                          <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                          <h3 className="text-sm font-bold uppercase tracking-wider">1. Capture</h3>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">
                          Take a full-body, front-facing photo. Ensure your arms are slightly away from your torso.
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[#007AFF]">
                          <span className="material-symbols-outlined text-[20px]">checkroom</span>
                          <h3 className="text-sm font-bold uppercase tracking-wider">2. Select</h3>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">
                          Choose a garment from our SPA or Luxury lines. We support tops, bottoms, and full outfits.
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[#007AFF]">
                          <span className="material-symbols-outlined text-[20px]">magic_button</span>
                          <h3 className="text-sm font-bold uppercase tracking-wider">3. Generate</h3>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">
                          Click &quot;Try It On&quot; and wait approx. 10 seconds for our AI to render the 3D fit.
                        </p>
                      </div>

                      {/* Cautions */}
                      <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                        <h4 className="text-xs font-mono text-white/50 uppercase">Important Cautions</h4>

                        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-red-500/20 flex gap-4">
                          <span className="material-symbols-outlined text-red-400">lightbulb</span>
                          <div>
                            <h5 className="text-sm font-bold text-red-400 mb-1">Lighting</h5>
                            <p className="text-xs text-white/60">Avoid harsh shadows or strong backlighting. Even, natural light works best.</p>
                          </div>
                        </div>

                        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-orange-500/20 flex gap-4">
                          <span className="material-symbols-outlined text-orange-400">straighten</span>
                          <div>
                            <h5 className="text-sm font-bold text-orange-400 mb-1">Distance</h5>
                            <p className="text-xs text-white/60">Stand approximately 6-8 feet from the camera so your full body is visible.</p>
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  ) : (
                    <motion.div
                      key="qa"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      {faqs.map((faq, index) => (
                        <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-[#1a1a1a]">
                          <button
                            onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                            className="w-full text-left p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                          >
                            <span className="text-sm font-medium">{faq.q}</span>
                            <span className={`material-symbols-outlined text-white/50 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}>
                              expand_more
                            </span>
                          </button>
                          <AnimatePresence>
                            {activeFaq === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 text-sm text-white/60 leading-relaxed"
                              >
                                {faq.a}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}

                      {/* Report Issue */}
                      <div className="mt-8 pt-8 border-t border-white/10 text-center">
                        <p className="text-xs text-white/50 mb-3">Still need help?</p>
                        <button className="text-xs font-bold text-[#007AFF] uppercase tracking-widest hover:text-white transition-colors">
                          Report an Issue
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
