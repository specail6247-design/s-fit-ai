import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SideDrawer } from './SideDrawer';

type Tab = 'guide' | 'caution' | 'qa';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('guide');

  return (
    <>
      {/* Trigger Button - Hidden until needed */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[var(--color-surface)] border border-[var(--border-color)] text-[var(--color-text-primary)] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--color-surface-dark)] transition-colors group"
        aria-label="Help & Support"
      >
        <span className="text-xl font-bold group-hover:scale-110 transition-transform">?</span>
      </button>

      <SideDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Support Hub">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[var(--border-color)] pb-4 overflow-x-auto scrollbar-hide">
          {(['guide', 'caution', 'qa'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-dark)]'
              }`}
            >
              {tab === 'guide' && 'Fit Guide'}
              {tab === 'caution' && 'Cautions'}
              {tab === 'qa' && 'Q&A'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[300px]">
            {activeTab === 'guide' && <GuideCarousel />}
            {activeTab === 'caution' && <CautionList />}
            {activeTab === 'qa' && <QASection />}
        </div>
      </SideDrawer>
    </>
  );
}

// Sub-components

function GuideCarousel() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Camera Position', desc: 'Place your phone at waist height for the most accurate body measurements.', icon: '📸' },
    { title: 'Lighting', desc: 'Ensure you are in a well-lit room. Avoid backlighting for clear silhouettes.', icon: '💡' },
    { title: 'Attire', desc: 'Wear tight-fitting clothes for the best fit analysis.', icon: '👕' },
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="relative w-full h-48 bg-[var(--color-surface-dark)] rounded-xl flex items-center justify-center border border-[var(--border-color)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="text-6xl"
          >
              {steps[step].icon}
          </motion.div>
        </AnimatePresence>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-2 text-[var(--color-text-primary)]">{steps[step].title}</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">{steps[step].desc}</p>
      </div>

      <div className="flex gap-2">
        {steps.map((_, i) => (
            <button
                key={i}
                onClick={() => setStep(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-text-secondary)]/30'}`}
                aria-label={`Go to step ${i + 1}`}
            />
        ))}
      </div>
    </div>
  );
}

function CautionList() {
    const items = [
        { icon: '⚠️', text: 'Avoid baggy clothes for accurate measurements.' },
        { icon: '🌑', text: 'Do not use in low light conditions.' },
        { icon: '📏', text: 'Stand 6-8 feet away from the camera.' },
    ];
    return (
        <div className="space-y-4">
            {items.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--border-color)]">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-sm text-[var(--color-text-secondary)]">{item.text}</p>
                </div>
            ))}
        </div>
    )
}

function QASection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqs = [
        { q: "Is my photo saved?", a: "No. Your photos are processed locally on your device for privacy." },
        { q: "How accurate is the sizing?", a: "Our AI is 98% accurate when guidelines are followed properly." },
        { q: "Can I use photos from my gallery?", a: "Yes, you can upload existing photos in the Vibe Check mode." },
    ];

    return (
        <div className="space-y-2">
            {faqs.map((faq, i) => (
                <div key={i} className="border border-[var(--border-color)] rounded-xl overflow-hidden">
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--color-surface-dark)] transition-colors"
                    >
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{faq.q}</span>
                        <span className="text-[var(--color-text-secondary)]">{openIndex === i ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 pt-0 text-sm text-[var(--color-text-secondary)]">
                                    {faq.a}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}
