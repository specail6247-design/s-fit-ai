'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Camera, Sun, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  {
    question: "How accurate is the sizing?",
    answer: "Our AI model analyzes your uploaded photo against the garment's specifications. We achieve up to 98% accuracy when following the lighting and distance guidelines."
  },
  {
    question: "What should I wear in the photo?",
    answer: "For best results, wear form-fitting clothing (like activewear or underwear). Avoid bulky items that obscure your natural body shape."
  },
  {
    question: "Is my data secure?",
    answer: "Your privacy is paramount. Photos are processed in real-time and never stored on our servers unless explicitly requested for your digital twin profile."
  }
];

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[var(--color-secondary)]/80 backdrop-blur-md z-[998]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[var(--color-surface)] border-l border-[var(--border-color)] z-[999] shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[var(--color-surface)]/80 backdrop-blur-md border-b border-[var(--border-color)] p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-primary)]">
                  Concierge Service
                </h2>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1 tracking-wider uppercase">
                  Support & Guidelines
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[var(--color-text-secondary)]/10 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-10">
              {/* How to Fit Section (Visual Carousel Placeholder) */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-[var(--color-primary)]" />
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-primary)]">
                    The Perfect Fit
                  </h3>
                </div>

                {/* Carousel Card */}
                <div className="relative aspect-video bg-[var(--color-secondary)] rounded-xl border border-[var(--border-color)] overflow-hidden flex flex-col justify-end p-4 group">
                  {/* Subtle placeholder pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

                  <div className="relative z-10">
                    <span className="inline-block px-2 py-1 bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] uppercase tracking-widest rounded mb-2">
                      Step 1 of 3
                    </span>
                    <h4 className="text-sm font-medium text-white mb-1">Position Your Camera</h4>
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">
                      Place your device at waist height, directly facing you.
                    </p>
                  </div>

                  {/* Navigation dots */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    <div className="w-4 h-1 rounded-full bg-[var(--color-primary)]" />
                    <div className="w-4 h-1 rounded-full bg-white/20" />
                    <div className="w-4 h-1 rounded-full bg-white/20" />
                  </div>
                </div>
              </section>

              {/* Guidelines/Caution Section */}
              <section>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-primary)] mb-4">
                  Environment Guidelines
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--color-text-secondary)]/5 flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">Even Lighting</p>
                      <p className="text-[10px] text-[var(--color-text-secondary)] mt-1">Avoid harsh shadows or strong backlight.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--color-text-secondary)]/5 flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">Distance</p>
                      <p className="text-[10px] text-[var(--color-text-secondary)] mt-1">Stand roughly 6-8 feet from the lens.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-primary)] mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-[var(--border-color)] rounded-xl overflow-hidden bg-[var(--color-surface)]"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                      >
                        <span className="text-sm font-medium text-[var(--color-text-primary)] pr-4">
                          {faq.question}
                        </span>
                        {activeFaq === index ? (
                          <ChevronUp className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)] flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {activeFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-4 pt-0 text-xs text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--border-color)]">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer Area */}
            <div className="p-6 border-t border-[var(--border-color)] text-center">
              <p className="text-xs text-[var(--color-text-secondary)]">
                Still need help? <button className="text-[var(--color-primary)] hover:underline ml-1">Contact a Stylist</button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Trigger Component for integration in Layout
export function SupportHubTrigger({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[900] w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-primary)]/30 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-[var(--color-text-primary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors group backdrop-blur-sm"
      aria-label="Open Concierge Support"
    >
      <HelpCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
    </motion.button>
  );
}
