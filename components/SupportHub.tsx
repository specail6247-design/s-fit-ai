'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const steps = [
    { title: "Lighting", desc: "Ensure even, natural lighting. Avoid harsh backlights.", icon: "☀️" },
    { title: "Pose", desc: "Stand straight, arms slightly away from the body.", icon: "🧍" },
    { title: "Clothing", desc: "Wear form-fitting clothes for best analysis.", icon: "👕" }
  ];

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI uses advanced depth estimation to achieve ~95% accuracy compared to physical tailoring." },
    { q: "Is my photo stored?", a: "No. Photos are processed in memory and immediately discarded after rendering the 3D twin." },
    { q: "What if it doesn't look right?", a: "Try moving 3-5 feet from the camera and ensure your full body is in frame." }
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all shadow-lg"
        aria-label="Support Hub"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>

      {/* Drawer Overlay & Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div key="drawer-overlay" className="fixed inset-0 z-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-xl font-serif italic text-white tracking-wide">Support & Guide</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-500 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Section 1: How to Fit Carousel */}
                <div className="mb-12">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-mono">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                      <button
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                        disabled={activeStep === 0}
                        className="text-white/50 hover:text-white disabled:opacity-20"
                      >
                        ←
                      </button>
                      <div className="text-3xl">{steps[activeStep].icon}</div>
                      <button
                        onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                        disabled={activeStep === steps.length - 1}
                        className="text-white/50 hover:text-white disabled:opacity-20"
                      >
                        →
                      </button>
                    </div>
                    <div className="text-center h-20">
                      <h4 className="text-sm font-bold text-white mb-2">{steps[activeStep].title}</h4>
                      <p className="text-xs text-gray-400">{steps[activeStep].desc}</p>
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      {steps.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === activeStep ? 'w-4 bg-white' : 'w-1 bg-white/20'}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 2: Cautions */}
                <div className="mb-12">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-mono">Important Cautions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-red-900/10 border border-red-900/30">
                      <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-red-200">Distance Matters</h4>
                        <p className="text-xs text-red-200/60 mt-1">Stand exactly 4-6 feet from the camera for accurate proportion mapping.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-900/10 border border-amber-900/30">
                       <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-amber-200">Avoid Mirrors</h4>
                        <p className="text-xs text-amber-200/60 mt-1">Do not photograph yourself in a mirror; use a self-timer or ask a friend.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Q&A Accordion */}
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-mono">Frequently Asked</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full px-4 py-3 text-left flex justify-between items-center text-sm font-medium text-white hover:bg-white/5 transition-colors"
                        >
                          {faq.q}
                          <span className={`text-gray-500 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`}>
                            ↓
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 text-xs text-gray-400 overflow-hidden"
                            >
                              <div className="pb-4">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
