'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useStore } from '@/store/useStore';

type Tab = 'guide' | 'caution' | 'qa';

const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: {
    x: '100%',
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  }
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('guide');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isSupportHubOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSupportHubOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="relative w-full max-w-md h-full bg-[#0F0F0F] border-l border-white/10 shadow-2xl flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#141414]">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
                <p className="text-xs text-gray-500 font-mono mt-1">S_FIT ASSISTANCE SYSTEM</p>
              </div>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-gray-400">close</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <TabButton
                label="How to Fit"
                icon="checkroom"
                isActive={activeTab === 'guide'}
                onClick={() => setActiveTab('guide')}
              />
              <TabButton
                label="Caution"
                icon="warning"
                isActive={activeTab === 'caution'}
                onClick={() => setActiveTab('caution')}
              />
              <TabButton
                label="Q&A"
                icon="help"
                isActive={activeTab === 'qa'}
                onClick={() => setActiveTab('qa')}
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              <AnimatePresence mode="wait">
                {activeTab === 'guide' && <GuideSection key="guide" />}
                {activeTab === 'caution' && <CautionSection key="caution" />}
                {activeTab === 'qa' && <QASection key="qa" />}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 text-center">
              <p className="text-[10px] text-gray-600 font-mono">
                S_FIT AI V1.0.0 • SYSTEM ACTIVE
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// --- Sub-Components ---

function TabButton({ label, icon, isActive, onClick }: { label: string, icon: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors relative ${isActive ? 'text-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
        />
      )}
    </button>
  );
}

function GuideSection() {
  const steps = [
    { title: "Upload User Photo", desc: "Use a clear full-body photo with good lighting.", icon: "person_add" },
    { title: "Select Garment", desc: "Upload a front-facing image of the clothing item.", icon: "styler" },
    { title: "AI Processing", desc: "Our engine maps the fabric to your body shape.", icon: "auto_fix_high" },
    { title: "View & Share", desc: "See the result in 3D and share with friends.", icon: "share" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-lg p-4 mb-6">
        <h3 className="text-[#007AFF] font-bold text-sm mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">info</span>
          Quick Start
        </h3>
        <p className="text-xs text-[#007AFF]/80">Follow these simple steps to get the best fitting results.</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-lg">{step.icon}</span>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Step {i + 1}: {step.title}</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CautionSection() {
  const warnings = [
    { title: "Lighting Matters", desc: "Avoid dark shadows or over-exposed photos for accurate texture mapping.", icon: "light_mode", color: "text-yellow-500" },
    { title: "Camera Distance", desc: "Stand 2-3 meters away. Ensure your full body is visible in the frame.", icon: "photo_camera_front", color: "text-orange-500" },
    { title: "Complex Backgrounds", desc: "Plain backgrounds work best. Cluttered rooms may confuse the AI.", icon: "wallpaper", color: "text-red-500" },
    { title: "Loose Clothing", desc: "Wear fitted clothes for the most accurate body measurements.", icon: "checkroom", color: "text-blue-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      {warnings.map((item, i) => (
        <div key={i} className="bg-[#1A1A1A] rounded-xl p-5 border-l-2 border-l-transparent hover:border-l-[#007AFF] transition-all group">
          <div className={`mb-3 ${item.color}`}>
            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
          </div>
          <h4 className="font-bold text-white mb-1 group-hover:text-[#007AFF] transition-colors">{item.title}</h4>
          <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </motion.div>
  );
}

function QASection() {
  const faqs = [
    { q: "Is my photo saved?", a: "We process your photo in real-time and discard it immediately after the session unless you choose to save it to your vault." },
    { q: "Why does the garment look distorted?", a: "This usually happens if the source image is low quality or has a complex angle. Try a flat, front-facing image." },
    { q: "What file formats are supported?", a: "We support JPG, PNG, and WEBP formats up to 10MB in size." },
    { q: "Can I try accessories?", a: "Currently, we specialize in tops, bottoms, and dresses. Accessories support is coming in Phase 2." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-2"
    >
      {faqs.map((faq, i) => (
        <AccordionItem key={i} question={faq.q} answer={faq.a} />
      ))}
    </motion.div>
  );
}

function AccordionItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{question}</span>
        <span className={`material-symbols-outlined text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-xs text-gray-500 leading-relaxed pr-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
