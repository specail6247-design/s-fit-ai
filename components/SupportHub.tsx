import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  { question: "What is S_FIT NEO?", answer: "S_FIT NEO is a high-fidelity virtual try-on engine that visualizes garments on your body instantly." },
  { question: "Why is my photo rejected?", answer: "Ensure good lighting, full-body visibility, and no obstructions (e.g., crossing arms) for optimal analysis." },
  { question: "How is my data used?", answer: "Your photos are processed temporarily for the fitting session and are never permanently stored without consent." }
];

const guideSteps = [
  { title: "Step 1: Frontal Pose", desc: "Stand straight, arms slightly away from the body." },
  { title: "Step 2: Good Lighting", desc: "Ensure natural or bright lighting. Avoid heavy shadows." },
  { title: "Step 3: Contrast", desc: "Wear clothes that contrast with your background for better edge detection." }
];

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [guideIndex, setGuideIndex] = useState(0);

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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-50 p-8 overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold tracking-widest uppercase text-white">Support <span className="text-[#007AFF]">Hub</span></h2>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Guide Carousel */}
            <div className="mb-10">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">How to Fit</h3>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-40 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={guideIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <h4 className="text-[#CCFF00] font-bold text-sm mb-2">{guideSteps[guideIndex].title}</h4>
                    <p className="text-xs text-gray-300">{guideSteps[guideIndex].desc}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel controls */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2">
                  {guideSteps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGuideIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${guideIndex === idx ? 'bg-[#CCFF00] w-4' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Caution Section */}
            <div className="mb-10">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Caution</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                  <span className="text-red-400 text-lg">⚠️</span>
                  <div>
                    <h4 className="text-xs font-bold text-red-400">Lighting Warning</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Avoid backlit photos or extremely dark environments. The AI requires clear edges.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl">
                  <span className="text-orange-400 text-lg">📷</span>
                  <div>
                    <h4 className="text-xs font-bold text-orange-400">Camera Distance</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Keep the camera roughly waist-height and capture full body or upper body clearly without cutting off limbs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Q&A Accordion */}
            <div>
              <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">FAQ</h3>
              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full px-4 py-4 text-left flex justify-between items-center text-sm font-bold text-white hover:bg-white/5 transition-colors"
                    >
                      {faq.question}
                      <motion.span animate={{ rotate: activeFaq === idx ? 180 : 0 }} className="text-gray-500">
                        ▼
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
