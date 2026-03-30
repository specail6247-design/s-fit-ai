'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is S_FIT NEO?",
      answer: "S_FIT NEO is a professional virtual fitting system that allows you to instantly visualize garments on yourself using advanced AI."
    },
    {
      question: "How long does processing take?",
      answer: "Processing typically takes around 5-10 seconds depending on the complexity of the garment and current server load."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all uploaded photos are processed securely and deleted from our servers immediately after the fitting session ends."
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
        aria-label="Open Support Hub"
      >
        <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer-container"
            className="fixed inset-0 z-50"
          >
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/10 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-10">
                <h2 className="text-lg font-bold tracking-widest uppercase text-white">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  aria-label="Close Support Hub"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 space-y-10 flex-1">
                {/* How to Fit Section */}
                <section>
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">integration_instructions</span>
                    How to Fit
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start p-4 bg-white/5 border border-white/5 rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center font-bold text-sm shrink-0">1</div>
                      <div>
                        <h4 className="font-bold text-sm text-white mb-1">Upload Identification</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">Provide a clear, front-facing photo of yourself. Ensure good lighting for best results.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start p-4 bg-white/5 border border-white/5 rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center font-bold text-sm shrink-0">2</div>
                      <div>
                        <h4 className="font-bold text-sm text-white mb-1">Select Target Garment</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">Choose the clothing item you wish to try on. A flat or ghost mannequin shot works best.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start p-4 bg-white/5 border border-white/5 rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center font-bold text-sm shrink-0">3</div>
                      <div>
                        <h4 className="font-bold text-sm text-white mb-1">Engage System</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">Click &quot;TRY IT ON&quot; and wait a few seconds for our AI to process and render your fitting.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Caution Section */}
                <section>
                  <h3 className="text-xs font-bold text-[#ecab13] uppercase mb-4 tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    Caution
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-gray-400">lightbulb</span>
                      <p className="text-[10px] text-gray-400">Avoid extreme shadows or harsh lighting</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-gray-400">photo_camera</span>
                      <p className="text-[10px] text-gray-400">Keep camera at chest level</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-gray-400">accessibility_new</span>
                      <p className="text-[10px] text-gray-400">Maintain a neutral posture</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-gray-400">groups</span>
                      <p className="text-[10px] text-gray-400">Ensure you are the only person in frame</p>
                    </div>
                  </div>
                </section>

                {/* FAQ Section */}
                <section>
                  <h3 className="text-xs font-bold text-white uppercase mb-4 tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">question_answer</span>
                    FAQ
                  </h3>
                  <div className="space-y-2">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full text-left p-4 text-sm font-medium text-gray-200 hover:bg-white/5 transition-colors flex justify-between items-center"
                        >
                          {faq.question}
                          <span className={`material-symbols-outlined text-gray-400 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}>
                            expand_more
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="p-6 border-t border-white/10 mt-auto text-center">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">S_FIT NEO Support System v1.0</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
