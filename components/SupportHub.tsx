import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    { title: "Snap a Photo", desc: "Front-facing, arms slightly apart." },
    { title: "Select Garment", desc: "Choose any item from the catalog." },
    { title: "See the Fit", desc: "AI generates your 3D digital twin." }
  ];

  const faqs = [
    { q: "How accurate is the sizing?", a: "Our AI maps over 50 body points for 95% accuracy." },
    { q: "Is my data secure?", a: "Photos are deleted immediately after processing." },
    { q: "Can I try multiple items?", a: "Yes, premium members can layer items." }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#050505] border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-10">
              <header className="flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-widest uppercase font-mono text-[#007AFF]">
                  Support Hub
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </header>

              {/* Guide Carousel */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest">How to Fit</h3>
                <div className="relative h-32 bg-white/5 border border-white/10 rounded-xl overflow-hidden p-4 flex flex-col justify-center items-center text-center">
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={activeStep}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.3 }}
                       className="space-y-2"
                     >
                       <div className="text-xl font-bold font-mono text-white">0{activeStep + 1}</div>
                       <div className="font-bold text-sm">{steps[activeStep].title}</div>
                       <div className="text-xs text-white/60">{steps[activeStep].desc}</div>
                     </motion.div>
                   </AnimatePresence>

                   <div className="absolute bottom-2 flex gap-1">
                      {steps.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveStep(i)}
                          className={`w-1.5 h-1.5 rounded-full ${i === activeStep ? 'bg-[#007AFF]' : 'bg-white/20'}`}
                          aria-label={`Step ${i+1}`}
                        />
                      ))}
                   </div>
                </div>
              </section>

              {/* Caution */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest">Important Setup</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-900/10 border border-red-500/20 p-3 rounded-lg flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-red-500">light_mode</span>
                    <span className="text-[10px] text-white/80">Avoid Backlight</span>
                  </div>
                  <div className="bg-orange-900/10 border border-orange-500/20 p-3 rounded-lg flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-orange-500">straighten</span>
                    <span className="text-[10px] text-white/80">Stand 6ft Away</span>
                  </div>
                </div>
              </section>

              {/* FAQ Accordion */}
              <section className="space-y-4 pb-8">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest">FAQ</h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-3 text-left bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <span className="text-xs font-bold text-white/90">{faq.q}</span>
                        <span className="material-symbols-outlined text-sm text-white/50">
                          {openFaq === index ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3 pt-0 text-xs text-white/60 bg-white/5">
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
  );
}
