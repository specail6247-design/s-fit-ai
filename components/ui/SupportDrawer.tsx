import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown, ChevronUp, X, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const guideSteps = [
  {
    title: '1. Prepare Your Space',
    desc: 'Find a well-lit room with a neutral background.',
    img: '📸',
  },
  {
    title: '2. Take a Clear Photo',
    desc: 'Stand straight, hands slightly away from body, facing the camera.',
    img: '🧍',
  },
  {
    title: '3. Select a Garment',
    desc: 'Choose the clothing item you want to try on.',
    img: '👕',
  },
  {
    title: '4. View Your Fit',
    desc: 'Wait a few seconds for the AI to generate your result.',
    img: '✨',
  }
];

const faqs = [
  { q: "How accurate is the fit?", a: "Our AI generates a high-fidelity representation of how the garment will look on your specific body type and pose." },
  { q: "What photos work best?", a: "Front-facing photos with good lighting, no harsh shadows, and contrasting background work best." },
  { q: "Is my data secure?", a: "Yes. We process your image for the try-on and do not store it permanently without your permission." },
];

export function SupportDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const nextStep = () => setActiveStep((prev) => (prev + 1) % guideSteps.length);
  const prevStep = () => setActiveStep((prev) => (prev - 1 + guideSteps.length) % guideSteps.length);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 hover:bg-white/20 transition-all z-40 text-white shadow-lg"
        aria-label="Help and Support"
      >
        <HelpCircle size={24} />
      </button>

      {/* Drawer Overlay & Content */}
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-mono font-bold tracking-widest uppercase text-white">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-soft-gray hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-10 flex-1">

                {/* User Guide Carousel */}
                <section>
                  <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative flex flex-col items-center text-center">
                    <div className="text-6xl mb-4">{guideSteps[activeStep].img}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{guideSteps[activeStep].title}</h4>
                    <p className="text-sm text-soft-gray h-12">{guideSteps[activeStep].desc}</p>

                    {/* Carousel Controls */}
                    <div className="flex items-center justify-between w-full mt-6">
                      <button onClick={prevStep} className="p-2 text-white/50 hover:text-white transition-colors"><ChevronLeft size={20}/></button>
                      <div className="flex gap-2">
                        {guideSteps.map((_, i) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeStep ? 'w-6 bg-cyber-lime' : 'w-1.5 bg-white/20'}`} />
                        ))}
                      </div>
                      <button onClick={nextStep} className="p-2 text-white/50 hover:text-white transition-colors"><ChevronRight size={20}/></button>
                    </div>
                  </div>
                </section>

                {/* Caution Section */}
                <section>
                   <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 flex gap-4 items-start">
                     <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                     <div>
                       <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-1">Caution</h4>
                       <p className="text-xs text-yellow-500/80 leading-relaxed">Ensure the camera is at chest-level and you are standing 1-2 meters away. Avoid strong backlighting.</p>
                     </div>
                   </div>
                </section>

                {/* FAQ Section */}
                <section>
                  <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">Q&A</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleQuestion(i)}
                          className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
                        >
                          <span className="text-sm font-bold text-white">{faq.q}</span>
                          {activeQuestion === i ? <ChevronUp size={16} className="text-soft-gray" /> : <ChevronDown size={16} className="text-soft-gray" />}
                        </button>
                        <AnimatePresence>
                          {activeQuestion === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/10 mt-2 mx-4">
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
          </>
        )}
      </AnimatePresence>
    </>
  );
}
