'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const USER_GUIDE = [
  {
    title: 'Prepare Your Space',
    desc: 'Find a well-lit area with a clean background. Avoid strong backlighting.',
    icon: 'light_mode',
  },
  {
    title: 'Capture Your Look',
    desc: 'Stand 2-3 meters away. Ensure your full body is visible in the frame.',
    icon: 'photo_camera',
  },
  {
    title: 'Select & Style',
    desc: 'Browse the collection and tap to try on. Mix and match with ease.',
    icon: 'checkroom',
  },
];

const CAUTIONS = [
  {
    icon: 'warning',
    text: 'Avoid loose or baggy clothing for better body mapping.',
  },
  {
    icon: 'do_not_disturb',
    text: 'Ensure no other people are in the frame.',
  },
  {
    icon: 'visibility_off',
    text: 'Low light conditions may affect tracking accuracy.',
  },
];

const FAQS = [
  {
    q: 'How accurate is the sizing?',
    a: 'Our AI analyzes your body measurements to recommend the best fit with 95% accuracy.',
  },
  {
    q: 'Is my photo stored?',
    a: 'Photos are processed in real-time and deleted immediately after the session unless saved to your profile.',
  },
  {
    q: 'Can I try on accessories?',
    a: 'Currently, we support tops, bottoms, and full-body outfits. Accessories are coming soon.',
  },
];

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen, activeSupportTab, setActiveSupportTab } = useStore();
  const [guideIndex, setGuideIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const nextGuide = () => setGuideIndex((prev) => (prev + 1) % USER_GUIDE.length);
  const prevGuide = () => setGuideIndex((prev) => (prev - 1 + USER_GUIDE.length) % USER_GUIDE.length);

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSupportHubOpen(false)}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[91] h-full w-full max-w-[400px] bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0a0a0a]">
              <h2 className="text-xl font-bold tracking-tight text-white">Support Hub</h2>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {(['guide', 'caution', 'faq'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSupportTab(tab)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                    activeSupportTab === tab ? 'text-[#007AFF]' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {tab}
                  {activeSupportTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#007AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <AnimatePresence mode="wait">
                {activeSupportTab === 'guide' && (
                  <motion.div
                    key="guide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-[#007AFF] mb-4 border border-white/10">
                        <span className="material-symbols-outlined text-4xl">{USER_GUIDE[guideIndex].icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{USER_GUIDE[guideIndex].title}</h3>
                      <p className="text-gray-400 leading-relaxed px-4">{USER_GUIDE[guideIndex].desc}</p>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                      <button onClick={prevGuide} className="p-2 hover:bg-white/10 rounded-full text-white">
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                      <div className="flex gap-2">
                        {USER_GUIDE.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i === guideIndex ? 'bg-[#007AFF]' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      <button onClick={nextGuide} className="p-2 hover:bg-white/10 rounded-full text-white">
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeSupportTab === 'caution' && (
                  <motion.div
                    key="caution"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {CAUTIONS.map((item, i) => (
                      <div key={i} className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-4 items-start">
                        <span className="material-symbols-outlined text-red-400 shrink-0">{item.icon}</span>
                        <p className="text-sm text-gray-300 leading-relaxed">{item.text}</p>
                      </div>
                    ))}

                    <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="text-white text-sm font-bold mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#007AFF]">info</span>
                        Pro Tip
                      </h4>
                      <p className="text-xs text-gray-400">
                        For best results, use a plain background and ensure good lighting on your face and body.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeSupportTab === 'faq' && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2"
                  >
                    {FAQS.map((item, i) => (
                      <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleFaq(i)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-bold text-white">{item.q}</span>
                          <span className={`material-symbols-outlined text-gray-400 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`}>
                            expand_more
                          </span>
                        </button>
                        <AnimatePresence>
                          {openFaqIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
