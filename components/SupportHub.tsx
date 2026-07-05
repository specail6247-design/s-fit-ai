'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    { title: "01. Pose", desc: "Stand straight, arms slightly away from body." },
    { title: "02. Lighting", desc: "Ensure even lighting without harsh shadows." },
    { title: "03. Upload", desc: "Select clear front-facing photos." }
  ];

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI model analyzes your photo and garment to provide highly accurate 3D visual fitting." },
    { q: "Can I try different sizes?", a: "Yes, you can toggle between available sizes in the fitting room." },
    { q: "What photos work best?", a: "Front-facing, full-body photos against a plain background work best." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-transparent border border-white/20 text-white/70 hover:text-white px-4 py-2 rounded-full text-xs font-mono tracking-widest backdrop-blur-md z-40 transition-all hover:border-white/40"
      >
        SUPPORT
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[400px] bg-[#0a0a0a] border-l border-white/10 z-50 p-6 flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-[family-name:var(--font-display)] tracking-[0.2em] uppercase text-[#C9B037]">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              {/* User Guide Carousel */}
              <div className="mb-10">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">How to Fit</h3>
                <div className="border border-white/10 rounded-lg p-6 bg-white/5 relative h-[150px] flex flex-col justify-center">
                  <h4 className="text-[#C9B037] font-mono text-sm font-bold mb-2">{steps[currentStep].title}</h4>
                  <p className="text-gray-400 text-sm">{steps[currentStep].desc}</p>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6">
                    <button
                      onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                      disabled={currentStep === 0}
                      className="text-xs text-gray-500 disabled:opacity-30 hover:text-white transition-colors"
                    >
                      ← PREV
                    </button>
                    <div className="flex gap-1 items-center">
                      {steps.map((_, idx) => (
                        <div key={idx} className={`h-1 rounded-full transition-all ${idx === currentStep ? 'w-4 bg-[#C9B037]' : 'w-1 bg-gray-600'}`} />
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                      disabled={currentStep === steps.length - 1}
                      className="text-xs text-gray-500 disabled:opacity-30 hover:text-white transition-colors"
                    >
                      NEXT →
                    </button>
                  </div>
                </div>
              </div>

              {/* Caution Section */}
              <div className="mb-10 p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
                <h3 className="text-red-400 text-sm font-bold flex items-center gap-2">
                  <span className="text-lg">⚠️</span> Requirements
                </h3>
                <ul className="text-xs text-gray-400 mt-3 space-y-2 font-mono">
                  <li className="flex items-center gap-2"><span>👕</span> Do not wear loose clothing</li>
                  <li className="flex items-center gap-2"><span>📏</span> Stand 2-3 meters from camera</li>
                  <li className="flex items-center gap-2"><span>🖼️</span> Avoid complex backgrounds</li>
                </ul>
              </div>

              {/* Q&A Accordion */}
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">FAQ</h3>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 flex justify-between items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
                      >
                        {faq.q}
                        <span className="text-[#C9B037]">{openFaq === idx ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-xs text-gray-500"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
