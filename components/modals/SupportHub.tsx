'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const guideSteps = [
  {
    title: "1. Prepare your photo",
    desc: "Take a full-body picture against a plain background.",
    icon: "📸"
  },
  {
    title: "2. Good Lighting",
    desc: "Ensure you are well lit from the front, avoid heavy shadows.",
    icon: "💡"
  },
  {
    title: "3. Choose a Garment",
    desc: "Upload a flat-lay or model image of the target garment.",
    icon: "👕"
  },
  {
    title: "4. Let AI work",
    desc: "S_FIT Neo will generate your masterpiece fit in seconds.",
    icon: "✨"
  }
];

const faqs = [
  { q: "How long does generation take?", a: "Typically 5-10 seconds depending on server load." },
  { q: "What photos work best?", a: "Well-lit, front-facing, full-body photos on simple backgrounds." },
  { q: "Is my data safe?", a: "Yes, photos are processed securely and not shared." }
];

export default function SupportHub() {
  const { isSupportHubOpen, setIsSupportHubOpen } = useStore();
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSupportHubOpen(false);
          }}
        >
          <motion.div
          className="w-full max-w-md h-full bg-black border-l border-white/10 p-6 flex flex-col shadow-2xl overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold font-serif uppercase tracking-widest text-white">Support Hub</h2>
            <button onClick={() => setIsSupportHubOpen(false)} className="text-gray-400 hover:text-white p-2">✕</button>
          </div>

          <div className="space-y-10">
            {/* Carousel Guide */}
            <section>
              <h3 className="text-sm font-bold text-[#ecab13] uppercase tracking-wider mb-4 border-b border-white/10 pb-2">How to Fit</h3>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden h-40 flex flex-col items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-4xl mb-2">{guideSteps[activeStep].icon}</span>
                    <h4 className="font-bold text-white text-sm mb-1">{guideSteps[activeStep].title}</h4>
                    <p className="text-xs text-gray-400 max-w-[250px]">{guideSteps[activeStep].desc}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {guideSteps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${idx === activeStep ? 'bg-[#ecab13]' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Cautions */}
            <section>
              <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Caution</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-red-400 mb-1">lightbulb</span>
                  <span className="text-xs text-gray-300 font-medium">Avoid backlighting or heavy shadows</span>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-red-400 mb-1">camera_front</span>
                  <span className="text-xs text-gray-300 font-medium">Keep camera at chest level</span>
                </div>
              </div>
            </section>

            {/* FAQ Accordion */}
            <section>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Q&A</h3>
              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-white/10 rounded-lg overflow-hidden">
                    <button
                      className="w-full text-left p-3 text-sm text-gray-300 font-medium bg-white/5 flex justify-between items-center"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    >
                      <span>{faq.q}</span>
                      <span className="text-xs">{openFaq === idx ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-black p-3 text-xs text-gray-400 border-t border-white/10"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
