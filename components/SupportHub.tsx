import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI model creates a 3D representation based on the photos you provide. Accuracy improves with clear, well-lit photos." },
    { q: "What photos work best?", a: "Front-facing photos in tight-fitting clothes against a solid background work best for accurate sizing." },
    { q: "Is my data secure?", a: "Yes, your photos are processed securely and deleted immediately after the 3D model is generated." },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white/5 hover:bg-white/10 text-white p-2 rounded-full border border-white/10 transition-colors flex items-center justify-center w-10 h-10"
        aria-label="Help & Support"
      >
        <span className="text-xl">?</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold font-mono tracking-tighter">SUPPORT HUB</h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white">✕</button>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">User Guide</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="min-w-[200px] snap-center">
                          <div className="h-32 bg-white/10 rounded-lg mb-2 flex items-center justify-center text-3xl">
                            {step === 1 ? '📸' : step === 2 ? '👕' : '✨'}
                          </div>
                          <p className="text-xs font-bold">Step {step}</p>
                          <p className="text-[10px] text-soft-gray">
                            {step === 1 ? 'Upload a clear front-facing photo.' : step === 2 ? 'Select the garment you want to try.' : 'View your AI-generated fit.'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">Caution</h3>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 mt-0.5">☀️</span>
                      <p className="text-xs text-gray-300">Avoid harsh shadows or backlighting. Ensure even, natural lighting.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 mt-0.5">📏</span>
                      <p className="text-xs text-gray-300">Stand exactly 6 feet (2 meters) from the camera for best proportions.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">Q&A</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex justify-between items-center p-3 text-left bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <span className="text-xs font-bold">{faq.q}</span>
                          <span className="text-soft-gray">{openFaq === i ? '−' : '+'}</span>
                        </button>
                        {openFaq === i && (
                          <div className="p-3 text-[10px] text-gray-400 bg-black/20">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}