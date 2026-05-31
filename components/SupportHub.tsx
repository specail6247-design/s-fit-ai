'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CAUTIONS = [
  { icon: 'lightbulb', text: 'Ensure even, bright lighting for best results.' },
  { icon: 'straighten', text: 'Stand 2-3 meters away from the camera.' },
  { icon: 'accessibility_new', text: 'Wear form-fitting clothes for accurate body mapping.' },
];

const FAQS = [
  { q: 'Is my data stored?', a: 'No, images are processed securely and deleted immediately.' },
  { q: 'How accurate is the sizing?', a: 'We use AI to map garment dimensions to your estimated body shape with ~90% accuracy.' },
  { q: 'Can I try on my own clothes?', a: 'Currently, you can only try on supported garments from our catalog or upload a clean garment image.' },
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: 'Step 1: Upload Photo', desc: 'Take a clear photo of yourself.' },
    { title: 'Step 2: Select Garment', desc: 'Choose a garment to try on.' },
    { title: 'Step 3: Generate', desc: 'Wait for our AI to process your virtual fitting.' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-void-black/80 backdrop-blur-sm border border-white/20 text-pure-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-void-black border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-xl font-light tracking-[0.2em] uppercase">Support Hub</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-soft-gray hover:text-pure-white p-2"
                    aria-label="Close Support Hub"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                </div>

                {/* User Guide Carousel */}
                <section className="mb-12">
                  <h3 className="text-xs text-soft-gray tracking-widest uppercase mb-4">How To Fit</h3>
                  <div className="bg-white/5 border border-white/10 p-6 relative min-h-[160px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={guideStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <h4 className="text-sm font-bold text-pure-white mb-2">{guideSteps[guideStep].title}</h4>
                        <p className="text-xs text-soft-gray">{guideSteps[guideStep].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {guideSteps.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setGuideStep(i)}
                          className={`w-2 h-2 rounded-full transition-colors ${i === guideStep ? 'bg-luxury-gold' : 'bg-white/20 hover:bg-white/40'}`}
                          aria-label={`Go to step ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Caution Warnings */}
                <section className="mb-12">
                  <h3 className="text-xs text-soft-gray tracking-widest uppercase mb-4">Best Practices</h3>
                  <div className="space-y-4">
                    {CAUTIONS.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 border border-white/10 bg-white/5">
                        <span className="material-symbols-outlined text-luxury-gold text-xl shrink-0">{item.icon}</span>
                        <p className="text-xs text-soft-gray leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Q&A Accordion */}
                <section>
                  <h3 className="text-xs text-soft-gray tracking-widest uppercase mb-4">FAQ</h3>
                  <div className="space-y-2">
                    {FAQS.map((faq, i) => (
                      <div key={i} className="border border-white/10 bg-white/5">
                        <button
                          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                          className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
                        >
                          <span className="text-xs font-medium text-pure-white">{faq.q}</span>
                          <span className="material-symbols-outlined text-soft-gray text-lg transition-transform duration-300" style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            expand_more
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
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
