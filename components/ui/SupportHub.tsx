'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [carouselStep, setCarouselStep] = useState(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const nextStep = () => {
    setCarouselStep((prev) => (prev < 2 ? prev + 1 : 0));
  };

  const prevStep = () => {
    setCarouselStep((prev) => (prev > 0 ? prev - 1 : 2));
  };

  const faqs = [
    {
      question: 'How do I get the best results?',
      answer: 'Ensure you are in a well-lit room and facing the camera directly. Avoid wearing loose clothing for the body scan.',
    },
    {
      question: 'What happens to my photos?',
      answer: 'Your photos are processed securely and are not shared with third parties. They are deleted after the fitting session is complete.',
    },
    {
      question: 'Why did the AI fitting fail?',
      answer: 'This usually happens if the camera distance is incorrect or lighting is too dark. Make sure your full body is visible.',
    },
    {
      question: 'Can I try on any brand?',
      answer: 'We support a variety of brands. Check the brand selector for availability. Premium brands require a subscription.',
    },
  ];

  const steps = [
    {
      title: '1. Prepare',
      desc: 'Wear tight-fitting clothes. Stand in a well-lit area with a plain background.',
      icon: '👕',
    },
    {
      title: '2. Position',
      desc: 'Place the camera at waist height, about 6-8 feet away. Ensure your full body is in the frame.',
      icon: '📸',
    },
    {
      title: '3. Scan',
      desc: 'Follow the on-screen prompts to capture your front and side profiles.',
      icon: '🔄',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">Support Hub</h2>
                <p className="text-xs text-soft-gray mt-1">Help & Information</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-10 flex-1">
              {/* Carousel: How to Fit */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-luxury-gold">✨</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Fit</h3>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="text-center"
                    >
                      <div className="text-4xl mb-4">{steps[carouselStep].icon}</div>
                      <h4 className="text-lg font-bold text-white mb-2">{steps[carouselStep].title}</h4>
                      <p className="text-sm text-soft-gray">{steps[carouselStep].desc}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-between mt-6">
                    <button onClick={prevStep} className="text-xs text-white/50 hover:text-white transition-colors p-2">
                      ← Prev
                    </button>
                    <div className="flex gap-1">
                      {steps.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === carouselStep ? 'bg-luxury-gold' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    <button onClick={nextStep} className="text-xs text-white/50 hover:text-white transition-colors p-2">
                      Next →
                    </button>
                  </div>
                </div>
              </section>

              {/* Warnings */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-orange-500">⚠️</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cautions</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">💡</div>
                    <p className="text-xs text-orange-200">Avoid backlighting or dark rooms.</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">📏</div>
                    <p className="text-xs text-orange-200">Keep camera 6-8 ft away at waist level.</p>
                  </div>
                </div>
              </section>

              {/* FAQ Accordion */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-cyber-lime">❓</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">FAQ</h3>
                </div>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 flex items-center justify-between text-sm text-white hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium pr-4">{faq.question}</span>
                        <span className="text-white/50 transform transition-transform duration-200" style={{ transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          ▼
                        </span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 pt-0 text-xs text-soft-gray border-t border-white/5 mt-2">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Safety Badge */}
              <section className="pt-4 border-t border-white/10">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-green-400 mt-0.5">🔒</span>
                  <div>
                    <h4 className="text-sm font-bold text-green-400 mb-1">Data Privacy</h4>
                    <p className="text-xs text-green-200/70">Photos are processed securely and not shared. We prioritize your privacy.</p>
                  </div>
                </div>
              </section>

              <section className="pt-4 pb-8 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Legal & Support</h3>
                  <button className="w-full text-left text-sm text-soft-gray hover:text-white transition-colors py-2 border-b border-white/5">Report an Issue</button>
                  <button className="w-full text-left text-sm text-soft-gray hover:text-white transition-colors py-2 border-b border-white/5">Privacy Policy</button>
                  <button className="w-full text-left text-sm text-soft-gray hover:text-white transition-colors py-2 border-b border-white/5">Terms of Service</button>
              </section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
