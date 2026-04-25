'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronDown, ChevronUp, AlertTriangle, Camera, Sun } from 'lucide-react';

interface SupportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQ_ITEMS = [
  { q: "What should I wear?", a: "Fitted clothing yields the best AI results. Avoid loose fabrics." },
  { q: "How long does it take?", a: "Typically under 10 seconds for standard fitting, slightly longer for complex poses." },
  { q: "Is my data secure?", a: "Your photos are processed ephemerally and never stored." }
];

export function SupportDrawer({ isOpen, onClose }: SupportDrawerProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0A0A0A] border-l border-white/10 shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <h2 className="text-xl font-serif text-[#C9B037] uppercase tracking-widest flex items-center gap-3">
                  <HelpCircle size={20} />
                  Support Hub
                </h2>
                <button onClick={onClose} className="p-2 text-white/50 hover:text-white rounded-full bg-white/5 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Guide Carousel (Static visual representation for now) */}
              <div className="mb-10">
                <h3 className="text-sm text-white/70 uppercase tracking-widest mb-4">How to Fit</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                  {[
                    { step: 1, title: "Stand Clear", icon: <Camera className="mb-2 text-[#C9B037]" size={24}/> },
                    { step: 2, title: "Good Light", icon: <Sun className="mb-2 text-[#C9B037]" size={24}/> },
                    { step: 3, title: "Wait 10s", icon: <div className="mb-2 text-[#C9B037] font-bold text-xl">10</div> }
                  ].map((item) => (
                    <div key={item.step} className="snap-center shrink-0 w-32 h-32 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center p-4">
                      {item.icon}
                      <span className="text-xs text-white/50 uppercase tracking-wider">Step {item.step}</span>
                      <span className="text-sm font-medium mt-1">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cautions */}
              <div className="mb-10 bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-sm text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} /> Attention
                </h3>
                <ul className="text-xs text-red-200/70 space-y-2 list-disc pl-4">
                  <li>Ensure even lighting without harsh shadows.</li>
                  <li>Stand 1-2 meters away from the camera.</li>
                  <li>Avoid complex backgrounds.</li>
                </ul>
              </div>

              {/* FAQ Accordion */}
              <div>
                <h3 className="text-sm text-white/70 uppercase tracking-widest mb-4">Q&A</h3>
                <div className="space-y-2">
                  {FAQ_ITEMS.map((faq, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full p-4 flex items-center justify-between text-left text-sm"
                      >
                        <span className="text-white/90">{faq.q}</span>
                        {activeFaq === idx ? <ChevronUp size={16} className="text-[#C9B037]" /> : <ChevronDown size={16} className="text-white/30" />}
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-black/40"
                          >
                            <p className="p-4 pt-0 text-xs text-white/50 leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
