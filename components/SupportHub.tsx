'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guideSteps = [
    { title: "Lighting", desc: "Ensure bright, even lighting from the front.", icon: "💡" },
    { title: "Distance", desc: "Stand about 2 meters away from the camera.", icon: "📸" },
    { title: "Pose", desc: "Keep arms slightly away from your body.", icon: "🧍" }
  ];

  const faqs = [
    { q: "Is my data secure?", a: "Images are processed securely and deleted after." },
    { q: "What clothes work best?", a: "Form-fitting clothes yield the best simulation results." },
    { q: "Can I use photos from my gallery?", a: "Yes, you can upload directly from your device." }
  ];

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 border border-white/20 p-3 rounded-full text-white backdrop-blur-md transition-all flex items-center justify-center group"
        aria-label="Support Hub"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">❓</span>
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

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black italic tracking-wider text-white">SUPPORT HUB</h2>
                  <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white transition-colors">✕</button>
                </div>

                {/* User Guide Carousel */}
                <section className="mb-10">
                  <h3 className="text-sm font-bold text-cyber-lime tracking-widest uppercase mb-4">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center"
                      >
                        <div className="text-4xl mb-4">{guideSteps[activeStep].icon}</div>
                        <h4 className="text-white font-bold mb-2">{guideSteps[activeStep].title}</h4>
                        <p className="text-sm text-soft-gray">{guideSteps[activeStep].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-2 mt-6">
                      {guideSteps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${idx === activeStep ? 'bg-cyber-lime' : 'bg-white/20'}`}
                          aria-label={`Go to step ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Caution */}
                <section className="mb-10">
                  <h3 className="text-sm font-bold text-red-500 tracking-widest uppercase mb-4">Caution</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                      <span className="text-2xl">⚠️</span>
                      <p className="text-xs text-red-200">Avoid backlighting or extremely dark rooms.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                      <span className="text-2xl">📏</span>
                      <p className="text-xs text-red-200">Do not crop the photo; ensure full upper body is visible.</p>
                    </div>
                  </div>
                </section>

                {/* Q&A Accordion */}
                <section>
                  <h3 className="text-sm font-bold text-cyber-lime tracking-widest uppercase mb-4">Q&A</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                          className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-medium text-white">{faq.q}</span>
                          <span className="text-soft-gray">{openFaq === idx ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {openFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 text-xs text-soft-gray"
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
