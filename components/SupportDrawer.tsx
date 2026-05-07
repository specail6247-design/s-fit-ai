"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportDrawer({ isOpen, onClose }: SupportDrawerProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 p-6 overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold tracking-wider text-white">SUPPORT HUB</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white text-xl">✕</button>
            </div>

            <div className="space-y-12">
              {/* User Guide */}
              <section>
                <h3 className="text-sm font-bold text-[#007AFF] uppercase mb-4 tracking-widest flex items-center gap-2">
                  <span>📖</span> How to Fit
                </h3>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 hide-scrollbar">
                  {[
                    { step: "01", title: "Stand Clear", desc: "Ensure you are visible from head to toe." },
                    { step: "02", title: "Good Lighting", desc: "Avoid harsh backlighting for best results." },
                    { step: "03", title: "Upload & Wait", desc: "Let our AI process your twin in seconds." }
                  ].map((item, i) => (
                    <div key={i} className="min-w-[200px] snap-center bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-2xl font-black text-white/20 mb-2">{item.step}</div>
                      <h4 className="font-bold text-sm text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Caution */}
              <section>
                <h3 className="text-sm font-bold text-amber-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                  <span>⚠️</span> Caution
                </h3>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 mt-0.5">📸</span>
                    <div>
                      <p className="text-sm text-white font-medium">Distance Matters</p>
                      <p className="text-xs text-amber-500/70">Stand at least 2 meters away from the camera.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 mt-0.5">💡</span>
                    <div>
                      <p className="text-sm text-white font-medium">Lighting Check</p>
                      <p className="text-xs text-amber-500/70">Ensure your face and body are well-lit from the front.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Q&A */}
              <section>
                <h3 className="text-sm font-bold text-white uppercase mb-4 tracking-widest flex items-center gap-2">
                  <span>❓</span> FAQ
                </h3>
                <div className="space-y-2">
                  {[
                    { q: "Is my data stored?", a: "No, photos are processed and immediately deleted." },
                    { q: "What brands do you support?", a: "We support a wide range of mass and luxury brands." },
                    { q: "Can I try multiple items?", a: "Yes, you can layer tops, bottoms, and accessories." }
                  ].map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center text-sm font-medium text-white"
                      >
                        {faq.q}
                        <span className="text-white/50">{openFaqIndex === index ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === index && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-black/40 text-xs text-gray-400 border-t border-white/5">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
