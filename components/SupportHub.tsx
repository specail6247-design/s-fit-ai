'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: "Step 1: The Setup", desc: "Find a clean, clutter-free background." },
    { title: "Step 2: The Pose", desc: "Stand straight with arms slightly apart (A-pose)." },
    { title: "Step 3: The Lighting", desc: "Ensure even, natural lighting from the front." }
  ];

  const faqs = [
    { q: "What is S_FIT NEO?", a: "A professional virtual fitting AI that drapes garments realistically." },
    { q: "How accurate is the sizing?", a: "Our AI maps body proportions, but it is for visual reference primarily." },
    { q: "Is my data secure?", a: "Images are processed securely and deleted after your session." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 flex items-center justify-center text-soft-gray hover:text-white transition-all backdrop-blur-md"
        aria-label="Support Hub"
      >
        <span className="text-lg">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#050505] border-l border-white/10 z-[1000] flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold tracking-[0.2em] uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white transition-colors">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-12">
                {/* Guide */}
                <section>
                  <h3 className="text-[10px] text-white/50 font-mono tracking-[0.3em] mb-6 uppercase">How to Fit</h3>
                  <div className="bg-transparent border border-white/10 p-6 rounded-none">
                    <div className="flex justify-between items-center mb-4">
                       <h4 className="font-bold text-sm tracking-wide">{guideSteps[guideStep].title}</h4>
                       <span className="text-xs font-mono text-soft-gray">{guideStep + 1}/{guideSteps.length}</span>
                    </div>
                    <p className="text-xs text-soft-gray mb-8 h-8">{guideSteps[guideStep].desc}</p>
                    <div className="flex gap-4">
                      <button
                        disabled={guideStep === 0}
                        onClick={() => setGuideStep(p => p - 1)}
                        className="flex-1 py-3 border border-white/10 hover:bg-white/5 disabled:opacity-30 text-[10px] tracking-widest font-bold transition-colors"
                      >
                        PREV
                      </button>
                      <button
                        disabled={guideStep === guideSteps.length - 1}
                        onClick={() => setGuideStep(p => p + 1)}
                        className="flex-1 py-3 bg-white text-black hover:bg-gray-200 disabled:opacity-30 text-[10px] tracking-widest font-bold transition-colors"
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </section>

                {/* Caution */}
                <section>
                  <h3 className="text-[10px] text-white/50 font-mono tracking-[0.3em] mb-6 uppercase">Critical Requirements</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-transparent border border-red-500/30 p-6 text-center">
                       <div className="text-2xl mb-3">💡</div>
                       <div className="text-[10px] font-bold text-red-400 tracking-widest">NO SHADOWS</div>
                    </div>
                    <div className="bg-transparent border border-orange-500/30 p-6 text-center">
                       <div className="text-2xl mb-3">📸</div>
                       <div className="text-[10px] font-bold text-orange-400 tracking-widest">EYE LEVEL</div>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section>
                  <h3 className="text-[10px] text-white/50 font-mono tracking-[0.3em] mb-6 uppercase">Q&A</h3>
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 bg-transparent">
                        <button
                          className="w-full text-left p-5 text-xs font-bold tracking-wide flex justify-between items-center hover:bg-white/5 transition-colors"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                          {faq.q}
                          <span className="text-white font-mono">{openFaq === i ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/10 mt-4">
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