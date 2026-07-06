'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Sun, Camera, ChevronDown, ChevronUp, Image as ImageIcon, Sparkles, Shirt } from 'lucide-react';

const QA_DATA = [
  {
    q: 'What kind of photos work best?',
    a: 'Front-facing, full-body shots with good lighting. Avoid heavy shadows or baggy clothing that obscures your body shape.'
  },
  {
    q: 'Can I use professional model photos?',
    a: 'Yes, but for accurate fitting, photos of yourself in neutral lighting are recommended.'
  },
  {
    q: 'How long does the AI take?',
    a: 'Usually between 15-30 seconds depending on server load.'
  }
];

const CAROUSEL_STEPS = [
  {
    icon: <ImageIcon className="w-8 h-8 mb-4 text-[#007AFF]" />,
    title: '1. Snap',
    desc: 'Take a clear, full-body photo against a plain background.'
  },
  {
    icon: <Shirt className="w-8 h-8 mb-4 text-[#007AFF]" />,
    title: '2. Select',
    desc: 'Upload a picture of the garment you want to try on. Flat lays work best.'
  },
  {
    icon: <Sparkles className="w-8 h-8 mb-4 text-[#007AFF]" />,
    title: '3. Style',
    desc: 'Our AI analyzes your body and drapes the garment digitally.'
  }
];

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [openQAIndex, setOpenQAIndex] = useState<number | null>(null);

  const toggleQA = (index: number) => {
    setOpenQAIndex(openQAIndex === index ? null : index);
  };

  const nextStep = () => setCurrentStep((p) => (p + 1) % CAROUSEL_STEPS.length);

  return (
    <>
      {/* Hidden Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white z-40 transition-all opacity-50 hover:opacity-100"
        aria-label="Open Support Hub"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#050505] border-l border-white/10 z-50 p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold font-serif italic tracking-widest uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* How to Fit - Carousel */}
              <section className="mb-12">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-6 border-b border-white/10 pb-2">How to Fit</h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/10 transition-colors h-48 flex flex-col items-center justify-center" onClick={nextStep}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center"
                    >
                      {CAROUSEL_STEPS[currentStep].icon}
                      <h4 className="font-bold text-white mb-2">{CAROUSEL_STEPS[currentStep].title}</h4>
                      <p className="text-xs text-gray-400">{CAROUSEL_STEPS[currentStep].desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  {CAROUSEL_STEPS.map((_, idx) => (
                    <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === currentStep ? 'bg-[#007AFF]' : 'bg-white/20'}`} />
                  ))}
                </div>
              </section>

              {/* Caution */}
              <section className="mb-12">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-6 border-b border-white/10 pb-2">Caution</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-red-950/20 border border-red-900/30 p-4 rounded-xl">
                    <Sun className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300 leading-relaxed">Avoid harsh backlighting or severe shadows. Even, diffuse lighting provides the most accurate garment draping.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-red-950/20 border border-red-900/30 p-4 rounded-xl">
                    <Camera className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300 leading-relaxed">Keep the camera at waist-height and stand approximately 6 feet (2 meters) away to minimize lens distortion.</p>
                  </div>
                </div>
              </section>

              {/* Q&A Accordion */}
              <section>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-6 border-b border-white/10 pb-2">Q&A</h3>
                <div className="space-y-2">
                  {QA_DATA.map((item, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => toggleQA(idx)}
                        className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-medium">{item.q}</span>
                        {openQAIndex === idx ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                      </button>
                      <AnimatePresence>
                        {openQAIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
