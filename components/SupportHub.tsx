"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Camera, Sun, Info, ChevronDown } from 'lucide-react';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'qa'>('guide');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: "Why is the fitting inaccurate?", a: "For best results, wear tight-fitting clothes and ensure good lighting without harsh shadows." },
    { q: "What is Digital Twin mode?", a: "Digital Twin creates a 3D avatar based on your exact measurements for 360-degree virtual fitting." },
    { q: "How do I save my measurements?", a: "Create an account and sign in. Your measurements will be securely saved to your profile for future use." },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-full text-white backdrop-blur-md z-40 transition-all hover:scale-110"
        aria-label="Help & Support"
      >
        <HelpCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md">
                <h2 className="text-xl font-black text-white tracking-widest uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === 'guide' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'
                  }`}
                >
                  How to Fit
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === 'qa' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'
                  }`}
                >
                  Q&A
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {activeTab === 'guide' ? (
                  <div className="space-y-8">
                    {/* Visual Carousel Placeholder */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera size={32} className="text-cyber-lime" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Step 1: The Setup</h3>
                      <p className="text-sm text-soft-gray">Place your camera at waist height, about 2 meters away. Ensure your full body is visible.</p>

                      <div className="flex justify-center gap-2 mt-6">
                        <div className="w-2 h-2 rounded-full bg-cyber-lime"></div>
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Info size={16} className="text-cyber-lime" /> Caution
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                           <Sun size={24} className="text-yellow-500 mb-2" />
                           <h4 className="text-sm font-bold text-white mb-1">Good Lighting</h4>
                           <p className="text-xs text-soft-gray">Avoid backlighting or heavy shadows.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                           <Camera size={24} className="text-blue-500 mb-2" />
                           <h4 className="text-sm font-bold text-white mb-1">Clear View</h4>
                           <p className="text-xs text-soft-gray">Keep hands away from your body.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-bold text-white">{faq.q}</span>
                          <ChevronDown
                            size={16}
                            className={`text-soft-gray transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}
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
                              <div className="p-4 pt-0 text-sm text-soft-gray border-t border-white/10 mt-2">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
