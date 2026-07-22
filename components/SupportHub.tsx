'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "What is S_FIT NEO?", a: "S_FIT NEO is a professional virtual fitting tool powered by advanced AI." },
    { q: "Why is my photo rejected?", a: "Ensure good lighting and avoid complex backgrounds." },
    { q: "Is my data secure?", a: "Yes, all uploaded photos are processed ephemerally and deleted." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white/5 border border-white/10 hover:border-white/30 rounded-full flex items-center justify-center text-white/50 hover:text-white backdrop-blur-md transition-all z-40 group shadow-lg"
      >
        <span className="font-mono text-xl">?</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 overflow-y-auto p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black tracking-tighter italic">SUPPORT <span className="text-soft-gray">HUB</span></h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white text-xl">✕</button>
              </div>

              {/* User Guide Carousel */}
              <section className="mb-12">
                <h3 className="text-xs font-bold text-cyber-lime uppercase tracking-widest mb-4">How to Fit</h3>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 hide-scrollbar">
                  {[
                    { step: "01", title: "Upload Photo", desc: "Front-facing, clear background." },
                    { step: "02", title: "Select Garment", desc: "Choose your target style." },
                    { step: "03", title: "Generate", desc: "AI weaves your virtual outfit." }
                  ].map((s, i) => (
                    <div key={i} className="snap-center shrink-0 w-[240px] bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="text-3xl font-black text-white/20 mb-2 font-mono">{s.step}</div>
                      <h4 className="font-bold text-white mb-1">{s.title}</h4>
                      <p className="text-xs text-soft-gray">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Caution Section */}
              <section className="mb-12">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="text-lg">⚠️</span> Critical Requirements
                </h3>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-200/80 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📸</span>
                    <p><strong>Camera Distance:</strong> Ensure the subject is at least 1 meter away from the lens.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <p><strong>Lighting:</strong> Avoid harsh shadows. Even, diffuse lighting yields the best AI results.</p>
                  </div>
                </div>
              </section>

              {/* Q&A Accordion */}
              <section>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">FAQ</h3>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full text-left p-4 flex justify-between items-center text-sm font-medium hover:bg-white/5 transition-colors"
                      >
                        {faq.q}
                        <span className="text-soft-gray text-xs">{activeFaq === i ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 pt-0 text-xs text-soft-gray border-t border-white/5">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
