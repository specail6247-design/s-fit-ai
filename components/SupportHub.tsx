'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Upload Selfie", desc: "Ensure clear lighting and face the camera directly." },
    { title: "Select Garment", desc: "Choose a product you want to try on." },
    { title: "AI Processing", desc: "Our engine will generate your virtual fit in seconds." }
  ];

  const faqs = [
    { q: "What is Digital Twin mode?", a: "It uses your selfie and full body photo to create a 360-degree realistic avatar, reflecting your exact body shape." },
    { q: "How long does it take?", a: "Standard fitting takes ~3 seconds. Digital Twin processing takes around 10 seconds for the initial setup." },
    { q: "Is my data secure?", a: "Yes. All uploaded photos are processed ephemerally and deleted immediately after the 3D model is generated." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#0A0A0A] border-l border-y border-[#C9B037]/30 text-[#C9B037] p-2 rounded-l-md hover:bg-[#C9B037]/10 transition-colors z-40 writing-vertical-rl text-xs font-[family-name:var(--font-space-grotesk)] tracking-widest uppercase shadow-[-5px_0_15px_rgba(0,0,0,0.5)]"
        style={{ writingMode: 'vertical-rl' }}
      >
        Support Hub
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
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0A0A] border-l border-[#C9B037]/30 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl text-[#C9B037] font-[family-name:var(--font-cinzel)] tracking-widest">
                    SUPPORT
                  </h2>
                  <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                    ✕
                  </button>
                </div>

                <div className="space-y-10">
                  {/* Guide Carousel (Simplified for now) */}
                  <section>
                    <h3 className="text-xs text-white/50 mb-4 tracking-widest uppercase font-[family-name:var(--font-space-grotesk)]">How to Fit</h3>
                    <div className="bg-white/5 border border-white/10 p-4 relative overflow-hidden group">
                      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentStep * 100}%)` }}>
                        {steps.map((step, idx) => (
                          <div key={idx} className="w-full shrink-0 space-y-2 px-2">
                             <div className="w-12 h-12 bg-[#C9B037]/20 rounded-full flex items-center justify-center text-[#C9B037] mb-2 font-bold font-[family-name:var(--font-cinzel)]">{idx + 1}</div>
                             <h4 className="text-white text-sm font-bold font-[family-name:var(--font-space-grotesk)]">{step.title}</h4>
                             <p className="text-xs text-white/60 font-[family-name:var(--font-space-grotesk)]">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4 px-2">
                         <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="text-[#C9B037] disabled:opacity-30 text-xs tracking-widest uppercase font-[family-name:var(--font-space-grotesk)]">Prev</button>
                         <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1} className="text-[#C9B037] disabled:opacity-30 text-xs tracking-widest uppercase font-[family-name:var(--font-space-grotesk)]">Next</button>
                      </div>
                    </div>
                  </section>

                  {/* Cautions */}
                  <section>
                    <h3 className="text-xs text-white/50 mb-4 tracking-widest uppercase font-[family-name:var(--font-space-grotesk)]">Requirements</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-500/10 border border-red-500/20 p-4 text-center space-y-2 rounded-sm">
                        <div className="text-2xl">💡</div>
                        <p className="text-[10px] text-red-200 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">Avoid Backlight</p>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 text-center space-y-2 rounded-sm">
                        <div className="text-2xl">📏</div>
                        <p className="text-[10px] text-yellow-200 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">Full Body Frame</p>
                      </div>
                    </div>
                  </section>

                  {/* Q&A Accordion */}
                  <section>
                    <h3 className="text-xs text-white/50 mb-4 tracking-widest uppercase font-[family-name:var(--font-space-grotesk)]">FAQ</h3>
                    <div className="space-y-2">
                      {faqs.map((faq, i) => (
                        <div key={`faq-${i}`} className="border border-white/10 bg-white/5 overflow-hidden">
                          <button
                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            className="w-full text-left p-4 flex justify-between items-center text-sm text-white font-[family-name:var(--font-space-grotesk)] hover:bg-white/5 transition-colors"
                          >
                            {faq.q}
                            <span className="text-[#C9B037]">{activeFaq === i ? '−' : '+'}</span>
                          </button>
                          <AnimatePresence>
                            {activeFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 text-xs text-white/60 font-[family-name:var(--font-space-grotesk)] leading-relaxed"
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
