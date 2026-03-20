import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');
  const [activeGuideStep, setActiveGuideStep] = useState(0);

  const guideSteps = [
    {
      title: '01. Identification',
      desc: 'Upload a clear, front-facing photo of yourself. Avoid heavy shadows or obstructions.',
      icon: '👤'
    },
    {
      title: '02. Garment Selection',
      desc: 'Choose a garment you want to try. Ensure the item photo is flat and well-lit.',
      icon: '👕'
    },
    {
      title: '03. Processing',
      desc: 'Our AI engine will analyze your pose and map the garment flawlessly onto your digital twin.',
      icon: '⚡'
    }
  ];

  const faqs = [
    { q: 'What kind of photos work best?', a: 'High-contrast photos with neutral backgrounds and good lighting yield the most accurate fitting results.' },
    { q: 'Is my data secure?', a: 'Yes. All uploads are processed securely and deleted immediately after the session unless you choose to save them.' },
    { q: 'Can I try on pants or skirts?', a: 'Currently, S_FIT NEO specializes in tops and outerwear. Full-body fitting is coming in our next major update.' }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="supporthub-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            key="supporthub-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-black/40">
              <div>
                <h2 className="text-xl font-black tracking-tighter text-white uppercase">Support Hub</h2>
                <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-1">Assistance & Guidelines</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
              >
                How to Fit
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'qa' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
              >
                Q&A
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {activeTab === 'guide' ? (
                <div className="space-y-10">

                  {/* Caution Section */}
                  <div className="bg-[#1a1a1a] border border-orange-500/20 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/50" />
                    <h3 className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-3 flex items-center gap-2">
                      <span>⚠️</span> Caution
                    </h3>
                    <ul className="text-sm text-gray-400 space-y-3">
                      <li className="flex gap-3">
                        <span className="opacity-70">📸</span>
                        <span>Ensure your camera is at eye level, roughly 3-5 feet away.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="opacity-70">💡</span>
                        <span>Use bright, even lighting. Avoid heavy backlighting.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Carousel Step-by-Step */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">User Guide</h3>
                    <div className="relative border border-white/10 rounded-xl p-6 bg-black/40 min-h-[200px] flex flex-col justify-center items-center text-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeGuideStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div className="text-4xl">{guideSteps[activeGuideStep].icon}</div>
                          <h4 className="text-sm font-bold text-white tracking-widest uppercase">{guideSteps[activeGuideStep].title}</h4>
                          <p className="text-sm text-gray-400">{guideSteps[activeGuideStep].desc}</p>
                        </motion.div>
                      </AnimatePresence>

                      {/* Carousel Controls */}
                      <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2">
                        {guideSteps.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveGuideStep(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === activeGuideStep ? 'bg-[#007AFF] w-4' : 'bg-white/20 hover:bg-white/40'}`}
                            aria-label={`Go to step ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">Frequently Asked Questions</h3>
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl bg-black/40 overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full p-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-medium text-white">{faq.q}</span>
                        <span className="text-gray-500">{openFaq === idx ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-sm text-gray-400 border-t border-white/5 mt-2">
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

            <div className="p-6 border-t border-white/10 bg-black/40 text-center">
              <p className="text-[10px] text-gray-600 tracking-widest uppercase">
                S_FIT NEO Intelligence System
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
