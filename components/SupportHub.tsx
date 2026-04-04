'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur hover:bg-white/10 hover:text-[#007AFF] transition-colors"
        aria-label="Open Support Hub"
      >
        ?
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-[400px] border-l border-white/10 bg-[#050505] p-8 text-white shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-mono text-lg font-bold tracking-widest text-[#007AFF]">SUPPORT_HUB</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
              </div>

              <div className="space-y-8">
                {/* User Guide Carousel */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">How to Fit</h3>
                  <div className="flex gap-2 overflow-x-auto pb-4 snap-x">
                    <div className="min-w-[200px] snap-center rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-2xl mb-2 block">📸</span>
                      <p className="text-sm font-bold">1. Front Pose</p>
                      <p className="text-xs text-white/50 mt-1">Stand straight, arms down.</p>
                    </div>
                    <div className="min-w-[200px] snap-center rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-2xl mb-2 block">👕</span>
                      <p className="text-sm font-bold">2. Clear Garment</p>
                      <p className="text-xs text-white/50 mt-1">Use flat-lay or model photos.</p>
                    </div>
                    <div className="min-w-[200px] snap-center rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-2xl mb-2 block">⚡</span>
                      <p className="text-sm font-bold">3. Generate</p>
                      <p className="text-xs text-white/50 mt-1">Wait ~10s for the AI magic.</p>
                    </div>
                  </div>
                </section>

                {/* Caution */}
                <section className="space-y-4 rounded-xl border border-[#007AFF]/30 bg-[#007AFF]/5 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#007AFF]">Critical Requirements</h3>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex items-center gap-3">
                      <span className="text-xl">⚠️</span> Good, even lighting (no harsh shadows)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-xl">📏</span> Camera distance: 1m - 1.5m
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-xl">🧘</span> Neutral posture required
                    </li>
                  </ul>
                </section>

                {/* Q&A Accordion */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">F.A.Q.</h3>
                  <div className="space-y-2">
                    {[
                      { q: 'Is my data saved?', a: 'No, images are processed securely and deleted after use.' },
                      { q: 'Why is it taking long?', a: 'High-fidelity AI synthesis can take up to 15 seconds.' }
                    ].map((faq, i) => (
                      <div key={i} className="border-b border-white/10 pb-2">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="flex w-full items-center justify-between py-2 text-left text-sm font-medium hover:text-[#007AFF]"
                        >
                          {faq.q}
                          <span>{openFaq === i ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden text-xs text-white/60"
                            >
                              <p className="pt-2 pb-1">{faq.a}</p>
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
