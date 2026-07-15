'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'guide' | 'caution' | 'qa';

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<TabType>('guide');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [expandedQaIndex, setExpandedQaIndex] = useState<number | null>(null);

  // Mock carousel data
  const carouselSteps = [
    { title: "Step 1: Upload Photo", desc: "Select a clear, front-facing photo of yourself." },
    { title: "Step 2: Choose Garment", desc: "Select the garment you want to try on." },
    { title: "Step 3: AI Fitting", desc: "Our engine will perfectly align the garment." }
  ];

  const handleNext = () => setCarouselIndex((prev) => (prev + 1) % carouselSteps.length);
  const handlePrev = () => setCarouselIndex((prev) => (prev - 1 + carouselSteps.length) % carouselSteps.length);

  // Mock QA data
  const qaData = [
    { q: "How accurate is the sizing?", a: "Our AI uses depth estimation for millimeter precision." },
    { q: "Can I try multiple items?", a: "Yes, use the 'Multi-layer' feature in pro mode." },
    { q: "What about lighting?", a: "Well-lit photos yield the most realistic fabric rendering." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)]"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">S_FIT Guidance</p>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
                 ✕
              </button>
            </div>

            <div className="flex border-b border-white/10 text-xs font-bold uppercase tracking-widest">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 border-b-2 transition-colors ${activeTab === 'guide' ? 'border-[#007AFF] text-[#007AFF]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                Guide
              </button>
              <button
                onClick={() => setActiveTab('caution')}
                className={`flex-1 py-4 border-b-2 transition-colors ${activeTab === 'caution' ? 'border-[#ff3b30] text-[#ff3b30]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                Caution
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-4 border-b-2 transition-colors ${activeTab === 'qa' ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                Q&A
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'guide' && (
                <div className="space-y-6">
                  <div className="aspect-video bg-gray-900 rounded-xl border border-white/10 flex items-center justify-center p-6 text-center relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="text-[#007AFF] text-sm font-bold mb-2 uppercase tracking-widest">{carouselSteps[carouselIndex].title}</div>
                      <div className="text-gray-400 text-xs">{carouselSteps[carouselIndex].desc}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <button onClick={handlePrev} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest">← Prev</button>
                    <div className="flex gap-2">
                      {carouselSteps.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === carouselIndex ? 'bg-[#007AFF]' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    <button onClick={handleNext} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest">Next →</button>
                  </div>
                </div>
              )}

              {activeTab === 'caution' && (
                <div className="space-y-4">
                  <div className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 rounded-xl p-4 text-[#ff3b30]">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">⚠️</span>
                        <span className="font-bold uppercase tracking-widest text-xs">Crucial Guidelines</span>
                     </div>
                     <p className="text-xs opacity-80 leading-relaxed">Failure to follow these may result in distorted physics or inaccurate sizing.</p>
                  </div>

                  <ul className="space-y-3 mt-6">
                    <li className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                       <span className="text-xl">💡</span>
                       <div>
                         <div className="text-sm font-bold mb-1">Even Lighting</div>
                         <div className="text-xs text-gray-400">Avoid harsh shadows. Use diffused, natural light.</div>
                       </div>
                    </li>
                    <li className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                       <span className="text-xl">📏</span>
                       <div>
                         <div className="text-sm font-bold mb-1">Camera Distance</div>
                         <div className="text-xs text-gray-400">Stand precisely 1.5 meters from the lens.</div>
                       </div>
                    </li>
                    <li className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                       <span className="text-xl">👕</span>
                       <div>
                         <div className="text-sm font-bold mb-1">Form-fitting base</div>
                         <div className="text-xs text-gray-400">Wear tight clothing for accurate body segmentation.</div>
                       </div>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="space-y-3">
                  {qaData.map((item, index) => (
                    <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => setExpandedQaIndex(expandedQaIndex === index ? null : index)}
                        className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-bold">{item.q}</span>
                        <span className="text-gray-500">{expandedQaIndex === index ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {expandedQaIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-xs text-gray-400 leading-relaxed"
                          >
                            {item.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
