'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHubDrawer({ isOpen, onClose }: SupportHubDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: "Why is the 3D generation failing?", a: "Ensure your full body is visible and the background is free of major clutter." },
    { q: "Can I use side-profile photos?", a: "Currently, front-facing poses yield the highest quality results." },
    { q: "How long does generation take?", a: "Typically 5-10 seconds depending on server load." }
  ];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-sm h-full bg-[#111] border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-widest uppercase text-white">Support Hub</h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white p-2"
                aria-label="Close drawer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-10">

              {/* How to Fit Carousel */}
              <section className="space-y-4">
                <h3 className="text-[#007AFF] text-xs font-mono font-bold uppercase tracking-widest">01. How to Fit</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
                  {[
                    { title: "Lighting", desc: "Use bright, even lighting.", icon: "💡" },
                    { title: "Pose", desc: "Stand straight, arms slightly apart.", icon: "🧍" },
                    { title: "Background", desc: "Use a clean, contrasting backdrop.", icon: "🖼️" }
                  ].map((step, i) => (
                    <div key={i} className="min-w-[200px] snap-center bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="text-3xl mb-2">{step.icon}</div>
                      <div className="font-bold text-sm text-white mb-1">{step.title}</div>
                      <div className="text-xs text-white/50">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Caution Section */}
              <section className="space-y-4">
                <h3 className="text-[#FF3B30] text-xs font-mono font-bold uppercase tracking-widest">02. Caution</h3>
                <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">⚠️</span>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">Avoid Heavy Shadows</div>
                      <div className="text-xs text-white/60">Harsh shadows on the face or body can distort the AI&apos;s shape detection.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📷</span>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">Camera Distance</div>
                      <div className="text-xs text-white/60">Position the camera at waist height, roughly 6-8 feet away for optimal framing.</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Accordion */}
              <section className="space-y-4">
                <h3 className="text-white/80 text-xs font-mono font-bold uppercase tracking-widest">03. Q&A</h3>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full text-left p-4 bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center"
                      >
                        <span className="text-sm text-white font-medium">{faq.q}</span>
                        <span className="text-white/50">{activeFaq === i ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-white/60 bg-white/5">
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
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
