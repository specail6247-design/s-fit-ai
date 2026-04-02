import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const guideSteps = [
  {
    title: 'Good Lighting',
    description: 'Ensure your room is well-lit. Avoid strong shadows on your face or body.',
    icon: 'lightbulb'
  },
  {
    title: 'Camera Distance',
    description: 'Stand at least 1.5 meters away from the camera for full-body capture.',
    icon: 'photo_camera'
  },
  {
    title: 'Clear Background',
    description: 'A plain, contrasting background works best for our AI to analyze your fit.',
    icon: 'wallpaper'
  }
];

const faqs = [
  {
    question: 'How accurate is the sizing?',
    answer: 'Our AI uses advanced depth estimation to achieve up to 98% accuracy compared to manual measurements.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, photos are processed ephemerally and deleted immediately after your session ends.'
  },
  {
    question: 'Can I try clothes from other brands?',
    answer: 'We are constantly adding new brands. Currently, we support major mass-market and select luxury brands.'
  }
];

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % guideSteps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + guideSteps.length) % guideSteps.length);

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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <h2 className="text-xl font-bold font-mono tracking-widest text-white uppercase">
                Support Hub
              </h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors p-2 focus-visible:ring-2 outline-none"
                aria-label="Close Support Hub"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-10">

              {/* 1. User Guide Carousel */}
              <section>
                <h3 className="text-xs text-[#C9B037] font-bold uppercase tracking-widest mb-4">
                  How to Fit
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden h-48">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center text-center h-full justify-center"
                    >
                      <span className="material-symbols-outlined text-4xl text-white mb-3">
                        {guideSteps[currentStep].icon}
                      </span>
                      <h4 className="font-bold text-white mb-2">{guideSteps[currentStep].title}</h4>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {guideSteps[currentStep].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  <div className="absolute bottom-4 left-0 w-full flex justify-between px-4">
                    <button onClick={prevStep} className="text-white/50 hover:text-white focus-visible:ring-2 outline-none" aria-label="Previous step">
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <div className="flex gap-1 items-center">
                      {guideSteps.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all ${
                            idx === currentStep ? 'w-4 bg-[#C9B037]' : 'w-1 bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <button onClick={nextStep} className="text-white/50 hover:text-white focus-visible:ring-2 outline-none" aria-label="Next step">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* 2. Caution Section */}
              <section>
                <h3 className="text-xs text-[#C9B037] font-bold uppercase tracking-widest mb-4">
                  Important Cautions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
                    <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">warning</span>
                    <div>
                      <h4 className="text-sm font-bold text-red-200">Avoid Backlighting</h4>
                      <p className="text-xs text-red-200/70 mt-1">Light source should be in front of you, not behind.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                    <span className="material-symbols-outlined text-white/70 text-lg mt-0.5">straighten</span>
                    <div>
                      <h4 className="text-sm font-bold text-white/90">Keep Phone Vertical</h4>
                      <p className="text-xs text-white/50 mt-1">Ensure your camera is perfectly vertical for accurate proportions.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Q&A Accordion */}
              <section>
                <h3 className="text-xs text-[#C9B037] font-bold uppercase tracking-widest mb-4">
                  Q&A
                </h3>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition-colors focus-visible:ring-2 outline-none"
                        aria-expanded={openFaq === idx}
                      >
                        <span className="text-sm font-medium text-white">{faq.question}</span>
                        <span className="material-symbols-outlined text-white/50 transition-transform duration-200" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          expand_more
                        </span>
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-white/60 leading-relaxed border-t border-white/5 mt-2">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
