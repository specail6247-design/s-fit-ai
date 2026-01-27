'use client';

import { useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

// Tab Types
type Tab = 'guide' | 'caution' | 'faq';

export function SupportDrawer() {
  const { showSupportDrawer, setShowSupportDrawer } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('guide');

  return (
    <BottomSheet
      isOpen={showSupportDrawer}
      onClose={() => setShowSupportDrawer(false)}
      title="Support Hub"
    >
      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6">
        {(['guide', 'caution', 'faq'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab ? 'text-pure-white' : 'text-soft-gray hover:text-white/80'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-lime"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === 'guide' && <UserGuide key="guide" />}
          {activeTab === 'caution' && <CautionPanel key="caution" />}
          {activeTab === 'faq' && <FAQPanel key="faq" />}
        </AnimatePresence>
      </div>
    </BottomSheet>
  );
}

function UserGuide() {
  const steps = [
    {
      title: 'Upload Photo',
      desc: 'Use a full-body photo with good lighting for best results.',
      icon: '📸',
    },
    {
      title: 'Select Brand',
      desc: 'Choose from our curated collection of luxury and streetwear items.',
      icon: '🛍️',
    },
    {
      title: 'AI Fitting',
      desc: 'Our AI analyzes your pose and body shape to generate a perfect fit.',
      icon: '✨',
    },
    {
      title: 'Review & Share',
      desc: 'Check the fit heatmap, compare sizes, and share your look.',
      icon: '📤',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-lime/30 transition-colors"
          >
            <div className="text-2xl mb-2">{step.icon}</div>
            <h4 className="text-sm font-bold text-pure-white mb-1">
              {idx + 1}. {step.title}
            </h4>
            <p className="text-[10px] text-soft-gray leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CautionPanel() {
  const warnings = [
    {
      icon: '💡',
      title: 'Lighting Matters',
      desc: 'Ensure even lighting. Avoid strong backlights or deep shadows.',
      color: 'text-yellow-400',
    },
    {
      icon: '📏',
      title: 'Camera Distance',
      desc: 'Stand 2-3 meters away. Ensure your full body is visible.',
      color: 'text-blue-400',
    },
    {
      icon: '👗',
      title: 'Tight Clothing',
      desc: 'Wear form-fitting clothes for the most accurate measurements.',
      color: 'text-pink-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      {warnings.map((warn, idx) => (
        <div
          key={idx}
          className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className={`text-2xl ${warn.color}`}>{warn.icon}</div>
          <div>
            <h4 className="text-sm font-bold text-pure-white mb-1">
              {warn.title}
            </h4>
            <p className="text-xs text-soft-gray">{warn.desc}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function FAQPanel() {
  const faqs = [
    {
      q: 'Is my photo saved?',
      a: 'Photos are processed securely and deleted after your session. We prioritize your privacy.',
    },
    {
      q: 'How accurate is the sizing?',
      a: 'Our AI achieves 98% accuracy compared to manual measurements when recommended guidelines are followed.',
    },
    {
      q: 'Can I try multiple items?',
      a: 'Yes! You can mix and match items from different brands in a single session.',
    },
    {
      q: 'What if the result looks weird?',
      a: 'Try re-uploading your photo with better lighting or a cleaner background.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-2"
    >
      {faqs.map((faq, idx) => (
        <details
          key={idx}
          className="group p-4 rounded-xl bg-white/5 border border-white/10 open:bg-white/10 transition-colors"
        >
          <summary className="flex items-center justify-between cursor-pointer list-none">
            <span className="text-sm font-bold text-pure-white">{faq.q}</span>
            <span className="text-soft-gray transform group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="mt-3 text-xs text-soft-gray leading-relaxed border-t border-white/10 pt-3">
            {faq.a}
          </div>
        </details>
      ))}
    </motion.div>
  );
}
