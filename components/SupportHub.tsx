'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "What should I wear for the best result?", a: "Form-fitting clothes or underwear works best. Avoid baggy clothing as it may interfere with the AI body mapping." },
    { q: "How long does a virtual fitting take?", a: "It typically takes about 10 seconds for the AI to process and generate your try-on image." },
    { q: "Is my photo stored securely?", a: "Your photos are processed in real-time and are never stored on our servers permanently." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md transition-all text-white/70 hover:text-white group"
        aria-label="Support Hub"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">?</span>
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
              className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                  <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white text-xl">✕</button>
                </div>

                <div className="space-y-10">
                  {/* User Guide Carousel */}
                  <section>
                    <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4">How to Fit</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
                      {[
                        { step: 1, title: 'Upload Photo', desc: 'Take a clear, full-body shot.' },
                        { step: 2, title: 'Select Garment', desc: 'Choose a piece from our catalog.' },
                        { step: 3, title: 'AI Processing', desc: 'Wait 10 seconds for magic.' }
                      ].map((item) => (
                        <div key={item.step} className="flex-none w-48 bg-white/5 border border-white/10 p-4 rounded-xl snap-start">
                          <div className="text-2xl font-black text-white/20 mb-2">0{item.step}</div>
                          <div className="font-bold text-sm mb-1">{item.title}</div>
                          <div className="text-xs text-white/50">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Caution */}
                  <section>
                    <h3 className="text-xs font-bold text-[#e63946] uppercase mb-4">Caution & Best Practices</h3>
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400">💡</span>
                        <div>
                          <div className="text-sm font-bold text-red-200">Lighting Matters</div>
                          <div className="text-xs text-red-200/70">Ensure you are in a well-lit room. Avoid harsh shadows or backlighting.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-red-400">📷</span>
                        <div>
                          <div className="text-sm font-bold text-red-200">Camera Distance</div>
                          <div className="text-xs text-red-200/70">Stand at least 1.5 meters away from the camera for accurate proportions.</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* FAQ Accordion */}
                  <section>
                    <h3 className="text-xs font-bold text-white/50 uppercase mb-4">Q&A</h3>
                    <div className="space-y-2">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                            className="w-full text-left p-4 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <span className="text-sm font-medium">{faq.q}</span>
                            <span className="text-white/50 transform transition-transform" style={{ rotate: activeFaq === idx ? '180deg' : '0deg' }}>↓</span>
                          </button>
                          <AnimatePresence>
                            {activeFaq === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 text-xs text-white/60 bg-white/[0.02] border-t border-white/5">
                                  {faq.a}
                                </div>
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