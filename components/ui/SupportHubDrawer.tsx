import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHubDrawer: React.FC<SupportHubDrawerProps> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guideSteps = [
    {
      title: 'Step 1: Front Facing',
      description: 'Ensure you are directly facing the camera with good lighting. Do not obscure your body.',
      icon: '📸'
    },
    {
      title: 'Step 2: Tight Clothing',
      description: 'Wear form-fitting clothes for accurate body mesh generation. Avoid baggy items.',
      icon: '👕'
    },
    {
      title: 'Step 3: Upload Garment',
      description: 'Provide a clear, front-facing image of the garment you wish to try on.',
      icon: '👗'
    }
  ];

  const faqs = [
    { q: 'Why is the try-on taking so long?', a: 'High-quality 3D mesh generation can take up to 10 seconds. Please be patient.' },
    { q: 'Can I use this for non-clothing items?', a: 'Currently, the S_FIT engine is optimized for upper body garments (shirts, jackets, etc.).' },
    { q: 'What happens to my photos?', a: 'Photos are processed temporarily and are not stored permanently after the session.' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 bg-[#0A0A0A] border-l border-white/10 shadow-2xl flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-[family-name:var(--font-display)] text-[#C9B037] uppercase tracking-widest">
                  Support Hub
                </h2>
                <p className="text-xs text-gray-500 font-[family-name:var(--font-body)]">
                  Guidelines & FAQ
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close support hub"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-10">
              {/* User Guide Carousel */}
              <section>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">How to Fit</h3>
                <div className="relative bg-white/5 rounded-xl border border-white/10 p-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-center"
                    >
                      <div className="text-4xl mb-4">{guideSteps[activeStep].icon}</div>
                      <h4 className="text-white font-bold text-sm mb-2">{guideSteps[activeStep].title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{guideSteps[activeStep].description}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center gap-2 mt-6">
                    {guideSteps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === activeStep ? 'bg-[#C9B037]' : 'bg-white/20'
                        }`}
                        aria-label={`Go to step ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Caution / Warnings */}
              <section>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Caution</h3>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-3">
                  <div className="flex gap-3 items-start">
                    <span className="text-red-400">⚠️</span>
                    <div>
                      <h4 className="text-xs font-bold text-red-200">Lighting is Critical</h4>
                      <p className="text-[10px] text-red-300/80 mt-1">Dark or heavily shadowed photos will result in poor mesh quality.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-red-400">📏</span>
                    <div>
                      <h4 className="text-xs font-bold text-red-200">Camera Distance</h4>
                      <p className="text-[10px] text-red-300/80 mt-1">Stand approximately 3 to 5 feet away from the camera for full torso visibility.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Accordion */}
              <section>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Q&A</h3>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-lg bg-black/40 overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 flex justify-between items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
                      >
                        {faq.q}
                        <span className="text-gray-500">{openFaq === idx ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-xs text-gray-500 leading-relaxed"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-auto p-6 border-t border-white/10 text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                S_FIT Protocol v2.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
