'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function SupportHub() {
  const isSupportOpen = useStore((state) => state.isSupportOpen);
  const setSupportOpen = useStore((state) => state.setSupportOpen);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!isSupportOpen) return null;

  const faqs = [
    {
      q: 'Why does my try-on look distorted?',
      a: 'Ensure your uploaded photo has bright, even lighting and you are facing the camera directly. Avoid baggy clothing in your base photo.'
    },
    {
      q: 'What types of garments work best?',
      a: 'Front-facing, flat-lay or ghost-mannequin images with minimal background interference yield the most accurate results.'
    },
    {
      q: 'Is my data safe?',
      a: 'Absolutely. We process images temporarily for the AI model and do not store your personal photos permanently.'
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={() => setSupportOpen(false)}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-void-black border-l border-white/10 shadow-2xl p-6 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-10 mt-4 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold tracking-[0.2em] uppercase text-pure-white" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              Support Hub
            </h2>
            <button
              onClick={() => setSupportOpen(false)}
              className="text-soft-gray hover:text-white transition-colors p-2"
              aria-label="Close Support Hub"
            >
              ✕
            </button>
          </div>

          {/* User Guide Carousel (Static for now, but implies slides) */}
          <div className="mb-10">
            <h3 className="text-xs tracking-widest uppercase text-soft-gray mb-4">How to Fit</h3>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
              <div className="min-w-[80%] snap-center shrink-0">
                <div className="h-32 bg-white/10 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-4xl" role="img" aria-label="Camera setup">📸</span>
                </div>
                <p className="text-[10px] text-pure-white text-center uppercase tracking-widest">1. Clear Frontal Photo</p>
              </div>
              <div className="min-w-[80%] snap-center shrink-0">
                <div className="h-32 bg-white/10 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-4xl" role="img" aria-label="Garment setup">👕</span>
                </div>
                <p className="text-[10px] text-pure-white text-center uppercase tracking-widest">2. High-Res Garment</p>
              </div>
              <div className="min-w-[80%] snap-center shrink-0">
                <div className="h-32 bg-white/10 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-4xl" role="img" aria-label="Magic results">✨</span>
                </div>
                <p className="text-[10px] text-pure-white text-center uppercase tracking-widest">3. Masterpiece Fit</p>
              </div>
            </div>
          </div>

          {/* Caution Section */}
          <div className="mb-10">
            <h3 className="text-xs tracking-widest uppercase text-soft-gray mb-4">Critical Lighting & Distance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-[#FF3366]/30 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2">
                <span className="text-2xl" role="img" aria-label="Warning Light">💡</span>
                <span className="text-[10px] tracking-widest text-[#FF3366] uppercase">Avoid Backlight</span>
              </div>
              <div className="bg-white/5 border border-[#FF3366]/30 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2">
                <span className="text-2xl" role="img" aria-label="Warning Distance">📏</span>
                <span className="text-[10px] tracking-widest text-[#FF3366] uppercase">2-3m Distance</span>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="mb-10">
            <h3 className="text-xs tracking-widest uppercase text-soft-gray mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                  <button
                    className="w-full text-left p-4 text-xs tracking-widest flex justify-between items-center text-pure-white hover:bg-white/5 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    aria-expanded={activeFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <span className="text-soft-gray">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="p-4 pt-0 text-[10px] text-soft-gray leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Bug Report & Badge */}
          <div className="mt-auto space-y-4">
            <button className="w-full py-3 border border-white/20 hover:bg-white/10 text-xs tracking-[0.2em] uppercase rounded-none transition-colors">
              Report an Issue
            </button>
            <div className="flex items-center justify-center gap-2 text-soft-gray opacity-50">
              <span className="text-xs" role="img" aria-label="Lock">🔒</span>
              <span className="text-[10px] tracking-widest uppercase">Data Safety Verified</span>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
