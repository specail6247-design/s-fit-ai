import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [guideStep, setGuideStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guideSteps = [
    { title: "01. Capture", desc: "Take a clear photo with good lighting." },
    { title: "02. Select", desc: "Choose the target garment from our collection." },
    { title: "03. Try-On", desc: "Let S_FIT NEO process the ultimate virtual fitting." }
  ];

  const faqs = [
    { q: "Why is the generated image blurry?", a: "Ensure your original photo is high resolution (at least 1080p) and well-lit." },
    { q: "How long does a try-on take?", a: "Processing usually takes between 10-15 seconds depending on server load." },
    { q: "Is my data secure?", a: "Yes, photos are processed securely and deleted immediately after generation. They are never shared." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment key="support-hub-backdrop">
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 bg-void-black border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">Support Hub</h2>
                <p className="text-xs text-cyber-lime mt-1 font-mono">ASSISTANCE & GUIDES</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            {/* Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

              {/* How to Fit (Carousel) */}
              <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">How to Fit</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={guideStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="min-h-[80px]"
                    >
                      <h4 className="text-cyber-lime font-bold mb-2">{guideSteps[guideStep].title}</h4>
                      <p className="text-xs text-gray-300 leading-relaxed">{guideSteps[guideStep].desc}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-1">
                      {guideSteps.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === guideStep ? 'bg-cyber-lime' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setGuideStep(p => Math.max(0, p - 1))}
                        disabled={guideStep === 0}
                        className="p-1 rounded bg-white/10 disabled:opacity-30 hover:bg-white/20 transition-colors text-xs"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => setGuideStep(p => Math.min(guideSteps.length - 1, p + 1))}
                        disabled={guideStep === guideSteps.length - 1}
                        className="p-1 rounded bg-white/10 disabled:opacity-30 hover:bg-white/20 transition-colors text-xs"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cautions */}
              <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Cautions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                    <span className="text-2xl mb-2 block">💡</span>
                    <h4 className="text-xs font-bold text-red-400">Avoid Bad Lighting</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Harsh shadows break the AI mapping.</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                    <span className="text-2xl mb-2 block">📏</span>
                    <h4 className="text-xs font-bold text-orange-400">Keep Distance</h4>
                    <p className="text-[10px] text-gray-400 mt-1">Stand 1.5m - 2m from the camera.</p>
                  </div>
                </div>
              </section>

              {/* FAQ Accordion */}
              <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">FAQ</h3>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-left p-4 bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center"
                      >
                        <span className="text-xs font-bold text-white">{faq.q}</span>
                        <span className="text-cyber-lime">{openFaq === i ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/20"
                          >
                            <p className="p-4 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

              {/* Report Issue Form */}
              <section>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Report Issue</h3>
                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Issue reported! We will look into it.'); }}>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:border-cyber-lime outline-none"
                    required
                  />
                  <textarea
                    placeholder="Describe the problem..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:border-cyber-lime outline-none h-24 resize-none"
                    required
                  />
                  <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-xs uppercase tracking-widest">
                    Submit Report
                  </button>
                </form>
              </section>

            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
