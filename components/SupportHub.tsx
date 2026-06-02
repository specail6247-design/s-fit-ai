'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CAROUSEL_STEPS = [
  {
    title: 'Step 1: The Right Fit',
    description: 'Wear tight-fitting clothes to ensure accurate measurements and realistic fabric draping.',
  },
  {
    title: 'Step 2: Pose Naturally',
    description: 'Stand straight with arms slightly away from your body in an A-pose.',
  },
  {
    title: 'Step 3: Capture',
    description: 'Ensure the camera captures your full body from head to toe.',
  },
];

const FAQS = [
  {
    q: 'How accurate is the sizing?',
    a: 'Our AI analyzes your body proportions to provide a 95% accurate size recommendation based on the specific brand\'s measurement charts.',
  },
  {
    q: 'Can I upload my own clothes?',
    a: 'Yes, you can upload a photo of your own garment, provided it is a clear front view.',
  },
  {
    q: 'Why did my try-on fail?',
    a: 'Try-on may fail if the photo is too dark, blurry, or if you are not clearly visible. Please follow the caution guidelines.',
  },
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Support Hub"
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-void-black border border-white/10 hover:border-white/30 transition-all flex items-center justify-center group"
      >
        <span className="material-symbols-outlined text-white group-hover:text-cyber-lime transition-colors">
          help
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-void-black border-l border-white/10 z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold uppercase tracking-widest text-white">Support Hub</h2>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="text-soft-gray hover:text-white transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* How to Fit Carousel */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-wider mb-4 border-b border-white/10 pb-2">How to Fit</h3>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 min-h-[140px] flex flex-col justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm mb-2">{CAROUSEL_STEPS[activeStep].title}</h4>
                  <p className="text-soft-gray text-xs leading-relaxed">{CAROUSEL_STEPS[activeStep].description}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="text-xs text-white disabled:opacity-30 hover:text-cyber-lime transition-colors flex items-center gap-1 uppercase tracking-wider"
                  >
                     <span className="material-symbols-outlined text-sm">chevron_left</span> Prev
                  </button>
                  <div className="flex gap-1">
                     {CAROUSEL_STEPS.map((_, i) => (
                       <div key={i} className={`w-2 h-2 rounded-full ${i === activeStep ? 'bg-cyber-lime' : 'bg-white/20'}`} />
                     ))}
                  </div>
                  <button
                    onClick={() => setActiveStep(Math.min(CAROUSEL_STEPS.length - 1, activeStep + 1))}
                    disabled={activeStep === CAROUSEL_STEPS.length - 1}
                    className="text-xs text-white disabled:opacity-30 hover:text-cyber-lime transition-colors flex items-center gap-1 uppercase tracking-wider"
                  >
                    Next <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cautions */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Caution</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-amber-400 mt-0.5">light_mode</span>
                  <div>
                     <h4 className="text-white text-xs font-bold">Lighting</h4>
                     <p className="text-soft-gray text-xs">Ensure bright, even lighting. Avoid strong backlights or deep shadows.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-amber-400 mt-0.5">photo_camera</span>
                  <div>
                     <h4 className="text-white text-xs font-bold">Camera Distance</h4>
                     <p className="text-soft-gray text-xs">Place the camera 2-3 meters away. Do not use ultra-wide lenses as they distort proportions.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-amber-400 mt-0.5">accessibility_new</span>
                  <div>
                     <h4 className="text-white text-xs font-bold">Background</h4>
                     <p className="text-soft-gray text-xs">Use a clean, solid color background for best AI segmentation results.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Q&A Accordion */}
            <div>
              <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Q&A</h3>
              <div className="space-y-2">
                {FAQS.map((faq, index) => (
                  <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-4 py-3 text-xs font-bold text-white flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      {faq.q}
                      <span className="material-symbols-outlined text-sm transition-transform duration-200" style={{ transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        expand_more
                      </span>
                    </button>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-xs text-soft-gray border-t border-white/10 leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
