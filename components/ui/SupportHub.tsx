'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  const guideSteps = [
    { title: "LIGHTING", desc: "Ensure even, bright lighting without harsh shadows.", icon: "💡" },
    { title: "DISTANCE", desc: "Stand 2-3 meters from the camera for full-body capture.", icon: "📏" },
    { title: "POSTURE", desc: "Face forward with arms slightly away from the body.", icon: "🧍" }
  ];

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI maps 120 points on your body to deliver a 98% accurate fit representation based on actual garment patterns." },
    { q: "What about my data?", a: "Images are processed in memory and immediately discarded. We do not store your photos." },
    { q: "Is the 3D true to color?", a: "We use physically based rendering (PBR) to match the exact fabric properties and dye lots under neutral lighting." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-r-0 border-white/20 text-white p-3 py-6 rounded-l-xl z-40 hover:bg-white/10 transition-colors flex flex-col items-center gap-2 group"
      >
        <span className="text-xs font-mono writing-vertical-rl rotate-180 tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">SUPPORT</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[100] flex flex-col overflow-y-auto"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-10">
                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#ecab13]">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
              </div>

              <div className="p-6 space-y-12">
                {/* Visual Guide Carousel */}
                <section>
                  <h3 className="text-[10px] text-white/50 tracking-widest uppercase mb-4">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl">{guideSteps[step].icon}</span>
                      <span className="text-[10px] text-[#ecab13] tracking-widest">STEP 0{step + 1}</span>
                    </div>
                    <h4 className="text-lg font-serif mb-2">{guideSteps[step].title}</h4>
                    <p className="text-xs text-white/70 leading-relaxed mb-6 h-10">{guideSteps[step].desc}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {guideSteps.map((_, i) => (
                          <div key={i} className={`h-1 rounded-full transition-all ${i === step ? 'w-4 bg-[#ecab13]' : 'w-1 bg-white/20'}`} />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setStep(Math.max(0, step - 1))} className="text-white/50 hover:text-white disabled:opacity-20" disabled={step === 0}>←</button>
                        <button onClick={() => setStep(Math.min(2, step + 1))} className="text-white/50 hover:text-white disabled:opacity-20" disabled={step === 2}>→</button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Caution */}
                <section>
                   <h3 className="text-[10px] text-white/50 tracking-widest uppercase mb-4">Caution</h3>
                   <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-4 flex gap-4 items-start">
                     <span className="text-red-500">⚠️</span>
                     <div>
                       <h4 className="text-xs font-bold text-red-500 tracking-widest uppercase mb-1">Environment Warning</h4>
                       <p className="text-xs text-white/70">Backlighting or extreme angles will degrade mesh generation quality resulting in poor fit accuracy.</p>
                     </div>
                   </div>
                </section>

                {/* Q&A Accordion */}
                <section className="pb-8">
                  <h3 className="text-[10px] text-white/50 tracking-widest uppercase mb-4">FAQ</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full p-4 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors text-left"
                        >
                          <span className="text-xs font-bold">{faq.q}</span>
                          <span className="text-white/50 text-xs">{openFaq === i ? '−' : '+'}</span>
                        </button>
                        {openFaq === i && (
                          <div className="p-4 pt-0 bg-white/5">
                            <p className="text-xs text-white/70 pt-4 border-t border-white/10 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
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
