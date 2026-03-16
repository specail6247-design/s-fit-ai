import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'report'>('guide');
  const [guideStep, setGuideStep] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const steps = [
    { title: "Upload Photo", desc: "Select a clear, well-lit photo of yourself." },
    { title: "Choose Garment", desc: "Pick an item from our catalog to try on." },
    { title: "AI Magic", desc: "Our AI fits the garment to your body." }
  ];

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI considers fabric physics, stretch, and your unique body pose to provide a highly accurate representation." },
    { q: "What photos work best?", a: "Straight-on photos with good lighting, fitted clothes, and a clean background work best." },
    { q: "Is my data secure?", a: "Yes. Photos are processed securely and never shared or used for training without permission." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/50">
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">Support Hub</h2>
              <button
                onClick={onClose}
                className="text-soft-gray hover:text-white transition-colors"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <div className="flex border-b border-white/10">
              {(['guide', 'faq', 'report'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === tab
                      ? 'text-cyber-lime border-b-2 border-cyber-lime bg-white/5'
                      : 'text-soft-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {activeTab === 'guide' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Carousel Guide */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">How to Fit</h3>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                      <div className="flex justify-between items-center mb-6 relative z-10">
                        {steps.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setGuideStep(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === guideStep ? 'bg-cyber-lime w-6' : 'bg-white/20 hover:bg-white/40'}`}
                            aria-label={`Go to step ${i + 1}`}
                          />
                        ))}
                      </div>
                      <div className="text-center relative z-10 min-h-[100px] flex flex-col justify-center">
                        <div className="text-3xl mb-4">{guideStep === 0 ? '📸' : guideStep === 1 ? '👕' : '✨'}</div>
                        <h4 className="text-lg font-bold text-white mb-2">{steps[guideStep].title}</h4>
                        <p className="text-sm text-soft-gray">{steps[guideStep].desc}</p>
                      </div>
                      {/* Decorative background element */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyber-lime/5 rounded-full blur-3xl" />
                    </div>
                  </div>

                  {/* Cautions */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Guidelines</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                        <span className="block text-2xl mb-2" aria-hidden="true">💡</span>
                        <h4 className="text-xs font-bold text-red-400 mb-1 uppercase">Lighting</h4>
                        <p className="text-[10px] text-gray-400">Avoid harsh shadows or backlight.</p>
                      </div>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                        <span className="block text-2xl mb-2" aria-hidden="true">📏</span>
                        <h4 className="text-xs font-bold text-orange-400 mb-1 uppercase">Distance</h4>
                        <p className="text-[10px] text-gray-400">Keep camera at chest level, 2m away.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                        className="w-full p-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-bold text-white">{faq.q}</span>
                        <span className="text-soft-gray ml-4">{openFaqIndex === i ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-sm text-soft-gray leading-relaxed overflow-hidden"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'report' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported successfully.'); }}>
                    <div>
                      <label className="block text-xs font-bold text-soft-gray uppercase tracking-widest mb-2">Issue Type</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cyber-lime outline-none appearance-none">
                        <option value="bug" className="bg-void-black text-white">Technical Bug</option>
                        <option value="fit" className="bg-void-black text-white">Poor Fit Quality</option>
                        <option value="other" className="bg-void-black text-white">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-soft-gray uppercase tracking-widest mb-2">Description</label>
                      <textarea
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cyber-lime outline-none resize-none"
                        placeholder="Please describe the issue in detail..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-cyber-lime text-void-black font-bold py-3 rounded-xl hover:brightness-110 transition-all uppercase tracking-widest text-sm"
                    >
                      Submit Report
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
