'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Step 1: Proper Lighting",
      content: "Ensure you are in a well-lit room. Natural light works best.",
      icon: "lightbulb",
    },
    {
      title: "Step 2: Clear Photo",
      content: "Take a clear, full-body photo or upper-body depending on the garment. Keep your arms slightly away from your body.",
      icon: "photo_camera",
    },
    {
      title: "Step 3: Select Garment",
      content: "Upload or select a garment that has a clear front view.",
      icon: "apparel",
    },
    {
      title: "Step 4: AI Magic",
      content: "Wait for the AI to process and generate your try-on result.",
      icon: "auto_awesome",
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const faqs = [
    { q: "What formats are supported?", a: "JPG and PNG files under 5MB." },
    { q: "How long does processing take?", a: "Usually 15-30 seconds depending on server load." },
    { q: "Is my data safe?", a: "We delete all photos immediately after the try-on session completes." }
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/70 hover:text-white transition-colors uppercase"
      >
        <span className="material-symbols-outlined text-[18px]">help</span>
        Support
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-void-black border-l border-white/10 z-[1000] overflow-y-auto flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40 sticky top-0 z-10 backdrop-blur-md">
                <h2 className="text-xl font-bold tracking-widest font-[family-name:var(--font-display)]">SUPPORT HUB</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 space-y-8">

                {/* How to Fit - Visual Carousel */}
                <section>
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest border-b border-[#007AFF]/30 pb-2 inline-block">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                     <div className="flex justify-between items-center mb-4">
                       <span className="material-symbols-outlined text-3xl text-[#007AFF]">{slides[currentSlide].icon}</span>
                       <div className="text-xs text-white/50 font-mono">{currentSlide + 1} / {slides.length}</div>
                     </div>
                     <h4 className="font-bold mb-2 text-sm">{slides[currentSlide].title}</h4>
                     <p className="text-xs text-white/70 min-h-[60px]">{slides[currentSlide].content}</p>

                     <div className="flex justify-between mt-4">
                        <button onClick={prevSlide} className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-xs flex items-center justify-center w-8 h-8">
                          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        </button>
                        <button onClick={nextSlide} className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-xs flex items-center justify-center w-8 h-8">
                          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </button>
                     </div>
                  </div>
                </section>

                {/* Caution */}
                <section>
                  <h3 className="text-xs font-bold text-[#FF3B30] uppercase mb-4 tracking-widest border-b border-[#FF3B30]/30 pb-2 inline-block">Cautions</h3>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#FF3B30] text-[20px] mt-0.5">warning</span>
                      <p className="text-xs text-white/80 leading-relaxed">Avoid heavy shadows or backlighting. It severely impacts AI recognition.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#FF3B30] text-[20px] mt-0.5">straighten</span>
                      <p className="text-xs text-white/80 leading-relaxed">Maintain proper distance. Ensure your full torso is clearly visible.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#FF3B30] text-[20px] mt-0.5">layers_clear</span>
                      <p className="text-xs text-white/80 leading-relaxed">Avoid loose, baggy clothing when taking the user photo for best fitting results.</p>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section className="pb-8">
                  <h3 className="text-xs font-bold text-white/80 uppercase mb-4 tracking-widest border-b border-white/20 pb-2 inline-block">Q&A</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xs font-bold">{faq.q}</span>
                          <span className="material-symbols-outlined text-white/50 text-[18px]">
                            {openFaqIndex === idx ? 'remove' : 'add'}
                          </span>
                        </button>
                        <AnimatePresence>
                          {openFaqIndex === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 text-xs text-white/60 leading-relaxed"
                            >
                              {faq.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
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
