import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHubDrawer({ isOpen, onClose }: SupportHubDrawerProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: 'Step 1: Upload', desc: 'Take a clear, full-body photo.', icon: '📸' },
    { title: 'Step 2: Select', desc: 'Choose a garment to try on.', icon: '👕' },
    { title: 'Step 3: Magic', desc: 'Wait 10 seconds for the AI magic.', icon: '✨' },
  ];

  const qaList = [
    { q: 'How long does it take?', a: 'Usually under 10 seconds.' },
    { q: 'Can I upload side views?', a: 'Front-facing photos work best for accurate fitting.' },
    { q: 'Is it free?', a: 'You get 5 free tries daily.' },
  ];

  const nextStep = () => setGuideStep((prev) => (prev + 1) % guideSteps.length);
  const prevStep = () => setGuideStep((prev) => (prev - 1 + guideSteps.length) % guideSteps.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div key="support-drawer" className="fixed inset-0 z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[100] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-tight">SUPPORT HUB</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white p-2" aria-label="Close support hub">✕</button>
            </div>

            <div className="flex border-b border-white/10">
              <button
                className={`flex-1 py-4 text-xs font-bold tracking-wider uppercase transition-colors ${activeTab === 'guide' ? 'bg-white/10 text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
                onClick={() => setActiveTab('guide')}
              >
                How to Fit
              </button>
              <button
                className={`flex-1 py-4 text-xs font-bold tracking-wider uppercase transition-colors ${activeTab === 'qa' ? 'bg-white/10 text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-white'}`}
                onClick={() => setActiveTab('qa')}
              >
                Q&A
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'guide' && (
                <div className="space-y-8">
                  {/* Visual Carousel */}
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-8 relative min-h-[250px] flex flex-col items-center justify-center text-center">
                    <div className="text-6xl mb-4">{guideSteps[guideStep].icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-white">{guideSteps[guideStep].title}</h3>
                    <p className="text-sm text-gray-400">{guideSteps[guideStep].desc}</p>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
                      <button onClick={prevStep} className="text-white/50 hover:text-white">←</button>
                      <div className="flex gap-2 items-center">
                        {guideSteps.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i === guideStep ? 'bg-[#007AFF]' : 'bg-white/20'}`} />
                        ))}
                      </div>
                      <button onClick={nextStep} className="text-white/50 hover:text-white">→</button>
                    </div>
                  </div>

                  {/* Cautions */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Crucial Tips</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 p-4 rounded-xl flex flex-col items-center text-center">
                        <span className="text-2xl mb-2">💡</span>
                        <span className="text-[10px] font-bold text-[#ff3b30] uppercase">Lighting</span>
                        <p className="text-xs text-gray-400 mt-1">Ensure well-lit, even lighting. Avoid strong shadows.</p>
                      </div>
                      <div className="bg-[#ff9500]/10 border border-[#ff9500]/20 p-4 rounded-xl flex flex-col items-center text-center">
                        <span className="text-2xl mb-2">📏</span>
                        <span className="text-[10px] font-bold text-[#ff9500] uppercase">Distance</span>
                        <p className="text-xs text-gray-400 mt-1">Stand 1-2 meters away. Full body must be visible.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="space-y-2">
                  {qaList.map((item, i) => (
                    <details key={i} className="group bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="p-4 cursor-pointer font-medium text-sm text-gray-200 flex justify-between items-center group-open:text-white group-open:bg-white/5 transition-colors">
                        {item.q}
                        <span className="text-white/50 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-4 text-xs text-gray-400 border-t border-white/5 bg-black/20">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10 text-center">
               <p className="text-[10px] text-gray-600 uppercase tracking-widest">S_FIT AI Support Team</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}