'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: "01. Stand Clear", desc: "Ensure your full body is visible." },
    { title: "02. Lighting", desc: "Face a natural light source." },
    { title: "03. Fit", desc: "Wear form-fitting clothes for accuracy." }
  ];

  const faqs = [
    { q: "Is my data secure?", a: "Yes, photos are deleted immediately after processing." },
    { q: "What brands are supported?", a: "We support select luxury and SPA line items." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-10 h-10 bg-black/50 border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-black flex items-center justify-center backdrop-blur-md z-40 transition-all font-mono text-sm"
        aria-label="Support Hub"
      >
        ?
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-[#0a0a0a] border-l border-white/10 z-50 p-6 flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-mono tracking-widest text-white">SUPPORT HUB</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
              </div>

              <div className="flex gap-4 border-b border-white/10 mb-6">
                {(['guide', 'caution', 'faq'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-xs tracking-widest uppercase transition-colors ${activeTab === tab ? 'text-cyber-lime border-b border-cyber-lime' : 'text-white/50 hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <div className="h-48 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="text-cyber-lime font-mono mb-2">{guideSteps[guideStep].title}</h3>
                      <p className="text-sm text-white/70">{guideSteps[guideStep].desc}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setGuideStep(s => Math.max(0, s - 1))}
                        disabled={guideStep === 0}
                        className="text-xs text-white/50 hover:text-white disabled:opacity-20"
                      >
                        ← PREV
                      </button>
                      <div className="flex gap-2">
                        {guideSteps.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i === guideStep ? 'bg-cyber-lime' : 'bg-white/20'}`} />
                        ))}
                      </div>
                      <button
                        onClick={() => setGuideStep(s => Math.min(guideSteps.length - 1, s + 1))}
                        disabled={guideStep === guideSteps.length - 1}
                        className="text-xs text-white/50 hover:text-white disabled:opacity-20"
                      >
                        NEXT →
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-4">
                    <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-lg flex gap-4 items-start">
                      <span className="text-red-500 text-xl">⚠️</span>
                      <div>
                        <h4 className="text-red-400 font-bold text-sm mb-1">Lighting Matters</h4>
                        <p className="text-xs text-white/70">Avoid backlighting or extremely dark rooms. The AI needs to see the fabric details.</p>
                      </div>
                    </div>
                    <div className="p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-lg flex gap-4 items-start">
                      <span className="text-yellow-500 text-xl">📏</span>
                      <div>
                        <h4 className="text-yellow-400 font-bold text-sm mb-1">Camera Distance</h4>
                        <p className="text-xs text-white/70">Ensure the camera is at least 3-4 feet away to capture accurate proportions.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group bg-white/5 border border-white/10 rounded-lg">
                        <summary className="p-4 text-sm font-medium cursor-pointer flex justify-between items-center text-white/90">
                          {faq.q}
                          <span className="text-white/50 group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <div className="p-4 pt-0 text-xs text-white/60">
                          {faq.a}
                        </div>
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
