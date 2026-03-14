'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportOpen, setSupportOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'report'>('guide');

  // Dummy FAQ state for accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Why is the result image blurry?", a: "Ensure you upload high-resolution photos. Low lighting or far distance can cause blurriness." },
    { q: "Can I try clothes on multiple people?", a: "Currently, our AI works best with single-person photos facing forward." },
    { q: "What's the maximum file size for uploads?", a: "We accept JPG and PNG files up to 5MB." }
  ];

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSupportOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-tight">Support Hub</h2>
              <button
                onClick={() => setSupportOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close support hub"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
              >
                Guide
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'faq' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'report' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-white'}`}
              >
                Report Issue
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">

              {/* GUIDE TAB */}
              {activeTab === 'guide' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-widest">How to get the best fit</h3>

                    {/* Visual Guide Carousel (Simplified) */}
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                      <div className="snap-center shrink-0 w-48 bg-black/50 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center space-y-2">
                        <span className="text-3xl">🧍</span>
                        <div className="text-sm font-bold">1. Front Facing</div>
                        <div className="text-xs text-gray-400">Stand straight facing the camera</div>
                      </div>
                      <div className="snap-center shrink-0 w-48 bg-black/50 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center space-y-2">
                        <span className="text-3xl">👕</span>
                        <div className="text-sm font-bold">2. Clear Garment</div>
                        <div className="text-xs text-gray-400">Use a flat, front-facing garment photo</div>
                      </div>
                      <div className="snap-center shrink-0 w-48 bg-black/50 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center space-y-2">
                        <span className="text-3xl">⚡️</span>
                        <div className="text-sm font-bold">3. Try it on</div>
                        <div className="text-xs text-gray-400">Let the AI generate your fitting</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">Cautions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/50 border border-white/10 rounded-xl p-3 flex gap-3 items-center">
                        <span className="text-xl">💡</span>
                        <span className="text-xs text-gray-300">Avoid harsh shadows</span>
                      </div>
                      <div className="bg-black/50 border border-white/10 rounded-xl p-3 flex gap-3 items-center">
                        <span className="text-xl">📏</span>
                        <span className="text-xs text-gray-300">Don&apos;t stand too far</span>
                      </div>
                      <div className="bg-black/50 border border-white/10 rounded-xl p-3 flex gap-3 items-center">
                        <span className="text-xl">👤</span>
                        <span className="text-xs text-gray-300">No group photos</span>
                      </div>
                      <div className="bg-black/50 border border-white/10 rounded-xl p-3 flex gap-3 items-center">
                        <span className="text-xl">👚</span>
                        <span className="text-xs text-gray-300">Wear fitted clothes</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* FAQ TAB */}
              {activeTab === 'faq' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 bg-black/30 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-left p-4 font-semibold text-sm flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        {faq.q}
                        <span className="text-[#007AFF]">{openFaq === i ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* REPORT TAB */}
              {activeTab === 'report' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <p className="text-xs text-gray-400">Encountered an issue or a bug? Let us know so we can fix it.</p>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Report submitted!"); setSupportOpen(false); }}>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-300">Issue Type</label>
                      <select className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm focus:border-[#007AFF] outline-none">
                        <option>Bug/Error</option>
                        <option>Poor Image Result</option>
                        <option>UI/UX Feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-300">Description</label>
                      <textarea
                        className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm min-h-[120px] focus:border-[#007AFF] outline-none resize-none"
                        placeholder="Please describe the issue in detail..."
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors">
                      Submit Report
                    </button>
                  </form>
                </motion.div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
