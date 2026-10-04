import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI uses advanced 3D mapping to provide a 95% accurate representation of how the garment drapes." },
    { q: "What photos work best?", a: "Front-facing, well-lit photos with form-fitting clothing work best for accurate sizing." },
    { q: "Is my data secure?", a: "Yes. Photos are processed instantly and deleted immediately after generating your fit." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black tracking-tighter italic text-white">SUPPORT HUB</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                  <span className="text-2xl">✕</span>
                </button>
              </div>

              {/* User Guide Carousel */}
              <div className="mb-10">
                <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">How to Fit</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                  <div className="snap-center shrink-0 w-48 bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl mb-2">📸</div>
                    <h4 className="font-bold mb-1 text-white">1. Take a Photo</h4>
                    <p className="text-xs text-gray-400">Stand straight, well-lit, form-fitting clothes.</p>
                  </div>
                  <div className="snap-center shrink-0 w-48 bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl mb-2">👕</div>
                    <h4 className="font-bold mb-1 text-white">2. Choose Item</h4>
                    <p className="text-xs text-gray-400">Select any garment from our catalog.</p>
                  </div>
                  <div className="snap-center shrink-0 w-48 bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl mb-2">✨</div>
                    <h4 className="font-bold mb-1 text-white">3. Generate</h4>
                    <p className="text-xs text-gray-400">AI creates your masterpiece fit instantly.</p>
                  </div>
                </div>
              </div>

              {/* Cautions */}
              <div className="mb-10">
                <h3 className="text-xs font-bold text-red-500 uppercase mb-4 tracking-widest">Important Cautions</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-200">
                    <span className="text-xl">💡</span>
                    <p className="text-xs">Avoid harsh shadows or backlighting. Soft, even lighting is required.</p>
                  </div>
                  <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-200">
                    <span className="text-xl">📏</span>
                    <p className="text-xs">Keep camera at waist level, 2-3 meters away for correct proportions.</p>
                  </div>
                </div>
              </div>

              {/* Q&A Accordion */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">FAQ</h3>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-left px-4 py-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-bold text-white">{faq.q}</span>
                        <span className="text-gray-500">{activeFaq === idx ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-xs text-gray-400"
                          >
                            {faq.a}
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
