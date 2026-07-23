'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CAUTION_ITEMS = [
  { icon: '💡', text: 'Ensure even, bright lighting. Avoid harsh shadows.' },
  { icon: '📏', text: 'Keep camera at chest level, about 3-5 feet away.' },
  { icon: '👕', text: 'Wear form-fitting clothes for best results.' }
];

const FAQ_ITEMS = [
  { q: 'How long does generation take?', a: 'Typically 15-30 seconds depending on server load and image complexity.' },
  { q: 'What photo formats are supported?', a: 'We support standard JPG and PNG formats up to 5MB in size.' },
  { q: 'Is my data stored securely?', a: 'Yes. Images are processed ephemerally and deleted from our active servers shortly after generation.' }
];

const GUIDE_SLIDES = [
  { title: 'Step 1: Front Pose', desc: 'Stand straight, facing the camera with arms slightly away from your body.' },
  { title: 'Step 2: Clear Background', desc: 'Use a plain, uncluttered background (like a blank wall) for perfect extraction.' },
  { title: 'Step 3: Garment Selection', desc: 'Choose a garment photo that is flat-laid or on a ghost mannequin for the best fit mapping.' }
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-black/50 backdrop-blur-md border border-white/10 hover:border-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all group"
        aria-label="Open Support Hub"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">ℹ️</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-serif text-white tracking-wide">Support Hub</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-white transition-colors p-2"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Section: User Guide (Carousel) */}
                <div className="mb-12">
                  <h3 className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-4">How to Fit (Guide)</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden min-h-[140px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="text-sm font-medium text-white mb-2">{GUIDE_SLIDES[activeSlide].title}</h4>
                        <p className="text-sm text-gray-400 font-light">{GUIDE_SLIDES[activeSlide].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Carousel Controls */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {GUIDE_SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlide(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${activeSlide === idx ? 'bg-white w-4' : 'bg-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section: Caution */}
                <div className="mb-12">
                  <h3 className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-4">Caution</h3>
                  <div className="space-y-3">
                    {CAUTION_ITEMS.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-red-950/20 border border-red-900/30 rounded-lg p-4">
                        <span className="text-lg leading-none">{item.icon}</span>
                        <p className="text-sm text-gray-300 font-light">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: Q&A */}
                <div className="mb-8">
                  <h3 className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-4">Q&A</h3>
                  <div className="space-y-2">
                    {FAQ_ITEMS.map((item, idx) => (
                      <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                          className="w-full text-left p-4 flex justify-between items-center text-sm font-medium text-white hover:bg-white/5 transition-colors"
                        >
                          {item.q}
                          <span className={`text-gray-500 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                            ↓
                          </span>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-sm text-gray-400 font-light border-t border-white/10 mt-2">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 text-center border-t border-white/10 pt-8">
                  <p className="text-[10px] text-gray-600 tracking-widest uppercase">
                    S_FIT NEO | Version 1.0.0
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
