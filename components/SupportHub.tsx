'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronDown, AlertTriangle, Camera, Sun, ArrowRight } from 'lucide-react';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [guideStep, setGuideStep] = useState(0);

  const faqs = [
    { q: "How accurate is the sizing?", a: "Our AI analyzes your body proportions to provide a 95% accurate fit recommendation based on brand-specific size charts." },
    { q: "Can I try on my own clothes?", a: "Currently, you can only select from our curated partner catalog, but custom uploads are coming in Q3." },
    { q: "Is my data secure?", a: "All uploaded photos are processed ephemerally and deleted immediately after the 3D model is generated." }
  ];

  const guideSteps = [
    { title: "Upload Photo", desc: "Take a clear, full-body photo facing the camera.", icon: <Camera size={24} className="text-[#007AFF]" /> },
    { title: "Select Garment", desc: "Choose an item from our catalog to try on.", icon: <ArrowRight size={24} className="text-[#007AFF]" /> },
    { title: "View Result", desc: "Our AI generates your high-fidelity virtual fit.", icon: <Sun size={24} className="text-[#007AFF]" /> }
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#0a0a0a] text-white p-3 rounded-full border border-white/20 shadow-lg hover:border-white/50 transition-all hover:bg-white/5"
      >
        <HelpCircle size={24} />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {['guide', 'caution', 'qa'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "guide" | "caution" | "qa")}
                  className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === tab ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {/* GUIDE TAB */}
                {activeTab === 'guide' && (
                  <motion.div key="guide" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">How to Fit</h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden h-48 flex flex-col items-center justify-center text-center">
                      <div className="mb-4 bg-black/50 p-4 rounded-full border border-white/10">
                        {guideSteps[guideStep].icon}
                      </div>
                      <h4 className="font-bold text-lg mb-2">{guideSteps[guideStep].title}</h4>
                      <p className="text-sm text-gray-400">{guideSteps[guideStep].desc}</p>

                      {/* Carousel Indicators */}
                      <div className="absolute bottom-4 flex gap-2">
                        {guideSteps.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setGuideStep(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === guideStep ? 'bg-[#007AFF] w-4' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setGuideStep(prev => Math.max(0, prev - 1))}
                        disabled={guideStep === 0}
                        className="text-xs font-bold text-gray-500 hover:text-white disabled:opacity-30 uppercase tracking-widest"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setGuideStep(prev => Math.min(guideSteps.length - 1, prev + 1))}
                        disabled={guideStep === guideSteps.length - 1}
                        className="text-xs font-bold text-[#007AFF] hover:text-blue-400 disabled:opacity-30 uppercase tracking-widest"
                      >
                        Next
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* CAUTION TAB */}
                {activeTab === 'caution' && (
                  <motion.div key="caution" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5 flex gap-4 items-start">
                      <AlertTriangle className="text-orange-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-orange-500 mb-2">Lighting Warning</h4>
                        <p className="text-sm text-gray-400">Ensure you are in a well-lit room. Harsh shadows or extreme backlighting will negatively affect the AI&apos;s ability to map garments to your body.</p>
                      </div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5 flex gap-4 items-start">
                      <Camera className="text-yellow-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-yellow-500 mb-2">Distance Warning</h4>
                        <p className="text-sm text-gray-400">Stand exactly 2-3 meters away from the camera. The frame must include your body from head to toe for accurate sizing.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Q&A TAB */}
                {activeTab === 'qa' && (
                  <motion.div key="qa" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                          className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="font-bold text-sm">{faq.q}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-sm text-gray-400 border-t border-white/10">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
