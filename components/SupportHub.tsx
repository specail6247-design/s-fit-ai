'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const TABS = [
  { id: 'guide', label: 'Guide', icon: '📖' },
  { id: 'caution', label: 'Caution', icon: '⚠️' },
  { id: 'qa', label: 'Q&A', icon: '❓' },
  { id: 'issue', label: 'Support', icon: '🛠️' },
] as const;

// --- Sub-Components ---

const UserGuide = () => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Upload Yourself",
      desc: "For best results, use a full-body photo with good lighting and simple background.",
      icon: "👤"
    },
    {
      title: "Select Garment",
      desc: "Choose a clear image of the clothing item you want to try on. Front view works best.",
      icon: "👕"
    },
    {
      title: "AI Processing",
      desc: "Our advanced AI wraps the fabric around your body pose. Give it a moment to compute.",
      icon: "⚡"
    },
    {
      title: "Style & Share",
      desc: "Adjust the fit if needed and share your new look with the world.",
      icon: "✨"
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-xl border border-white/10 mb-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-lime/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-6xl mb-6 block animate-bounce">{steps[step].icon}</span>
        <h3 className="text-xl font-bold text-white mb-2">{steps[step].title}</h3>
        <p className="text-sm text-soft-gray">{steps[step].desc}</p>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setStep(prev => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30 transition-colors"
        >
          ← Prev
        </button>
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-cyber-lime' : 'bg-white/20'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={step === steps.length - 1}
          className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const CautionWarnings = () => (
  <div className="space-y-4">
    {[
      { title: "Lighting Matters", desc: "Avoid dark shadows or extreme backlighting. Natural light is best.", icon: "☀️" },
      { title: "Camera Distance", desc: "Stand 6-8 feet away. Ensure your full body is visible in the frame.", icon: "📏" },
      { title: "Clothing Fit", desc: "Wear tight-fitting clothes for the most accurate body mapping.", icon: "👚" },
      { title: "Privacy", desc: "Your photos are processed securely and deleted after the session.", icon: "🔒" },
    ].map((item, i) => (
      <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-red-500/50 transition-colors">
        <span className="text-2xl">{item.icon}</span>
        <div>
          <h4 className="text-sm font-bold text-white">{item.title}</h4>
          <p className="text-xs text-soft-gray mt-1">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const QAAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = [
    { q: "Is this free to use?", a: "Yes, our basic try-on features are free. Premium members get faster processing and HD results." },
    { q: "What data do you store?", a: "We only temporarily store images for processing. They are automatically deleted after your session." },
    { q: "Why did the try-on fail?", a: "Usually due to unclear photos. Ensure the garment is on a plain background and your photo is well-lit." },
    { q: "Can I try accessories?", a: "Currently we support Tops, Dresses, and some Outerwear. Accessories are coming in v2.1." },
  ];

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <span className="text-sm font-medium text-white">{item.q}</span>
            <span className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>▼</span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 text-xs text-soft-gray bg-black/20 border-t border-white/5">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const ReportIssue = () => (
  <div className="space-y-4">
    <p className="text-xs text-soft-gray">Found a bug? Let us know. We reward bug hunters with Premium credits.</p>
    <textarea
      className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-cyber-lime outline-none resize-none placeholder-white/20"
      placeholder="Describe what happened..."
    />
    <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-cyber-lime transition-colors text-xs uppercase tracking-widest">
      Submit Report
    </button>
  </div>
);

// --- Main Component ---

export default function SupportHub() {
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
            onClick={() => setSupportHubOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0F0F0F] border-l border-white/10 z-[100] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">SUPPORT HUB</h2>
                <p className="text-[10px] text-cyber-lime font-mono tracking-widest uppercase">System Assistance v2.0</p>
              </div>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full text-soft-gray hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-10">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSupportTab(tab.id)}
                  className={`flex-1 py-4 text-xs font-medium uppercase tracking-wider relative transition-colors ${
                    activeSupportTab === tab.id ? 'text-white' : 'text-soft-gray hover:text-white'
                  }`}
                >
                  <span className="block text-lg mb-1">{tab.icon}</span>
                  {tab.label}
                  {activeSupportTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-lime"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSupportTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {activeSupportTab === 'guide' && <UserGuide />}
                  {activeSupportTab === 'caution' && <CautionWarnings />}
                  {activeSupportTab === 'qa' && <QAAccordion />}
                  {activeSupportTab === 'issue' && <ReportIssue />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a] text-center">
              <p className="text-[10px] text-soft-gray">
                Need direct help? <a href="mailto:support@sfit.ai" className="text-white hover:text-cyber-lime underline">Contact Engineering</a>
              </p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
