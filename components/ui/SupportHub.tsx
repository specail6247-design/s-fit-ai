'use client';
import React, { useState } from 'react';
import { HelpCircle, X, ChevronDown, ChevronUp, Camera, Sun, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [openQa, setOpenQa] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const guideSteps = [
    { title: 'Upload Photo', desc: 'Take a clear, full-body shot facing forward.', icon: <Camera size={24} /> },
    { title: 'Select Garment', desc: 'Choose from our luxury collection.', icon: <Info size={24} /> },
    { title: 'AI Processing', desc: 'Wait a moment while we map the digital twin.', icon: <Sun size={24} /> }
  ];

  const faqs = [
    { q: 'Is my data secure?', a: 'Yes, all images are processed securely and not stored permanently.' },
    { q: 'What lighting is best?', a: 'Natural, even lighting works best to avoid harsh shadows.' },
    { q: 'Can I try accessories?', a: 'Currently we support tops and bottoms. Accessories coming soon!' }
  ];

  return (
    <>
      {/* Trigger Button - Hidden until needed style: subtle floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white p-3 rounded-full transition-all"
        aria-label="Open Support Hub"
      >
        <HelpCircle size={24} />
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-[#C9B037]/20 z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black">
                <h2 className="text-xl font-serif text-[#C9B037] uppercase tracking-widest">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10 text-xs font-mono uppercase tracking-widest">
                {(['guide', 'caution', 'qa'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 transition-colors ${activeTab === tab ? 'text-[#C9B037] border-b-2 border-[#C9B037] bg-white/5' : 'text-white/50 hover:text-white/80'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 text-white/80">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-serif text-white">How to Fit</h3>
                    <div className="relative bg-black/50 border border-white/10 rounded-xl p-6 min-h-[200px] flex flex-col items-center justify-center text-center">
                      <div className="text-[#C9B037] mb-4">
                        {guideSteps[carouselIndex].icon}
                      </div>
                      <h4 className="font-bold mb-2 text-white">{guideSteps[carouselIndex].title}</h4>
                      <p className="text-sm text-white/60 mb-6">{guideSteps[carouselIndex].desc}</p>

                      <div className="flex gap-2 mt-auto">
                        {guideSteps.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCarouselIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${carouselIndex === idx ? 'bg-[#C9B037]' : 'bg-white/20'}`}
                            aria-label={`Go to step ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-serif text-white">Important Warnings</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 bg-red-950/20 border border-red-500/20 p-4 rounded-xl">
                        <Sun className="text-red-400 shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-bold text-red-200 text-sm">Lighting is Critical</h4>
                          <p className="text-xs text-red-200/70 mt-1">Avoid extreme backlighting or very dark rooms. The AI needs to see garment details clearly.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 bg-orange-950/20 border border-orange-500/20 p-4 rounded-xl">
                        <Camera className="text-orange-400 shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-bold text-orange-200 text-sm">Camera Distance</h4>
                          <p className="text-xs text-orange-200/70 mt-1">Stand approximately 6 feet (2 meters) away. The entire body should be visible for accurate fitting.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-serif text-white">Frequently Asked Questions</h3>
                    <div className="space-y-2">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-black/30">
                          <button
                            onClick={() => setOpenQa(openQa === idx ? null : idx)}
                            className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
                          >
                            <span className="font-medium text-sm text-white/90">{faq.q}</span>
                            {openQa === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <AnimatePresence>
                            {openQa === idx && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                <div className="p-4 pt-0 text-sm text-white/60 border-t border-white/5 mt-2">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-black text-center">
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">S_FIT Client Support v2.0</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
