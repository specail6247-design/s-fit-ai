'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const userGuideSteps = [
  {
    title: '01. Prepare Area',
    desc: 'Ensure you are in a well-lit room. Natural light is best. Avoid harsh backlighting.',
    icon: '☀️',
  },
  {
    title: '02. Set Distance',
    desc: 'Stand 1.5 - 2 meters away from the camera. Ensure your full body is visible in the frame.',
    icon: '📏',
  },
  {
    title: '03. Pose Naturally',
    desc: 'Stand straight with arms slightly away from your body. Avoid crossing your arms or legs.',
    icon: '🧍',
  },
];

const faqs = [
  {
    q: 'How accurate is the sizing?',
    a: 'Our AI utilizes millimeter-accurate computer vision to extract measurements, typically accurate within 0.5 inches of your actual size.',
  },
  {
    q: 'Is my photo stored securely?',
    a: 'Yes. Photos are processed securely on isolated GPU clusters and are automatically deleted immediately after fitting generation.',
  },
  {
    q: 'What clothing works best?',
    a: 'Form-fitting clothes (like a t-shirt and leggings) yield the most accurate 3D mesh generation. Baggy clothes may distort the shape.',
  },
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-soft-gray hover:text-white hover:border-white transition-all backdrop-blur-md bg-white/5"
        aria-label="Support Hub"
      >
        ?
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-void-black border-l border-white/10 z-[100] shadow-2xl flex flex-col overflow-y-auto"
            >
              <div className="sticky top-0 bg-void-black/90 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center z-10">
                <h2 className="text-lg font-bold tracking-widest text-[#C9B037] font-[family-name:var(--font-display)] uppercase">
                  Support Hub
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-soft-gray hover:text-white transition-colors p-2 -mr-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-10">

                {/* User Guide Carousel */}
                <section>
                  <h3 className="text-xs text-soft-gray tracking-widest uppercase mb-4 font-mono">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="text-center"
                      >
                        <div className="text-4xl mb-4 grayscale opacity-80">{userGuideSteps[activeStep].icon}</div>
                        <h4 className="text-sm font-bold text-white mb-2">{userGuideSteps[activeStep].title}</h4>
                        <p className="text-xs text-soft-gray leading-relaxed">{userGuideSteps[activeStep].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-2 mt-6">
                      {userGuideSteps.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveStep(i)}
                          className={`w-2 h-2 rounded-full transition-all ${activeStep === i ? 'bg-[#C9B037] w-6' : 'bg-white/20 hover:bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Cautions */}
                <section>
                  <h3 className="text-xs text-soft-gray tracking-widest uppercase mb-4 font-mono">Cautions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2 opacity-80">📸🚫</div>
                      <p className="text-[10px] text-red-200/70 uppercase tracking-wider">No Heavy Shadows</p>
                    </div>
                    <div className="bg-orange-900/10 border border-orange-500/20 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2 opacity-80">📐⚠️</div>
                      <p className="text-[10px] text-orange-200/70 uppercase tracking-wider">Check Distance</p>
                    </div>
                  </div>
                </section>

                {/* FAQ Accordion */}
                <section className="pb-8">
                  <h3 className="text-xs text-soft-gray tracking-widest uppercase mb-4 font-mono">Q&A</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleFaq(i)}
                          className="w-full p-4 text-left flex justify-between items-center text-sm font-medium hover:bg-white/5 transition-colors"
                        >
                          <span className="pr-4">{faq.q}</span>
                          <span className={`text-[#C9B037] transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/5 mt-2">
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
    </>
  );
}
