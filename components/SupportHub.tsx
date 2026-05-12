"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: "Step 1: Good Lighting",
    description: "Ensure you are in a well-lit room. Natural light works best.",
    icon: "💡"
  },
  {
    title: "Step 2: Clear Background",
    description: "Stand against a plain, contrasting background.",
    icon: "🖼️"
  },
  {
    title: "Step 3: Pose Naturally",
    description: "Keep your arms slightly away from your body.",
    icon: "🧍"
  }
];

const faqs = [
  {
    question: "What is S_FIT NEO?",
    answer: "S_FIT NEO is a professional virtual fitting platform that allows you to try on clothes virtually with high accuracy."
  },
  {
    question: "What types of photos work best?",
    answer: "Clear, front-facing photos with good lighting and a plain background work best."
  },
  {
    question: "How long does a try-on take?",
    answer: "Our AI processes your try-on in seconds, usually taking under 15 seconds."
  }
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Support"
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 z-40 transition-all text-xl"
      >
        <span className="material-symbols-outlined">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-[#050505] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-wider">Support & Guides</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('caution')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest ${activeTab === 'caution' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Setup Caution
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest ${activeTab === 'faq' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  FAQ
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                      <div className="text-4xl mb-4">{steps[currentStep].icon}</div>
                      <h3 className="text-lg font-bold mb-2">{steps[currentStep].title}</h3>
                      <p className="text-sm text-gray-400">{steps[currentStep].description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                        disabled={currentStep === 0}
                        className="px-4 py-2 text-xs font-bold disabled:opacity-30"
                      >
                        PREV
                      </button>
                      <div className="flex gap-2">
                        {steps.map((_, idx) => (
                          <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentStep ? 'bg-[#007AFF]' : 'bg-white/20'}`} />
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                        disabled={currentStep === steps.length - 1}
                        className="px-4 py-2 text-xs font-bold disabled:opacity-30"
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-4">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-4 items-start">
                      <div className="text-amber-500 text-2xl">⚠️</div>
                      <div>
                        <h4 className="font-bold text-amber-500 mb-1">Avoid Backlighting</h4>
                        <p className="text-xs text-gray-400">Do not stand with a window or strong light source directly behind you. This creates a silhouette and reduces try-on quality.</p>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-4 items-start">
                      <div className="text-amber-500 text-2xl">📏</div>
                      <div>
                        <h4 className="font-bold text-amber-500 mb-1">Camera Distance</h4>
                        <p className="text-xs text-gray-400">Position the camera at least 3-4 feet away. Ensure your entire upper body or full body is visible within the frame.</p>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-4 items-start">
                      <div className="text-amber-500 text-2xl">👕</div>
                      <div>
                        <h4 className="font-bold text-amber-500 mb-1">Tight Clothing Preferred</h4>
                        <p className="text-xs text-gray-400">For the most accurate fit, wear form-fitting clothes in your source photo. Baggy clothes may distort the final result.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                          className="w-full p-4 flex justify-between items-center text-left bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <span className="font-bold text-sm">{faq.question}</span>
                          <span className="text-gray-500">{expandedFaq === idx ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 text-sm text-gray-400 bg-white/5"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
