'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'warnings' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guideSteps = [
    { title: 'Step 1: Lighting', desc: 'Ensure you are in a well-lit room. Avoid harsh backlighting.', icon: '💡' },
    { title: 'Step 2: Pose', desc: 'Stand straight with arms slightly away from your body (A-pose).', icon: '🧍' },
    { title: 'Step 3: Clothing', desc: 'Wear form-fitting clothes for accurate measurements.', icon: '👕' },
    { title: 'Step 4: Camera', desc: 'Place camera at waist height, directly facing you.', icon: '📸' }
  ];

  const faqs = [
    { q: 'How accurate is the sizing?', a: 'Our AI model analyzes your proportions with 95% accuracy compared to manual measurements when guidelines are followed.' },
    { q: 'What about privacy?', a: 'Your photos are processed in real-time and never stored on our servers without your explicit consent.' },
    { q: 'Can I try on any brand?', a: 'We support over 50+ luxury and SPA brands, with new collections added weekly.' }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-void-black border border-white/20 flex items-center justify-center text-soft-gray hover:text-white hover:border-luxury-gold hover:shadow-[0_0_15px_rgba(236,171,19,0.3)] transition-all z-40 group"
        aria-label="Support Hub"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">?</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-lg font-light tracking-widest uppercase text-white">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white text-xl">✕</button>
              </div>

              <div className="flex border-b border-white/10">
                {(['guide', 'warnings', 'faq'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors ${activeTab === tab ? 'text-luxury-gold border-b-2 border-luxury-gold bg-luxury-gold/5' : 'text-soft-gray hover:text-white hover:bg-white/5'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'guide' && (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col items-center justify-center h-full"
                    >
                      <div className="text-6xl mb-8">{guideSteps[guideStep].icon}</div>
                      <h3 className="text-xl text-white mb-4 tracking-wider">{guideSteps[guideStep].title}</h3>
                      <p className="text-soft-gray text-center text-sm leading-relaxed mb-12">{guideSteps[guideStep].desc}</p>

                      <div className="flex items-center gap-4 mt-auto">
                        <button
                          onClick={() => setGuideStep(prev => Math.max(0, prev - 1))}
                          className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center ${guideStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'}`}
                        >
                          ←
                        </button>
                        <div className="flex gap-2">
                          {guideSteps.map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === guideStep ? 'bg-luxury-gold w-4' : 'bg-white/20'}`} />
                          ))}
                        </div>
                        <button
                          onClick={() => setGuideStep(prev => Math.min(guideSteps.length - 1, prev + 1))}
                          className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center ${guideStep === guideSteps.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'}`}
                        >
                          →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'warnings' && (
                    <motion.div
                      key="warnings"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl flex gap-4">
                        <span className="text-2xl">⚠️</span>
                        <div>
                          <h4 className="text-red-400 font-bold mb-1 uppercase text-xs tracking-widest">Poor Lighting</h4>
                          <p className="text-sm text-soft-gray">Shadows or backlighting will severely impact measurement accuracy. Use front-facing natural or bright artificial light.</p>
                        </div>
                      </div>

                      <div className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-xl flex gap-4">
                        <span className="text-2xl">📐</span>
                        <div>
                          <h4 className="text-orange-400 font-bold mb-1 uppercase text-xs tracking-widest">Camera Distance</h4>
                          <p className="text-sm text-soft-gray">Ensure your entire body from head to toe is visible in the frame. Stand approximately 6-8 feet away from the camera.</p>
                        </div>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-xl flex gap-4">
                        <span className="text-2xl">🧥</span>
                        <div>
                          <h4 className="text-yellow-400 font-bold mb-1 uppercase text-xs tracking-widest">Baggy Clothing</h4>
                          <p className="text-sm text-soft-gray">Oversized or loose clothing hides your natural proportions. Wear tight-fitting athletic wear for best results.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'faq' && (
                    <motion.div
                      key="faq"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full p-4 text-left flex justify-between items-center text-sm text-white hover:bg-white/5 transition-colors"
                          >
                            <span>{faq.q}</span>
                            <span className={`transition-transform text-luxury-gold ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                          </button>
                          <AnimatePresence>
                            {openFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 pt-0 text-sm text-soft-gray border-t border-white/5">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
