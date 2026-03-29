'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');
  const [activeStep, setActiveStep] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const guideSteps = [
    {
      title: "Step 01",
      subtitle: "Lighting is Everything",
      description: "Ensure you are in a well-lit room. Natural, indirect light works best. Avoid harsh shadows across your face and body.",
      icon: "lightbulb"
    },
    {
      title: "Step 02",
      subtitle: "Full Body View",
      description: "Stand straight with your arms slightly away from your sides. Make sure your entire body from head to toe is visible in the frame.",
      icon: "accessibility_new"
    },
    {
      title: "Step 03",
      subtitle: "Fitted Clothing",
      description: "Wear form-fitting clothes for the best results. Baggy clothes may confuse the AI and lead to inaccurate measurements or fitting.",
      icon: "checkroom"
    }
  ];

  const faqs = [
    {
      question: "How accurate is the sizing?",
      answer: "Our AI model uses advanced computer vision to estimate your measurements with high accuracy when following the guide steps."
    },
    {
      question: "Is my photo stored?",
      answer: "Your privacy is our priority. Photos are processed in real-time and immediately deleted from our servers after the fitting is complete."
    },
    {
      question: "Can I try clothes from other brands?",
      answer: "Currently, we support select premium and luxury brands. We are constantly expanding our catalog."
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%-40px)] hover:translate-x-0 transition-transform duration-500 z-40 bg-black/80 backdrop-blur-md border border-white/10 rounded-l-2xl py-6 px-4 flex items-center gap-3 group"
      >
        <span className="material-symbols-outlined text-white/50 group-hover:text-[#ecab13] transition-colors">support_agent</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Support Hub</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[101] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/10 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-8 right-8 text-white/50 hover:text-[#ecab13] transition-colors"
                  aria-label="Close Support Hub"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <h2 className="text-2xl text-white font-[family-name:var(--font-display)] tracking-widest uppercase font-light">
                  Support Hub
                </h2>
                <div className="h-[1px] w-12 bg-[#ecab13]/50 mt-4" />
              </div>

              {/* Tabs */}
              <div className="flex px-8 py-4 gap-8 border-b border-white/5">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`text-[10px] uppercase tracking-widest font-mono transition-colors ${activeTab === 'guide' ? 'text-[#ecab13]' : 'text-white/40 hover:text-white/70'}`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`text-[10px] uppercase tracking-widest font-mono transition-colors ${activeTab === 'qa' ? 'text-[#ecab13]' : 'text-white/40 hover:text-white/70'}`}
                >
                  Q&A
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 relative">
                <AnimatePresence mode="wait">
                  {activeTab === 'guide' && (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      {/* Carousel */}
                      <div className="relative bg-[#111] border border-white/10 p-8 min-h-[250px] flex flex-col items-center justify-center text-center">
                        <span className="material-symbols-outlined text-4xl text-[#ecab13] mb-6">{guideSteps[activeStep].icon}</span>
                        <h3 className="font-mono text-xs text-[#ecab13] mb-2">{guideSteps[activeStep].title}</h3>
                        <h4 className="text-lg text-white font-[family-name:var(--font-display)] mb-4">{guideSteps[activeStep].subtitle}</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{guideSteps[activeStep].description}</p>

                        <div className="absolute bottom-6 flex gap-2">
                          {guideSteps.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveStep(i)}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeStep ? 'bg-[#ecab13] w-4' : 'bg-white/20 hover:bg-white/40'}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Caution */}
                      <div className="border border-red-500/20 bg-red-500/5 p-6 space-y-4">
                        <div className="flex items-center gap-3 text-red-400">
                          <span className="material-symbols-outlined">warning</span>
                          <h4 className="text-sm tracking-widest uppercase font-mono">Caution</h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex gap-3 text-sm text-white/60">
                            <span className="material-symbols-outlined text-[16px] text-red-400/70">wb_incandescent</span>
                            <span>Avoid backlighting or standing directly in front of a window.</span>
                          </li>
                          <li className="flex gap-3 text-sm text-white/60">
                            <span className="material-symbols-outlined text-[16px] text-red-400/70">photo_camera</span>
                            <span>Keep the camera at chest level, about 6-8 feet away.</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'qa' && (
                    <motion.div
                      key="qa"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/10 bg-[#111] overflow-hidden">
                          <button
                            onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                            className="w-full text-left p-6 flex justify-between items-center hover:bg-white/[0.02] transition-colors"
                          >
                            <span className="text-sm text-white/80 pr-4">{faq.question}</span>
                            <span className="material-symbols-outlined text-[#ecab13] transform transition-transform duration-300" style={{ rotate: openAccordion === i ? '180deg' : '0deg' }}>
                              keyboard_arrow_down
                            </span>
                          </button>
                          <AnimatePresence>
                            {openAccordion === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 pt-0 text-sm text-white/50 leading-relaxed border-t border-white/5">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
