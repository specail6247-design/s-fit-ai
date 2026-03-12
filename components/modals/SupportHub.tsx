'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function SupportHub() {
  const { isSupportHubOpen, setIsSupportHubOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'report'>('guide');

  if (!isSupportHubOpen) return null;

  const handleClose = () => {
    setIsSupportHubOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={handleClose}
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-[#111] border-l border-white/10 shadow-2xl flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Support Hub</h2>
              <p className="text-xs text-gray-400 mt-1">Get help and resources</p>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10">
            {['guide', 'faq', 'report'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'guide' | 'faq' | 'report')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab === 'guide' ? 'Quick Guide' : tab === 'faq' ? 'FAQ' : 'Report Issue'}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
            {activeTab === 'guide' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Carousel Guide */}
                <div>
                  <h3 className="text-sm font-bold text-[#007AFF] mb-4 uppercase">How to use</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="font-bold text-sm mb-1">1. Identification</div>
                      <p className="text-xs text-gray-400">Upload a clear photo of yourself. Full body or upper body shots work best.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="font-bold text-sm mb-1">2. Target Garment</div>
                      <p className="text-xs text-gray-400">Select the garment you want to try on. Ensure it has a clear background.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="font-bold text-sm mb-1">3. Generate</div>
                      <p className="text-xs text-gray-400">Click &quot;TRY IT ON&quot; to see the AI magic happen. Results take 5-10 seconds.</p>
                    </div>
                  </div>
                </div>

                {/* Cautions */}
                <div>
                  <h3 className="text-sm font-bold text-orange-400 mb-4 uppercase">Best Practices</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                      <span className="text-2xl mb-2 block">☀️</span>
                      <div className="text-xs font-bold text-gray-300">Good Lighting</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                      <span className="text-2xl mb-2 block">📏</span>
                      <div className="text-xs font-bold text-gray-300">Proper Distance</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                      <span className="text-2xl mb-2 block">👕</span>
                      <div className="text-xs font-bold text-gray-300">Unobstructed</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                      <span className="text-2xl mb-2 block">📸</span>
                      <div className="text-xs font-bold text-gray-300">High Resolution</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <details className="group">
                    <summary className="p-4 cursor-pointer bg-white/5 font-bold text-sm flex justify-between items-center text-gray-300 group-hover:text-white transition-colors list-none">
                      Is my data safe?
                      <span className="text-[#007AFF] transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-xs text-gray-400 border-t border-white/10 bg-[#0a0a0a]">
                      Yes. Photos are processed securely and not shared. We use industry-standard encryption to protect your data.
                    </div>
                  </details>
                </div>
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <details className="group">
                    <summary className="p-4 cursor-pointer bg-white/5 font-bold text-sm flex justify-between items-center text-gray-300 group-hover:text-white transition-colors list-none">
                      Why does generation take time?
                      <span className="text-[#007AFF] transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-xs text-gray-400 border-t border-white/10 bg-[#0a0a0a]">
                      Our advanced AI models are meticulously crafting a highly realistic representation of the garment on your unique body shape, which requires intensive computational power.
                    </div>
                  </details>
                </div>
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <details className="group">
                    <summary className="p-4 cursor-pointer bg-white/5 font-bold text-sm flex justify-between items-center text-gray-300 group-hover:text-white transition-colors list-none">
                      Can I use full body images?
                      <span className="text-[#007AFF] transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-xs text-gray-400 border-t border-white/10 bg-[#0a0a0a]">
                      Yes! Full body images provide the best context for the AI, especially for pants and full outfits.
                    </div>
                  </details>
                </div>
              </div>
            )}

            {activeTab === 'report' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Issue reported successfully!"); }}>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Issue Type</label>
                    <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none">
                      <option>Generation Failed</option>
                      <option>Poor Quality Result</option>
                      <option>UI/UX Bug</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Description</label>
                    <textarea
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none min-h-[120px]"
                      placeholder="Please describe the issue in detail..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors">
                    Submit Report
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
