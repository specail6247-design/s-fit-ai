'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const slideVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
  },
  exit: {
    x: '100%',
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
  }
};

const faqs = [
  {
    q: 'How does the fitting algorithm work?',
    a: 'We use a proprietary blend of depth mapping and AI segmentation to drape 3D garments onto your 2D photo with extreme precision.'
  },
  {
    q: 'Why did my try-on fail?',
    a: 'Usually lighting or loose clothing. Please ensure you are in a well-lit room wearing form-fitting clothes.'
  },
  {
    q: 'Can I try on my own clothes?',
    a: 'Yes, if you have a clear, front-facing, well-lit photo of the garment on a flat surface or a ghost mannequin.'
  }
];

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [carouselStep, setCarouselStep] = useState(0);

  const carouselSteps = [
    { title: 'Step 1: Lighting', desc: 'Find a well-lit room. Natural light is best.' },
    { title: 'Step 2: Attire', desc: 'Wear form-fitting clothes for accurate body mapping.' },
    { title: 'Step 3: Pose', desc: 'Stand straight, arms slightly away from your body.' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div key="supporthub-container" className="fixed inset-0 z-40">
          <motion.div
            className="fixed inset-0 bg-void-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col overflow-y-auto"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-10">
              <h2 className="text-xl font-bold font-display uppercase tracking-widest">Support Hub</h2>
              <button onClick={onClose} className="text-soft-gray hover:text-white font-mono text-sm">
                [ CLOSE ]
              </button>
            </div>

            <div className="p-6 space-y-12">

              {/* Caution Section */}
              <section className="bg-red-900/20 border border-red-500/30 rounded-xl p-5">
                <h3 className="text-red-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-sm">
                  <span>⚠️</span> Important Warnings
                </h3>
                <ul className="space-y-3 text-sm text-red-200/80 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">📸</span> Distance: Stand 2-3 meters from camera.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">💡</span> Lighting: Avoid harsh backlighting or deep shadows.
                  </li>
                </ul>
              </section>

              {/* User Guide Carousel */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-luxury-gold">How to Fit</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative min-h-[160px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="text-center"
                    >
                      <h4 className="font-bold text-white mb-2">{carouselSteps[carouselStep].title}</h4>
                      <p className="text-sm text-soft-gray">{carouselSteps[carouselStep].desc}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {carouselSteps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselStep(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === carouselStep ? 'bg-luxury-gold' : 'bg-white/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* FAQ Accordion */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-luxury-gold">Q&A</h3>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                      <button
                        className="w-full p-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      >
                        <span className="text-sm font-bold text-white">{faq.q}</span>
                        <span className="text-luxury-gold font-mono">{activeFaq === idx ? '-' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-sm text-soft-gray font-mono border-t border-white/5 mt-2">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
