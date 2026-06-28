'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'Why is the fit sometimes inaccurate?', a: 'Virtual try-on relies on pose estimation. Baggy clothing in your uploaded photo can obscure your true body shape.' },
    { q: 'What lighting is best?', a: 'Natural, even lighting from the front. Avoid harsh backlighting or deep shadows.' },
    { q: 'Are my photos saved?', a: 'No. User photos are processed ephemerally and deleted immediately after the generation completes.' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 size-12 bg-[#1a1a1a] hover:bg-[#2d2d2d] border border-[#2d2d2d] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-zinc-400 hover:text-[#ecab13] transition-colors z-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ecab13]"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined" aria-hidden="true">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <React.Fragment key="modal-container">
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-[#2d2d2d] shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-white text-sm font-bold tracking-[0.2em] uppercase">Support Hub</h2>
                  <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">✕</button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-[#2d2d2d] pb-4 mb-8 overflow-x-auto no-scrollbar">
                  {['guide', 'caution', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as 'guide' | 'caution' | 'faq')}
                      className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors rounded-full ${
                        activeTab === tab ? 'bg-[#ecab13] text-[#0a0a0a]' : 'bg-[#1a1a1a] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                  {activeTab === 'guide' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2d2d2d] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <span className="material-symbols-outlined text-6xl">photo_camera</span>
                        </div>
                        <h3 className="text-[#ecab13] text-xs font-bold tracking-widest uppercase mb-4 relative z-10">Step 1: The Photo</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed relative z-10">Stand 6 feet away from the camera. Wear form-fitting clothing (like activewear) so the AI can accurately map your body proportions.</p>
                      </div>

                      <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2d2d2d] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <span className="material-symbols-outlined text-6xl">checkroom</span>
                        </div>
                        <h3 className="text-[#ecab13] text-xs font-bold tracking-widest uppercase mb-4 relative z-10">Step 2: The Garment</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed relative z-10">Upload a clear, front-facing image of the garment you wish to try on. Lay-flat images or ghost mannequins work best.</p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'caution' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-red-900/10 border border-red-900/30 rounded-xl">
                        <span className="material-symbols-outlined text-red-500 mt-1">warning</span>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Avoid Baggy Clothes</h4>
                          <p className="text-zinc-400 text-sm">Baggy clothing distorts the body mesh, resulting in the new garment appearing warped or oversized.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] border border-[#2d2d2d] rounded-xl">
                        <span className="material-symbols-outlined text-[#ecab13] mt-1">light_mode</span>
                        <div>
                          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Lighting Matters</h4>
                          <p className="text-zinc-400 text-sm">Ensure your face and body are well-lit. Shadows cast across the torso can confuse the segmentation model.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'faq' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      {faqs.map((faq, i) => (
                        <div key={i} className="border border-[#2d2d2d] bg-[#1a1a1a] rounded-xl overflow-hidden transition-colors">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                            className="w-full text-left p-4 flex items-center justify-between hover:bg-[#2d2d2d]/50"
                          >
                            <span className="text-sm text-white font-medium">{faq.q}</span>
                            <span className="material-symbols-outlined text-zinc-500 text-sm">
                              {expandedFaq === i ? 'remove' : 'add'}
                            </span>
                          </button>
                          {expandedFaq === i && (
                            <div className="p-4 pt-0 border-t border-[#2d2d2d]/50">
                              <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
