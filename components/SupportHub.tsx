'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const FAQS = [
  {
    q: "How does the Virtual Fitting work?",
    a: "We use advanced AI to analyze your body proportions and map the garment onto your digital twin in real-time."
  },
  {
    q: "Is my photo data safe?",
    a: "Absolutely. Your photos are processed securely and deleted immediately after the session. We do not store biometric data without consent."
  },
  {
    q: "What is the best lighting?",
    a: "Natural, even lighting is best. Avoid strong backlights or deep shadows for the most accurate body tracking."
  },
  {
    q: "Can I try multiple items?",
    a: "Yes! Unlock the 'Digital Twin' mode to save your avatar and try on unlimited items instantly."
  }
];

const GUIDES = [
  {
    title: "Position Camera",
    desc: "Place your device at waist height for the best proportion analysis.",
    icon: "photo_camera"
  },
  {
    title: "Stand Clear",
    desc: "Ensure your full body is visible within the frame, from head to toe.",
    icon: "accessibility_new"
  },
  {
    title: "Strike a Pose",
    desc: "Stand in an A-pose (arms slightly out) for initial calibration.",
    icon: "emoji_people"
  }
];

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [currentGuide, setCurrentGuide] = useState(0);

  const toggleOpen = () => setSupportHubOpen(!isSupportHubOpen);

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleOpen}
            className="fixed inset-0 bg-black/50 z-[90] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0F0F0F] border-l border-[#333] z-[100] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#333] flex justify-between items-center bg-[#0a0a0a]">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wider uppercase font-mono">Support Hub</h2>
                <p className="text-[10px] text-[#666] uppercase tracking-[0.2em]">Service Essentials</p>
              </div>
              <button
                onClick={toggleOpen}
                className="p-2 hover:bg-[#222] rounded-full transition-colors text-gray-400 hover:text-white"
                aria-label="Close Support Hub"
              >
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#333]">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'guide' ? 'bg-[#1a1a1a] text-white border-b-2 border-[#007AFF]' : 'text-[#666] hover:text-white'
                }`}
              >
                How to Fit
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'faq' ? 'bg-[#1a1a1a] text-white border-b-2 border-[#007AFF]' : 'text-[#666] hover:text-white'
                }`}
              >
                Q&A
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

              {activeTab === 'guide' && (
                <div className="space-y-8">
                  {/* Carousel */}
                  <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333] relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-symbols-outlined text-6xl">school</span>
                     </div>

                     <div className="relative z-10 text-center py-8">
                        <div className="w-16 h-16 bg-[#007AFF]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#007AFF]">
                           <span className="material-symbols-outlined text-3xl">{GUIDES[currentGuide].icon}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{GUIDES[currentGuide].title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed px-4">{GUIDES[currentGuide].desc}</p>
                     </div>

                     {/* Carousel Controls */}
                     <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => setCurrentGuide(prev => (prev === 0 ? GUIDES.length - 1 : prev - 1))}
                          className="p-2 hover:bg-[#333] rounded-full text-gray-400 hover:text-white"
                          aria-label="Previous Tip"
                        >
                          <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                        </button>
                        <div className="flex gap-2" role="tablist">
                          {GUIDES.map((_, i) => (
                            <div
                              key={i}
                              role="tab"
                              aria-selected={i === currentGuide}
                              aria-label={`Guide step ${i + 1}`}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentGuide ? 'bg-[#007AFF] w-4' : 'bg-[#333]'}`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => setCurrentGuide(prev => (prev === GUIDES.length - 1 ? 0 : prev + 1))}
                          className="p-2 hover:bg-[#333] rounded-full text-gray-400 hover:text-white"
                          aria-label="Next Tip"
                        >
                           <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                        </button>
                     </div>
                  </div>

                  {/* Cautions */}
                  <div className="space-y-4">
                     <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest">Crucial Warnings</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-red-900/30 flex items-start gap-3">
                           <span className="material-symbols-outlined text-orange-500">wb_sunny</span>
                           <div>
                              <div className="text-xs font-bold text-white mb-1">Lighting</div>
                              <p className="text-[10px] text-gray-500 leading-tight">Avoid strong backlight. Face the light source.</p>
                           </div>
                        </div>
                        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-red-900/30 flex items-start gap-3">
                           <span className="material-symbols-outlined text-orange-500">social_distance</span>
                           <div>
                              <div className="text-xs font-bold text-white mb-1">Distance</div>
                              <p className="text-[10px] text-gray-500 leading-tight">Keep 2-3 meters from the camera.</p>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4">
                   {FAQS.map((faq, i) => (
                      <div key={i} className="border border-[#333] rounded-xl overflow-hidden bg-[#1a1a1a]">
                         <details className="group">
                            <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#222] transition-colors">
                               <span className="text-sm font-medium text-white">{faq.q}</span>
                               <span className="material-symbols-outlined text-gray-500 group-open:rotate-180 transition-transform">expand_more</span>
                            </summary>
                            <div className="px-4 pb-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-[#222] mt-2 pt-2">
                               {faq.a}
                            </div>
                         </details>
                      </div>
                   ))}
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#333] bg-[#0a0a0a]">
               <button className="w-full py-3 bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold rounded-xl transition-colors text-sm uppercase tracking-wider">
                  Contact Support Agent
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
