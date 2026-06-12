'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // FAQ Data
  const faqs = [
    {
      q: "How accurate is the sizing?",
      a: "Our virtual try-on uses precise 3D mapping to give you a highly accurate representation. However, material stretch and personal fit preference may vary slightly."
    },
    {
      q: "Why does the image look slightly distorted?",
      a: "Ensure you are taking the photo straight-on, at eye level, in good lighting. Distorted angles can affect the AI's rendering."
    },
    {
      q: "Is my photo data saved or shared?",
      a: "No. Photos are processed securely for the try-on session only and are never shared or permanently stored."
    }
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-[101] flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-lime/5 rounded-full blur-2xl pointer-events-none" />
              <h2 className="text-xl font-display font-bold tracking-[0.2em] text-pure-white uppercase">
                Support Hub
              </h2>
              <button
                onClick={onClose}
                className="text-soft-gray hover:text-cyber-lime transition-colors p-2"
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-mono tracking-widest uppercase transition-colors ${
                  activeTab === 'guide'
                    ? 'text-cyber-lime border-b-2 border-cyber-lime bg-white/5'
                    : 'text-soft-gray hover:text-white hover:bg-white/5'
                }`}
              >
                Guide
              </button>
              <button
                onClick={() => setActiveTab('caution')}
                className={`flex-1 py-4 text-xs font-mono tracking-widest uppercase transition-colors ${
                  activeTab === 'caution'
                    ? 'text-cyber-lime border-b-2 border-cyber-lime bg-white/5'
                    : 'text-soft-gray hover:text-white hover:bg-white/5'
                }`}
              >
                Caution
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 text-xs font-mono tracking-widest uppercase transition-colors ${
                  activeTab === 'faq'
                    ? 'text-cyber-lime border-b-2 border-cyber-lime bg-white/5'
                    : 'text-soft-gray hover:text-white hover:bg-white/5'
                }`}
              >
                Q&A
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">

              {/* User Guide Tab */}
              {activeTab === 'guide' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <p className="text-sm text-soft-gray mb-8">Follow these steps for the perfect virtual fit.</p>

                  <div className="space-y-6 relative">
                    <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />

                    {[
                      { step: 1, title: 'Upload Photo', desc: 'Select a clear, well-lit photo of yourself.' },
                      { step: 2, title: 'Select Garment', desc: 'Choose a target garment to try on.' },
                      { step: 3, title: 'AI Processing', desc: 'Our engine maps the garment to your body.' },
                      { step: 4, title: 'Review Fit', desc: 'Examine the 3D result and check the size guide.' }
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-void-black border border-cyber-lime flex items-center justify-center text-cyber-lime font-mono text-xs font-bold shrink-0 shadow-[0_0_10px_rgba(204,255,0,0.2)]">
                          {item.step}
                        </div>
                        <div className="pt-1.5">
                          <h4 className="text-white text-sm font-bold tracking-wide uppercase mb-1">{item.title}</h4>
                          <p className="text-xs text-soft-gray leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Caution Tab */}
              {activeTab === 'caution' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       <span className="text-6xl">💡</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-orange-500">💡</span>
                      <h3 className="text-white text-sm font-bold uppercase tracking-wider">Lighting Warning</h3>
                    </div>
                    <p className="text-xs text-soft-gray leading-relaxed">
                      Avoid extreme backlighting or deep shadows. Even, natural lighting produces the most accurate material rendering and body mapping.
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       <span className="text-6xl">📏</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-blue-500">📏</span>
                      <h3 className="text-white text-sm font-bold uppercase tracking-wider">Distance & Angle</h3>
                    </div>
                    <p className="text-xs text-soft-gray leading-relaxed">
                      Stand approximately 4-6 feet from the camera. The camera should be positioned at chest-height, perfectly level (not tilted up or down).
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl p-5 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       <span className="text-6xl">👕</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-red-500">👕</span>
                      <h3 className="text-white text-sm font-bold uppercase tracking-wider">Clothing Overlap</h3>
                    </div>
                    <p className="text-xs text-soft-gray leading-relaxed">
                      Wear tight-fitting, solid-color base layers. Baggy clothes will confuse the AI contour mapping and result in poor virtual fits.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* FAQ Tab */}
              {activeTab === 'faq' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm text-pure-white font-medium">{faq.q}</span>
                        <span className={`text-cyber-lime transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/5 mt-2">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Data Safety Badge */}
                  <div className="mt-12 p-4 border border-green-500/20 bg-green-500/5 rounded-xl flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">🔒</span>
                    <div>
                      <h4 className="text-green-500 text-xs font-bold uppercase tracking-wider mb-1">Data Safety Verified</h4>
                      <p className="text-[10px] text-soft-gray leading-relaxed">
                        Photos are processed securely and not shared. S_FIT AI adheres strictly to our privacy compliance protocol.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50">
               <button className="w-full py-3 border border-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-white/10 transition-colors">
                 Report Issue
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
