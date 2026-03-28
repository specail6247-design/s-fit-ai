'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    {
      title: "Step 01: Identification",
      desc: "Upload a clear, front-facing photo of yourself. Ensure good lighting.",
      icon: "👤"
    },
    {
      title: "Step 02: Target Garment",
      desc: "Select the garment you wish to try on. Front views work best.",
      icon: "👕"
    },
    {
      title: "Step 03: Engine Activation",
      desc: "Click 'TRY IT ON' to initiate the AI fitting sequence.",
      icon: "⚡"
    }
  ];

  return (
    <>
      {/* Minimal Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-white/70 hover:text-white text-xs tracking-[0.2em] font-medium uppercase transition-colors"
      >
        INFO
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0A0A0A] border-l border-white/10 z-[100] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-sm font-light tracking-[0.3em] uppercase text-white/80">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors p-2"
                >
                  ✕
                </button>
              </div>

              {/* Navigation */}
              <div className="flex border-b border-white/5">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white/70'}`}
                >
                  Guide
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 py-4 text-xs tracking-widest uppercase transition-colors ${activeTab === 'qa' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white/70'}`}
                >
                  Q&A
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {activeTab === 'guide' ? (
                  <div className="space-y-8">
                    {/* Visual Carousel (Simplified for Minimal UI) */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={guideStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center text-center space-y-4"
                        >
                          <span className="text-4xl">{guideSteps[guideStep].icon}</span>
                          <h3 className="text-sm tracking-widest uppercase text-white">{guideSteps[guideStep].title}</h3>
                          <p className="text-xs text-white/50 leading-relaxed">{guideSteps[guideStep].desc}</p>
                        </motion.div>
                      </AnimatePresence>

                      {/* Carousel Controls */}
                      <div className="flex justify-center gap-2 mt-8">
                        {guideSteps.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setGuideStep(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === guideStep ? 'bg-white w-4' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Caution Warnings */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] tracking-widest uppercase text-[#ecab13] border-b border-[#ecab13]/30 pb-2">Caution</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg flex flex-col items-center text-center gap-2 border border-white/5">
                          <span className="material-symbols-outlined text-[#ecab13] text-xl">light_mode</span>
                          <span className="text-[10px] text-white/60 uppercase">Avoid Backlighting</span>
                        </div>
                        <div className="bg-[#1a1a1a] p-4 rounded-lg flex flex-col items-center text-center gap-2 border border-white/5">
                          <span className="material-symbols-outlined text-[#ecab13] text-xl">straighten</span>
                          <span className="text-[10px] text-white/60 uppercase">Keep Camera Level</span>
                        </div>
                        <div className="bg-[#1a1a1a] p-4 rounded-lg flex flex-col items-center text-center gap-2 border border-white/5">
                          <span className="material-symbols-outlined text-[#ecab13] text-xl">social_distance</span>
                          <span className="text-[10px] text-white/60 uppercase">Camera Distance</span>
                        </div>
                        <div className="bg-[#1a1a1a] p-4 rounded-lg flex flex-col items-center text-center gap-2 border border-white/5">
                          <span className="material-symbols-outlined text-[#ecab13] text-xl">face</span>
                          <span className="text-[10px] text-white/60 uppercase">Neutral Expression</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Q&A Accordion */}
                    {[
                      { q: "How long does rendering take?", a: "Typically 15-30 seconds depending on server load and image complexity." },
                      { q: "Is my data secure?", a: "Images are processed securely and deleted from our servers immediately after the fitting sequence concludes." },
                      { q: "Why did my fit fail?", a: "Common causes include poor lighting, obstructed clothing, or unsupported file formats." },
                      { q: "What formats are supported?", a: "We currently support high-resolution JPG and PNG files under 5MB." }
                    ].map((item, idx) => (
                      <details key={idx} className="group border-b border-white/10 pb-4">
                        <summary className="cursor-pointer text-xs uppercase tracking-widest text-white/80 list-none flex justify-between items-center pr-2">
                          {item.q}
                          <span className="text-white/30 group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="mt-3 text-xs text-white/50 leading-relaxed pr-4">
                          {item.a}
                        </p>
                      </details>
                    ))}
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
