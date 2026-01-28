'use client';

import React, { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { motion, AnimatePresence } from 'framer-motion';

// --- Carousel Component ---
const steps = [
  {
    title: "Upload Photo",
    desc: "Use a clear, front-facing photo with good lighting.",
    icon: "📸"
  },
  {
    title: "Select Garment",
    desc: "Choose from our curated SPA or Luxury collections.",
    icon: "👕"
  },
  {
    title: "AI Analysis",
    desc: "Our engine maps the fabric to your unique body shape.",
    icon: "⚡️"
  },
  {
    title: "Virtual Fit",
    desc: "See how it fits, moves, and feels in 3D space.",
    icon: "✨"
  }
];

const UserGuideCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % steps.length);
  const prev = () => setCurrent((p) => (p - 1 + steps.length) % steps.length);

  return (
    <div className="bg-white/5 rounded-xl p-6 mb-8 relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">How to Fit</h3>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 w-4 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>

      <div className="text-center py-8">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-4xl mb-4">{steps[current].icon}</div>
          <h4 className="text-lg font-bold text-white mb-2">{steps[current].title}</h4>
          <p className="text-sm text-gray-400">{steps[current].desc}</p>
        </motion.div>
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={prev} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">←</button>
        <button onClick={next} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">→</button>
      </div>
    </div>
  );
};

// --- Accordion Component ---
const faqs = [
  {
    question: "How accurate is the fitting?",
    answer: "Our AI maps over 50 key body points to simulate fabric tension and drape with high precision."
  },
  {
    question: "Is my photo stored securely?",
    answer: "Photos are processed in ephemeral containers and deleted immediately after analysis. We value your privacy."
  },
  {
    question: "What formats are supported?",
    answer: "We support JPG, PNG, and WEBP images up to 10MB in size."
  }
];

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:text-white transition-colors"
      >
        <span className="text-sm font-medium text-gray-300">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-gray-500 pb-4 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Support Hub Component ---
export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[50] w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform"
        aria-label="Help & Support"
      >
        ?
      </button>

      {/* Drawer */}
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right">
        <div className="p-8">
          <header className="mb-8">
            <h2 className="text-2xl font-serif italic text-white mb-2">Support Hub</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Assistance & Guide</p>
          </header>

          <UserGuideCarousel />

          {/* Caution Section */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>⚠️</span> Optimization Tips
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-xl shrink-0">
                  ☀️
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Lighting Matters</h4>
                  <p className="text-xs text-gray-400 mt-1">Ensure even lighting. Avoid strong backlights or deep shadows for best accuracy.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-xl shrink-0">
                  📏
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Ideal Distance</h4>
                  <p className="text-xs text-gray-400 mt-1">Stand about 2 meters (6.5ft) away so your full body is visible in the frame.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Q&A Section */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Common Questions</h3>
            <div className="space-y-1">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} {...faq} />
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">S_FIT Intelligence System v2.0</p>
          </div>
        </div>
      </Drawer>
    </>
  );
}
