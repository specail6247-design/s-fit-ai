'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const TABS = [
  { id: 'guide', label: 'USER GUIDE' },
  { id: 'caution', label: 'CAUTION' },
  { id: 'qa', label: 'Q&A' },
] as const;

// --- Sub-components ---

const UserGuide = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Prepare Your Space', desc: 'Find a well-lit area with a plain background. Avoid clutter.', icon: '💡' },
    { title: 'Upload Photo', desc: 'Use a full-body photo. Ensure you are facing the camera directly.', icon: '📸' },
    { title: 'Select Garment', desc: 'Choose a garment from our collection or upload your own.', icon: '👕' },
    { title: 'Magic Moment', desc: 'Wait for the AI to process your fitting. Adjust as needed.', icon: '✨' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 p-8 rounded-full text-5xl md:text-6xl mb-4 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        >
          {steps[step].icon}
        </motion.div>
        <motion.div
           key={`text-${step}`}
           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-3">
            {steps[step].title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
            {steps[step].desc}
          </p>
        </motion.div>
      </div>

      <div className="flex justify-center gap-2 pb-12">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'bg-[#ecab13] w-8' : 'bg-white/20 w-2 hover:bg-white/40'}`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Caution = () => {
  const warnings = [
    { title: 'Lighting', desc: 'Poor lighting affects texture quality.', icon: '☀️' },
    { title: 'Distance', desc: 'Stand 2-3 meters away for best body tracking.', icon: '📏' },
    { title: 'Angles', desc: 'Avoid extreme angles. Keep camera at waist height.', icon: '📐' },
    { title: 'Clothing', desc: 'Tight clothing helps AI map your body shape accurately.', icon: '👗' },
  ];

  return (
    <div className="space-y-4 p-6 overflow-y-auto h-full pb-20 custom-scrollbar">
      {warnings.map((w, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/5 border border-red-500/20 p-4 rounded-xl flex gap-4 items-start hover:bg-white/10 transition-colors"
        >
          <span className="text-2xl mt-1">{w.icon}</span>
          <div>
            <h4 className="font-bold text-red-400 uppercase text-xs tracking-wider mb-1">{w.title}</h4>
            <p className="text-white/60 text-xs leading-relaxed">{w.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const QA = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'Is my photo private?', a: 'Yes. Photos are processed in memory and deleted after the session.' },
    { q: 'What formats are supported?', a: 'We support JPG, PNG, and WEBP images up to 10MB.' },
    { q: 'Why is the fit not perfect?', a: 'AI estimation depends on photo quality and body visibility.' },
    { q: 'Can I try pants?', a: 'Currently, we specialize in tops and dresses. Bottoms are in beta.' },
    { q: 'Is this free?', a: 'You have 5 free tries daily. Premium members get unlimited access.' },
  ];

  return (
    <div className="space-y-2 p-6 overflow-y-auto h-full pb-20 custom-scrollbar">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="border-b border-white/10 last:border-0"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-4 text-left flex justify-between items-center hover:text-[#ecab13] transition-colors group"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-wider group-hover:pl-2 transition-all">{faq.q}</span>
            <span className="text-white/40 font-mono text-lg">{openIndex === i ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-white/50 text-xs leading-relaxed pl-2 border-l-2 border-[#ecab13]/30 ml-1">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export const SupportHub = () => {
  const { isSupportHubOpen, setSupportHubOpen, activeSupportTab, setActiveSupportTab } = useStore();

  const renderContent = () => {
    switch (activeSupportTab) {
      case 'guide': return <UserGuide />;
      case 'caution': return <Caution />;
      case 'qa': return <QA />;
      default: return <UserGuide />;
    }
  };

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSupportHubOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          />

          {/* Drawer */}
          <motion.div
            key="drawer-content"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[9999] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#ecab13] rounded-full animate-pulse"></span>
                <h2 className="text-sm font-bold tracking-[0.2em] text-white uppercase">Support Hub</h2>
              </div>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-[#050505]">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSupportTab(tab.id)}
                  className={`flex-1 py-4 text-[10px] font-bold tracking-widest uppercase transition-colors relative ${
                    activeSupportTab === tab.id ? 'text-[#ecab13]' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {tab.label}
                  {activeSupportTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ecab13]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden relative bg-[#0a0a0a]">
              {renderContent()}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#050505] text-center">
               <p className="text-[10px] text-white/30 uppercase tracking-widest">S_FIT AI // Assistance v2.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
