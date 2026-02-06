'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

// Icons
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ecab13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');

  // Carousel State
  const [currentStep, setCurrentStep] = useState(0);
  const GUIDE_STEPS = [
    {
      title: "Prepare Your Space",
      desc: "Ensure you are in a well-lit room with a plain background for best results.",
      emoji: "💡"
    },
    {
      title: "Position Camera",
      desc: "Place your device at waist height. Ensure your full body is visible in the frame.",
      emoji: "📱"
    },
    {
      title: "Strike a Pose",
      desc: "Stand in an 'A-Pose' (arms slightly apart) and hold still for scanning.",
      emoji: "🧍"
    },
  ];

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % GUIDE_STEPS.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + GUIDE_STEPS.length) % GUIDE_STEPS.length);

  // FAQ Data
  const FAQS = [
    { q: "How accurate is the sizing?", a: "Our AI is accurate within 1-2cm for standard fits. Loose clothing may vary." },
    { q: "Is my photo saved?", a: "No. Photos are processed in RAM and discarded immediately after your session." },
    { q: "Why is the model glitching?", a: "Ensure you have good lighting and contrast between you and the background." },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const toggleFaq = (idx: number) => setOpenFaqIndex(openFaqIndex === idx ? null : idx);

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSupportHubOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[75] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
              <div>
                <h2 className="text-xl font-cinzel text-white">SUPPORT HUB</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Assistance & Guide</p>
              </div>
              <button onClick={() => setSupportHubOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <CloseIcon />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex p-2 gap-2 bg-black/20">
              {(['guide', 'caution', 'faq'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    activeTab === tab
                      ? 'bg-white text-black shadow-lg'
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">

              {/* --- USER GUIDE (CAROUSEL) --- */}
              {activeTab === 'guide' && (
                <div className="h-full flex flex-col justify-center">
                   <div className="relative bg-white/5 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center border border-white/5">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-6xl mb-4">{GUIDE_STEPS[currentStep].emoji}</div>
                        <h3 className="text-2xl font-cinzel text-[#007AFF]">{GUIDE_STEPS[currentStep].title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm max-w-[250px] mx-auto">
                          {GUIDE_STEPS[currentStep].desc}
                        </p>
                      </motion.div>

                      {/* Controls */}
                      <div className="absolute bottom-6 left-0 w-full flex justify-center items-center gap-4">
                        <button onClick={prevStep} className="p-2 hover:text-[#007AFF] text-gray-500 transition-colors">←</button>
                        <div className="flex gap-2">
                          {GUIDE_STEPS.map((_, idx) => (
                            <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === currentStep ? 'bg-[#007AFF]' : 'bg-gray-700'}`} />
                          ))}
                        </div>
                        <button onClick={nextStep} className="p-2 hover:text-[#007AFF] text-gray-500 transition-colors">→</button>
                      </div>
                   </div>
                </div>
              )}

              {/* --- CAUTION (WARNINGS) --- */}
              {activeTab === 'caution' && (
                <div className="space-y-4">
                  <div className="bg-yellow-900/10 border border-yellow-500/20 p-6 rounded-xl flex gap-4 items-start">
                    <div className="shrink-0 mt-1"><WarningIcon /></div>
                    <div>
                      <h4 className="font-bold text-[#ecab13] mb-1">Poor Lighting</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Avoid dark rooms or backlighting. Ensure the light source is in front of you for the best 3D reconstruction.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-xl flex gap-4 items-start">
                    <div className="shrink-0 mt-1 text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-red-400 mb-1">Loose Clothing</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Baggy clothes can confuse the AI shape estimator. Please wear tighter-fitting clothes if possible.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-xl flex gap-4 items-start">
                    <div className="shrink-0 mt-1 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-400 mb-1">Camera Distance</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Stand 6-8 feet (2-2.5 meters) away from the camera. The AI needs to see your feet and head.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* --- Q&A (ACCORDION) --- */}
              {activeTab === 'faq' && (
                <div className="space-y-2">
                  {FAQS.map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-xl overflow-hidden border border-white/5 transition-colors hover:border-white/10">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="text-sm font-bold text-gray-200">{item.q}</span>
                        <motion.div
                          animate={{ rotate: openFaqIndex === idx ? 180 : 0 }}
                          className="text-gray-500"
                        >
                          <ChevronDown />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 text-center">
              <p className="text-[10px] text-gray-600">
                S_FIT AI v2.0 &bull; Engineering Team
              </p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
