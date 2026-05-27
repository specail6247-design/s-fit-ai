'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');

  // Carousel State for Guide
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "1. Good Lighting",
      desc: "Ensure you are well-lit from the front. Avoid strong backlight.",
      icon: "light_mode"
    },
    {
      title: "2. Clear Background",
      desc: "A plain, contrasting background helps the AI isolate your silhouette.",
      icon: "wallpaper"
    },
    {
      title: "3. Full Body Frame",
      desc: "Stand back to include your full upper and lower body in the shot.",
      icon: "accessibility_new"
    }
  ];

  // Q&A Data
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: "How long does processing take?", a: "Typically 5-10 seconds depending on server load and image complexity." },
    { q: "Are my photos stored?", a: "No, photos are processed in memory and instantly discarded. Check our Privacy Policy." },
    { q: "Why is the sizing off?", a: "AI relies on your pose and camera distance. Re-read the Caution tab for best results." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Support Hub"
        className="fixed bottom-6 right-8 z-[90] w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-all backdrop-blur-md"
      >
        <span className="material-symbols-outlined text-white">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 shadow-2xl z-[100] flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-light tracking-widest uppercase font-[family-name:var(--font-cinzel)] text-white">
                  Client Services
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`flex-1 py-4 text-[10px] tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white/80'}`}
                >
                  Guide
                </button>
                <button
                  onClick={() => setActiveTab('caution')}
                  className={`flex-1 py-4 text-[10px] tracking-widest uppercase transition-colors ${activeTab === 'caution' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white/80'}`}
                >
                  Caution
                </button>
                <button
                  onClick={() => setActiveTab('qa')}
                  className={`flex-1 py-4 text-[10px] tracking-widest uppercase transition-colors ${activeTab === 'qa' ? 'text-white border-b border-white' : 'text-white/40 hover:text-white/80'}`}
                >
                  Q&A
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'guide' && (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-6"
                    >
                      <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center bg-white/5 mb-4">
                        <span className="material-symbols-outlined text-4xl text-white/80">
                          {slides[currentSlide].icon}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold tracking-widest text-white">
                        {slides[currentSlide].title}
                      </h3>
                      <p className="text-xs text-white/50 leading-relaxed max-w-[250px]">
                        {slides[currentSlide].desc}
                      </p>

                      <div className="flex gap-2 mt-8">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1 transition-all ${currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'caution' && (
                    <motion.div
                      key="caution"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="p-4 border border-red-500/30 bg-red-500/5 rounded-lg flex gap-4">
                        <span className="material-symbols-outlined text-red-400">warning</span>
                        <div>
                          <h4 className="text-sm font-bold text-red-400 mb-1">Low Light Warning</h4>
                          <p className="text-xs text-white/60">Dim environments will severely degrade AI generation quality and fabric rendering.</p>
                        </div>
                      </div>
                      <div className="p-4 border border-[#ecab13]/30 bg-[#ecab13]/5 rounded-lg flex gap-4">
                        <span className="material-symbols-outlined text-[#ecab13]">straighten</span>
                        <div>
                          <h4 className="text-sm font-bold text-[#ecab13] mb-1">Camera Distance</h4>
                          <p className="text-xs text-white/60">Position the camera at least 2 meters (6.5 ft) away. Selfies distort proportions.</p>
                        </div>
                      </div>
                      <div className="p-4 border border-white/10 bg-white/5 rounded-lg flex gap-4">
                        <span className="material-symbols-outlined text-white/50">layers_clear</span>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">Avoid Baggy Clothes</h4>
                          <p className="text-xs text-white/60">Wear form-fitting base layers. Thick jackets will confuse the body estimation model.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'qa' && (
                    <motion.div
                      key="qa"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full p-4 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors text-left"
                          >
                            <span className="text-xs font-bold text-white">{faq.q}</span>
                            <span className="material-symbols-outlined text-white/50 text-sm transition-transform" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}>
                              expand_more
                            </span>
                          </button>
                          <AnimatePresence>
                            {openFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                              >
                                <div className="p-4 text-xs text-white/60 border-t border-white/10">
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

              <div className="p-6 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest">Privacy Policy</a>
                  <a href="#" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest">Terms of Service</a>
                  <a href="#" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest">Report Issue</a>
                  <a href="#" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest">Data Safety</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
