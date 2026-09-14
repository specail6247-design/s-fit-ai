'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % 3);
  const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + 3) % 3);

  const faqs = [
    { q: "What is S_FIT AI?", a: "S_FIT AI is the ultimate virtual fitting room that lets you try on clothes instantly using advanced AI." },
    { q: "How accurate is the fit?", a: "Our AI model predicts the fit based on the photo and garment provided. Digital Twin mode offers the highest accuracy." },
    { q: "Is my data secure?", a: "Yes, your photos are processed securely and deleted from our servers immediately after the fitting session." },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-void-black border border-white/20 text-white px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors shadow-2xl flex items-center gap-2"
      >
        <span>Support Hub</span>
        <span className="text-cyber-lime">?</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 overflow-y-auto p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black italic tracking-tighter text-white">SUPPORT<span className="text-cyber-lime">_</span>HUB</h2>
                <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              {/* User Guide Carousel */}
              <div className="mb-12">
                <h3 className="text-xs font-bold text-cyber-lime uppercase tracking-widest mb-4">How to Fit</h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-48 flex flex-col justify-center items-center text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="absolute inset-0 p-6 flex flex-col justify-center items-center"
                    >
                      {carouselIndex === 0 && (
                        <>
                          <div className="text-4xl mb-3">📸</div>
                          <h4 className="text-white font-bold mb-1">Upload Photo</h4>
                          <p className="text-xs text-soft-gray">Take a clear, full-body shot facing forward.</p>
                        </>
                      )}
                      {carouselIndex === 1 && (
                        <>
                          <div className="text-4xl mb-3">👕</div>
                          <h4 className="text-white font-bold mb-1">Select Garment</h4>
                          <p className="text-xs text-soft-gray">Choose an item from the brand catalog.</p>
                        </>
                      )}
                      {carouselIndex === 2 && (
                        <>
                          <div className="text-4xl mb-3">✨</div>
                          <h4 className="text-white font-bold mb-1">See Result</h4>
                          <p className="text-xs text-soft-gray">Wait a few seconds for the AI to dress you.</p>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
                    <button onClick={prevSlide} className="text-white/50 hover:text-white">&lt;</button>
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map(i => (
                        <div key={i} className={`h-1 rounded-full transition-all ${i === carouselIndex ? 'w-4 bg-cyber-lime' : 'w-1 bg-white/20'}`} />
                      ))}
                    </div>
                    <button onClick={nextSlide} className="text-white/50 hover:text-white">&gt;</button>
                  </div>
                </div>
              </div>

              {/* Cautions */}
              <div className="mb-12">
                <h3 className="text-xs font-bold text-[#FF3B30] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span>⚠️</span> Caution
                </h3>
                <div className="space-y-3">
                  <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-4 flex gap-4 items-start">
                    <span className="text-xl">💡</span>
                    <div>
                      <h4 className="text-sm text-white font-bold mb-1">Lighting</h4>
                      <p className="text-xs text-soft-gray">Ensure well-lit, natural lighting. Avoid harsh shadows for best AI processing.</p>
                    </div>
                  </div>
                  <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-4 flex gap-4 items-start">
                    <span className="text-xl">📏</span>
                    <div>
                      <h4 className="text-sm text-white font-bold mb-1">Distance</h4>
                      <p className="text-xs text-soft-gray">Stand about 1-2 meters away from the camera. The full body should be visible.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Q&A</h3>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 bg-white/5 hover:bg-white/10 flex justify-between items-center transition-colors text-sm text-white"
                      >
                        {faq.q}
                        <span className={`text-xs transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/20 px-4 py-3 text-xs text-soft-gray leading-relaxed"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
