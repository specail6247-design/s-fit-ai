import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: "How accurate is the sizing?", a: "Our AI analyzes 3D body mesh recovery combined with brand-specific measurements to provide 98% accuracy." },
    { q: "Is my photo data secure?", a: "Yes. All images are processed securely and deleted immediately after the try-on session. We do not store your photos." },
    { q: "Which brands are supported?", a: "Currently we support Zara, Gucci, Uniqlo, H&M, COS, and GAP." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 size-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white z-40 transition-colors shadow-xl"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-[#0A0A0A] border-l border-white/10 shadow-2xl overflow-y-auto flex flex-col relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A0A0A]/90 backdrop-blur z-10">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-widest uppercase">Support Hub</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">S_FIT AI Assistant</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 space-y-10 flex-1">
                {/* Visual Guide Carousel */}
                <section>
                  <h3 className="text-xs font-bold text-[#C9B037] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">view_carousel</span> How to Fit
                  </h3>
                  <div className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar">
                    <div className="min-w-[200px] snap-center bg-[#111] border border-white/5 p-4 rounded-xl flex flex-col gap-3">
                      <div className="h-24 bg-gray-800 rounded-lg flex items-center justify-center border border-white/10">
                        <span className="text-3xl">👤</span>
                      </div>
                      <p className="text-xs font-bold text-white">1. Upload Photo</p>
                      <p className="text-[10px] text-gray-500">Provide a clear front-facing full-body image.</p>
                    </div>
                    <div className="min-w-[200px] snap-center bg-[#111] border border-white/5 p-4 rounded-xl flex flex-col gap-3">
                      <div className="h-24 bg-gray-800 rounded-lg flex items-center justify-center border border-white/10">
                        <span className="text-3xl">👕</span>
                      </div>
                      <p className="text-xs font-bold text-white">2. Select Garment</p>
                      <p className="text-[10px] text-gray-500">Choose an item from our universal wardrobe.</p>
                    </div>
                    <div className="min-w-[200px] snap-center bg-[#111] border border-white/5 p-4 rounded-xl flex flex-col gap-3">
                      <div className="h-24 bg-gray-800 rounded-lg flex items-center justify-center border border-white/10">
                        <span className="text-3xl">✨</span>
                      </div>
                      <p className="text-xs font-bold text-white">3. AI Magic</p>
                      <p className="text-[10px] text-gray-500">Experience hyper-realistic virtual try-on.</p>
                    </div>
                  </div>
                </section>

                {/* Cautions */}
                <section>
                  <h3 className="text-xs font-bold text-[#C9B037] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span> Important Guidelines
                  </h3>
                  <div className="bg-[#111] border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-sm text-gray-400">lightbulb</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white mb-1">Lighting Matters</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">Ensure even lighting. Avoid heavy shadows or backlighting for accurate body segmentation.</p>
                      </div>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-sm text-gray-400">straighten</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white mb-1">Camera Distance</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">Stand 2-3 meters away. The entire body from head to toe should be visible in the frame.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ Accordion */}
                <section>
                  <h3 className="text-xs font-bold text-[#C9B037] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">question_answer</span> Q&A
                  </h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full text-left p-4 flex items-center justify-between bg-transparent hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xs font-bold text-gray-300">{faq.q}</span>
                          <span className="material-symbols-outlined text-gray-500 text-sm">
                            {activeFaq === idx ? 'expand_less' : 'expand_more'}
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4"
                            >
                              <p className="text-[10px] text-gray-500 leading-relaxed pt-2 border-t border-white/5">
                                {faq.a}
                              </p>
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
    </>
  );
}
