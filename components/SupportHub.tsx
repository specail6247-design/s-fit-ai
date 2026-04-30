'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Sun, Camera, ChevronDown, ChevronUp } from 'lucide-react';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What types of photos work best?",
      a: "Clear, well-lit photos showing your full body directly facing the camera yield the most precise fitting results."
    },
    {
      q: "Why is the 3D model loading slowly?",
      a: "The complex 3D rendering engine requires significant processing power. Please ensure you have a stable connection and wait a few moments."
    },
    {
      q: "How accurate is the sizing?",
      a: "Our AI model analyzes your body proportions to provide a highly accurate digital twin for precise virtual try-ons."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black/95 backdrop-blur-xl border-l border-white/10 z-50 p-8 overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="text-cyber-lime" size={24} />
                <h2 className="text-xl font-mono font-bold tracking-widest text-pure-white uppercase">
                  Support Hub
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-soft-gray hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-12">
              {/* User Guide Carousel */}
              <section>
                <h3 className="text-sm font-bold text-soft-gray uppercase tracking-[0.2em] mb-6">
                  How to Fit
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
                  {[
                    { step: '1', title: 'Upload', desc: 'Select a clear full-body photo.' },
                    { step: '2', title: 'Analyze', desc: 'AI scans proportions.' },
                    { step: '3', title: 'Try On', desc: 'View 3D generated fit.' }
                  ].map((item, idx) => (
                    <div key={idx} className="min-w-[140px] p-4 bg-white/5 border border-white/10 rounded-2xl snap-start">
                      <div className="text-cyber-lime font-mono font-bold text-2xl mb-2">0{item.step}</div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-soft-gray leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Caution / Warnings */}
              <section>
                <h3 className="text-sm font-bold text-soft-gray uppercase tracking-[0.2em] mb-6">
                  Best Practices
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center text-center gap-3">
                    <Sun className="text-luxury-gold" size={28} />
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Good Lighting</h4>
                      <p className="text-[10px] text-soft-gray">Avoid harsh shadows</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center text-center gap-3">
                    <Camera className="text-[#007AFF]" size={28} />
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Camera Distance</h4>
                      <p className="text-[10px] text-soft-gray">Stand 2-3m away</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Accordion */}
              <section>
                <h3 className="text-sm font-bold text-soft-gray uppercase tracking-[0.2em] mb-6">
                  Q&A
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-white hover:bg-white/5 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {openFaq === idx ? <ChevronUp size={16} className="text-cyber-lime" /> : <ChevronDown size={16} className="text-soft-gray" />}
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/5">
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

            <div className="mt-16 text-center">
              <p className="text-[10px] text-soft-gray/50 uppercase tracking-[0.3em] font-mono">
                S_FIT Protocol v2.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
