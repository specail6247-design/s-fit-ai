'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GUIDE_STEPS = [
  {
    title: '1. Select Garment',
    desc: 'Browse our collection and pick the piece you want to try on.',
    icon: '👕',
  },
  {
    title: '2. Upload Photo',
    desc: 'Provide a clear, full-body photo for the most accurate fit.',
    icon: '📸',
  },
  {
    title: '3. See the Result',
    desc: 'Our AI will generate a highly realistic preview of your fit.',
    icon: '✨',
  },
];

const FAQS = [
  {
    id: 'q1',
    question: 'How long does processing take?',
    answer: 'Most standard try-ons process in under 10 seconds. High-fidelity luxury models might take slightly longer.',
  },
  {
    id: 'q2',
    question: 'Is my data stored?',
    answer: 'We prioritize your privacy. Uploaded photos are only processed temporarily for the session and are not stored permanently unless you choose to save them to your vault.',
  },
  {
    id: 'q3',
    question: 'Why does the fit look slightly off?',
    answer: 'For the best results, ensure your upload is a front-facing, well-lit photo with minimal obstruction. Loose clothing in the original photo might affect AI contouring.',
  },
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#C9B037]/20 hover:border-[#C9B037]/50 hover:text-[#C9B037] transition-all shadow-lg group"
        aria-label="Open Support Hub"
      >
        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0A0A0A] border-l border-white/10 z-[101] flex flex-col shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-md z-10">
                <h2 className="text-xl font-[family-name:var(--font-display)] tracking-widest text-white uppercase">
                  Support Hub
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-10">
                {/* How to Fit (Carousel) */}
                <section>
                  <h3 className="text-xs font-mono tracking-widest text-[#C9B037] mb-4 uppercase">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative min-h-[160px] flex flex-col justify-center items-center text-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        <div className="text-4xl">{GUIDE_STEPS[currentStep].icon}</div>
                        <h4 className="font-bold text-white text-sm">{GUIDE_STEPS[currentStep].title}</h4>
                        <p className="text-xs text-white/60 leading-relaxed max-w-[200px] mx-auto">
                          {GUIDE_STEPS[currentStep].desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Carousel Controls */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {GUIDE_STEPS.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentStep(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            currentStep === idx ? 'bg-[#C9B037] w-3' : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Caution Section */}
                <section>
                  <h3 className="text-xs font-mono tracking-widest text-[#C9B037] mb-4 uppercase">Caution</h3>
                  <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-4 flex gap-3">
                    <div className="text-red-400 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-red-200">Photo Requirements</h4>
                      <ul className="text-xs text-red-300/80 space-y-1 list-disc list-inside marker:text-red-500/50">
                        <li>Ensure bright, even lighting.</li>
                        <li>Avoid heavily layered or baggy clothing.</li>
                        <li>Maintain a clear distance (approx. 2-3 meters).</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Q&A Accordion */}
                <section>
                  <h3 className="text-xs font-mono tracking-widest text-[#C9B037] mb-4 uppercase">FAQ</h3>
                  <div className="space-y-2">
                    {FAQS.map((faq) => (
                      <div key={faq.id} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleAccordion(faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
                        >
                          <span className="text-sm font-medium text-white/90">{faq.question}</span>
                          <svg
                            className={`w-4 h-4 text-white/40 transition-transform duration-300 ${
                              expandedId === faq.id ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {expandedId === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-xs text-white/60 leading-relaxed border-t border-white/5 mt-2">
                                {faq.answer}
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
          </>
        )}
      </AnimatePresence>
    </>
  );
}
