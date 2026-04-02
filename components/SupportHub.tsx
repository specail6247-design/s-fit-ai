'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What types of photos work best?",
      answer: "For the best results, use a clear, well-lit photo taken from the front. Ensure your entire body (or upper body for tops) is visible without obstruction."
    },
    {
      question: "How long does processing take?",
      answer: "Our AI typically generates your virtual fit within 15-30 seconds, depending on the complexity of the garment and current server load."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we prioritize your privacy. Uploaded photos are used temporarily for the fitting process and are not permanently stored or shared with third parties."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-serif text-white tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-white transition-colors p-2"
                  aria-label="Close Support Hub"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* User Guide Carousel */}
              <div className="mb-12">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  How to Fit
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
                  {[
                    { step: '01', title: 'Upload Photo', desc: 'Select a clear front-facing photo of yourself.' },
                    { step: '02', title: 'Choose Garment', desc: 'Pick the item you want to try on.' },
                    { step: '03', title: 'Generate', desc: 'Click "TRY IT ON" and let our AI work its magic.' }
                  ].map((item, i) => (
                    <div key={i} className="min-w-[200px] snap-center bg-white/5 border border-white/10 rounded-xl p-5">
                      <div className="text-2xl font-serif text-white/20 mb-2">{item.step}</div>
                      <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-white/60">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caution Section */}
              <div className="mb-12">
                <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">warning</span>
                  Guidelines
                </h3>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-500 mt-0.5">light_mode</span>
                    <div>
                      <div className="text-sm text-white font-medium">Lighting</div>
                      <div className="text-xs text-white/60">Avoid harsh shadows or extreme backlighting. Natural, even light works best.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-500 mt-0.5">photo_camera</span>
                    <div>
                      <div className="text-sm text-white font-medium">Camera Distance</div>
                      <div className="text-xs text-white/60">Ensure the camera is at eye level and captures your full silhouette.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Q&A Accordion */}
              <div>
                <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">help_center</span>
                  FAQ
                </h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center p-4 text-left transition-colors hover:bg-white/5"
                      >
                        <span className="text-sm text-white">{faq.question}</span>
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
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-white/60 border-t border-white/10 mt-2 pt-2">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
