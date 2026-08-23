'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: "Snap a Photo", desc: "Take a clear, full-body photo facing the camera." },
    { title: "Select Garment", desc: "Upload a flat, front-facing image of the garment." },
    { title: "AI Magic", desc: "Let our engine fit the garment perfectly to your body." }
  ];

  const faqs = [
    { q: "What lighting is best?", a: "Natural, even lighting without harsh shadows works best." },
    { q: "How far should I stand?", a: "Stand about 2-3 meters from the camera for a full-body shot." },
    { q: "Can I use side profiles?", a: "For best results, please use straight-on, front-facing photos." }
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 border-r-0 py-6 px-2 rounded-l-xl z-40 transition-all group"
        aria-label="Support Hub"
      >
        <span className="text-white text-xs [writing-mode:vertical-rl] group-hover:text-[#007AFF] transition-colors">SUPPORT</span>
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
              className="fixed right-0 top-0 h-full w-[400px] max-w-full bg-[#0a0a0a] border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                <h2 className="text-xl font-bold tracking-tight">Support <span className="text-[#007AFF]">Hub</span></h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white/80'}`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'faq' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white/80'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    {/* Visual Carousel */}
                    <div className="relative h-48 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                       <AnimatePresence mode="wait">
                         <motion.div
                           key={guideStep}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="text-center px-8"
                         >
                            <div className="text-4xl mb-4">{['📸', '👕', '✨'][guideStep]}</div>
                            <h3 className="font-bold text-lg mb-2">{guideSteps[guideStep].title}</h3>
                            <p className="text-sm text-white/60">{guideSteps[guideStep].desc}</p>
                         </motion.div>
                       </AnimatePresence>

                       <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                         {guideSteps.map((_, i) => (
                           <button
                             key={i}
                             onClick={() => setGuideStep(i)}
                             className={`w-2 h-2 rounded-full transition-all ${i === guideStep ? 'bg-[#007AFF] w-4' : 'bg-white/20 hover:bg-white/40'}`}
                             aria-label={`Step ${i + 1}`}
                           />
                         ))}
                       </div>
                    </div>

                    {/* Cautions */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider">Cautions</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-2">
                          <span className="text-2xl text-yellow-500">☀️</span>
                          <span className="text-xs text-white/80">Avoid harsh backlighting</span>
                        </div>
                        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-2">
                          <span className="text-2xl text-[#007AFF]">📏</span>
                          <span className="text-xs text-white/80">Keep 2m distance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                          className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                          <span className="font-medium text-sm">{faq.q}</span>
                          <span className={`text-white/50 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`}>↓</span>
                        </button>
                        <AnimatePresence>
                          {openFaqIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-sm text-white/60 border-t border-white/5 mt-2">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
