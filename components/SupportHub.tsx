'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  { q: "What is S_FIT AI?", a: "S_FIT AI is a virtual try-on protocol that lets you visualize garments on yourself before buying." },
  { q: "How long does it take?", a: "Most processing is completed in under 10 seconds for premium members." },
  { q: "Is my data secure?", a: "Yes, photos are only used for the fitting process and are automatically deleted from our servers." }
];

const guideSteps = [
  { title: "01. Good Lighting", desc: "Ensure you are in a well-lit room. Natural light works best for accurate skin tones." },
  { title: "02. Clean Background", desc: "Use a plain, uncluttered background to help the AI isolate your silhouette." },
  { title: "03. Proper Distance", desc: "Stand about 3-5 feet away from the camera, keeping your full upper body in frame." }
];

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % guideSteps.length);
  const prevStep = () => setCurrentStep((prev) => (prev === 0 ? guideSteps.length - 1 : prev - 1));

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
            className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#050505] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Support Hub</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-12">

              {/* User Guide Carousel */}
              <section>
                <h3 className="text-xs font-bold text-[#ecab13] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ecab13] rounded-full"></span> How to Fit
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative min-h-[160px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="text-center"
                    >
                      <h4 className="text-white font-bold mb-2 text-sm">{guideSteps[currentStep].title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{guideSteps[currentStep].desc}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {guideSteps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentStep(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-[#ecab13]' : 'bg-white/20 hover:bg-white/40'}`}
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button onClick={prevStep} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white px-2 py-4">‹</button>
                  <button onClick={nextStep} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white px-2 py-4">›</button>
                </div>
              </section>

              {/* Caution Section */}
              <section>
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Caution
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-2xl">💡</span>
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Avoid Shadows</span>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-2xl">📏</span>
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Don&apos;t be too close</span>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-2xl">👥</span>
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Single Subject Only</span>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-2xl">🕶️</span>
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">No Accessories</span>
                  </div>
                </div>
              </section>

              {/* Q&A Accordion */}
              <section>
                <h3 className="text-xs font-bold text-[#007AFF] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#007AFF] rounded-full"></span> FAQ
                </h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        <span className="text-xs font-bold text-gray-200">{faq.q}</span>
                        <span className={`text-gray-500 text-xs transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-3 text-xs text-gray-400 leading-relaxed"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 text-center">
              <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">S_FIT Protocol v2.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
