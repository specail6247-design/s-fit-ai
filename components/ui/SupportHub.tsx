import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const guideSteps = [
    { title: "Good Lighting", desc: "Ensure your room is well-lit. Natural light works best.", icon: "☀️" },
    { title: "Clear Background", desc: "Stand in front of a solid, contrasting wall.", icon: "🖼️" },
    { title: "Full Body Frame", desc: "Keep your entire body in the camera frame.", icon: "📸" }
  ];

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI uses depth sensing to provide a 95% accurate physical representation." },
    { q: "Can I use my own photos?", a: "Yes, you can upload clear, front-facing photos in the Identification step." },
    { q: "What devices are supported?", a: "Any modern device with a camera and web browser." }
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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-8">
              <header className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter italic text-white">
                    SUPPORT <span className="text-[#007AFF]">HUB</span>
                  </h2>
                  <p className="text-xs text-gray-400 tracking-[0.2em] uppercase mt-1">
                    Help & Documentation
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close Support Hub"
                >
                  ✕
                </button>
              </header>

              <div className="space-y-10">
                {/* 1. User Guide Carousel */}
                <section>
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-wider">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{guideSteps[currentStep].icon}</div>
                      <h4 className="text-lg font-bold text-white mb-2">{guideSteps[currentStep].title}</h4>
                      <p className="text-sm text-gray-400 h-10">{guideSteps[currentStep].desc}</p>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button
                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                        disabled={currentStep === 0}
                        className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                      >
                        Prev
                      </button>
                      <div className="flex gap-2">
                        {guideSteps.map((_, i) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-4 bg-[#007AFF]' : 'w-1.5 bg-white/20'}`} />
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentStep(prev => Math.min(guideSteps.length - 1, prev + 1))}
                        disabled={currentStep === guideSteps.length - 1}
                        className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </section>

                {/* 2. Cautions */}
                <section>
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-wider">Crucial Cautions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                      <span className="text-xl mt-0.5">⚠️</span>
                      <div>
                        <h4 className="text-sm font-bold text-orange-400 mb-1">Avoid Backlighting</h4>
                        <p className="text-xs text-orange-200/70">Ensure the primary light source is in front of you, not behind.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <span className="text-xl mt-0.5">💡</span>
                      <div>
                        <h4 className="text-sm font-bold text-blue-400 mb-1">Optimal Distance</h4>
                        <p className="text-xs text-blue-200/70">Stand exactly 6 feet (2 meters) away from the camera lens.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. FAQ Accordion */}
                <section>
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-wider">Q&A Archive</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                          className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-200">{faq.q}</span>
                          <span className="text-gray-500 transform transition-transform duration-200" style={{ transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0)' }}>
                            ▼
                          </span>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 text-xs text-gray-400"
                            >
                              <div className="pt-2 border-t border-white/10">
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
