'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-soft-gray hover:text-white uppercase tracking-widest border-b border-transparent hover:border-white transition-colors"
      >
        Support / Guide
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#050505] border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-serif italic text-white">Support Hub</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-soft-gray hover:text-white text-sm font-mono"
                  >
                    [X]
                  </button>
                </div>

                <div className="space-y-12">
                  {/* User Guide Carousel */}
                  <section>
                    <h3 className="text-xs text-soft-gray uppercase tracking-widest mb-4">How to Fit</h3>
                    <div className="flex overflow-x-auto gap-4 snap-x pb-4 scrollbar-hide">
                      {[
                        { step: '01', title: 'Upload Photo', desc: 'Front-facing, clear lighting.' },
                        { step: '02', title: 'Select Garment', desc: 'Choose from our collection.' },
                        { step: '03', title: 'Generate', desc: 'Wait for AI processing.' },
                        { step: '04', title: 'Review', desc: 'Check fit and share.' }
                      ].map((item, i) => (
                        <div key={i} className="min-w-[140px] snap-center bg-white/5 border border-white/10 p-4 shrink-0">
                          <div className="text-luxury-gold font-mono text-sm mb-2">{item.step}</div>
                          <div className="text-white text-sm font-bold mb-1">{item.title}</div>
                          <div className="text-xs text-soft-gray leading-relaxed">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Caution Section */}
                  <section>
                    <h3 className="text-xs text-soft-gray uppercase tracking-widest mb-4">Important Notice</h3>
                    <div className="bg-red-900/10 border border-red-500/20 p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 mt-0.5">⚠️</span>
                        <div>
                          <div className="text-sm text-red-200 font-bold">Lighting Warning</div>
                          <div className="text-xs text-red-200/70">Avoid heavy shadows or backlighting.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-red-400 mt-0.5">📏</span>
                        <div>
                          <div className="text-sm text-red-200 font-bold">Camera Distance</div>
                          <div className="text-xs text-red-200/70">Stand 3-5 feet away from the lens.</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Q&A Accordion */}
                  <section>
                    <h3 className="text-xs text-soft-gray uppercase tracking-widest mb-4">FAQ</h3>
                    <div className="space-y-2">
                      {[
                        { q: "How long does processing take?", a: "Typically under 10 seconds depending on server load." },
                        { q: "Is my data stored?", a: "Images are temporarily processed and deleted immediately after generation." },
                        { q: "Can I use side-profile photos?", a: "For best results, only use straight, front-facing photos." }
                      ].map((faq, i) => (
                        <details key={i} className="group bg-white/5 border border-white/10 [&_summary::-webkit-details-marker]:hidden">
                          <summary className="p-4 cursor-pointer text-sm text-white font-medium flex justify-between items-center">
                            {faq.q}
                            <span className="text-luxury-gold group-open:rotate-45 transition-transform">+</span>
                          </summary>
                          <div className="px-4 pb-4 text-xs text-soft-gray leading-relaxed">
                            {faq.a}
                          </div>
                        </details>
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
