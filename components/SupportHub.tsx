'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: 'Upload Photo', desc: 'Select a clear, well-lit photo of yourself.', icon: '👤' },
    { title: 'Choose Garment', desc: 'Pick the item you want to try on.', icon: '👕' },
    { title: 'View Result', desc: 'Wait for the AI magic to happen.', icon: '✨' },
  ];

  const faqs = [
    { q: 'How long does it take?', a: 'Usually between 10 to 30 seconds depending on the mode.' },
    { q: 'What kind of photo works best?', a: 'A clear, full-body shot with good lighting and simple background.' },
    { q: 'Is my data private?', a: 'Yes, your photos are only processed for the fitting and not stored.' },
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#050505] border-l border-white/10 z-[100] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-serif text-[#ecab13] tracking-widest">SUPPORT HUB</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <div className="flex border-b border-white/10">
              {(['guide', 'caution', 'qa'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-[10px] font-bold font-mono tracking-widest uppercase transition-colors ${
                    activeTab === tab
                      ? 'text-[#ecab13] border-b-2 border-[#ecab13] bg-white/5'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'guide' && (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4">How to Fit</h3>
                  <div className="relative border border-white/10 rounded-xl p-6 bg-black/40 min-h-[200px] flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-4">{guideSteps[guideStep].icon}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{guideSteps[guideStep].title}</h4>
                    <p className="text-xs text-gray-400">{guideSteps[guideStep].desc}</p>

                    <div className="absolute bottom-4 flex gap-2">
                      {guideSteps.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${idx === guideStep ? 'bg-[#ecab13]' : 'bg-gray-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setGuideStep(prev => Math.max(0, prev - 1))}
                      disabled={guideStep === 0}
                      className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      &larr; PREV
                    </button>
                    <button
                      onClick={() => setGuideStep(prev => Math.min(guideSteps.length - 1, prev + 1))}
                      disabled={guideStep === guideSteps.length - 1}
                      className="px-4 py-2 text-xs font-mono text-[#ecab13] hover:text-[#d99a0e] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      NEXT &rarr;
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'caution' && (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-[#ecab13] tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span>⚠️</span> Important Guidelines
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                      <div className="text-2xl">💡</div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Lighting Matters</h4>
                        <p className="text-xs text-gray-400">Ensure even, natural lighting. Avoid harsh shadows or strong backlighting.</p>
                      </div>
                    </div>
                    <div className="p-4 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                      <div className="text-2xl">📷</div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Camera Distance</h4>
                        <p className="text-xs text-gray-400">Keep the camera at waist level for full-body shots to prevent perspective distortion.</p>
                      </div>
                    </div>
                    <div className="p-4 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                      <div className="text-2xl">🧍</div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Posture</h4>
                        <p className="text-xs text-gray-400">Stand straight with arms slightly away from your body.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4">Frequently Asked Questions</h3>
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group border border-white/10 rounded-xl bg-black/40 overflow-hidden">
                      <summary className="p-4 cursor-pointer text-sm font-bold text-gray-300 hover:text-white list-none flex justify-between items-center">
                        {faq.q}
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="px-4 pb-4 text-xs text-gray-400 border-t border-white/5 pt-2">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 text-center">
              <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                S_FIT AI SUPPORT • v2.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
