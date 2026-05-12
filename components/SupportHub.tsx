// 한국어 주석: 지원 허브, 슬라이드 아웃 서랍(Drawer), 숨겨진 UI 철학
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomSheet } from './ui/BottomSheet';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How accurate is the 3D fitting?",
      a: "Our AI generates a high-fidelity estimation based on your input photo and dimensions. While it aims for realism, actual physical fit may vary slightly by brand."
    },
    {
      q: "Why is the Cinematic Try-On taking longer?",
      a: "Cinematic mode processes dynamic video synthesis and requires more computational power to generate 60fps animations. This usually takes 10-15 seconds."
    },
    {
      q: "Can I try on any clothing item?",
      a: "Currently, we support a curated list of garments. We recommend front-facing, well-lit photos for custom uploads to achieve the best results."
    }
  ];

  return (
    <>
      {/* Trigger Button - Floating & Unobtrusive */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-void-black/80 backdrop-blur-md border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:bg-white/10 transition-colors"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined text-[20px]">help</span>
      </motion.button>

      {/* Slide-out Drawer (Using BottomSheet for mobile-first feel) */}
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Support & Guides">
        <div className="flex flex-col h-full bg-void-black text-white">

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 mb-6">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-colors ${
                activeTab === 'guide' ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              How to Fit
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-colors ${
                activeTab === 'faq' ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              FAQ
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 pb-8">
            <AnimatePresence mode="wait">
              {activeTab === 'guide' ? (
                <motion.div
                  key="guide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {/* Step-by-step Visual Carousel Simulation */}
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs border border-white/20 flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">Capture Your Base</h4>
                        <p className="text-xs text-soft-gray leading-relaxed">Take a clear, full-body photo against a neutral background. Wear tight-fitting clothes for accurate body mapping.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs border border-white/20 flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">Select Garment</h4>
                        <p className="text-xs text-soft-gray leading-relaxed">Choose an item from our curated catalog or upload a clean, front-facing image of the garment you want to try.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs border border-white/20 flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">Generate & Review</h4>
                        <p className="text-xs text-soft-gray leading-relaxed">Wait a few moments as our AI engine dresses your digital twin. Explore different angles in the 3D viewer.</p>
                      </div>
                    </div>
                  </div>

                  {/* Caution Section */}
                  <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-5 mt-8">
                    <h4 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">warning</span>
                      Critical Capture Guidelines
                    </h4>
                    <ul className="space-y-3 text-xs text-red-200/80">
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[16px] opacity-70">lightbulb</span>
                        Ensure bright, even lighting. Avoid heavy shadows.
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[16px] opacity-70">camera_front</span>
                        Keep camera at waist height, 2-3 meters away.
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[16px] opacity-70">accessibility_new</span>
                        Stand straight, arms slightly away from torso.
                      </li>
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  {/* Q&A Accordion */}
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-medium pr-4">{faq.q}</span>
                        <motion.span
                          animate={{ rotate: openFaq === index ? 180 : 0 }}
                          className="material-symbols-outlined text-[20px] text-soft-gray flex-shrink-0"
                        >
                          expand_more
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 text-xs text-soft-gray leading-relaxed border-t border-white/5 pt-3">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust & Growth Links (Footer) */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex justify-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Report Issue</a>
            </div>
          </div>

        </div>
      </BottomSheet>
    </>
  );
}
