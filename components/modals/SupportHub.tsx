import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Why does the virtual fit look different from reality?",
      answer: "Lighting, pose, and fabric simulation limitations can affect the result. We are constantly improving our AI for better accuracy."
    },
    {
      question: "Can I try on any type of clothing?",
      answer: "Currently, our system is optimized for tops and dresses. Bottoms and complex layered outfits might not render perfectly."
    },
    {
      question: "What happens to my uploaded photos?",
      answer: "Photos are processed securely in real-time and are never stored or shared with third parties."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest"
              >
                Close
              </button>

              <div className="mb-10 mt-4">
                <p className="text-xs text-[#007AFF] tracking-[0.3em] uppercase mb-2">Support & Guide</p>
                <h2 className="text-3xl font-black tracking-tighter italic text-white">
                  S_FIT <span className="text-[#007AFF]">HUB</span>
                </h2>
              </div>

              {/* Carousel: How to Fit */}
              <div className="mb-10">
                <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">01. How to Fit</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
                  {[
                    { step: 1, title: 'Upload Photo', desc: 'A clear, full-body photo.', icon: '📸' },
                    { step: 2, title: 'Select Garment', desc: 'Choose from our collection.', icon: '👕' },
                    { step: 3, title: 'Generate', desc: 'AI visualizes the fit.', icon: '⚡️' },
                  ].map((item) => (
                    <div key={item.step} className="min-w-[150px] flex-shrink-0 bg-white/5 border border-white/10 rounded-xl p-4 snap-center">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="text-xs font-bold text-white mb-1">Step {item.step}</div>
                      <div className="text-[10px] text-white/50">{item.title}</div>
                      <div className="text-[10px] text-white/40 mt-1">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cautions */}
              <div className="mb-10">
                <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">02. Best Practices</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <div className="text-[10px] font-bold text-white">Good Lighting</div>
                      <div className="text-[9px] text-white/50">Avoid shadows</div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">📏</span>
                    <div>
                      <div className="text-[10px] font-bold text-white">Distance</div>
                      <div className="text-[9px] text-white/50">Keep 1-2m away</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="mb-10">
                <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">03. FAQ</h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 flex justify-between items-center text-sm font-medium text-white/80 hover:bg-white/5 transition-colors"
                      >
                        <span className="text-xs">{faq.question}</span>
                        <span className="text-white/50">{activeFaq === index ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-[10px] text-white/50 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Form */}
              <div>
                <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">04. Report Issue</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported. Thank you!'); }}>
                  <textarea
                    placeholder="Describe the issue..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-[#007AFF] outline-none resize-none placeholder:text-white/30"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold py-3 rounded-xl transition-colors text-xs uppercase tracking-widest"
                  >
                    Submit Report
                  </button>
                </form>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
