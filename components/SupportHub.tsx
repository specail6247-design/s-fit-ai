'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const SupportHub = () => {
  const { isSupportOpen, setSupportOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  // Drawer variants
  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  };

  // Overlay variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            onClick={() => setSupportOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold tracking-wider uppercase text-white">
                Support Hub
              </h2>
              <button
                onClick={() => setSupportOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {(['guide', 'caution', 'qa'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === tab
                      ? 'text-[#007AFF] bg-white/5 border-b-2 border-[#007AFF]'
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab === 'qa' ? 'Q&A' : tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {activeTab === 'guide' && <UserGuide />}
              {activeTab === 'caution' && <Caution />}
              {activeTab === 'qa' && <FAQ />}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/20">
              <p className="text-[10px] text-center text-gray-500 font-mono">
                S_FIT NEO &copy; 2025. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Sub-components ---

const UserGuide = () => {
  const steps = [
    {
      title: "1. Upload Your Photo",
      desc: "Use a clear, full-body photo. Ensure good lighting and simple background.",
      icon: "📸"
    },
    {
      title: "2. Choose a Garment",
      desc: "Select a clothing item you want to try on. Front-facing images work best.",
      icon: "👕"
    },
    {
      title: "3. AI Magic",
      desc: "Our AI maps the garment to your body pose and shape instantly.",
      icon: "✨"
    },
    {
      title: "4. View & Share",
      desc: "Rotate in 3D (coming soon) or share your look with friends.",
      icon: "🚀"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">How to Fit</h3>
        <p className="text-sm text-gray-400">Master the art of virtual try-on.</p>
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-start">
            <div className="text-3xl bg-black/30 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
              {step.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#007AFF] mb-1">{step.title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Caution = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#FF3B30] mb-2">Best Practices</h3>
        <p className="text-sm text-gray-400">Ensure optimal results.</p>
      </div>

      <div className="grid gap-4">
        <div className="border border-[#FF3B30]/30 bg-[#FF3B30]/5 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <span className="text-[#FF3B30]">⚠</span> Lighting
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Avoid backlit photos or dark rooms. Ensure the light source is in front of you for clear body definition.
          </p>
        </div>

        <div className="border border-[#FF3B30]/30 bg-[#FF3B30]/5 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1">
               <path d="M3 3h18v18H3z"></path>
               <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <span className="text-[#FF3B30]">⚠</span> Distance & Angle
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Stand 6-8 feet away. Keep the camera at waist height. Avoid extreme high or low angles.
          </p>
        </div>

        <div className="border border-[#FF3B30]/30 bg-[#FF3B30]/5 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1">
               <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
               <line x1="9" y1="9" x2="15" y2="15"></line>
               <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
          </div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <span className="text-[#FF3B30]">⚠</span> Clothing
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Wear tight-fitting clothes for the best body estimation. Baggy clothes may confuse the AI shape detector.
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is my photo saved?",
      a: "Photos are processed ephemerally for the try-on session and are not permanently stored unless you save them to your profile."
    },
    {
      q: "What file formats are supported?",
      a: "We support JPG, PNG, and WEBP formats up to 10MB in size."
    },
    {
      q: "Why does the garment look distorted?",
      a: "This can happen if the source image is low quality or if the body pose is too complex. Try a simpler pose."
    },
    {
      q: "Is this free?",
      a: "S_FIT NEO offers a free tier with daily limits. Upgrade to Premium for unlimited high-definition try-ons."
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Q & A</h3>
        <p className="text-sm text-gray-400">Common questions answered.</p>
      </div>

      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-bold text-white">{faq.q}</span>
            <span className={`text-[#007AFF] transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-xs text-gray-300 leading-relaxed border-t border-white/10">
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

export default SupportHub;
