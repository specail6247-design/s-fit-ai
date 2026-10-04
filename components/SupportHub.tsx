'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [currentSlide, setCurrentSlide] = useState(0);

  const guideSlides = [
    {
      title: 'Step 1: The Canvas',
      desc: 'Stand against a clean, uncluttered background. Neutral walls work best.',
      icon: 'wallpaper'
    },
    {
      title: 'Step 2: The Lighting',
      desc: 'Ensure even, front-facing light. Avoid harsh shadows or strong backlighting.',
      icon: 'lightbulb'
    },
    {
      title: 'Step 3: The Pose',
      desc: 'Stand straight, arms slightly away from your body. Face the camera directly.',
      icon: 'accessibility_new'
    }
  ];

  const faqs = [
    { q: 'How long does processing take?', a: 'Standard fitting takes ~10 seconds. Premium cinematic renders may take up to 30 seconds.' },
    { q: 'Is my data secure?', a: 'Yes. Images are processed temporarily and deleted immediately after the session ends.' },
    { q: 'Can I use full body photos?', a: 'Yes, full body photos provide the most accurate scaling and drape physics.' }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Floating Help Button - Hidden until needed style */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 size-12 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all group shadow-2xl"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">help</span>
      </button>

      {/* Slide-out Drawer */}
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

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-[#2d2d2d] z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#2d2d2d] flex items-center justify-between">
                <div>
                  <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Support Hub</h2>
                  <p className="text-zinc-500 text-[10px] tracking-widest uppercase mt-1">Client Assistance</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="size-8 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-[#2d2d2d]">
                {(['guide', 'caution', 'faq'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-[10px] font-bold tracking-widest uppercase transition-colors relative ${
                      activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ecab13]"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">

                {/* Guide Tab (Carousel) */}
                {activeTab === 'guide' && (
                  <div className="h-full flex flex-col justify-center space-y-8">
                    <div className="text-center space-y-4">
                      <div className="size-24 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[#ecab13]">
                        <span className="material-symbols-outlined text-4xl">{guideSlides[currentSlide].icon}</span>
                      </div>
                      <h3 className="text-white text-sm font-bold tracking-[0.1em] uppercase">
                        {guideSlides[currentSlide].title}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed max-w-[280px] mx-auto">
                        {guideSlides[currentSlide].desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : guideSlides.length - 1))}
                        className="size-8 flex items-center justify-center rounded-full border border-[#2d2d2d] text-zinc-400 hover:text-white hover:border-white/50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                      </button>
                      <div className="flex gap-2">
                        {guideSlides.map((_, i) => (
                          <div
                            key={i}
                            className={`size-1.5 rounded-full transition-colors ${
                              i === currentSlide ? 'bg-[#ecab13]' : 'bg-[#2d2d2d]'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev < guideSlides.length - 1 ? prev + 1 : 0))}
                        className="size-8 flex items-center justify-center rounded-full border border-[#2d2d2d] text-zinc-400 hover:text-white hover:border-white/50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Caution Tab */}
                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 flex gap-4 items-start">
                      <span className="material-symbols-outlined text-red-500 mt-0.5">warning</span>
                      <div>
                        <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-2">Distance Warning</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          Do not stand too close to the camera. The AI requires a full view of the torso to accurately calculate drape and physics. Minimum distance: 1.5 meters.
                        </p>
                      </div>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5 flex gap-4 items-start">
                      <span className="material-symbols-outlined text-orange-500 mt-0.5">flare</span>
                      <div>
                        <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-2">Lighting Artifacts</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          Extreme backlighting or dark environments will cause the mesh generation to fail or produce distorted artifacts on the fabric surface.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ Tab (Accordion) */}
                {activeTab === 'faq' && (
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-[#2d2d2d] rounded-xl overflow-hidden bg-[#1a1a1a]/50">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-white text-xs font-bold tracking-wider">{faq.q}</span>
                          <span className="material-symbols-outlined text-zinc-500 text-sm transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            expand_more
                          </span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4"
                            >
                              <div className="h-px w-full bg-[#2d2d2d] mb-4" />
                              <p className="text-zinc-400 text-xs leading-relaxed">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#2d2d2d] text-center">
                 <p className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase">S_FIT AI Engine v2.0</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
