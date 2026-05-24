'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeGuideStep, setActiveGuideStep] = useState(0);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const guideSteps = [
    {
      title: 'Lighting',
      desc: 'Ensure even, natural lighting. Avoid harsh shadows on the garment or face.',
      icon: '☀️',
    },
    {
      title: 'Distance',
      desc: 'Stand exactly 1.5 meters away from the camera for accurate scale.',
      icon: '📏',
    },
    {
      title: 'Pose',
      desc: 'Keep arms slightly away from the body (A-Pose) to allow clear fabric simulation.',
      icon: '🧍',
    },
  ];

  const faqs = [
    {
      q: 'How does the fitting algorithm work?',
      a: 'We use a combination of 3D mesh reconstruction and advanced image synthesis (SVD/Runway Gen-3) to accurately map the garment to your body pose and shape.',
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. Images are processed ephemerally for the virtual try-on and are not stored permanently unless you explicitly choose to save them to your Vault.',
    },
    {
      q: 'Why does the generated image look distorted?',
      a: 'This usually happens if the input image has poor lighting, complex backgrounds, or if the pose obscures the garment. Try taking a new photo following our guide.',
    },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleDrawer}
        className="fixed bottom-6 right-6 z-40 bg-black/80 backdrop-blur-md border border-white/20 hover:border-white/50 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all"
        aria-label="Open Support Hub"
      >
        <span className="text-xl">?</span>
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
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={toggleDrawer}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] z-50 bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-medium tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={toggleDrawer}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${
                    activeTab === 'guide' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${
                    activeTab === 'faq' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Q&A
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    {/* Carousel */}
                    <div className="relative bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <span className="text-4xl">{guideSteps[activeGuideStep].icon}</span>
                        <h3 className="text-lg font-bold tracking-wider">{guideSteps[activeGuideStep].title}</h3>
                        <p className="text-sm text-gray-400">{guideSteps[activeGuideStep].desc}</p>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <button
                          onClick={() => setActiveGuideStep((prev) => (prev > 0 ? prev - 1 : guideSteps.length - 1))}
                          className="text-gray-400 hover:text-white"
                        >
                          ←
                        </button>
                        <div className="flex gap-2">
                          {guideSteps.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full ${idx === activeGuideStep ? 'bg-white' : 'bg-white/20'}`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setActiveGuideStep((prev) => (prev < guideSteps.length - 1 ? prev + 1 : 0))}
                          className="text-gray-400 hover:text-white"
                        >
                          →
                        </button>
                      </div>
                    </div>

                    {/* Caution Warnings */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-red-400 tracking-widest uppercase border-b border-red-500/30 pb-2">Caution</h3>
                      <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4 flex items-start gap-3">
                         <span className="text-red-500 mt-0.5">⚠️</span>
                         <div>
                           <h4 className="text-sm font-bold text-red-200">Avoid Backlighting</h4>
                           <p className="text-xs text-red-400/80 mt-1">Photos taken facing a window will result in poor 3D mesh reconstruction.</p>
                         </div>
                      </div>
                       <div className="bg-yellow-950/20 border border-yellow-900/50 rounded-xl p-4 flex items-start gap-3">
                         <span className="text-yellow-500 mt-0.5">📸</span>
                         <div>
                           <h4 className="text-sm font-bold text-yellow-200">Camera Angle</h4>
                           <p className="text-xs text-yellow-400/80 mt-1">Keep the camera lens exactly at chest height. Do not shoot from above or below.</p>
                         </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-medium">{faq.q}</span>
                          <span className="text-gray-500">{expandedFaq === idx ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 text-xs text-gray-400"
                            >
                              {faq.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Trust & Growth Overlays */}
              <div className="p-6 border-t border-white/10 bg-black/40">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <a href="#" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a>
                  <a href="#" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</a>
                  <a href="#" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Data Safety</a>
                  <a href="#" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Report Issue</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
