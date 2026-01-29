'use client';

import React, { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { motion, AnimatePresence } from 'framer-motion';

const GUIDE_STEPS = [
  {
    title: 'Select Your Style',
    desc: 'Browse our exclusive collections from ZARA, Gucci, and more. Choose the piece that defines you.',
    icon: '👔',
  },
  {
    title: 'Upload or Capture',
    desc: 'Use your camera or upload a full-body photo. Ensure good lighting for the best analysis.',
    icon: '📸',
  },
  {
    title: 'AI Analysis',
    desc: 'Our Masterpiece Engine analyzes your pose, proportions, and style DNA in seconds.',
    icon: '✨',
  },
  {
    title: 'Virtual Try-On',
    desc: 'See yourself in the new look. Check the fit heatmap and material details.',
    icon: '🕴️',
  },
];

const FAQS = [
  {
    q: 'How accurate is the sizing?',
    a: 'S_FIT AI uses advanced computer vision to estimate measurements within 98% accuracy compared to manual tailoring.',
  },
  {
    q: 'What photos work best?',
    a: 'A full-body shot against a neutral background with good lighting. Avoid loose clothing for better body shape detection.',
  },
  {
    q: 'Is my photo saved?',
    a: 'Photos are processed securely in real-time and are not permanently stored on our servers unless you save them to your profile.',
  },
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % GUIDE_STEPS.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + GUIDE_STEPS.length) % GUIDE_STEPS.length);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all hover:scale-105"
        aria-label="Help & Support"
      >
        <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">?</span>
      </button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Support Hub">
        <div className="space-y-10">

          {/* Section 1: User Guide Carousel */}
          <section>
            <h4 className="text-xs font-bold text-cyber-lime uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime" />
              How to Fit
            </h4>

            <div className="relative bg-white/5 rounded-2xl p-6 border border-white/10 overflow-hidden min-h-[180px] flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <div className="text-4xl mb-3">{GUIDE_STEPS[currentStep].icon}</div>
                  <h5 className="text-lg font-bold text-white mb-2">{GUIDE_STEPS[currentStep].title}</h5>
                  <p className="text-xs text-soft-gray leading-relaxed">{GUIDE_STEPS[currentStep].desc}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-2 mt-6">
                {GUIDE_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-6 bg-cyber-lime' : 'w-1.5 bg-white/20'}`}
                  />
                ))}
              </div>

              {/* Navigation overlay (invisible) */}
              <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                <button onClick={prevStep} className="pointer-events-auto p-2 text-white/20 hover:text-white transition-colors">❮</button>
                <button onClick={nextStep} className="pointer-events-auto p-2 text-white/20 hover:text-white transition-colors">❯</button>
              </div>
            </div>
          </section>

          {/* Section 2: Cautions */}
          <section>
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              Critical Cautions
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 flex flex-col items-center text-center">
                <span className="text-xl mb-2">💡</span>
                <span className="text-[10px] text-red-200 font-bold uppercase">Lighting</span>
                <span className="text-[9px] text-red-200/60 mt-1">Avoid backlight & shadows</span>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 flex flex-col items-center text-center">
                <span className="text-xl mb-2">📏</span>
                <span className="text-[10px] text-red-200 font-bold uppercase">Distance</span>
                <span className="text-[9px] text-red-200/60 mt-1">Stand 2-3m away from cam</span>
              </div>
            </div>
          </section>

          {/* Section 3: FAQs */}
          <section>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Common Questions
            </h4>
            <div className="space-y-2">
              {FAQS.map((faq, idx) => (
                <AccordionItem key={idx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </section>

        </div>
      </Drawer>
    </>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-xs font-bold text-white">{question}</span>
        <span className={`text-soft-gray transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 text-[11px] text-soft-gray leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
