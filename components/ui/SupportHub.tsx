'use client';

import { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [expandedQa, setExpandedQa] = useState<number | null>(null);

  const qaData = [
    { q: 'How long does fitting take?', a: 'Under 10 seconds for standard processing.' },
    { q: 'Is my photo saved?', a: 'No, photos are processed and immediately deleted.' },
    { q: 'What lighting is best?', a: 'Natural, even lighting facing the camera works best.' }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[var(--color-surface)]/10 backdrop-blur-md border border-[var(--color-surface)]/20 rounded-full flex items-center justify-center text-[var(--color-surface)] hover:bg-[var(--color-surface)]/20 transition-all z-40 shadow-lg"
        aria-label="Support Hub"
      >
        <span className="text-xl">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <Fragment key="support-hub-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-secondary)] border-l border-[var(--color-surface)]/10 shadow-2xl z-[999] overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-[family-name:var(--font-geist-sans)] text-[var(--color-primary)]">
                    Support Hub
                  </h2>
                  <button onClick={() => setIsOpen(false)} className="text-[var(--color-surface)]/50 hover:text-[var(--color-surface)] text-xl">
                    ✕
                  </button>
                </div>

                <div className="flex gap-2 mb-6 p-1 bg-[var(--color-surface)]/5 rounded-lg">
                  {(['guide', 'caution', 'qa'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 text-xs uppercase tracking-wider rounded-md transition-colors ${
                        activeTab === tab
                          ? 'bg-[var(--color-surface)]/10 text-[var(--color-primary)] font-bold'
                          : 'text-[var(--color-surface)]/50 hover:text-[var(--color-surface)]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto">
                  {activeTab === 'guide' && (
                    <div className="space-y-6">
                      <h3 className="text-lg text-[var(--color-surface)] font-[family-name:var(--font-geist-sans)]">How to Fit</h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-[var(--color-surface)]/10 rounded-xl bg-[var(--color-surface)]/5">
                          <div className="text-[var(--color-primary)] text-xl mb-2">01</div>
                          <p className="text-sm text-[var(--color-surface)]/80">Upload a clear, front-facing photo of yourself.</p>
                        </div>
                        <div className="p-4 border border-[var(--color-surface)]/10 rounded-xl bg-[var(--color-surface)]/5">
                          <div className="text-[var(--color-primary)] text-xl mb-2">02</div>
                          <p className="text-sm text-[var(--color-surface)]/80">Select a garment from our premium collection.</p>
                        </div>
                        <div className="p-4 border border-[var(--color-surface)]/10 rounded-xl bg-[var(--color-surface)]/5">
                          <div className="text-[var(--color-primary)] text-xl mb-2">03</div>
                          <p className="text-sm text-[var(--color-surface)]/80">Watch as the AI generates your perfect fit in seconds.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'caution' && (
                    <div className="space-y-6">
                      <h3 className="text-lg text-[var(--color-surface)] font-[family-name:var(--font-geist-sans)]">Best Practices</h3>
                      <div className="grid gap-4">
                        <div className="flex items-start gap-4 p-4 border border-red-500/20 rounded-xl bg-red-500/5">
                          <span className="text-2xl mt-1">☀️</span>
                          <div>
                            <h4 className="font-bold text-red-200">Lighting Warning</h4>
                            <p className="text-xs text-red-200/70 mt-1">Avoid heavy shadows or extreme backlighting for best results.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border border-orange-500/20 rounded-xl bg-orange-500/5">
                          <span className="text-2xl mt-1">📏</span>
                          <div>
                            <h4 className="font-bold text-orange-200">Distance</h4>
                            <p className="text-xs text-orange-200/70 mt-1">Stand approximately 3-5 feet from the camera.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'qa' && (
                    <div className="space-y-4">
                      <h3 className="text-lg text-[var(--color-surface)] font-[family-name:var(--font-geist-sans)]">FAQ</h3>
                      <div className="space-y-2">
                        {qaData.map((item, i) => (
                          <div key={i} className="border border-[var(--color-surface)]/10 rounded-xl overflow-hidden">
                            <button
                              onClick={() => setExpandedQa(expandedQa === i ? null : i)}
                              className="w-full text-left p-4 flex justify-between items-center bg-[var(--color-surface)]/5 hover:bg-[var(--color-surface)]/10 transition-colors"
                            >
                              <span className="text-sm font-medium text-[var(--color-surface)]">{item.q}</span>
                              <span className="text-[var(--color-surface)]/50">{expandedQa === i ? '−' : '+'}</span>
                            </button>
                            {expandedQa === i && (
                              <div className="p-4 pt-0 text-sm text-[var(--color-surface)]/70 bg-[var(--color-surface)]/5">
                                {item.a}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
