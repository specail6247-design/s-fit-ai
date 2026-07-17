'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const guideSteps = [
    { title: "Position Camera", desc: "Keep device at eye level." },
    { title: "Good Lighting", desc: "Face a light source, avoid backlighting." },
    { title: "Clear Background", desc: "Stand against a plain wall if possible." },
    { title: "Full Body View", desc: "Ensure your whole body is visible in the frame." }
  ];

  const faqs = [
    { q: "How accurate is the sizing?", a: "Our AI uses advanced body estimation to match you with brand-specific size charts, achieving 94% accuracy." },
    { q: "Is my data secure?", a: "Yes. Photos are processed instantly and are never stored without your explicit permission." },
    { q: "Why is the fit sometimes off?", a: "Loose clothing or poor lighting can confuse the AI. Try wearing fitted clothes for the initial scan." }
  ];

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-void-black border border-white/20 text-white shadow-2xl hover:bg-white hover:text-black transition-all"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined" aria-hidden="true">help</span>
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-sm border-l border-white/10 bg-void-black shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                  <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white transition-colors">
                    <span className="material-symbols-outlined" aria-hidden="true">close</span>
                  </button>
                </div>

                {/* User Guide */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-cyber-lime">How to Fit</h3>
                  <ol className="space-y-4">
                    {guideSteps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="font-mono text-soft-gray">0{i + 1}</span>
                        <div>
                          <p className="font-bold text-white">{step.title}</p>
                          <p className="text-xs text-soft-gray">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Caution */}
                <div className="mb-8 p-4 border border-luxury-gold/30 bg-luxury-gold/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-luxury-gold">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">warning</span>
                    <h3 className="text-xs font-bold tracking-widest uppercase">Caution</h3>
                  </div>
                  <p className="text-xs text-soft-gray leading-relaxed">
                    Poor lighting or extreme camera angles will drastically reduce fit accuracy. Keep the camera parallel to your body at a distance of 2-3 meters.
                  </p>
                </div>

                {/* Q&A */}
                <div>
                  <h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-cyber-lime">Q&A</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-bold text-white pr-4">{faq.q}</span>
                          <span className="material-symbols-outlined text-soft-gray text-sm transition-transform duration-300" style={{ transform: openFaqIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }} aria-hidden="true">
                            expand_more
                          </span>
                        </button>
                        <AnimatePresence>
                          {openFaqIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/10 mt-2">
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
          </>
        )}
      </AnimatePresence>
    </>
  );
}
