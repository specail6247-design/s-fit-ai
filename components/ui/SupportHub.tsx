'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const guideSteps = [
  { title: "STEP 1: Lighting", icon: "💡", desc: "Ensure bright, even lighting from the front." },
  { title: "STEP 2: Distance", icon: "📏", desc: "Stand 2-3 meters away from the camera." },
  { title: "STEP 3: Pose", icon: "🧍", desc: "Face forward with your arms slightly away from your body." }
];

const faqs = [
  { q: "What is Masterpiece Fit?", a: "A professional-grade AI fitting engine that analyzes your body to generate highly realistic try-on visuals." },
  { q: "How long does processing take?", a: "Typically 20-30 seconds depending on server load and image resolution." },
  { q: "Is my data secure?", a: "Yes. Photos are processed temporarily for the fitting and are not stored permanently unless you save them." }
];

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [guideIndex, setGuideIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-black border border-[#C9B037]/50 rounded-full flex items-center justify-center text-[#C9B037] shadow-[0_0_15px_rgba(201,176,55,0.2)] hover:bg-[#C9B037]/10 transition-colors"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Support Hub"
      >
        <span className="text-xl font-serif">?</span>
      </motion.button>

      {/* Slide-out Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#050505] border-l border-[#C9B037]/20 z-[70] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-serif text-[#C9B037] tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors p-2"
                  aria-label="Close Support Hub"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {(['guide', 'caution', 'qa'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${
                      activeTab === tab
                        ? 'text-[#C9B037] border-b-2 border-[#C9B037]'
                        : 'text-gray-600 hover:text-gray-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <AnimatePresence mode="wait">
                  {/* GUIDE TAB */}
                  {activeTab === 'guide' && (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col"
                    >
                      <h3 className="text-sm text-white font-bold mb-6 tracking-widest">HOW TO FIT</h3>
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="text-6xl mb-6">{guideSteps[guideIndex].icon}</div>
                        <h4 className="text-lg text-[#C9B037] font-serif mb-3">{guideSteps[guideIndex].title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-[250px]">
                          {guideSteps[guideIndex].desc}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/10">
                        <button
                          disabled={guideIndex === 0}
                          onClick={() => setGuideIndex(p => p - 1)}
                          className="text-xs text-gray-500 disabled:opacity-30 hover:text-white transition-colors"
                        >
                          ← PREV
                        </button>
                        <div className="flex gap-2">
                          {guideSteps.map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === guideIndex ? 'bg-[#C9B037]' : 'bg-white/20'}`} />
                          ))}
                        </div>
                        <button
                          disabled={guideIndex === guideSteps.length - 1}
                          onClick={() => setGuideIndex(p => p + 1)}
                          className="text-xs text-[#C9B037] disabled:opacity-30 hover:text-white transition-colors"
                        >
                          NEXT →
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* CAUTION TAB */}
                  {activeTab === 'caution' && (
                    <motion.div
                      key="caution"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <h3 className="text-sm text-white font-bold tracking-widest">IMPORTANT GUIDELINES</h3>

                      <div className="bg-[#C9B037]/10 border border-[#C9B037]/30 p-4 space-y-2">
                        <div className="flex items-center gap-3 text-[#C9B037]">
                          <span className="text-xl">⚠️</span>
                          <span className="font-bold text-xs tracking-widest">LIGHTING WARNING</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed pl-8">
                          Avoid extreme backlighting or harsh shadows. Poor lighting can result in AI rendering artifacts or inaccurate fabric mapping.
                        </p>
                      </div>

                      <div className="bg-white/5 border border-white/10 p-4 space-y-2">
                        <div className="flex items-center gap-3 text-white">
                          <span className="text-xl">📷</span>
                          <span className="font-bold text-xs tracking-widest">CAMERA DISTANCE</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed pl-8">
                          Photos taken too close (under 1.5m) may cause perspective distortion, making garments appear improperly scaled.
                        </p>
                      </div>

                      <div className="bg-white/5 border border-white/10 p-4 space-y-2">
                        <div className="flex items-center gap-3 text-white">
                          <span className="text-xl">🧥</span>
                          <span className="font-bold text-xs tracking-widest">CLOTHING OVERLAP</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed pl-8">
                          For best results, wear tight-fitting clothes. Bulky layers can confuse the AI pose estimation.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Q&A TAB */}
                  {activeTab === 'qa' && (
                    <motion.div
                      key="qa"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-sm text-white font-bold tracking-widest mb-6">FREQUENTLY ASKED</h3>

                      <div className="space-y-2">
                        {faqs.map((faq, i) => (
                          <div key={i} className="border-b border-white/10 pb-2">
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                              className="w-full flex justify-between items-center py-3 text-left"
                            >
                              <span className="text-xs font-bold text-gray-300 pr-4">{faq.q}</span>
                              <span className="text-[#C9B037] font-serif">{expandedFaq === i ? '−' : '+'}</span>
                            </button>
                            <AnimatePresence>
                              {expandedFaq === i && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-xs text-gray-500 leading-relaxed pb-4">
                                    {faq.a}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
