import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
  },
  exit: { x: '100%', transition: { duration: 0.2 } }
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [guideStep, setGuideStep] = useState(0);

  const guides = [
    { title: "01. Pose", desc: "Stand straight, arms slightly away from body." },
    { title: "02. Clothing", desc: "Wear form-fitting clothes for best results." },
    { title: "03. Angle", desc: "Camera should be at chest level, straight on." }
  ];

  const faqs = [
    { q: "How accurate is the sizing?", a: "Our AI provides highly accurate sizing based on standard measurements, though brand-specific fits may vary." },
    { q: "What about lighting?", a: "Ensure you are in a well-lit room, avoiding harsh shadows across your body." },
    { q: "Is my data safe?", a: "Yes, we do not store your images after processing." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex justify-end">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md h-full bg-[#0A0A0A] border-l border-[#C9B037]/20 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] overflow-y-auto"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-10 border-b border-[#C9B037]/20 pb-4">
                <h2 className="text-[#C9B037] font-[family-name:var(--font-display)] text-2xl font-bold italic">
                  Support Hub
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              {/* User Guide Carousel */}
              <section className="mb-10">
                <h3 className="text-sm text-white font-bold tracking-widest uppercase mb-4">How to Fit</h3>
                <div className="bg-[#111] border border-white/10 p-5 rounded-xl">
                  <div className="text-[#CCFF00] font-mono text-xs mb-2">{guides[guideStep].title}</div>
                  <p className="text-gray-300 text-sm mb-4 min-h-[40px]">{guides[guideStep].desc}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setGuideStep(prev => Math.max(0, prev - 1))}
                      disabled={guideStep === 0}
                      className="text-xs text-gray-500 disabled:opacity-30 hover:text-white"
                    >
                      PREV
                    </button>
                    <div className="flex gap-1">
                      {guides.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full ${i === guideStep ? 'w-4 bg-[#CCFF00]' : 'w-1 bg-white/20'}`} />
                      ))}
                    </div>
                    <button
                      onClick={() => setGuideStep(prev => Math.min(guides.length - 1, prev + 1))}
                      disabled={guideStep === guides.length - 1}
                      className="text-xs text-gray-500 disabled:opacity-30 hover:text-white"
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              </section>

              {/* Cautions */}
              <section className="mb-10">
                <h3 className="text-sm text-white font-bold tracking-widest uppercase mb-4 text-red-400 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  Caution
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                    <span className="text-xl">📸</span>
                    <p className="text-xs text-gray-400 mt-1">Camera must be at least 2 meters away for full body mapping.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                    <span className="text-xl">💡</span>
                    <p className="text-xs text-gray-400 mt-1">Avoid heavy backlighting or extremely dark environments.</p>
                  </div>
                </div>
              </section>

              {/* Q&A Accordion */}
              <section>
                <h3 className="text-sm text-white font-bold tracking-widest uppercase mb-4">Q&A</h3>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-[#111]">
                      <button
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm text-gray-200">{faq.q}</span>
                        <span className="text-[#C9B037]">{activeFaq === i ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 pt-0 text-xs text-gray-400 border-t border-white/5">{faq.a}</p>
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
    </AnimatePresence>
  );
}
