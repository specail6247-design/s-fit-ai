'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportOpen, setIsSupportOpen, activeSupportTab, setActiveSupportTab } = useStore();

  const tabs = [
    { id: 'guide', label: 'GUIDE' },
    { id: 'caution', label: 'CAUTION' },
    { id: 'qa', label: 'Q&A' },
  ] as const;

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSupportOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[1001] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <div>
                <h2 className="text-xl font-bold tracking-tighter text-white">
                  SUPPORT <span className="text-[#007AFF]">HUB</span>
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                  Virtual Assistant
                </p>
              </div>
              <button
                onClick={() => setIsSupportOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSupportTab(tab.id)}
                  className={`flex-1 py-4 text-xs font-bold tracking-widest transition-colors relative ${
                    activeSupportTab === tab.id
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-400'
                  }`}
                >
                  {tab.label}
                  {activeSupportTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#007AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#050505]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSupportTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeSupportTab === 'guide' && <GuideContent />}
                  {activeSupportTab === 'caution' && <CautionContent />}
                  {activeSupportTab === 'qa' && <QAContent />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 text-center text-[10px] text-gray-600 font-mono">
              S_FIT INTELLIGENCE SYSTEM v2.0
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- GUIDE CONTENT (CAROUSEL) ---
function GuideContent() {
  const [step, setStep] = React.useState(0);

  const steps = [
    {
      title: "Preparation",
      desc: "Find a well-lit area with a plain background. Wear form-fitting clothes for best results.",
      icon: "💡"
    },
    {
      title: "Capture",
      desc: "Take a full-body photo. Ensure your head and feet are visible. Stand straight.",
      icon: "📸"
    },
    {
      title: "Selection",
      desc: "Upload the garment image you want to try on. Front-facing images work best.",
      icon: "👕"
    },
    {
      title: "Analysis",
      desc: "Our AI maps your body measurements to the garment for a realistic fit visualization.",
      icon: "✨"
    }
  ];

  const nextStep = () => setStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="space-y-8">
      <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">{steps[step].icon}</div>
            <div className="text-xs font-mono text-[#007AFF]">STEP 0{step + 1}</div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button onClick={prevStep} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors">
          <span className="text-white">‹</span>
        </button>
        <button onClick={nextStep} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors">
          <span className="text-white">›</span>
        </button>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white">{steps[step].title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed px-4">
          {steps[step].desc}
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? 'bg-[#007AFF]' : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// --- CAUTION CONTENT ---
function CautionContent() {
  const cautions = [
    {
      icon: "⚠️",
      title: "Lighting",
      desc: "Avoid backlighting or extremely dark environments. Natural light is best."
    },
    {
      icon: "📏",
      title: "Distance",
      desc: "Stand 2-3 meters away from the camera. Ensure your full body is visible."
    },
    {
      icon: "👔",
      title: "Clothing",
      desc: "Wear tight-fitting clothes. Loose clothing can confuse the body mapping AI."
    },
    {
      icon: "🚫",
      title: "Obstructions",
      desc: "Remove large accessories or objects that block the view of your body shape."
    }
  ];

  return (
    <div className="space-y-4">
      {cautions.map((item, i) => (
        <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-yellow-500/50 transition-colors group">
          <div className="text-2xl pt-1 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
          <div>
            <h4 className="font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors">{item.title}</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
      <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
        <p className="text-[10px] text-yellow-500 font-mono uppercase tracking-widest">
          Compliance Required for Optimal Results
        </p>
      </div>
    </div>
  );
}

// --- Q&A CONTENT (ACCORDION) ---
function QAContent() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "How accurate is the sizing?",
      a: "Our AI estimates measurements with 95% accuracy compared to manual tailoring. Always check the brand's specific size chart."
    },
    {
      q: "Is my photo saved?",
      a: "Photos are processed in real-time and deleted from our servers immediately after the session ends. We prioritize your privacy."
    },
    {
      q: "What formats are supported?",
      a: "We support JPG, PNG, and WEBP formats up to 10MB. High-resolution images yield better fitting results."
    },
    {
      q: "Can I try accessories?",
      a: "Currently, we specialize in garments (tops, bottoms, dresses). Accessory support is coming in Phase 6."
    }
  ];

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white/5 rounded-lg overflow-hidden border border-white/5">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
          >
            <span className="font-bold text-sm text-gray-200">{faq.q}</span>
            <span className={`transform transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
              ⌄
            </span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
