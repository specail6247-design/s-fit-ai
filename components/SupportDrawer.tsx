'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "What should I wear for the photo?", a: "Wear tight-fitting clothes. Avoid baggy garments as they confuse the AI." },
    { q: "How long does processing take?", a: "Usually 15-30 seconds depending on server load." },
    { q: "Can I try on pants?", a: "Currently, our Neo line specializes in tops and dresses. Bottoms coming soon." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-white/5 border border-white/10 border-r-0 rounded-l-2xl p-3 z-40 hover:bg-white/10 hover:pr-4 transition-all group backdrop-blur-md"
        aria-label="Support Hub"
      >
        <div className="w-1 h-8 bg-gray-500 group-hover:bg-[#007AFF] rounded-full transition-colors mb-2 mx-auto" />
        <span className="text-xs text-gray-400 group-hover:text-white font-mono flex flex-col items-center gap-1">
          <span>H</span>
          <span>E</span>
          <span>L</span>
          <span>P</span>
        </span>
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
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold font-mono text-white">SUPPORT HUB</h2>
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-2">✕</button>
                </div>

                <div className="space-y-8">
                  {/* Visual Guide Carousel Placeholder */}
                  <section>
                    <h3 className="text-sm font-bold text-[#007AFF] mb-4 uppercase tracking-wider">How to Fit</h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1 aspect-square bg-black/50 rounded-lg flex flex-col items-center justify-center border border-white/10">
                          <span className="text-2xl mb-2">📸</span>
                          <span className="text-[10px] text-center text-gray-400">Front<br/>Facing</span>
                        </div>
                        <div className="flex-1 aspect-square bg-black/50 rounded-lg flex flex-col items-center justify-center border border-white/10">
                          <span className="text-2xl mb-2">👕</span>
                          <span className="text-[10px] text-center text-gray-400">Clear<br/>Garment</span>
                        </div>
                        <div className="flex-1 aspect-square bg-black/50 rounded-lg flex flex-col items-center justify-center border border-white/10">
                          <span className="text-2xl mb-2">✨</span>
                          <span className="text-[10px] text-center text-gray-400">AI<br/>Magic</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 text-center">Step 1: Upload a clear front-facing photo.</p>
                    </div>
                  </section>

                  {/* Warnings */}
                  <section>
                    <h3 className="text-sm font-bold text-yellow-500 mb-4 uppercase tracking-wider">Caution</h3>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-yellow-500 mt-0.5">☀️</span>
                        <div>
                          <h4 className="text-xs font-bold text-yellow-500">Lighting Matters</h4>
                          <p className="text-[10px] text-yellow-500/70">Avoid heavy shadows or extreme backlighting.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-yellow-500 mt-0.5">📏</span>
                        <div>
                          <h4 className="text-xs font-bold text-yellow-500">Distance</h4>
                          <p className="text-[10px] text-yellow-500/70">Stand 3-5 feet from the camera. Entire upper body should be visible.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* FAQ Accordion */}
                  <section>
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Q&A</h3>
                    <div className="space-y-2">
                      {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5"
                          >
                            <span className="text-sm text-gray-200">{faq.q}</span>
                            <span className="text-gray-500 text-xs">{openFaq === i ? '−' : '+'}</span>
                          </button>
                          <AnimatePresence>
                            {openFaq === i && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="p-4 pt-0 text-xs text-gray-400 border-t border-white/5 mt-2">{faq.a}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
