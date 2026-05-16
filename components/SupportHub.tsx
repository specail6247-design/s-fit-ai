'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronRight, AlertTriangle, Sun, Maximize, CheckCircle2 } from 'lucide-react';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const guideSlides = [
    {
      title: "Step 1: The Perfect Setup",
      description: "Stand 2-3 meters from the camera in a well-lit room.",
      icon: <Maximize className="w-12 h-12 text-cyber-lime" strokeWidth={1} />,
    },
    {
      title: "Step 2: Lighting Matters",
      description: "Avoid strong backlighting. Ensure your face and body are evenly lit.",
      icon: <Sun className="w-12 h-12 text-luxury-gold" strokeWidth={1} />,
    },
    {
      title: "Step 3: Clear Background",
      description: "Use a plain, contrasting background for the best AI analysis results.",
      icon: <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={1} />,
    }
  ];

  const faqs = [
    {
      q: "How accurate is the sizing?",
      a: "Our AI model achieves 95% accuracy by analyzing your body proportions and cross-referencing with brand-specific sizing charts."
    },
    {
      q: "Is my photo stored?",
      a: "No. Your photos are processed securely and deleted immediately after the fitting session ends. We do not store your images."
    },
    {
      q: "Why did the generation fail?",
      a: "Failures are usually due to poor lighting, complex backgrounds, or wearing extremely loose clothing that obscures your silhouette."
    }
  ];

  return (
    <>
      {/* Trigger Button - Hidden until hovered or needed (subtle) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#111] border border-[#2d2d2d] text-[#8a8a8a] hover:text-white p-3 rounded-full shadow-lg transition-all hover:scale-105 group"
        aria-label="Support Hub"
      >
        <HelpCircle size={24} strokeWidth={1.5} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] uppercase tracking-widest px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Support & Guide
        </span>
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-[#2d2d2d] z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#2d2d2d] flex justify-between items-center bg-[#111]">
                <h2 className="text-white text-sm font-mono uppercase tracking-[0.2em]">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#8a8a8a] hover:text-white transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#2d2d2d]">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-xs font-mono uppercase tracking-widest transition-colors ${
                    activeTab === 'guide' ? 'text-cyber-lime border-b-2 border-cyber-lime bg-white/5' : 'text-[#8a8a8a] hover:bg-white/5'
                  }`}
                >
                  User Guide
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 text-xs font-mono uppercase tracking-widest transition-colors ${
                    activeTab === 'faq' ? 'text-cyber-lime border-b-2 border-cyber-lime bg-white/5' : 'text-[#8a8a8a] hover:bg-white/5'
                  }`}
                >
                  FAQ & Tips
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <AnimatePresence mode="wait">
                  {activeTab === 'guide' ? (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      {/* Carousel */}
                      <div className="bg-[#111] border border-[#2d2d2d] rounded-xl p-8 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col items-center text-center"
                          >
                            <div className="mb-6">{guideSlides[currentSlide].icon}</div>
                            <h3 className="text-white font-mono uppercase tracking-widest text-sm mb-3">
                              {guideSlides[currentSlide].title}
                            </h3>
                            <p className="text-[#8a8a8a] text-sm leading-relaxed">
                              {guideSlides[currentSlide].description}
                            </p>
                          </motion.div>
                        </AnimatePresence>

                        {/* Carousel Controls */}
                        <div className="flex justify-center gap-2 mt-8">
                          {guideSlides.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentSlide(i)}
                              className={`h-1.5 rounded-full transition-all ${
                                i === currentSlide ? 'w-6 bg-cyber-lime' : 'w-1.5 bg-[#4a4a4a]'
                              }`}
                              aria-label={`Go to slide ${i + 1}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Caution Section */}
                      <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} strokeWidth={1.5} />
                          <div>
                            <h4 className="text-red-400 font-mono uppercase tracking-widest text-xs mb-2">Important Notice</h4>
                            <ul className="text-red-200/70 text-sm space-y-2 list-disc list-inside">
                              <li>Ensure full body is visible</li>
                              <li>Avoid baggy clothing for best fit</li>
                              <li>Remove accessories that obscure body shape</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="faq"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      {faqs.map((faq, i) => (
                        <div key={i} className="border border-[#2d2d2d] rounded-lg overflow-hidden bg-[#111]">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full flex items-center justify-between p-5 text-left"
                          >
                            <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                            <ChevronRight
                              size={18}
                              className={`text-[#8a8a8a] transition-transform ${openFaq === i ? 'rotate-90' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {openFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-5 pt-0 text-[#8a8a8a] text-sm leading-relaxed border-t border-[#2d2d2d]/50 mt-2 pt-4">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#2d2d2d] text-center">
                 <p className="text-[#4a4a4a] text-[10px] font-mono uppercase tracking-widest">
                   Need more help? Contact <a href="mailto:support@sfit.ai" className="text-[#8a8a8a] hover:text-white transition-colors">support@sfit.ai</a>
                 </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
