'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronRight, AlertTriangle, Sun, Maximize, X } from 'lucide-react';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  // Accordion state
  const [openQA, setOpenQA] = useState<number | null>(null);

  const faqs = [
    { q: "How long does the AI fitting take?", a: "Processing usually takes between 10 to 30 seconds depending on server load." },
    { q: "Are my photos stored?", a: "Photos are only used for processing and are not permanently stored on our servers." },
    { q: "What if the size is wrong?", a: "The AI provides an estimation based on standard sizing. Always check the brand's sizing guide." }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/20 p-3 rounded-full text-white/70 hover:text-white hover:border-white/50 transition-all shadow-xl group"
        aria-label="Support Hub"
      >
        <HelpCircle size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="font-serif text-xl text-white tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10 bg-black/30">
                {(['guide', 'caution', 'qa'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs font-mono tracking-widest uppercase transition-colors ${
                      activeTab === tab ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <AnimatePresence mode="wait">
                  {activeTab === 'guide' && (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <h3 className="text-sm text-white/70 tracking-widest uppercase border-b border-white/10 pb-2">How to Fit</h3>

                      <div className="space-y-6">
                        {[
                          { step: "01", title: "Select Mode", desc: "Choose between Vibe Check, Digital Twin, or Easy Fit." },
                          { step: "02", title: "Upload Photo", desc: "Provide a clear front-facing photo for best results." },
                          { step: "03", title: "Choose Garment", desc: "Select a brand and item to try on." },
                          { step: "04", title: "AI Generation", desc: "Wait a few seconds while our AI processes the fitting." }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 items-start group">
                            <div className="text-xs font-mono text-cyber-lime/70 mt-1">{item.step}</div>
                            <div>
                              <h4 className="text-white text-sm font-medium tracking-wide group-hover:text-cyber-lime transition-colors">{item.title}</h4>
                              <p className="text-white/50 text-xs mt-1 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'caution' && (
                    <motion.div
                      key="caution"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                       <h3 className="text-sm text-white/70 tracking-widest uppercase border-b border-white/10 pb-2 mb-6">Important Guidelines</h3>

                       <div className="bg-white/5 border border-white/10 p-5 rounded-lg flex items-start gap-4">
                         <Sun className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                         <div>
                           <h4 className="text-white text-sm font-medium">Good Lighting is Key</h4>
                           <p className="text-white/60 text-xs mt-1">Ensure your photo is well-lit. Shadows or extreme darkness will affect the AI&apos;s ability to accurately drape the garment.</p>
                         </div>
                       </div>

                       <div className="bg-white/5 border border-white/10 p-5 rounded-lg flex items-start gap-4">
                         <Maximize className="text-blue-400 shrink-0 mt-0.5" size={20} />
                         <div>
                           <h4 className="text-white text-sm font-medium">Proper Distance</h4>
                           <p className="text-white/60 text-xs mt-1">Stand about 3-5 feet away from the camera. Make sure your full upper body or full body (depending on mode) is visible.</p>
                         </div>
                       </div>

                       <div className="bg-red-900/20 border border-red-500/30 p-5 rounded-lg flex items-start gap-4">
                         <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
                         <div>
                           <h4 className="text-white text-sm font-medium">Avoid Loose Clothing</h4>
                           <p className="text-white/60 text-xs mt-1">For the most accurate fit, wear form-fitting clothes in your source photo. Baggy clothes may distort the AI&apos;s body shape estimation.</p>
                         </div>
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'qa' && (
                    <motion.div
                      key="qa"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-sm text-white/70 tracking-widest uppercase border-b border-white/10 pb-2 mb-6">Frequently Asked Questions</h3>

                      <div className="divide-y divide-white/10 border-t border-b border-white/10">
                        {faqs.map((faq, i) => (
                          <div key={i} className="py-2">
                            <button
                              onClick={() => setOpenQA(openQA === i ? null : i)}
                              className="w-full flex justify-between items-center py-4 text-left group"
                            >
                              <span className="text-sm text-white/90 font-medium group-hover:text-white">{faq.q}</span>
                              <ChevronRight size={16} className={`text-white/50 transition-transform ${openQA === i ? 'rotate-90' : ''}`} />
                            </button>
                            <AnimatePresence>
                              {openQA === i && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-xs text-white/50 pb-4 leading-relaxed">{faq.a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 text-center border border-white/10 p-6 rounded-lg bg-white/5">
                        <p className="text-xs text-white/60 mb-3">Still have questions?</p>
                        <button className="text-xs font-mono tracking-widest text-cyber-lime hover:text-white transition-colors uppercase border-b border-cyber-lime hover:border-white pb-1">
                          Contact Support
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-4 border-t border-white/10 text-center text-[10px] text-white/30 tracking-widest uppercase">
                S_FIT AI Engine v1.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
