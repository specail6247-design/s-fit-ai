import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const guideSteps = [
    { title: '1. Choose Garment', desc: 'Select the clothing item you want to try on.' },
    { title: '2. Upload Photo', desc: 'Take a clear, full-body photo of yourself.' },
    { title: '3. AI Fitting', desc: 'Wait a few seconds for the AI to generate your fit.' },
  ];

  const faqs = [
    { q: 'How accurate is the size recommendation?', a: 'Our AI analyzes body proportions with up to 95% accuracy compared to manual measurements.' },
    { q: 'What kind of photos work best?', a: 'Stand straight, wear form-fitting clothes, and ensure good lighting for best results.' },
    { q: 'Are my photos saved?', a: 'No, your photos are processed temporarily and immediately deleted.' },
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
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-[#050505] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold font-mono text-white tracking-widest">SUPPORT_HUB</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl">
                ✕
              </button>
            </div>

            {/* Navigation */}
            <div className="flex border-b border-white/10">
              {(['guide', 'caution', 'faq'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === tab ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">

              {/* Data Safety Badge - Persistent */}
              <div className="mb-8 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <span className="text-[#007AFF] text-xl">🔒</span>
                <div>
                  <p className="text-xs font-bold text-white uppercase">Data Safety</p>
                  <p className="text-[10px] text-gray-400">Photos are processed securely and not shared.</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >

                  {/* Guide Tab */}
                  {activeTab === 'guide' && (
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">How to Fit</h3>
                      <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                        {guideSteps.map((step, idx) => (
                          <div key={idx} className="min-w-[200px] snap-center bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-center min-h-[160px]">
                            <h4 className="text-[#007AFF] font-bold text-sm mb-2">{step.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Caution Tab */}
                  {activeTab === 'caution' && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Important Guidelines</h3>

                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex gap-4 items-start">
                        <span className="text-orange-500 text-xl mt-0.5">💡</span>
                        <div>
                          <p className="text-sm font-bold text-orange-500 mb-1">Lighting Matters</p>
                          <p className="text-xs text-gray-400">Avoid strong shadows or backlighting. Soft, even, frontal lighting works best.</p>
                        </div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-4 items-start">
                        <span className="text-[#007AFF] text-xl mt-0.5">📸</span>
                        <div>
                          <p className="text-sm font-bold text-[#007AFF] mb-1">Camera Distance</p>
                          <p className="text-xs text-gray-400">Stand roughly 2-3 meters from the camera. Ensure your full body is visible.</p>
                        </div>
                      </div>

                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-4 items-start">
                        <span className="text-red-500 text-xl mt-0.5">👕</span>
                        <div>
                          <p className="text-sm font-bold text-red-500 mb-1">Avoid Loose Clothing</p>
                          <p className="text-xs text-gray-400">Baggy clothes confuse the AI. Wear tight-fitting layers for accurate mapping.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FAQ Tab */}
                  {activeTab === 'faq' && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Frequently Asked</h3>
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5 transition-all">
                          <button
                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                            className="w-full text-left p-4 flex justify-between items-center text-sm font-bold text-gray-200 hover:text-white"
                          >
                            {faq.q}
                            <span className={`text-[#007AFF] transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`}>▼</span>
                          </button>
                          <AnimatePresence>
                            {openFaqIndex === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 pt-0 text-xs text-gray-400 border-t border-white/5 mt-2">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Form */}
            <div className="p-6 border-t border-white/10 bg-[#050505]">
               <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white uppercase tracking-widest transition-colors">
                  Report an Issue
               </button>
               <div className="mt-4 flex justify-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                 <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                 <span>•</span>
                 <a href="#" className="hover:text-gray-400">Terms</a>
               </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
