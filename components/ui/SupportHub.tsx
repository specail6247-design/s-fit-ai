'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const faqs = [
    { q: "What is AI Try-On?", a: "We use advanced diffusion models to accurately drape digital garments on your body." },
    { q: "Is my data stored?", a: "Your photos are processed in memory and immediately deleted after generation." },
    { q: "How accurate is the sizing?", a: "Based on height and weight, our AI predicts your 3D body mesh with 94% accuracy." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/60 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
        aria-label="Support Hub"
      >
        ?
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#050505] border-l border-white/10 z-50 p-8 overflow-y-auto"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white">✕</button>

              <div className="mb-12">
                <h3 className="text-xl font-bold tracking-widest uppercase mb-2">Support Hub</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">At your service</p>
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="text-sm font-bold text-[#007AFF] uppercase mb-4">How to Fit</h4>
                  <div className="flex overflow-x-auto snap-x space-x-4 pb-4">
                    {[1, 2, 3].map(step => (
                      <div key={step} className="min-w-[200px] h-[150px] bg-white/5 rounded-xl border border-white/10 flex-shrink-0 snap-center flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-2xl mb-2">{step === 1 ? '📸' : step === 2 ? '👕' : '✨'}</span>
                        <span className="text-xs font-bold">{step === 1 ? 'Take a clear photo' : step === 2 ? 'Select garment' : 'View result'}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-bold text-yellow-500 uppercase mb-4 flex items-center gap-2">
                    <span>⚠️</span> Caution
                  </h4>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-xs text-yellow-500/80 space-y-2">
                    <p>• Ensure bright, even lighting.</p>
                    <p>• Stand 1.5m away from the camera.</p>
                    <p>• Avoid baggy clothing for best results.</p>
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-bold uppercase mb-4 border-b border-white/10 pb-2">Q&A</h4>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border-b border-white/5 pb-2">
                        <button
                          onClick={() => setActiveQ(activeQ === idx ? null : idx)}
                          className="w-full text-left text-xs font-bold py-2 flex justify-between items-center"
                        >
                          {faq.q}
                          <span className="text-gray-500">{activeQ === idx ? '-' : '+'}</span>
                        </button>
                        {activeQ === idx && (
                          <p className="text-[10px] text-gray-400 py-2 leading-relaxed">{faq.a}</p>
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
