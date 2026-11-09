'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  return (
    <>
      {/* Trigger Button - Hidden until needed */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 rounded-l-xl border-y border-l border-white/20 hover:bg-[#007AFF] transition-colors z-40 writing-vertical-rl flex items-center justify-center gap-2 h-32 backdrop-blur-md shadow-2xl"
      >
        <span className="text-xl rotate-90">ℹ️</span>
        <span className="text-xs font-bold tracking-[0.2em] uppercase origin-center rotate-180">SUPPORT</span>
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-xl font-bold italic tracking-wider">SUPPORT <span className="text-[#007AFF]">HUB</span></h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-2 text-xl">✕</button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {(['guide', 'caution', 'qa'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${
                      activeTab === tab
                        ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-[#007AFF]/5'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {tab === 'guide' ? 'Guide' : tab === 'caution' ? 'Caution' : 'Q&A'}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'guide' && <UserGuide />}
                    {activeTab === 'caution' && <CautionInfo />}
                    {activeTab === 'qa' && <QnAAccordion />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Subcomponents ---

function UserGuide() {
  const steps = [
    { title: "Snap a Photo", desc: "Take a clear, full-body or upper-body shot facing forward.", icon: "📸" },
    { title: "Pick a Garment", desc: "Choose an item from our catalog or upload a clean image of a garment.", icon: "👕" },
    { title: "AI Magic", desc: "Hit 'Try It On' and watch our AI weave the digital fabric onto you.", icon: "✨" },
    { title: "Review & Share", desc: "Inspect the fit in the 3D viewer. Love it? Share it!", icon: "🚀" }
  ];

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
      {steps.map((step, idx) => (
        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black text-2xl z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#0a0a0a] group-hover:border-[#007AFF] group-hover:text-[#007AFF] transition-colors">
            {step.icon}
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-white">{step.title}</h3>
              <span className="text-[10px] font-mono text-gray-500">0{idx + 1}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CautionInfo() {
  const warnings = [
    { title: "Good Lighting is Key", desc: "Avoid harsh shadows or strong backlighting. Natural, even light works best.", icon: "💡" },
    { title: "Distance Matters", desc: "Stand about 3-5 feet (1-1.5m) from the camera to ensure proper body mapping.", icon: "📏" },
    { title: "Avoid Clutter", desc: "A plain background helps the AI distinguish you from your surroundings.", icon: "🖼️" },
    { title: "Fitted Base Layer", desc: "Wear tight-fitting clothes (like a tank top) for the most accurate drape.", icon: "🎽" }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">⚠️</span>
          <h3 className="font-bold text-red-400 text-sm">Optimal Conditions</h3>
        </div>
        <p className="text-xs text-red-300/70">For the most realistic results, please adhere to the following guidelines when capturing your base photo.</p>
      </div>

      {warnings.map((warn, idx) => (
        <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="text-2xl opacity-80">{warn.icon}</div>
          <div>
            <h4 className="font-bold text-sm text-gray-200 mb-1">{warn.title}</h4>
            <p className="text-xs text-gray-400">{warn.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function QnAAccordion() {
  const qas = [
    { q: "How accurate is the sizing?", a: "Our AI maps the garment based on the proportions in your photo. It provides a highly realistic visual representation, though physical feel may vary." },
    { q: "Can I use photos from my gallery?", a: "Yes! You can upload any existing photo, just ensure it meets our lighting and visibility guidelines." },
    { q: "What happens to my photos?", a: "Your photos are processed temporarily for the try-on session and are not stored permanently on our servers unless you choose to save them to your profile." },
    { q: "Why did the result look distorted?", a: "This usually happens due to poor lighting, baggy base clothing, or complex backgrounds. Try snapping a clearer photo." }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {qas.map((qa, idx) => (
        <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
          >
            <span className="font-bold text-sm text-gray-200">{qa.q}</span>
            <span className={`text-[#007AFF] transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}>
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
                <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5 mt-2 pt-3">
                  {qa.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
