import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const guideSteps = [
    { title: "Upload Photo", desc: "Select a clear, front-facing photo with good lighting.", icon: "person" },
    { title: "Select Garment", desc: "Upload the clothing item you want to try on.", icon: "checkroom" },
    { title: "Try It On", desc: "Let S_FIT NEO process the fit seamlessly.", icon: "auto_awesome" }
  ];

  const faqs = [
    { q: "What photos work best?", a: "Front-facing photos with a clean background and bright, even lighting produce the highest quality results." },
    { q: "How long does processing take?", a: "Most fits are completed within 15-30 seconds depending on server load." },
    { q: "Can I try on bottoms or shoes?", a: "Currently, the NEO engine is optimized for upper body garments (tops, jackets, dresses)." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="support-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            key="support-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#050505] border-l border-white/10 shadow-2xl z-50 overflow-y-auto flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-10">
              <h2 className="text-xl font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-[#007AFF]">help</span> Support Hub
              </h2>
              <button
                onClick={onClose}
                aria-label="Close Support Hub"
                className="text-white/50 hover:text-white transition-colors focus-visible:ring-2 outline-none rounded-full p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex border-b border-white/10 text-xs font-bold tracking-widest uppercase">
              <button
                className={`flex-1 py-4 text-center transition-colors ${activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                onClick={() => setActiveTab('guide')}
              >
                How to Fit
              </button>
              <button
                className={`flex-1 py-4 text-center transition-colors ${activeTab === 'qa' ? 'text-[#007AFF] border-b-2 border-[#007AFF] bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                onClick={() => setActiveTab('qa')}
              >
                Q&A
              </button>
            </div>

            <div className="p-6 flex-1">
              {activeTab === 'guide' ? (
                <div className="space-y-8 animate-fade-in-up">
                  <div className="bg-black/50 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 text-9xl opacity-5 select-none pointer-events-none">
                       <span className="material-symbols-outlined">{guideSteps[activeStep].icon}</span>
                     </div>
                     <div className="relative z-10 min-h-[120px]">
                        <h3 className="text-lg font-bold text-[#007AFF] mb-2">{activeStep + 1}. {guideSteps[activeStep].title}</h3>
                        <p className="text-sm text-gray-400">{guideSteps[activeStep].desc}</p>
                     </div>
                     <div className="flex gap-2 mt-4">
                        {guideSteps.map((_, i) => (
                           <button
                             key={i}
                             onClick={() => setActiveStep(i)}
                             className={`h-1.5 rounded-full transition-all ${i === activeStep ? 'w-8 bg-[#007AFF]' : 'w-2 bg-white/20'}`}
                             aria-label={`Go to step ${i + 1}`}
                           />
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-red-500 tracking-widest uppercase flex items-center gap-2 border-b border-white/10 pb-2">
                       <span className="material-symbols-outlined text-sm">warning</span> CAUTION
                    </h3>
                    <ul className="space-y-3">
                       <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-gray-500 mt-0.5">light_mode</span>
                          <div>
                            <p className="text-sm font-bold text-gray-300">Harsh Lighting</p>
                            <p className="text-xs text-gray-500">Avoid backlighting or extremely dark environments.</p>
                          </div>
                       </li>
                       <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-gray-500 mt-0.5">group</span>
                          <div>
                            <p className="text-sm font-bold text-gray-300">Multiple People</p>
                            <p className="text-xs text-gray-500">Ensure only one person is clearly visible in the frame.</p>
                          </div>
                       </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in-up">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-lg bg-black/50 overflow-hidden">
                      <button
                        className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition-colors focus-visible:ring-1 outline-none"
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      >
                        <span className="text-sm font-bold text-gray-300">{faq.q}</span>
                        <span className={`material-symbols-outlined transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-[#007AFF]' : 'text-gray-500'}`}>
                          expand_more
                        </span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-sm text-gray-400 border-t border-white/5">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-black text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">S_FIT NEO CORE ENGINE V1.2</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
