'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Trigger Button - Hidden until needed style */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all z-40 cursor-pointer"
        aria-label="Support Hub"
      >
        ?
      </button>

      {/* Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-serif italic text-white">Support Hub</h2>
                  <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white text-xl cursor-pointer">✕</button>
                </div>

                {/* Visual Carousel - How to Fit */}
                <div className="mb-12">
                  <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase font-mono mb-4">How to Fit</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                    <div className="snap-center shrink-0 w-64 h-40 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                      <span className="text-2xl mb-2">📸</span>
                      <h4 className="text-sm font-medium text-white mb-1">Clear Photo</h4>
                      <p className="text-xs text-white/50">Ensure full body visibility</p>
                    </div>
                    <div className="snap-center shrink-0 w-64 h-40 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                      <span className="text-2xl mb-2">👕</span>
                      <h4 className="text-sm font-medium text-white mb-1">Garment Image</h4>
                      <p className="text-xs text-white/50">Front-facing, flat lay preferred</p>
                    </div>
                    <div className="snap-center shrink-0 w-64 h-40 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                      <span className="text-2xl mb-2">✨</span>
                      <h4 className="text-sm font-medium text-white mb-1">AI Magic</h4>
                      <p className="text-xs text-white/50">Wait for processing</p>
                    </div>
                  </div>
                </div>

                {/* Cautions */}
                <div className="mb-12 bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xs tracking-[0.2em] text-[#ff4444] uppercase font-mono mb-4 flex items-center gap-2">
                    <span>⚠️</span> Important Guidelines
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-lg">💡</span>
                      <p className="text-sm text-white/70">Ensure <span className="text-white">even lighting</span> across your body. Avoid harsh shadows.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg">📏</span>
                      <p className="text-sm text-white/70">Stand approx <span className="text-white">2-3 meters</span> away from the camera.</p>
                    </li>
                  </ul>
                </div>

                {/* Q&A Accordion */}
                <div>
                  <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase font-mono mb-4">FAQ</h3>
                  <div className="space-y-2">
                    {[
                      { q: "What files are supported?", a: "We support JPG and PNG formats up to 5MB." },
                      { q: "How long does processing take?", a: "Usually between 10-15 seconds depending on server load." },
                      { q: "Is my data private?", a: "Yes, images are processed securely and deleted after use." }
                    ].map((faq, i) => (
                      <div key={i} className="border-b border-white/10">
                        <button
                          onClick={() => toggleFaq(i)}
                          className="w-full py-4 flex justify-between items-center text-left text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
                        >
                          {faq.q}
                          <span className="text-white/50">{openFaq === i ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="pb-4 text-xs text-white/50">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
