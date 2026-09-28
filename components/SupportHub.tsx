import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SupportHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const faqs = [
    { q: "Why is the fit sometimes slightly off?", a: "The AI maps based on available lighting and depth. Stronger lighting yields a tighter 3D mesh map." },
    { q: "Do I need to be bare-skinned?", a: "Form-fitting base layers work best. Baggy clothes will result in a baggy 3D reconstruction." },
    { q: "Can I use low-resolution photos?", a: "High-resolution front-facing photos with a clean background are highly recommended for the Neo Protocol." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/80 backdrop-blur-md border border-white/20 text-white rounded-full p-3 hover:border-cyber-lime transition-all flex items-center justify-center shadow-lg group"
        aria-label="Support Hub"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">❓</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-[100] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold tracking-widest font-mono text-white">SUPPORT_HUB</h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white transition-colors">
                  <span className="text-2xl" aria-hidden="true">✕</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-10">
                {/* User Guide Carousel */}
                <section>
                  <h3 className="text-xs text-cyber-lime font-mono mb-4 uppercase tracking-wider">01. How to Fit</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                    <div className="min-w-[80%] bg-white/5 border border-white/10 p-4 rounded-xl snap-center shrink-0">
                      <div className="text-3xl mb-2">📸</div>
                      <h4 className="font-bold text-sm mb-1 text-white">Step 1: Frontal Shot</h4>
                      <p className="text-xs text-soft-gray">Stand straight, face the camera directly in a well-lit room.</p>
                    </div>
                    <div className="min-w-[80%] bg-white/5 border border-white/10 p-4 rounded-xl snap-center shrink-0">
                      <div className="text-3xl mb-2">👕</div>
                      <h4 className="font-bold text-sm mb-1 text-white">Step 2: Clear Garment</h4>
                      <p className="text-xs text-soft-gray">Upload a flat, well-lit image of the garment you wish to wear.</p>
                    </div>
                    <div className="min-w-[80%] bg-white/5 border border-white/10 p-4 rounded-xl snap-center shrink-0">
                      <div className="text-3xl mb-2">⚡️</div>
                      <h4 className="font-bold text-sm mb-1 text-white">Step 3: Execute Protocol</h4>
                      <p className="text-xs text-soft-gray">Initiate the Try-On protocol and await 3D mesh rendering.</p>
                    </div>
                  </div>
                </section>

                {/* Caution / Warnings */}
                <section>
                  <h3 className="text-xs text-[#FF3B30] font-mono mb-4 uppercase tracking-wider flex items-center gap-2">
                    <span>⚠️</span> System Warnings
                  </h3>
                  <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">💡</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">Lighting Critical</h4>
                        <p className="text-xs text-soft-gray">Harsh shadows can distort the body mesh. Soft, even lighting is required.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">📏</span>
                      <div>
                        <h4 className="text-sm font-bold text-white">Distance Constraints</h4>
                        <p className="text-xs text-soft-gray">Maintain a distance of 1.5m - 2.0m from the lens for accurate scale mapping.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Q&A Accordion */}
                <section>
                  <h3 className="text-xs text-cyber-lime font-mono mb-4 uppercase tracking-wider">02. Q&A Protocol</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                        <button
                          onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                          className="w-full p-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-medium text-white">{faq.q}</span>
                          <span className="text-soft-gray text-xs">{activeAccordion === idx ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {activeAccordion === idx && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-xs text-soft-gray border-t border-white/10 mt-2">
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
};
