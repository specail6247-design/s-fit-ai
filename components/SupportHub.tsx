import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { question: "What formats are supported?", answer: "We support JPG, PNG, and WebP up to 5MB." },
    { question: "How long does generation take?", answer: "Usually between 5 to 10 seconds depending on server load." },
    { question: "Is my data stored?", answer: "Images are temporarily stored for processing and deleted immediately after." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all z-40 backdrop-blur-md shadow-lg"
        aria-label="Support Hub"
      >
        <span className="text-xl">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic tracking-tighter">SUPPORT<span className="text-[#007AFF]">_HUB</span></h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>

              {/* User Guide Carousel (Simplified static for now) */}
              <section className="mb-10">
                <h3 className="text-xs font-bold text-[#007AFF] uppercase tracking-widest mb-4">How to Fit</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                  <div className="snap-center shrink-0 w-64 bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-2xl mb-2">📸</div>
                    <h4 className="font-bold text-sm mb-1">1. Take a Photo</h4>
                    <p className="text-xs text-white/50">Front-facing, well lit, neutral expression.</p>
                  </div>
                  <div className="snap-center shrink-0 w-64 bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-2xl mb-2">👕</div>
                    <h4 className="font-bold text-sm mb-1">2. Upload Garment</h4>
                    <p className="text-xs text-white/50">Clear flat-lay or ghost mannequin shot.</p>
                  </div>
                  <div className="snap-center shrink-0 w-64 bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-2xl mb-2">✨</div>
                    <h4 className="font-bold text-sm mb-1">3. Generate</h4>
                    <p className="text-xs text-white/50">Wait for the AI to seamlessly blend them.</p>
                  </div>
                </div>
              </section>

              {/* Caution */}
              <section className="mb-10">
                <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-4">Best Practices</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-yellow-500/10 text-yellow-500 p-4 rounded-xl border border-yellow-500/20">
                    <span className="text-xl">💡</span>
                    <div>
                      <h4 className="font-bold text-sm">Lighting matters</h4>
                      <p className="text-xs opacity-80 mt-1">Avoid harsh shadows or strong backlighting.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-yellow-500/10 text-yellow-500 p-4 rounded-xl border border-yellow-500/20">
                    <span className="text-xl">📏</span>
                    <div>
                      <h4 className="font-bold text-sm">Camera Distance</h4>
                      <p className="text-xs opacity-80 mt-1">Keep phone at chest level, about 3-4 feet away.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section>
                <h3 className="text-xs font-bold text-[#007AFF] uppercase tracking-widest mb-4">FAQ</h3>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-left p-4 bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center"
                      >
                        <span className="text-sm font-medium">{faq.question}</span>
                        <span className="text-white/50">{activeFaq === idx ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/50 px-4 py-3 text-xs text-white/70"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
