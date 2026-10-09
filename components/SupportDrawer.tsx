'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 p-6 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold tracking-widest uppercase text-white">Support Hub</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white p-2">✕</button>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-sm text-[#007AFF] font-bold mb-4 uppercase tracking-widest">How to Fit</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x">
                    {[
                      { step: 1, title: 'Upload Photo', desc: 'Clear, front-facing.' },
                      { step: 2, title: 'Select Garment', desc: 'Flat lay preferred.' },
                      { step: 3, title: 'AI Process', desc: 'Wait for mapping.' }
                    ].map((item) => (
                      <div key={item.step} className="min-w-[150px] snap-center bg-black/50 p-4 rounded-lg border border-white/5">
                        <div className="text-[#007AFF] text-xs font-mono mb-2">STEP 0{item.step}</div>
                        <div className="font-bold text-sm text-white">{item.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm text-[#007AFF] font-bold mb-4 uppercase tracking-widest">Caution</h3>
                <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400">💡</span>
                    <p className="text-xs text-gray-300">Avoid harsh backlighting. Ensure even lighting on your face and body.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400">📏</span>
                    <p className="text-xs text-gray-300">Stand exactly 2 meters from the camera for accurate proportion mapping.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm text-[#007AFF] font-bold mb-4 uppercase tracking-widest">Q&A</h3>
                <div className="space-y-2">
                  {[
                    { q: 'How long does it take?', a: 'Processing usually takes 5-10 seconds depending on server load.' },
                    { q: 'Are my photos saved?', a: 'No, photos are processed in memory and immediately deleted.' }
                  ].map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
                      <button
                        className="w-full p-4 text-left flex justify-between items-center bg-white/5 hover:bg-white/10 text-sm font-bold text-white"
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      >
                        {faq.q}
                        <span className="text-gray-400">{activeFaq === idx ? '−' : '+'}</span>
                      </button>
                      {activeFaq === idx && (
                        <div className="p-4 bg-black/50 text-xs text-gray-300 border-t border-white/10">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
