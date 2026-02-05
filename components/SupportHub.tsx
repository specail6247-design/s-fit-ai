import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQ_ITEMS = [
  { q: "How do I get the best fit?", a: "Ensure your photo is well-lit and you are facing the camera directly. Wear tight-fitting clothes for accurate body mapping." },
  { q: "Is my data private?", a: "Yes. Your photos are processed in real-time and are not permanently stored on our servers without your explicit consent." },
  { q: "Why is the 3D engine loading?", a: "The S_FIT engine uses high-fidelity physics. This requires downloading 3D assets, which may take a moment on slower connections." }
];

const GUIDE_STEPS = [
  { title: "Upload User Photo", desc: "Use a clear, front-facing photo.", icon: "👤" },
  { title: "Select Garment", desc: "Choose a luxury item from the list or upload your own.", icon: "👗" },
  { title: "Generate", desc: "Our AI maps the fabric to your body physics.", icon: "✨" }
];

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [currentStep, setCurrentStep] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0f0f0f]">
              <div>
                <h2 className="text-xl font-cinzel text-white">SUPPORT HUB</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Assistant & Guide</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] bg-white/5 border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                User Guide
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'faq' ? 'text-[#007AFF] bg-white/5 border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Q&A
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {activeTab === 'guide' ? (
                <div className="space-y-8">
                  {/* Carousel */}
                  <div className="bg-white/5 rounded-2xl p-8 flex flex-col items-center text-center border border-white/5 min-h-[250px] justify-center relative overflow-hidden">
                     {/* Animated Step Content */}
                     <AnimatePresence mode='wait'>
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col items-center"
                        >
                          <div className="text-6xl mb-4">{GUIDE_STEPS[currentStep].icon}</div>
                          <h3 className="text-lg font-bold text-white mb-2">{GUIDE_STEPS[currentStep].title}</h3>
                          <p className="text-sm text-gray-400">{GUIDE_STEPS[currentStep].desc}</p>
                        </motion.div>
                     </AnimatePresence>

                     {/* Indicators */}
                     <div className="flex gap-2 mt-8">
                       {GUIDE_STEPS.map((_, i) => (
                         <button
                           key={i}
                           onClick={() => setCurrentStep(i)}
                           className={`w-2 h-2 rounded-full transition-all ${i === currentStep ? 'bg-[#007AFF] w-4' : 'bg-gray-600'}`}
                         />
                       ))}
                     </div>
                  </div>

                  {/* Caution Section */}
                  <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-xl p-4 flex gap-4 items-start">
                    <div className="text-yellow-500 text-xl">⚠️</div>
                    <div>
                      <h4 className="text-yellow-500 font-bold text-xs uppercase mb-1">Critical Caution</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Lighting must be even. Avoid strong shadows. <br/>
                        Distance: Stay 2-3 meters from camera.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {FAQ_ITEMS.map((item, index) => (
                    <div key={index} className="border border-white/5 rounded-lg overflow-hidden bg-white/5">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        className="w-full flex justify-between items-center p-4 text-left text-sm font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {item.q}
                        <span className="text-[#007AFF]">{openFaqIndex === index ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === index && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
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
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10">
               <button className="w-full py-3 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 rounded-lg text-xs font-mono text-gray-400 hover:text-white transition-colors">
                 CONTACT HUMAN SUPPORT
               </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
