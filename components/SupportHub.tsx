"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const steps = [
    { title: "Upload Photo", desc: "Take a well-lit, full-body photo facing the camera." },
    { title: "Select Garment", desc: "Choose the item you want to try on from our catalog." },
    { title: "AI Fitting", desc: "Our engine will seamlessly fit the garment to your body." }
  ];

  const faqs = [
    { q: "How long does fitting take?", a: "Typically between 5 to 10 seconds depending on the mode." },
    { q: "What photos work best?", a: "Good lighting, plain background, and no baggy clothes." },
    { q: "Is my data secure?", a: "Yes, photos are processed and immediately deleted from our servers." }
  ];

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all shadow-lg"
        aria-label="Support Hub"
      >
        <span className="text-lg font-serif italic">?</span>
      </button>

      {/* Drawer Overlay */}
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

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 sticky top-0 z-10 backdrop-blur-md">
                <h2 className="text-xl font-bold tracking-widest text-white uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-10 flex-1">

                {/* 1. User Guide Carousel */}
                <section>
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase tracking-widest mb-4">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="text-center min-h-[120px] flex flex-col justify-center"
                      >
                        <div className="text-3xl mb-3 font-serif text-white/80">{activeStep + 1}</div>
                        <h4 className="text-sm font-bold text-white mb-2">{steps[activeStep].title}</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">{steps[activeStep].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-2 mt-4">
                      {steps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${idx === activeStep ? 'bg-[#007AFF] w-6' : 'bg-white/20'}`}
                          aria-label={`Go to step ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* 2. Cautions (Icons) */}
                <section>
                  <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span>⚠️</span> Caution
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">💡</div>
                      <h4 className="text-xs font-bold text-white mb-1">Good Lighting</h4>
                      <p className="text-[10px] text-gray-400">Avoid harsh shadows</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">📸</div>
                      <h4 className="text-xs font-bold text-white mb-1">Distance</h4>
                      <p className="text-[10px] text-gray-400">Keep phone waist-level</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">🧍</div>
                      <h4 className="text-xs font-bold text-white mb-1">Posture</h4>
                      <p className="text-[10px] text-gray-400">Stand straight, arms down</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">👕</div>
                      <h4 className="text-xs font-bold text-white mb-1">Clothing</h4>
                      <p className="text-[10px] text-gray-400">Wear tight-fitting clothes</p>
                    </div>
                  </div>
                </section>

                {/* 3. Q&A Accordion */}
                <section>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">FAQ</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full text-left p-4 text-sm font-medium text-white flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                          {faq.q}
                          <span className={`transform transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`}>
                            ↓
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 text-xs text-gray-400"
                            >
                              {faq.a}
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
    </>
  );
}
