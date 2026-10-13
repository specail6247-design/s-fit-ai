'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: "Step 1: Lighting", desc: "Ensure bright, even lighting on your face and body." },
    { title: "Step 2: Posture", desc: "Stand straight, arms slightly away from your body." },
    { title: "Step 3: Background", desc: "Use a clean, contrasting background if possible." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined" aria-hidden="true">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-[#0a0a0a] border-l border-white/10 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <span className="material-symbols-outlined" aria-hidden="true">close</span>
                </button>
              </div>

              <div className="flex border-b border-white/10 bg-black/20">
                <button onClick={() => setActiveTab('guide')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider ${activeTab === 'guide' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-gray-500 hover:text-gray-300'}`}>Guide</button>
                <button onClick={() => setActiveTab('caution')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider ${activeTab === 'caution' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-gray-500 hover:text-gray-300'}`}>Caution</button>
                <button onClick={() => setActiveTab('qa')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider ${activeTab === 'qa' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-gray-500 hover:text-gray-300'}`}>Q&A</button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <div className="aspect-video bg-black/50 border border-white/10 rounded-xl flex items-center justify-center text-4xl mb-6 relative overflow-hidden">
                      <span className="opacity-50">📸</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-center">
                         <h3 className="text-white font-bold">{guideSteps[guideStep].title}</h3>
                         <p className="text-sm text-gray-300 mt-1">{guideSteps[guideStep].desc}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setGuideStep(s => Math.max(0, s - 1))}
                        disabled={guideStep === 0}
                        className="p-2 border border-white/20 rounded-full disabled:opacity-30 hover:bg-white/10"
                      >
                         <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                      </button>
                      <div className="flex gap-2">
                        {guideSteps.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i === guideStep ? 'bg-cyber-lime' : 'bg-gray-600'}`} />
                        ))}
                      </div>
                      <button
                        onClick={() => setGuideStep(s => Math.min(guideSteps.length - 1, s + 1))}
                        disabled={guideStep === guideSteps.length - 1}
                        className="p-2 border border-white/20 rounded-full disabled:opacity-30 hover:bg-white/10"
                      >
                         <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-4">
                    <div className="p-4 border border-red-500/30 bg-red-500/5 rounded-xl flex gap-4">
                      <span className="material-symbols-outlined text-red-400" aria-hidden="true">light_mode</span>
                      <div>
                        <h4 className="font-bold text-red-200">Avoid Backlighting</h4>
                        <p className="text-sm text-gray-400 mt-1">Light source should be in front of you, not behind.</p>
                      </div>
                    </div>
                    <div className="p-4 border border-orange-500/30 bg-orange-500/5 rounded-xl flex gap-4">
                      <span className="material-symbols-outlined text-orange-400" aria-hidden="true">photo_camera</span>
                      <div>
                        <h4 className="font-bold text-orange-200">Camera Distance</h4>
                        <p className="text-sm text-gray-400 mt-1">Stand 1.5 - 2 meters away from the camera for full body detection.</p>
                      </div>
                    </div>
                    <div className="p-4 border border-yellow-500/30 bg-yellow-500/5 rounded-xl flex gap-4">
                      <span className="material-symbols-outlined text-yellow-400" aria-hidden="true">checkroom</span>
                      <div>
                        <h4 className="font-bold text-yellow-200">Clothing</h4>
                        <p className="text-sm text-gray-400 mt-1">Wear form-fitting clothes for accurate body mapping.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-2">
                    <details className="group border border-white/10 rounded-xl bg-black/20 open:bg-black/40 transition-colors">
                      <summary className="p-4 cursor-pointer font-bold flex justify-between items-center list-none">
                        How accurate is the sizing?
                        <span className="material-symbols-outlined group-open:rotate-180 transition-transform" aria-hidden="true">expand_more</span>
                      </summary>
                      <div className="p-4 pt-0 text-sm text-gray-400">Our AI maps your body to standard brand sizings with 94% accuracy.</div>
                    </details>
                    <details className="group border border-white/10 rounded-xl bg-black/20 open:bg-black/40 transition-colors">
                      <summary className="p-4 cursor-pointer font-bold flex justify-between items-center list-none">
                        Is my data private?
                        <span className="material-symbols-outlined group-open:rotate-180 transition-transform" aria-hidden="true">expand_more</span>
                      </summary>
                      <div className="p-4 pt-0 text-sm text-gray-400">Yes. Photos are processed temporarily and never stored without explicit consent.</div>
                    </details>
                    <details className="group border border-white/10 rounded-xl bg-black/20 open:bg-black/40 transition-colors">
                      <summary className="p-4 cursor-pointer font-bold flex justify-between items-center list-none">
                        Can I try on my own clothes?
                        <span className="material-symbols-outlined group-open:rotate-180 transition-transform" aria-hidden="true">expand_more</span>
                      </summary>
                      <div className="p-4 pt-0 text-sm text-gray-400">Upload a clear photo of the garment on a flat surface or hanger.</div>
                    </details>
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