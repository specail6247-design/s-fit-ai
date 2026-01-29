'use client';

import React, { useState } from 'react';
import { Drawer } from './ui/Drawer';
import { motion, AnimatePresence } from 'framer-motion';

const GUIDE_STEPS = [
  {
    title: 'Stand Back',
    description: 'Ensure your full body is visible in the frame for accurate sizing.',
    image: '🧍', // Using emoji for now as placeholder
  },
  {
    title: 'Good Lighting',
    description: 'Avoid strong backlighting. Natural, even light works best.',
    image: '💡',
  },
  {
    title: 'Strike a Pose',
    description: 'Stand in an A-pose (arms slightly out) for the best fit mapping.',
    image: '📸',
  },
];

const FAQS = [
  {
    question: 'Is my photo saved?',
    answer: 'No. Your photos are processed in real-time and deleted immediately after the session. We prioritize your privacy.',
  },
  {
    question: 'How accurate is the sizing?',
    answer: 'Our AI achieves 98% accuracy by analyzing your body proportions relative to the garment measurements.',
  },
  {
    question: 'Can I try on accessories?',
    answer: 'Yes! We support bags, hats, and glasses in the "Accessories" mode.',
  },
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-cyber-lime transition-all"
        aria-label="Help & Support"
      >
        ?
      </button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Support Hub">
        <div className="space-y-8">
          {/* User Guide Carousel */}
          <section>
            <h4 className="text-sm font-bold text-soft-gray uppercase tracking-wider mb-4">
              How to Fit
            </h4>
            <div className="relative bg-white/5 rounded-2xl p-6 text-center overflow-hidden min-h-[200px] flex flex-col items-center justify-center border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <div className="text-4xl mb-4">{GUIDE_STEPS[currentStep].image}</div>
                  <h5 className="text-lg font-bold text-white mb-2">
                    {GUIDE_STEPS[currentStep].title}
                  </h5>
                  <p className="text-sm text-soft-gray">
                    {GUIDE_STEPS[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex gap-2 mt-6">
                {GUIDE_STEPS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep ? 'bg-cyber-lime w-4' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Caution Section */}
          <section>
             <h4 className="text-sm font-bold text-soft-gray uppercase tracking-wider mb-4">
              Best Results
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                 <svg className="w-6 h-6 text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                 </svg>
                 <span className="text-xs text-red-200">Avoid Backlight</span>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                 <svg className="w-6 h-6 text-amber-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span className="text-xs text-amber-200">Clear Space</span>
              </div>
            </div>
          </section>

          {/* Q&A Accordion */}
           <section>
            <h4 className="text-sm font-bold text-soft-gray uppercase tracking-wider mb-4">
              FAQ
            </h4>
            <div className="space-y-2">
              {FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left text-sm font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    {faq.question}
                    <span className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0 text-xs text-soft-gray leading-relaxed">
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
      </Drawer>
    </>
  );
}
