'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: 'Upload Photo', desc: 'Ensure good lighting and front-facing angle.' },
    { title: 'Select Garment', desc: 'Choose a garment with a clear, flat view.' },
    { title: 'Try On', desc: 'Let the AI generate your fitting in seconds.' }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Support Hub"
        className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full border border-white/10 shadow-lg transition-all"
      >
        <span className="text-xl">ℹ️</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-black border-l border-white/10 z-50 p-6 flex flex-col shadow-2xl overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold uppercase tracking-widest text-white">Support Hub</h2>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Support Hub"
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2 mb-6 border-b border-white/10 pb-2">
              <button onClick={() => setActiveTab('guide')} className={`text-xs uppercase tracking-wider px-2 py-1 ${activeTab === 'guide' ? 'text-cyber-lime border-b border-cyber-lime' : 'text-gray-500'}`}>Guide</button>
              <button onClick={() => setActiveTab('caution')} className={`text-xs uppercase tracking-wider px-2 py-1 ${activeTab === 'caution' ? 'text-cyber-lime border-b border-cyber-lime' : 'text-gray-500'}`}>Caution</button>
              <button onClick={() => setActiveTab('faq')} className={`text-xs uppercase tracking-wider px-2 py-1 ${activeTab === 'faq' ? 'text-cyber-lime border-b border-cyber-lime' : 'text-gray-500'}`}>FAQ</button>
            </div>

            <div className="flex-1">
              {activeTab === 'guide' && (
                <div className="space-y-4">
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10 min-h-[150px] flex flex-col justify-center text-center">
                    <h3 className="text-sm font-bold text-cyber-lime mb-2">{guideSteps[guideStep].title}</h3>
                    <p className="text-xs text-gray-400">{guideSteps[guideStep].desc}</p>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <button onClick={() => setGuideStep(Math.max(0, guideStep - 1))} disabled={guideStep === 0} className="text-xs text-gray-500 disabled:opacity-50">← Prev</button>
                    <div className="flex gap-1">
                      {guideSteps.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === guideStep ? 'bg-cyber-lime' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    <button onClick={() => setGuideStep(Math.min(guideSteps.length - 1, guideStep + 1))} disabled={guideStep === guideSteps.length - 1} className="text-xs text-gray-500 disabled:opacity-50">Next →</button>
                  </div>
                </div>
              )}

              {activeTab === 'caution' && (
                <div className="space-y-4">
                  <div className="flex gap-4 items-start bg-red-950/30 p-4 rounded-xl border border-red-500/20">
                    <span className="text-xl">💡</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Lighting Matters</h4>
                      <p className="text-xs text-gray-400">Avoid harsh shadows or strong backlighting.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-yellow-950/30 p-4 rounded-xl border border-yellow-500/20">
                    <span className="text-xl">📸</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Camera Distance</h4>
                      <p className="text-xs text-gray-400">Keep the camera at eye level, capturing head to waist.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-2">
                  <details className="bg-white/5 border border-white/10 rounded-lg p-3 group">
                    <summary className="text-sm font-bold text-white cursor-pointer list-none flex justify-between">
                      How long does it take? <span className="group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-xs text-gray-400 mt-2">Usually between 5 to 10 seconds depending on server load.</p>
                  </details>
                  <details className="bg-white/5 border border-white/10 rounded-lg p-3 group">
                    <summary className="text-sm font-bold text-white cursor-pointer list-none flex justify-between">
                      What formats are supported? <span className="group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-xs text-gray-400 mt-2">We support JPG and PNG files up to 5MB.</p>
                  </details>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
