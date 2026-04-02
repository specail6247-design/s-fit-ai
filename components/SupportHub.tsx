'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  return (
    <>
      {/* Floating Action Button - "Hidden until needed" style */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-void-black/80 border border-white/10 text-soft-gray hover:text-white hover:border-white/30 backdrop-blur-md transition-all group"
        aria-label="Help & Support"
      >
        <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">help</span>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-[70] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-serif text-white tracking-wide">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-soft-gray hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex px-6 pt-4 border-b border-white/5">
                {[
                  { id: 'guide', label: 'Guide' },
                  { id: 'caution', label: 'Caution' },
                  { id: 'qa', label: 'Q&A' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id ? 'text-white' : 'text-soft-gray hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-lime"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'guide' && <GuideTab />}
                    {activeTab === 'caution' && <CautionTab />}
                    {activeTab === 'qa' && <QATab />}
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

// --- Tab Components ---

function GuideTab() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: "01. Upload Photo",
      desc: "Take or upload a clear front-facing photo of yourself. Ensure your whole body or upper torso is visible.",
      icon: "add_a_photo"
    },
    {
      title: "02. Select Garment",
      desc: "Choose an item from our SPA or Luxury lines, or upload your own garment image.",
      icon: "checkroom"
    },
    {
      title: "03. Try It On",
      desc: "Hit the try-on button. Our AI will process the fit and drape in under 10 seconds.",
      icon: "magic_button"
    }
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-soft-gray mb-4">How to get the perfect virtual fit.</p>

      {/* Carousel Container */}
      <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center min-h-[250px] flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-cyber-lime mb-4">
          {steps[currentStep].icon}
        </span>
        <h3 className="text-lg font-bold text-white mb-2">{steps[currentStep].title}</h3>
        <p className="text-sm text-gray-400">{steps[currentStep].desc}</p>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 flex gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentStep === idx ? 'bg-cyber-lime w-4' : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
        className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors"
      >
        {currentStep === steps.length - 1 ? 'Start Fitting' : 'Next Step'}
      </button>
    </div>
  );
}

function CautionTab() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-soft-gray mb-4">Crucial tips for accurate results.</p>

      <div className="grid gap-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-4 items-start">
          <span className="material-symbols-outlined text-red-400 mt-0.5">lightbulb</span>
          <div>
            <h4 className="text-white font-bold text-sm mb-1">Good Lighting is Key</h4>
            <p className="text-xs text-gray-400">Avoid harsh shadows or backlighting. Soft, even, front-facing light works best.</p>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-4 items-start">
          <span className="material-symbols-outlined text-amber-400 mt-0.5">straighten</span>
          <div>
            <h4 className="text-white font-bold text-sm mb-1">Camera Distance</h4>
            <p className="text-xs text-gray-400">Stand roughly 4-6 feet away from the camera for full-body shots. Avoid awkward angles.</p>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-4 items-start">
          <span className="material-symbols-outlined text-blue-400 mt-0.5">accessibility_new</span>
          <div>
            <h4 className="text-white font-bold text-sm mb-1">Clear Posture</h4>
            <p className="text-xs text-gray-400">Stand straight with arms slightly away from your body. Avoid baggy clothing in the base photo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QATab() {
  const faqs = [
    { q: "Is my data stored?", a: "No. Your photos are processed securely in memory and deleted immediately after generation unless you explicitly save them to your account." },
    { q: "How long does it take?", a: "Standard generation takes ~10 seconds. Complex luxury shaders might take up to 15 seconds." },
    { q: "Can I use photos with layers?", a: "For best results, wear form-fitting base layers (like a t-shirt). Bulky jackets in the base photo will confuse the AI." },
    { q: "What's the difference between SPA and Luxury?", a: "SPA mode focuses on quick, everyday wear matching. Luxury mode uses advanced rendering for complex fabrics like silk, leather, and detailed embroidery." }
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-soft-gray mb-4">Frequently asked questions.</p>

      {faqs.map((faq, idx) => (
        <details key={idx} className="group bg-white/5 border border-white/10 rounded-xl [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-white">
            {faq.q}
            <span className="material-symbols-outlined text-soft-gray group-open:rotate-180 transition-transform">
              expand_more
            </span>
          </summary>
          <div className="px-4 pb-4 pt-2 text-xs text-gray-400 border-t border-white/5 leading-relaxed">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  );
}
