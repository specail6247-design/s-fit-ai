'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  {
    question: 'How do I get the best fit result?',
    answer: 'Ensure you are standing in a well-lit area with a clean background. Wear form-fitting clothes so our AI can accurately measure your body shape.',
  },
  {
    question: 'What kind of garment photos work best?',
    answer: 'Use clear, front-facing photos of the garment laid flat or on a hanger. Avoid heavily wrinkled or styled photos for best results.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! We prioritize your privacy. Photos are processed securely and are never shared with third parties.',
  },
];

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="support-backdrop"
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          transition={{ duration: 0.3 }}
        />
      )}
      {isOpen && (
        <motion.div
          key="support-drawer"
          className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-[101] flex flex-col shadow-2xl overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
            <div className="p-8 flex-1 flex flex-col">
              <header className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-black text-white italic tracking-tighter">
                    SUPPORT HUB
                  </h2>
                  <p className="text-xs text-[#007AFF] uppercase tracking-widest mt-1">
                    Guidance & FAQ
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close Support Hub"
                >
                  ✕
                </button>
              </header>

              <div className="space-y-10">
                {/* Visual User Guide Carousel (Static for now) */}
                <section>
                  <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#007AFF]/20 blur-3xl rounded-full" />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-gray-400">Step 1/3</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-1 bg-[#007AFF] rounded-full" />
                        <div className="w-2 h-1 bg-white/20 rounded-full" />
                        <div className="w-2 h-1 bg-white/20 rounded-full" />
                      </div>
                    </div>
                    <div className="aspect-video bg-black/40 rounded-xl mb-4 flex items-center justify-center border border-white/5">
                      <span className="text-4xl">📸</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">Upload Clear Photos</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Upload a front-facing photo of yourself and the garment you wish to try on.
                    </p>
                  </div>
                </section>

                {/* Cautions */}
                <section>
                  <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Guidelines</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center text-center gap-2">
                      <span className="text-2xl text-[#007AFF]">💡</span>
                      <span className="text-xs font-bold text-white">Good Lighting</span>
                      <span className="text-[10px] text-gray-400">Avoid harsh shadows</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center text-center gap-2">
                      <span className="text-2xl text-[#007AFF]">📏</span>
                      <span className="text-xs font-bold text-white">Distance</span>
                      <span className="text-[10px] text-gray-400">Stand 1-2m away</span>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section>
                  <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">FAQ</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                          className="w-full text-left p-4 text-sm font-bold text-white flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                          {faq.question}
                          <span className="text-[#007AFF]">{activeFaq === index ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="p-4 pt-0 text-xs text-gray-400 leading-relaxed">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Report Issue Form (Placeholder) */}
                <section className="pt-6 border-t border-white/10">
                  <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Need more help?</h3>
                  <p className="text-xs text-gray-400 mb-4">Our support team is here for you.</p>
                  <button className="w-full py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-xl text-xs uppercase tracking-widest transition-colors">
                    Report an Issue
                  </button>
                </section>
              </div>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
