'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const guideSteps = [
    { title: "Snap a Photo", desc: "Take a clear, full-body photo against a plain background.", icon: "photo_camera" },
    { title: "Select Garment", desc: "Choose your desired luxury piece from our catalog.", icon: "checkroom" },
    { title: "AI Magic", desc: "Our engine processes the fit, drape, and texture.", icon: "auto_awesome" },
    { title: "Review & Share", desc: "Inspect the final result and save to your Vault.", icon: "share" }
  ];

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI uses advanced depth mapping for 95% accuracy in sizing and drape." },
    { q: "Are my photos secure?", a: "Yes. All images are processed temporarily and immediately deleted from our servers." },
    { q: "What lighting is best?", a: "Natural, even lighting from the front works best. Avoid harsh shadows." },
    { q: "Can I try multiple items?", a: "Yes, you can layer items or save looks to your Vault for comparison." }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#0A0A0A] border border-[#ecab13]/30 p-4 rounded-full shadow-2xl hover:border-[#ecab13] hover:scale-105 transition-all duration-500 group flex items-center gap-2"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined text-[#ecab13] group-hover:animate-pulse">support_agent</span>
        <span className="hidden group-hover:block text-xs font-bold text-[#ecab13] tracking-widest px-2 font-[family-name:var(--font-cinzel)] uppercase whitespace-nowrap">
          Support Hub
        </span>
      </button>

      {/* Slide-out Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-[#050505] border-l border-[#ecab13]/20 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-transparent to-[#ecab13]/5">
                <h2 className="text-xl font-bold text-[#ecab13] font-[family-name:var(--font-cinzel)] tracking-widest uppercase">
                  Support Hub
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex px-6 pt-4 border-b border-white/5">
                {[
                  { id: 'guide', label: 'Guide', icon: 'menu_book' },
                  { id: 'caution', label: 'Caution', icon: 'warning' },
                  { id: 'faq', label: 'FAQ', icon: 'help' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'guide' | 'caution' | 'faq')}
                    className={`flex-1 pb-4 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 border-b-2 ${
                      activeTab === tab.id
                        ? 'border-[#ecab13] text-[#ecab13]'
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <AnimatePresence mode="wait">
                  {activeTab === 'guide' && (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col"
                    >
                      <h3 className="text-lg text-white font-[family-name:var(--font-cinzel)] mb-6 tracking-wide">How to Fit</h3>
                      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                        <motion.div
                          key={guideStep}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="w-32 h-32 rounded-full border border-[#ecab13]/30 bg-gradient-to-b from-[#ecab13]/10 to-transparent flex items-center justify-center mb-4"
                        >
                          <span className="material-symbols-outlined text-5xl text-[#ecab13]">
                            {guideSteps[guideStep].icon}
                          </span>
                        </motion.div>
                        <h4 className="text-xl font-bold text-white">{guideSteps[guideStep].title}</h4>
                        <p className="text-sm text-gray-400 font-[family-name:var(--font-space-grotesk)] leading-relaxed">
                          {guideSteps[guideStep].desc}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-8">
                        <button
                          onClick={() => setGuideStep(Math.max(0, guideStep - 1))}
                          disabled={guideStep === 0}
                          className="p-2 text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
                        >
                          <span className="material-symbols-outlined">arrow_back_ios</span>
                        </button>
                        <div className="flex gap-2">
                          {guideSteps.map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                i === guideStep ? 'bg-[#ecab13] w-6' : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setGuideStep(Math.min(guideSteps.length - 1, guideStep + 1))}
                          disabled={guideStep === guideSteps.length - 1}
                          className="p-2 text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
                        >
                          <span className="material-symbols-outlined">arrow_forward_ios</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'caution' && (
                    <motion.div
                      key="caution"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg text-white font-[family-name:var(--font-cinzel)] mb-6 tracking-wide">Best Practices</h3>

                      <div className="bg-[#0A0A0A] border border-red-500/20 p-5 rounded-xl flex gap-4">
                        <span className="material-symbols-outlined text-red-400 text-3xl">light_mode</span>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-wider">Lighting Requirements</h4>
                          <p className="text-xs text-gray-400 font-[family-name:var(--font-space-grotesk)] leading-relaxed">
                            Ensure even lighting across your body. Avoid strong backlighting or harsh shadows which can distort texture generation.
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#0A0A0A] border border-blue-500/20 p-5 rounded-xl flex gap-4">
                        <span className="material-symbols-outlined text-blue-400 text-3xl">straighten</span>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-wider">Camera Distance</h4>
                          <p className="text-xs text-gray-400 font-[family-name:var(--font-space-grotesk)] leading-relaxed">
                            Position the camera at waist height, approximately 6-8 feet away. Your full body from head to toe should be visible.
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#0A0A0A] border border-green-500/20 p-5 rounded-xl flex gap-4">
                        <span className="material-symbols-outlined text-green-400 text-3xl">accessibility_new</span>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-wider">Posing Guidelines</h4>
                          <p className="text-xs text-gray-400 font-[family-name:var(--font-space-grotesk)] leading-relaxed">
                            Stand straight with arms slightly away from your body (A-pose). Avoid crossing arms or baggy clothing.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'faq' && (
                    <motion.div
                      key="faq"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h3 className="text-lg text-white font-[family-name:var(--font-cinzel)] mb-6 tracking-wide">Common Questions</h3>
                      <div className="space-y-3">
                        {faqs.map((faq, i) => (
                          <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden">
                            <button
                              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                              className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                            >
                              <span className="text-sm font-bold text-white tracking-wide">{faq.q}</span>
                              <span className={`material-symbols-outlined text-gray-500 transition-transform duration-300 ${faqOpen === i ? 'rotate-180' : ''}`}>
                                expand_more
                              </span>
                            </button>
                            <AnimatePresence>
                              {faqOpen === i && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-4 text-xs text-gray-400 font-[family-name:var(--font-space-grotesk)] leading-relaxed border-t border-white/5 pt-3">
                                    {faq.a}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Still need help?</p>
                        <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold tracking-widest uppercase border border-white/10 rounded-xl transition-colors">
                          Contact Concierge
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
