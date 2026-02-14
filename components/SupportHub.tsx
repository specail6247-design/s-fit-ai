'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

// --- SUB-COMPONENTS ---

// 1. User Guide Carousel
const GuideTab = () => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: '01. Prepare Space',
      desc: 'Find a well-lit area with a plain background. Ensure your camera is stable.',
      icon: '💡'
    },
    {
      title: '02. Body Scan',
      desc: 'Stand back about 2 meters. Keep your arms slightly away from your body.',
      icon: '📸'
    },
    {
      title: '03. Perfect Fit',
      desc: 'Let our AI analyze your measurements and try on any garment instantly.',
      icon: '✨'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
          >
            <div className="text-6xl mb-6">{steps[step].icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{steps[step].title}</h3>
            <p className="text-sm text-soft-gray leading-relaxed">{steps[step].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 px-2">
        <button
          onClick={() => setStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))}
          className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
        >
          ←
        </button>
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-cyber-lime scale-125' : 'bg-white/20'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))}
          className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
};

// 2. Caution List
const CautionTab = () => {
  const warnings = [
    { title: 'Lighting Matters', desc: 'Avoid backlighting. Ensure light falls on your face.', icon: '☀️' },
    { title: 'Distance Check', desc: 'Too close? The AI might miss your feet. Too far? Low resolution.', icon: '📏' },
    { title: 'Tight Clothing', desc: 'Wear form-fitting clothes for the most accurate measurements.', icon: '👕' },
    { title: 'Privacy', desc: 'Images are processed securely and not shared with third parties.', icon: '🔒' },
  ];

  return (
    <div className="space-y-4">
      {warnings.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-start gap-4 p-4 bg-red-900/10 border border-red-500/20 rounded-xl"
        >
          <span className="text-2xl mt-1">{item.icon}</span>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
            <p className="text-xs text-soft-gray leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// 3. Q&A Accordion
const QATab = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = [
    { q: 'Is my photo saved?', a: 'No. Your photos are processed in real-time and discarded immediately after the session unless you choose to save them to your private profile.' },
    { q: 'How accurate is the sizing?', a: 'Our AI is accurate within 1-2cm for standard body measurements when instructions are followed correctly.' },
    { q: 'Can I try on any brand?', a: 'Currently, we support partner brands listed in the "Brands" section. We are adding more weekly.' },
    { q: 'Is it free?', a: 'You get 5 free try-ons daily. Upgrade to Premium for unlimited access and advanced features.' },
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-bold text-white">{faq.q}</span>
            <span className={`transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <AnimatePresence>
            {openIdx === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// --- MAIN COMPONENT ---
export function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen, activeSupportTab, setActiveSupportTab } = useStore();

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={() => setSupportHubOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[9999] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
              <h2 className="text-lg font-bold font-mono tracking-widest text-white">SUPPORT_HUB</h2>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex p-2 gap-2 border-b border-white/10 bg-black/40">
              {(['guide', 'caution', 'qa'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSupportTab(tab)}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    activeSupportTab === tab
                      ? 'bg-cyber-lime text-black'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab === 'qa' ? 'Q&A' : tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeSupportTab === 'guide' && <GuideTab />}
              {activeSupportTab === 'caution' && <CautionTab />}
              {activeSupportTab === 'qa' && <QATab />}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/20 text-center">
              <p className="text-[10px] text-white/20 uppercase tracking-widest">
                S_FIT AI Protocol v2.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
