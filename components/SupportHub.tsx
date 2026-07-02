'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronRight, ChevronLeft, Sun, Camera, ChevronDown, ChevronUp } from 'lucide-react';

const GUIDE_STEPS = [
  {
    title: 'Step 1: The Setup',
    description: 'Ensure you are in a well-lit room. Stand 2-3 meters away from your camera.',
    icon: <Camera className="w-12 h-12 text-[#C9B037] mb-4 mx-auto" />
  },
  {
    title: 'Step 2: The Pose',
    description: 'Stand straight with your arms slightly away from your body. Avoid baggy clothing.',
    icon: <div className="w-12 h-12 border-2 border-[#C9B037] rounded-full flex items-center justify-center text-[#C9B037] text-xl font-bold mb-4 mx-auto">🧍</div>
  },
  {
    title: 'Step 3: The Magic',
    description: 'Select your desired garment and let our AI tailor it perfectly to your digital twin.',
    icon: <div className="w-12 h-12 bg-gradient-to-tr from-[#C9B037] to-[#F4E4BC] rounded-full flex items-center justify-center text-black text-xl mb-4 mx-auto">✨</div>
  }
];

const FAQS = [
  {
    question: 'How accurate is the sizing?',
    answer: 'Our AI analyzes over 50 body points to recommend the perfect size with 95% accuracy compared to a human tailor.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Your photos are processed momentarily and deleted immediately. We never store your personal images.'
  },
  {
    question: 'Can I try on luxury brands?',
    answer: 'Yes. Premium members get exclusive access to our luxury tier featuring brands like Gucci and Chanel.'
  }
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentGuideStep, setCurrentGuideStep] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const nextStep = () => setCurrentGuideStep((prev) => (prev + 1) % GUIDE_STEPS.length);
  const prevStep = () => setCurrentGuideStep((prev) => (prev - 1 + GUIDE_STEPS.length) % GUIDE_STEPS.length);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white/50 hover:text-[#C9B037] transition-colors p-2 rounded-full hover:bg-white/5"
        aria-label="Open Support Hub"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold tracking-widest text-[#C9B037]" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
                    SUPPORT HUB
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* HOW TO FIT - CAROUSEL */}
                <section className="mb-12">
                  <h3 className="text-sm tracking-widest text-white/50 mb-4 uppercase">How to Fit</h3>
                  <div className="bg-[#1A1A1A] rounded-2xl p-6 relative min-h-[250px] flex flex-col justify-center items-center text-center border border-white/5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentGuideStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full"
                      >
                        {GUIDE_STEPS[currentGuideStep].icon}
                        <h4 className="text-lg font-bold text-white mb-2">{GUIDE_STEPS[currentGuideStep].title}</h4>
                        <p className="text-sm text-white/70">{GUIDE_STEPS[currentGuideStep].description}</p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4">
                      <button onClick={prevStep} className="p-2 text-white/50 hover:text-white transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex gap-2">
                        {GUIDE_STEPS.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentGuideStep ? 'bg-[#C9B037]' : 'bg-white/20'}`} />
                        ))}
                      </div>
                      <button onClick={nextStep} className="p-2 text-white/50 hover:text-white transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* CAUTION SECTION */}
                <section className="mb-12">
                  <h3 className="text-sm tracking-widest text-white/50 mb-4 uppercase">Caution</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-red-900/10 border border-red-900/30">
                      <Sun className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-red-400 mb-1">Avoid Backlighting</h4>
                        <p className="text-xs text-white/60">Ensure the light source is in front of you, not behind you. Dark silhouettes will reduce fitting accuracy.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-900/10 border border-orange-900/30">
                      <Camera className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-orange-400 mb-1">Camera Distance</h4>
                        <p className="text-xs text-white/60">Position the camera at waist height, directly perpendicular to the ground.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Q&A ACCORDION */}
                <section>
                  <h3 className="text-sm tracking-widest text-white/50 mb-4 uppercase">Q&A</h3>
                  <div className="space-y-2">
                    {FAQS.map((faq, index) => (
                      <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-[#1A1A1A]/50">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-medium text-white">{faq.question}</span>
                          {openFaqIndex === index ? (
                            <ChevronUp className="w-4 h-4 text-[#C9B037]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-white/50" />
                          )}
                        </button>
                        <AnimatePresence>
                          {openFaqIndex === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-sm text-white/60 border-t border-white/5">
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
    </>
  );
}
