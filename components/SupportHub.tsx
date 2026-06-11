"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'report' | 'legal' | 'guide' | 'faq'>('guide');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10 flex items-center justify-center hover:bg-[#007AFF]/20 hover:border-[#007AFF] transition-all z-50 group"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">ℹ️</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-lg font-bold tracking-widest text-white">SUPPORT HUB</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Guide
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'faq' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  FAQ
                </button>
                <button
                  onClick={() => setActiveTab('report')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'report' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Report
                </button>
                <button
                  onClick={() => setActiveTab('legal')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'legal' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Legal
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 text-gray-300">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <h3 className="text-white font-bold mb-4">How to use S_FIT NEO</h3>
                    <div className="space-y-4 text-sm">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-[#007AFF] font-bold">1. Lighting is Key</span>
                        <p className="mt-1 text-gray-400">Ensure you are well-lit from the front. Avoid harsh shadows on your face or body.</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-[#007AFF] font-bold">2. Clear Backgrounds</span>
                        <p className="mt-1 text-gray-400">Stand against a plain, contrasting background for the best AI cutout results.</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-[#007AFF] font-bold">3. Form-fitting Clothes</span>
                        <p className="mt-1 text-gray-400">Wear tighter clothing in your base photo so the AI can accurately model new garments over your frame.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4 text-sm">
                     <details className="group bg-white/5 p-4 rounded-lg border border-white/10 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="font-bold cursor-pointer text-white flex justify-between items-center">
                        Is my data private?
                        <span className="text-[#007AFF] group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-gray-400 leading-relaxed">Yes. Photos are processed securely for the fitting generation and are not stored permanently or shared with third parties.</p>
                    </details>
                    <details className="group bg-white/5 p-4 rounded-lg border border-white/10 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="font-bold cursor-pointer text-white flex justify-between items-center">
                        Why does it take so long?
                        <span className="text-[#007AFF] group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-gray-400 leading-relaxed">Our AI performs complex 3D modeling and texture wrapping to ensure a realistic fit, which requires heavy computation.</p>
                    </details>
                  </div>
                )}

                {activeTab === 'report' && (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported! Thank you.'); }}>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2">Issue Type</label>
                      <select className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none">
                        <option>Visual Glitch in Fitting</option>
                        <option>App Performance / Crash</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2">Description</label>
                      <textarea className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white text-sm h-32 focus:border-[#007AFF] outline-none" placeholder="Describe the issue..."></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#007AFF] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
                      Submit Report
                    </button>
                  </form>
                )}

                {activeTab === 'legal' && (
                  <div className="space-y-6 text-sm text-gray-400">
                    <div>
                      <h3 className="text-white font-bold mb-2">Terms of Service</h3>
                      <p className="leading-relaxed">By using S_FIT, you agree to our terms. This service is provided &quot;as is&quot; for virtual fitting purposes. Generated images are for personal use.</p>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">Privacy Policy</h3>
                      <p className="leading-relaxed">We process your uploaded images solely for the purpose of generating the virtual try-on experience. We do not use your personal images to train our baseline models without explicit consent.</p>
                    </div>
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
