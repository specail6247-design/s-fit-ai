'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const guideSteps = [
    {
      title: 'Step 01. Prepare Space',
      desc: 'Ensure your room is well-lit. Avoid strong backlighting that puts you in silhouette.',
      icon: '💡',
    },
    {
      title: 'Step 02. Camera Distance',
      desc: 'Stand approximately 2 meters (6.5 ft) away from the camera. Make sure your full body is visible.',
      icon: '📸',
    },
    {
      title: 'Step 03. Body Pose',
      desc: 'Stand naturally with your arms slightly away from your body. Avoid crossing your arms or legs.',
      icon: '🧍',
    },
    {
      title: 'Step 04. Clothing',
      desc: 'Wear form-fitting clothing for the most accurate 3D body estimation and fitting results.',
      icon: '👕',
    },
  ];

  const faqs = [
    {
      question: 'How accurate is the 3D fitting?',
      answer: 'Our AI model provides millimeter-accurate body estimation, ensuring the virtual garment matches your actual dimensions with ~98% accuracy when guidelines are followed.',
    },
    {
      question: 'Is my photo data secure?',
      answer: 'Yes. All processing is done securely, and your photos are automatically deleted from our servers immediately after the fitting process is complete.',
    },
    {
      question: 'Can I try on my own clothes?',
      answer: 'Currently, the system is designed to work with our curated catalog and approved brand partners to ensure the highest fidelity 3D rendering.',
    },
    {
      question: 'Why does it say my lighting is poor?',
      answer: 'The AI needs clear visibility of your body contours. Shadows or bright backlighting can confuse the sensors. Try facing a window or turning on overhead lights.',
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-light font-[family-name:var(--font-geist-sans)] tracking-widest text-[#C9B037] uppercase">
                Support Hub
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-6 pt-4">
              <button
                onClick={() => setActiveTab('guide')}
                className={`pb-4 px-4 text-xs tracking-widest uppercase transition-colors relative ${
                  activeTab === 'guide' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                How to Fit
                {activeTab === 'guide' && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9B037]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`pb-4 px-4 text-xs tracking-widest uppercase transition-colors relative ${
                  activeTab === 'faq' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Q&A
                {activeTab === 'faq' && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9B037]" />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'guide' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Warning Box */}
                  <div className="bg-[#C9B037]/10 border border-[#C9B037]/30 rounded-xl p-4 flex items-start gap-4">
                    <span className="text-2xl mt-1">⚠️</span>
                    <div>
                      <h4 className="text-[#C9B037] text-sm font-bold uppercase tracking-wider mb-1">Important Notice</h4>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        For the best results, ensure good lighting and clear visibility of your full body from head to toe. Do not stand too close to the camera.
                      </p>
                    </div>
                  </div>

                  {/* Carousel */}
                  <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-black/40 aspect-[4/3] flex flex-col">
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={guideStep}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center"
                        >
                          <span className="text-6xl mb-6 block">{guideSteps[guideStep].icon}</span>
                          <h3 className="text-lg text-white font-bold mb-2 tracking-wide">
                            {guideSteps[guideStep].title}
                          </h3>
                          <p className="text-gray-400 text-sm max-w-[250px] leading-relaxed">
                            {guideSteps[guideStep].desc}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="h-16 border-t border-white/10 flex items-center justify-between px-6 bg-black/60">
                      <button
                        onClick={() => setGuideStep((prev) => Math.max(0, prev - 1))}
                        disabled={guideStep === 0}
                        className="text-xs uppercase tracking-widest text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                      >
                        Prev
                      </button>
                      <div className="flex gap-2">
                        {guideSteps.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i === guideStep ? 'bg-[#C9B037]' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setGuideStep((prev) => Math.min(guideSteps.length - 1, prev + 1))}
                        disabled={guideStep === guideSteps.length - 1}
                        className="text-xs uppercase tracking-widest text-[#C9B037] hover:brightness-125 disabled:opacity-30 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'faq' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Frequently Asked Questions</p>
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm text-gray-200 font-medium">{faq.question}</span>
                        <span className={`text-[#C9B037] transition-transform ${openFaqIndex === idx ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 text-center">
              <p className="text-xs text-gray-600">Still need help?</p>
              <a href="mailto:support@s-fit.ai" className="text-sm text-[#C9B037] hover:underline mt-1 inline-block">
                Contact Concierge
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
