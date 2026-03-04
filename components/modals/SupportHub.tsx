'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportOpen, setSupportOpen } = useStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'How do I get the best fit?', a: 'Ensure you are standing in a well-lit room, facing the camera directly. Wear form-fitting clothes for accurate body mapping.' },
    { q: 'Is my photo saved?', a: 'We value your privacy. Your photos are processed securely and deleted immediately after the fitting session unless you explicitly choose to save them.' },
    { q: 'What lighting is required?', a: 'Natural daylight is best. Avoid strong backlighting or harsh shadows across your body.' },
    { q: 'Can I use full body photos?', a: 'Yes, full body photos work best. Make sure your head to toe is visible in the frame.' }
  ];

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <div className="fixed inset-0 z-[90] flex justify-end bg-void-black/80 backdrop-blur-sm transition-opacity">
          {/* Backdrop Click */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSupportOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md h-full bg-void-black border-l border-white/10 p-8 overflow-y-auto relative z-[91] shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white" style={{ fontFamily: 'var(--font-cinzel), serif' }}>Support Hub</h2>
              <button
                onClick={() => setSupportOpen(false)}
                className="text-soft-gray hover:text-white transition-colors"
                aria-label="Close Support"
              >
                ✕
              </button>
            </div>

            {/* How to Fit Section */}
            <section className="mb-10">
              <h3 className="text-xs uppercase text-soft-gray mb-4 tracking-widest font-bold">How to Fit</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  { step: '01', title: 'Lighting', desc: 'Face a window or bright light. Avoid backlighting.' },
                  { step: '02', title: 'Pose', desc: 'Stand straight, arms slightly away from body.' },
                  { step: '03', title: 'Distance', desc: 'Camera should be 3-5 feet away, capturing full body.' }
                ].map((item, i) => (
                  <div key={i} className="min-w-[140px] bg-white/5 border border-white/10 p-4 rounded-lg flex-shrink-0">
                    <span className="text-cyber-lime font-mono text-xs block mb-2">{item.step}</span>
                    <h4 className="text-white text-sm font-bold mb-1">{item.title}</h4>
                    <p className="text-[10px] text-soft-gray leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Caution Banner */}
            <section className="mb-10 bg-cyber-lime/10 border border-cyber-lime/30 rounded-lg p-4 flex items-start gap-4">
              <span className="text-cyber-lime text-xl" role="img" aria-label="Caution">⚠️</span>
              <div>
                <h4 className="text-cyber-lime text-xs font-bold uppercase mb-1">Quality Warning</h4>
                <p className="text-[11px] text-white/80">Poor lighting or loose clothing will significantly reduce the accuracy of the AI fit. Follow the guide above for Masterpiece results.</p>
              </div>
            </section>

            {/* FAQ Accordion */}
            <section className="mb-10 flex-1">
              <h3 className="text-xs uppercase text-soft-gray mb-4 tracking-widest font-bold">Frequently Asked Questions</h3>
              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-white/10 rounded-lg overflow-hidden transition-colors hover:border-white/20">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full p-4 flex justify-between items-center text-left bg-white/5"
                    >
                      <span className="text-xs font-bold text-white">{faq.q}</span>
                      <span className="text-soft-gray text-xs">{activeFaq === idx ? '−' : '+'}</span>
                    </button>
                    {activeFaq === idx && (
                      <div className="p-4 pt-2 bg-white/5 text-[11px] text-soft-gray leading-relaxed border-t border-white/10">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Footer / Report / Data Safety */}
            <div className="mt-auto pt-8 border-t border-white/10">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-[10px] text-soft-gray uppercase tracking-wider">
                  <span role="img" aria-label="Lock">🔒</span> Data Safety Badge
                </div>
                <button className="text-[10px] text-white border-b border-white/30 hover:border-white pb-0.5 transition-all uppercase tracking-wider">
                  Report Issue
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}