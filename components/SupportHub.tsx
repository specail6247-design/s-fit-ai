"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'legal'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: 'Upload Photo', desc: 'Ensure good lighting and front-facing pose.' },
    { title: 'Select Garment', desc: 'Choose a garment with a clear front view.' },
    { title: 'AI Fitting', desc: 'Wait for the AI to process and generate the fit.' }
  ];

  const faqs = [
    { q: 'How long does it take?', a: 'Usually less than 10 seconds.' },
    { q: 'Is my data secure?', a: 'Yes, photos are processed securely and not shared.' },
    { q: 'Can I upload side profiles?', a: 'For best results, please upload front-facing photos.' }
  ];

  return (
    <>
      {/* Floating Action Button (Hidden until needed philosophy) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all"
        aria-label="Open Support Hub"
      >
        <span className="text-xl">?</span>
      </button>

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

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black">
                <h2 className="text-xl font-bold font-display tracking-widest uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white p-2">
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10 bg-black/50">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'guide' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'}`}
                >
                  Guide
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'faq' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'}`}
                >
                  FAQ
                </button>
                <button
                  onClick={() => setActiveTab('legal')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'legal' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'}`}
                >
                  Legal
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-8">
                    {/* Cautions */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                      <h3 className="text-sm font-bold text-cyber-lime flex items-center gap-2">
                        <span>⚠️</span> Important Cautions
                      </h3>
                      <ul className="text-sm text-soft-gray space-y-2">
                        <li className="flex items-center gap-2"><span>💡</span> Good, even lighting is required.</li>
                        <li className="flex items-center gap-2"><span>📸</span> Keep camera at chest level.</li>
                        <li className="flex items-center gap-2"><span>🧍</span> Stand straight, arms slightly apart.</li>
                      </ul>
                    </div>

                    {/* Step-by-Step Carousel */}
                    <div>
                      <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-white/70">How to Fit</h3>
                      <div className="bg-black border border-white/10 rounded-xl p-6 text-center h-48 flex flex-col justify-center items-center relative overflow-hidden">
                        <motion.div
                          key={guideStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <div className="text-4xl font-black text-cyber-lime/20">{guideStep + 1}</div>
                          <h4 className="font-bold text-lg">{guideSteps[guideStep].title}</h4>
                          <p className="text-sm text-soft-gray">{guideSteps[guideStep].desc}</p>
                        </motion.div>

                        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2">
                          {guideSteps.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setGuideStep(i)}
                              className={`w-2 h-2 rounded-full transition-colors ${i === guideStep ? 'bg-cyber-lime' : 'bg-white/20'}`}
                              aria-label={`Go to step ${i + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <summary className="p-4 cursor-pointer font-medium text-sm hover:text-cyber-lime transition-colors list-none flex justify-between items-center">
                          {faq.q}
                          <span className="text-soft-gray group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="p-4 pt-0 text-sm text-soft-gray border-t border-white/5 mt-2">
                          {faq.a}
                        </div>
                      </details>
                    ))}

                    <div className="mt-8 pt-8 border-t border-white/10">
                      <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-white/70">Report Issue</h3>
                      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Issue reported.'); }}>
                        <textarea
                          placeholder="Describe the issue..."
                          className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-cyber-lime outline-none h-24 resize-none"
                          required
                        />
                        <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                          Submit Report
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'legal' && (
                  <div className="space-y-4 text-sm text-soft-gray">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <h3 className="font-bold text-white mb-2">Privacy Policy</h3>
                      <p className="mb-4">Your uploaded photos are processed ephemerally and are never stored on our servers permanently or shared with third parties.</p>
                      <button className="text-cyber-lime hover:underline">Read Full Policy</button>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <h3 className="font-bold text-white mb-2">Terms of Service</h3>
                      <p className="mb-4">By using this service, you agree to our standard terms regarding AI generation and usage.</p>
                      <button className="text-cyber-lime hover:underline">Read Terms</button>
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
