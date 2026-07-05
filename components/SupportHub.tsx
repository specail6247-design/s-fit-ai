'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const guideSteps = [
    {
      title: 'Lighting is Key',
      description: 'Ensure you are in a well-lit room. Avoid harsh shadows across your body.',
      icon: 'lightbulb'
    },
    {
      title: 'Camera Distance',
      description: 'Stand 4-6 feet away from your device so your full body is visible.',
      icon: 'straighten'
    },
    {
      title: 'Pose Naturally',
      description: 'Stand straight with arms slightly away from your sides. Relax your shoulders.',
      icon: 'accessibility_new'
    }
  ];

  const faqs = [
    {
      q: 'How accurate is the sizing?',
      a: 'Our AI analyzes over 30 measurement points to recommend sizes with 95% accuracy compared to brand charts.'
    },
    {
      q: 'Is my photo saved?',
      a: 'No. Your privacy is paramount. Photos are processed instantly and deleted immediately from our servers.'
    },
    {
      q: 'Why did the try-on fail?',
      a: 'Usually due to poor lighting, loose clothing obscuring your shape, or standing too close/far from the camera.'
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-[200px] bg-white/10 hover:bg-[#ecab13] text-white hover:text-black transition-all border border-white/20 hover:border-[#ecab13] backdrop-blur-md px-3 py-4 rounded-l-xl z-40 group flex flex-col items-center gap-2"
      >
        <span className="material-symbols-outlined text-lg">support_agent</span>
        <span className="text-[10px] uppercase tracking-widest writing-vertical-rl rotate-180">Support</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-xl font-serif text-white tracking-wide">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors p-2"
                >
                  <span className="material-symbols-outlined font-light">close</span>
                </button>
              </div>

              {/* Navigation */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-[#ecab13] border-b-2 border-[#ecab13]' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Guide
                </button>
                <button
                  onClick={() => setActiveTab('caution')}
                  className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors ${activeTab === 'caution' ? 'text-[#ecab13] border-b-2 border-[#ecab13]' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Caution
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors ${activeTab === 'faq' ? 'text-[#ecab13] border-b-2 border-[#ecab13]' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Q&A
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">

                {/* Guide Tab */}
                {activeTab === 'guide' && (
                  <div className="flex flex-col h-full">
                    <h3 className="text-sm text-[#ecab13] uppercase tracking-widest mb-8">How to Fit</h3>

                    <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={guideStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
                        >
                          <div className="w-20 h-20 rounded-full bg-[#ecab13]/10 border border-[#ecab13]/30 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl text-[#ecab13]">
                              {guideSteps[guideStep].icon}
                            </span>
                          </div>
                          <h4 className="text-lg text-white font-medium mb-3">{guideSteps[guideStep].title}</h4>
                          <p className="text-sm text-zinc-400 leading-relaxed max-w-[250px]">
                            {guideSteps[guideStep].description}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-8">
                      <button
                        onClick={() => setGuideStep(Math.max(0, guideStep - 1))}
                        disabled={guideStep === 0}
                        className="p-2 text-white disabled:opacity-30 transition-opacity"
                      >
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                      <div className="flex gap-2">
                        {guideSteps.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${i === guideStep ? 'bg-[#ecab13]' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setGuideStep(Math.min(guideSteps.length - 1, guideStep + 1))}
                        disabled={guideStep === guideSteps.length - 1}
                        className="p-2 text-white disabled:opacity-30 transition-opacity"
                      >
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Caution Tab */}
                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <h3 className="text-sm text-red-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">warning</span>
                      Critical Warnings
                    </h3>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 flex items-start gap-4">
                      <div className="text-2xl">📸</div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Mirror Selfies Fail</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Do not use mirror selfies. The phone blocks your torso and distorts proportions, causing the AI analysis to fail completely.
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5 flex items-start gap-4">
                      <div className="text-2xl">🧥</div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Avoid Bulky Clothes</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Wear form-fitting clothing (like activewear) for the photo. Heavy jackets or baggy sweatpants will result in inaccurate size recommendations.
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 flex items-start gap-4">
                      <div className="text-2xl">👤</div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Busy Backgrounds</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Stand against a plain, contrasting background. If your clothes blend into the wall behind you, the body mapping will be flawed.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    <h3 className="text-sm text-[#ecab13] uppercase tracking-widest mb-6">Frequently Asked</h3>

                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                        >
                          <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                          <span className={`material-symbols-outlined text-zinc-500 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}>
                            expand_more
                          </span>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-sm text-zinc-400 leading-relaxed border-t border-white/5">
                                {faq.a}
                              </div>
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