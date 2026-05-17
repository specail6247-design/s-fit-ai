'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq' | 'legal'>('guide');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [guideStep, setGuideStep] = useState(0);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const faqData = [
    { q: "What is S_FIT AI?", a: "S_FIT AI is a virtual fitting room that uses advanced AI to visualize garments on your body." },
    { q: "How accurate is the fit?", a: "Our AI considers fabric physics and body measurements to provide a highly accurate representation." },
    { q: "Is my data secure?", a: "We process images securely and do not store your personal photos permanently without your permission." }
  ];

  const guideSteps = [
    { title: "Upload Photo", desc: "Start with a clear, full-body photo facing forward." },
    { title: "Select Garment", desc: "Choose a piece from our luxury or SPA collections." },
    { title: "Virtual Fitting", desc: "Our AI tailors the garment to your digital twin." }
  ];

  return (
    <>
      {/* Hidden until needed: Small subtle floating button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-void-black border border-white/20 flex items-center justify-center text-soft-gray hover:text-white hover:border-white transition-all backdrop-blur-md shadow-2xl"
        onClick={toggleDrawer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Support Hub"
      >
        <span className="text-xl">?</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-widest uppercase font-mono">Support Hub</h2>
                <button onClick={toggleDrawer} className="text-soft-gray hover:text-white text-2xl">
                  &times;
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10 text-xs font-mono uppercase tracking-widest">
                {['guide', 'caution', 'faq', 'legal'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'guide' | 'caution' | 'faq' | 'legal')}
                    className={`flex-1 py-4 transition-colors ${
                      activeTab === tab ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6">

                {/* Guide Tab */}
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold mb-4">How to Fit</h3>
                    <div className="relative h-48 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={guideStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <div className="text-4xl text-cyber-lime">
                            {guideStep === 0 ? '📸' : guideStep === 1 ? '👕' : '✨'}
                          </div>
                          <h4 className="font-bold text-lg">{guideSteps[guideStep].title}</h4>
                          <p className="text-sm text-soft-gray">{guideSteps[guideStep].desc}</p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <button
                        onClick={() => setGuideStep(Math.max(0, guideStep - 1))}
                        disabled={guideStep === 0}
                        className="text-soft-gray hover:text-white disabled:opacity-30"
                      >
                        &larr; Prev
                      </button>
                      <div className="flex gap-2">
                        {guideSteps.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i === guideStep ? 'bg-cyber-lime' : 'bg-white/20'}`} />
                        ))}
                      </div>
                      <button
                        onClick={() => setGuideStep(Math.min(guideSteps.length - 1, guideStep + 1))}
                        disabled={guideStep === guideSteps.length - 1}
                        className="text-soft-gray hover:text-white disabled:opacity-30"
                      >
                        Next &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* Caution Tab */}
                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold mb-4">Best Practices</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4 items-start">
                        <span className="text-2xl">💡</span>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Good Lighting</h4>
                          <p className="text-xs text-soft-gray leading-relaxed">Ensure you are in a well-lit room. Natural light works best. Avoid strong shadows across your body.</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4 items-start">
                        <span className="text-2xl">📏</span>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Camera Distance</h4>
                          <p className="text-xs text-soft-gray leading-relaxed">Position the camera at waist height, about 2-3 meters away, to capture your full body without distortion.</p>
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4 items-start">
                        <span className="text-2xl">🧍</span>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Posture</h4>
                          <p className="text-xs text-soft-gray leading-relaxed">Stand naturally with your arms slightly away from your body (A-pose) for optimal AI analysis.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold mb-4">Q&A</h3>
                    <div className="space-y-2">
                      {faqData.map((item, index) => (
                        <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                          <button
                            className="w-full text-left p-4 flex justify-between items-center text-sm font-medium hover:bg-white/5 transition-colors"
                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                          >
                            {item.q}
                            <span className="text-soft-gray">{openFaqIndex === index ? '−' : '+'}</span>
                          </button>
                          <AnimatePresence>
                            {openFaqIndex === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 text-xs text-soft-gray leading-relaxed"
                              >
                                {item.a}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legal / Trust & Growth Tab */}
                {activeTab === 'legal' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold mb-4">Trust & Growth</h3>
                    <div className="space-y-4 text-sm">
                      <a href="#" className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">📄 Privacy Policy</a>
                      <a href="#" className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">📜 Terms of Service</a>
                      <div className="pt-4 border-t border-white/10">
                        <h4 className="font-bold text-sm mb-2">Report an Issue</h4>
                        <textarea
                          placeholder="Describe the issue you're experiencing..."
                          className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-xs text-white outline-none focus:border-cyber-lime h-24 resize-none mb-2"
                        />
                        <button className="w-full bg-white text-black py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors">
                          Submit Report
                        </button>
                      </div>
                    </div>
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
