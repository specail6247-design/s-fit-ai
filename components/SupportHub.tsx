'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');
  const [currentStep, setCurrentStep] = useState(0);

  const guideSteps = [
    {
      title: 'Lighting is Key',
      desc: 'Ensure even, natural lighting. Avoid harsh shadows across your face and body.',
      icon: '☀️',
    },
    {
      title: 'Camera Distance',
      desc: 'Stand 2-3 meters away. The camera should capture you from head to toe.',
      icon: '📸',
    },
    {
      title: 'Form-Fitting Clothes',
      desc: 'Wear tight clothes for accurate body mesh generation.',
      icon: '👕',
    },
    {
      title: 'Clear Background',
      desc: 'A solid, contrasting background helps the AI isolate your silhouette.',
      icon: '🖼️',
    },
  ];

  const faqs = [
    {
      q: 'How accurate is the sizing?',
      a: 'Our AI analyzes your body proportions to recommend the best size with 95% accuracy.',
    },
    {
      q: 'Is my data secure?',
      a: 'All photos are processed securely and deleted from our servers immediately after try-on.',
    },
    {
      q: 'Why did the try-on fail?',
      a: 'Most failures are due to poor lighting or cluttered backgrounds. Please check our guide.',
    },
  ];

  return (
    <>
      {/* Hidden until needed: Discreet Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/50 backdrop-blur-md border border-white/10 text-white/50 hover:text-white p-3 rounded-full hover:bg-black/80 transition-all shadow-lg group"
        aria-label="Help & Support"
      >
        <span className="text-xl leading-none block group-hover:scale-110 transition-transform">?</span>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-[#2d2d2d] z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#2d2d2d] flex justify-between items-center bg-[#111]">
                <div>
                  <h2 className="text-xl font-serif text-white tracking-wide">Support Hub</h2>
                  <p className="text-[10px] text-soft-gray uppercase tracking-widest mt-1">Trust & Growth</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-soft-gray hover:text-[#ecab13] transition-colors p-2"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#2d2d2d]">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs uppercase tracking-widest transition-colors ${
                    activeTab === 'guide'
                      ? 'text-[#ecab13] border-b-2 border-[#ecab13] bg-[#ecab13]/5'
                      : 'text-soft-gray hover:text-white'
                  }`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 py-4 text-xs uppercase tracking-widest transition-colors ${
                    activeTab === 'qa'
                      ? 'text-[#ecab13] border-b-2 border-[#ecab13] bg-[#ecab13]/5'
                      : 'text-soft-gray hover:text-white'
                  }`}
                >
                  Q&A
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    {/* Carousel */}
                    <div className="bg-[#111] border border-[#2d2d2d] rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#ecab13] text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        Guide
                      </div>

                      <div className="text-4xl mb-4">{guideSteps[currentStep].icon}</div>
                      <h3 className="text-lg font-serif text-white mb-2">{guideSteps[currentStep].title}</h3>
                      <p className="text-sm text-soft-gray leading-relaxed h-16">
                        {guideSteps[currentStep].desc}
                      </p>

                      <div className="flex justify-between items-center mt-6">
                        <div className="flex gap-2">
                          {guideSteps.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentStep(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                currentStep === idx ? 'bg-[#ecab13] w-4' : 'bg-[#2d2d2d] hover:bg-gray-500'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                            disabled={currentStep === 0}
                            className="p-2 border border-[#2d2d2d] rounded hover:bg-[#2d2d2d] disabled:opacity-30 transition-colors"
                          >
                            ←
                          </button>
                          <button
                            onClick={() => setCurrentStep((prev) => Math.min(guideSteps.length - 1, prev + 1))}
                            disabled={currentStep === guideSteps.length - 1}
                            className="p-2 border border-[#2d2d2d] rounded hover:bg-[#2d2d2d] disabled:opacity-30 transition-colors"
                          >
                            →
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Caution Warnings */}
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-[#ecab13] mb-4 flex items-center gap-2">
                        <span>⚠️</span> Critical Requirements
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-lg flex items-start gap-3">
                          <span className="text-red-500 mt-0.5">🚫</span>
                          <div>
                            <p className="text-sm text-red-200 font-medium">No Backlighting</p>
                            <p className="text-xs text-red-400/80 mt-1">Windows or bright lights behind you will break the AI analysis.</p>
                          </div>
                        </div>
                        <div className="bg-orange-950/20 border border-orange-900/30 p-4 rounded-lg flex items-start gap-3">
                          <span className="text-orange-500 mt-0.5">📏</span>
                          <div>
                            <p className="text-sm text-orange-200 font-medium">Keep Your Distance</p>
                            <p className="text-xs text-orange-400/80 mt-1">Selfies that cut off your shoulders cannot generate accurate fits.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group bg-[#111] border border-[#2d2d2d] rounded-lg [&_summary::-webkit-details-marker]:hidden"
                      >
                        <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium text-white">
                          {faq.q}
                          <span className="transition duration-300 group-open:-rotate-180 text-soft-gray">
                            ▼
                          </span>
                        </summary>
                        <div className="px-4 pb-4 text-sm text-soft-gray leading-relaxed border-t border-[#2d2d2d] pt-4 mt-2">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Links (Privacy Policy, ToS, etc) */}
              <div className="p-6 border-t border-[#2d2d2d] bg-[#0a0a0a]">
                <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest text-soft-gray">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Report Issue</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
