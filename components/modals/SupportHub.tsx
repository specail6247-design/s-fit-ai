'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: '100%', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  visible: { x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const HOW_TO_FIT_STEPS = [
  {
    title: 'Snap a Selfie',
    desc: 'Take a clear front-facing photo in good lighting.',
    icon: '📸',
  },
  {
    title: 'Select Garment',
    desc: 'Choose an item from our catalog to try on.',
    icon: '👕',
  },
  {
    title: 'AI Fitting',
    desc: 'Our AI processes your images in seconds.',
    icon: '✨',
  },
];

const FAQS = [
  { q: 'How long does a try-on take?', a: 'Typically 10-15 seconds depending on server load.' },
  { q: 'Is my photo saved?', a: 'No, photos are processed in memory and not permanently stored unless you save to your vault.' },
  { q: 'What lighting works best?', a: 'Natural daylight facing the camera yields the best results. Avoid strong backlighting.' },
];

export function SupportHub() {
  const { isSupportOpen, setIsSupportOpen } = useStore();
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleClose = () => setIsSupportOpen(false);

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex justify-end"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className="relative w-full max-w-md h-full bg-void-black border-l border-white/10 shadow-2xl overflow-y-auto"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-void-black/90 backdrop-blur z-10 p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-widest uppercase text-white" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                Support Hub
              </h2>
              <button onClick={handleClose} className="text-soft-gray hover:text-white transition-colors p-2" aria-label="Close Support Hub">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-12">
              {/* How to Fit Carousel */}
              <section>
                <h3 className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase mb-4">How to Fit</h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <div className="text-5xl mb-4">{HOW_TO_FIT_STEPS[activeStep].icon}</div>
                      <h4 className="text-sm font-bold text-white mb-2">{HOW_TO_FIT_STEPS[activeStep].title}</h4>
                      <p className="text-xs text-soft-gray">{HOW_TO_FIT_STEPS[activeStep].desc}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Indicators */}
                  <div className="flex justify-center gap-2 mt-6">
                    {HOW_TO_FIT_STEPS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${activeStep === idx ? 'bg-white w-4' : 'bg-white/20'}`}
                        aria-label={`Go to step ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Caution Section */}
              <section>
                <h3 className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase mb-4">Best Practices</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-xl shrink-0" role="img" aria-label="Warning">⚠️</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Lighting Matters</h4>
                      <p className="text-xs text-soft-gray mt-1">Ensure your face and body are well-lit. Avoid shadows across your features.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-xl shrink-0" role="img" aria-label="Camera Distance">📏</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Camera Distance</h4>
                      <p className="text-xs text-soft-gray mt-1">Stand about 3-4 feet from the camera to capture a proportional full-body shot.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Accordion */}
              <section className="pb-10">
                <h3 className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase mb-4">FAQ</h3>
                <div className="space-y-2">
                  {FAQS.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-left p-4 flex justify-between items-center text-sm font-medium text-white hover:bg-white/5 transition-colors"
                      >
                        {faq.q}
                        <span className="text-soft-gray transition-transform duration-300" style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          ▼
                        </span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
