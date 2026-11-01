'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'guide' | 'caution' | 'faq';

export function SupportHubDrawer({ isOpen, onClose }: SupportHubDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('guide');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How long does generation take?", a: "Typically 15-30 seconds depending on server load." },
    { q: "What photos work best?", a: "Well-lit, front-facing photos with a clean background." },
    { q: "Is my data secure?", a: "Yes, photos are processed and immediately discarded." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0A0A0A] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-display font-semibold tracking-wide text-white">Support Hub</h2>
              <button onClick={onClose} className="p-2 text-soft-gray hover:text-white transition-colors">
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 p-2">
              {[
                { id: 'guide', label: 'Guide' },
                { id: 'caution', label: 'Caution' },
                { id: 'faq', label: 'Q&A' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-colors ${
                    activeTab === tab.id ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-soft-gray hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'guide' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">How to Fit</h3>
                  <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      📸
                    </div>
                    <h4 className="font-bold mb-2">Step 1: Upload Photo</h4>
                    <p className="text-sm text-soft-gray">Take a clear, full-body photo against a neutral background.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      👕
                    </div>
                    <h4 className="font-bold mb-2">Step 2: Select Garment</h4>
                    <p className="text-sm text-soft-gray">Choose an item from our curated luxury collection.</p>
                  </div>
                </div>
              )}

              {activeTab === 'caution' && (
                <div className="space-y-6">
                   <h3 className="text-lg font-medium text-white flex items-center gap-2">
                     <span className="text-yellow-500">⚠️</span> Best Practices
                   </h3>
                   <ul className="space-y-4 text-soft-gray text-sm">
                     <li className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                       <span className="text-xl">💡</span>
                       <div>
                         <strong className="text-white block mb-1">Good Lighting is Crucial</strong>
                         Avoid shadows across the face or body. Natural light works best.
                       </div>
                     </li>
                     <li className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                       <span className="text-xl">📏</span>
                       <div>
                         <strong className="text-white block mb-1">Maintain Distance</strong>
                         Stand about 6-8 feet away from the camera for full-body shots.
                       </div>
                     </li>
                     <li className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                       <span className="text-xl">👔</span>
                       <div>
                         <strong className="text-white block mb-1">Fitted Clothing</strong>
                         Wear form-fitting clothes for the most accurate generation.
                       </div>
                     </li>
                   </ul>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full p-4 text-left flex justify-between items-center text-sm font-medium hover:bg-white/5 transition-colors"
                      >
                        {faq.q}
                        <span className="text-soft-gray">{expandedFaq === index ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 pt-0 text-sm text-soft-gray border-t border-white/10 mt-2">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
