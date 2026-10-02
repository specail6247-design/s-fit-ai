"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guides = [
    { title: "Step 1: The Setup", desc: "Position your camera at chest level, ensuring you are fully visible from head to toe." },
    { title: "Step 2: The Lighting", desc: "Face a natural light source. Avoid strong backlighting to ensure accurate material rendering." },
    { title: "Step 3: The Pose", desc: "Stand straight with arms slightly away from your body. Keep a relaxed, natural posture." }
  ];

  const faqs = [
    { q: "How accurate is the sizing?", a: "Our AI uses millimeter-precise body mapping to ensure 99% accuracy across all garments." },
    { q: "Can I use photos from my gallery?", a: "Yes, but for the best results, use a recent photo with good lighting and form-fitting clothes." },
    { q: "Is my data secure?", a: "We process your photos instantly and never store them without your explicit VIP consent." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all z-40 group shadow-lg"
        aria-label="Support Hub"
      >
        <span className="font-mono text-lg group-hover:scale-110 transition-transform">?</span>
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
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                  <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                    <span aria-hidden="true" className="text-xl">✕</span>
                  </button>
                </div>

                <div className="space-y-12">
                  {/* User Guide Carousel */}
                  <section>
                    <h3 className="text-sm font-mono text-cyber-lime mb-4 uppercase">How to Fit</h3>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative min-h-[160px] flex flex-col justify-between">
                      <div>
                        <div className="flex gap-1 mb-4">
                          {guides.map((_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full ${i === guideStep ? 'bg-cyber-lime' : 'bg-white/20'}`} />
                          ))}
                        </div>
                        <motion.div
                          key={guideStep}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-2"
                        >
                          <h4 className="font-bold text-white">{guides[guideStep].title}</h4>
                          <p className="text-sm text-soft-gray leading-relaxed">{guides[guideStep].desc}</p>
                        </motion.div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => setGuideStep(p => Math.max(0, p - 1))}
                          className="text-xs font-mono uppercase text-white/50 hover:text-white disabled:opacity-20"
                          disabled={guideStep === 0}
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => setGuideStep(p => Math.min(guides.length - 1, p + 1))}
                          className="text-xs font-mono uppercase text-cyber-lime hover:brightness-125 disabled:opacity-20"
                          disabled={guideStep === guides.length - 1}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Caution */}
                  <section>
                    <h3 className="text-sm font-mono text-amber-500 mb-4 uppercase">Caution</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col items-center text-center space-y-2">
                        <span className="text-2xl">☀️</span>
                        <p className="text-xs text-amber-500/80">Ensure even, natural lighting. Avoid harsh shadows.</p>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col items-center text-center space-y-2">
                        <span className="text-2xl">📷</span>
                        <p className="text-xs text-amber-500/80">Keep camera at least 2 meters away for full body capture.</p>
                      </div>
                    </div>
                  </section>

                  {/* Q&A Accordion */}
                  <section>
                    <h3 className="text-sm font-mono text-soft-gray mb-4 uppercase">F.A.Q</h3>
                    <div className="space-y-2">
                      {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full text-left p-4 flex justify-between items-center text-sm font-medium hover:bg-white/5 transition-colors"
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
                                <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/10 mt-2">
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
