'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportDrawer({ isOpen, onClose }: SupportDrawerProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: "Lighting", desc: "Ensure even, natural lighting on your face and body." },
    { title: "Pose", desc: "Stand straight with arms slightly away from your sides." },
    { title: "Clothing", desc: "Wear form-fitting clothes for accurate body mapping." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold tracking-widest text-[#C9B037]">SUPPORT HUB</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`text-sm tracking-wide transition-colors ${activeTab === 'guide' ? 'text-[#C9B037]' : 'text-gray-500 hover:text-white'}`}
                >
                  HOW TO FIT
                </button>
                <button
                  onClick={() => setActiveTab('caution')}
                  className={`text-sm tracking-wide transition-colors ${activeTab === 'caution' ? 'text-[#C9B037]' : 'text-gray-500 hover:text-white'}`}
                >
                  CAUTION
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`text-sm tracking-wide transition-colors ${activeTab === 'qa' ? 'text-[#C9B037]' : 'text-gray-500 hover:text-white'}`}
                >
                  Q&A
                </button>
              </div>

              {/* Content Area */}
              <div className="min-h-[400px]">
                {activeTab === 'guide' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="aspect-video bg-black/50 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                       <div className="text-4xl text-gray-700">📸</div>
                       <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                         {guideSteps.map((_, idx) => (
                           <div key={idx} className={`w-2 h-2 rounded-full ${idx === guideStep ? 'bg-[#C9B037]' : 'bg-white/20'}`} />
                         ))}
                       </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-white mb-2">{guideSteps[guideStep].title}</h3>
                      <p className="text-sm text-gray-400">{guideSteps[guideStep].desc}</p>
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setGuideStep(p => Math.max(0, p - 1))}
                        disabled={guideStep === 0}
                        className="text-xs text-gray-500 hover:text-white disabled:opacity-30"
                      >
                        ← PREV
                      </button>
                      <button
                        onClick={() => setGuideStep(p => Math.min(guideSteps.length - 1, p + 1))}
                        disabled={guideStep === guideSteps.length - 1}
                        className="text-xs text-[#C9B037] hover:text-white disabled:opacity-30"
                      >
                        NEXT →
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'caution' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex gap-4 items-start">
                      <div className="text-2xl pt-1 text-red-500">⚠️</div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Harsh Lighting</h4>
                        <p className="text-xs text-gray-400">Avoid strong backlighting or harsh shadows which interfere with 3D mapping.</p>
                      </div>
                    </div>
                    <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex gap-4 items-start">
                      <div className="text-2xl pt-1 text-yellow-500">📏</div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Camera Distance</h4>
                        <p className="text-xs text-gray-400">Keep the camera 2-3 meters away to capture full body proportions accurately.</p>
                      </div>
                    </div>
                     <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex gap-4 items-start">
                      <div className="text-2xl pt-1 text-orange-500">👕</div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Baggy Clothes</h4>
                        <p className="text-xs text-gray-400">Loose clothing prevents accurate body mesh generation. Wear tight fitting garments.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'qa' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                    {[
                      { q: "How long does processing take?", a: "Typically 10-15 seconds depending on server load." },
                      { q: "Is my data stored?", a: "Photos are processed in real-time and deleted immediately after generation." },
                      { q: "Can I use photos from my gallery?", a: "Yes, you can upload existing photos, just ensure they meet our lighting and pose guidelines." }
                    ].map((qa, i) => (
                      <details key={i} className="group bg-[#111] border border-white/10 rounded-xl">
                        <summary className="cursor-pointer p-4 text-sm font-medium text-white flex justify-between items-center">
                          {qa.q}
                          <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="p-4 pt-0 text-xs text-gray-400 border-t border-white/5 mt-2">
                          {qa.a}
                        </div>
                      </details>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
