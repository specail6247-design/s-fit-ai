'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Sun, Camera, ChevronRight, ChevronLeft, X, ChevronDown, ChevronUp } from 'lucide-react';

const GUIDE_STEPS = [
  {
    title: "1. Prepare Photo",
    desc: "Ensure clear visibility of your body. Avoid baggy clothing for best AI mapping results."
  },
  {
    title: "2. Select Garment",
    desc: "Choose a target garment. Front-facing, high-resolution images produce the most realistic fit."
  },
  {
    title: "3. Generate",
    desc: "Hit 'Try It On'. Our AI analyzes proportions and drapes the garment onto your digital twin."
  }
];

const FAQS = [
  { q: "How accurate is the fit?", a: "S_FIT NEO uses advanced pose estimation to map the garment to your specific proportions with up to 94% accuracy." },
  { q: "What photos work best?", a: "Well-lit photos taken from chest height, facing forward, against a simple background." },
  { q: "Is my data stored?", a: "Images are processed in memory and immediately discarded unless you explicitly save the result." }
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Trigger Button - Hidden until needed philosophy */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all shadow-lg"
        aria-label="Open Support Hub"
      >
        <HelpCircle size={24} />
      </button>

      {/* Drawer Overlay & Container */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[70] overflow-y-auto flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 sticky top-0 z-10 backdrop-blur-md">
                <h2 className="text-lg font-serif tracking-widest text-white uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-12 flex-1">

                {/* Visual User Guide Carousel */}
                <section>
                  <h3 className="text-xs font-mono text-[#007AFF] mb-4 uppercase tracking-widest">How To Fit</h3>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-xl relative min-h-[140px] flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={guideStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-2"
                      >
                        <h4 className="text-sm font-bold text-white">{GUIDE_STEPS[guideStep].title}</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">{GUIDE_STEPS[guideStep].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-between items-center mt-6">
                      <div className="flex gap-2">
                        {GUIDE_STEPS.map((_, i) => (
                          <div key={i} className={`h-1 rounded-full transition-all ${i === guideStep ? 'w-4 bg-[#007AFF]' : 'w-2 bg-white/20'}`} />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setGuideStep(Math.max(0, guideStep - 1))}
                          disabled={guideStep === 0}
                          className="p-1 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setGuideStep(Math.min(GUIDE_STEPS.length - 1, guideStep + 1))}
                          disabled={guideStep === GUIDE_STEPS.length - 1}
                          className="p-1 rounded-full bg-[#007AFF]/20 text-[#007AFF] hover:bg-[#007AFF]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Caution Warnings */}
                <section>
                  <h3 className="text-xs font-mono text-red-400 mb-4 uppercase tracking-widest">Caution</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl flex items-start gap-3">
                      <Sun className="text-red-400 shrink-0" size={18} />
                      <div>
                        <div className="text-xs font-bold text-white mb-1">Lighting</div>
                        <div className="text-[10px] text-gray-400">Avoid extreme shadows or backlighting.</div>
                      </div>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl flex items-start gap-3">
                      <Camera className="text-red-400 shrink-0" size={18} />
                      <div>
                        <div className="text-xs font-bold text-white mb-1">Distance</div>
                        <div className="text-[10px] text-gray-400">Keep camera 3-5 feet away for optimal scale.</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ Accordion */}
                <section>
                  <h3 className="text-xs font-mono text-white/50 mb-4 uppercase tracking-widest">Q&A</h3>
                  <div className="space-y-2">
                    {FAQS.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm text-white font-medium">{faq.q}</span>
                          {openFaq === idx ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                        </button>
                        <AnimatePresence>
                          {openFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
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

              <div className="p-6 text-center text-[10px] text-white/30 font-mono tracking-widest border-t border-white/5">
                S_FIT NEO // SYSTEM DOCS V1.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
