'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all shadow-lg border border-white/10 flex items-center justify-center"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black/95 backdrop-blur-xl border-l border-white/10 z-50 p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-serif text-white tracking-wide">Support & Guidelines</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-soft-gray hover:text-white transition-colors flex items-center justify-center p-1"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* How to Fit Carousel */}
            <div className="mb-10">
              <h3 className="text-sm font-medium text-soft-gray uppercase tracking-wider mb-4">How to Fit</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex-none w-[200px] bg-white/5 rounded-2xl p-5 border border-white/10 snap-start">
                  <div className="h-10 w-10 rounded-full bg-cyber-lime/10 text-cyber-lime flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">light_mode</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Step 1: Lighting</h4>
                  <p className="text-xs text-soft-gray">Ensure even, bright lighting without harsh shadows.</p>
                </div>
                <div className="flex-none w-[200px] bg-white/5 rounded-2xl p-5 border border-white/10 snap-start">
                  <div className="h-10 w-10 rounded-full bg-cyber-lime/10 text-cyber-lime flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">wallpaper</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Step 2: Background</h4>
                  <p className="text-xs text-soft-gray">Stand against a plain, contrasting background.</p>
                </div>
                <div className="flex-none w-[200px] bg-white/5 rounded-2xl p-5 border border-white/10 snap-start">
                  <div className="h-10 w-10 rounded-full bg-cyber-lime/10 text-cyber-lime flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">accessibility_new</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Step 3: Full Body</h4>
                  <p className="text-xs text-soft-gray">Keep your entire body in frame, hands slightly apart.</p>
                </div>
              </div>
            </div>

            {/* Caution Section */}
            <div className="mb-10 bg-amber-400/10 border border-amber-400/20 rounded-2xl p-5">
              <h3 className="text-sm font-medium text-amber-400 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">warning</span>
                Crucial Guidelines
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-amber-400/70 text-base mt-0.5">wb_twilight</span>
                  <p className="text-sm text-soft-gray"><strong className="text-white">Avoid Backlighting.</strong> Do not stand in front of bright windows or lights.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-amber-400/70 text-base mt-0.5">social_distance</span>
                  <p className="text-sm text-soft-gray"><strong className="text-white">Stand 2m Away.</strong> Ensure the camera can capture your full body comfortably.</p>
                </div>
              </div>
            </div>

            {/* Q&A Accordion */}
            <div className="mb-12">
              <h3 className="text-sm font-medium text-soft-gray uppercase tracking-wider mb-4">Frequently Asked Questions</h3>
              <div className="space-y-2">
                {[
                  { q: 'Is my data secure?', a: 'Yes. All images are processed securely and deleted immediately after your fitting session. We do not store your personal photos.' },
                  { q: 'Can I use photos from my phone?', a: 'Absolutely. You can upload any clear photo of yourself from your camera roll.' },
                  { q: 'How accurate is the fit?', a: 'Our AI model analyzes garment structure and your pose to provide a highly realistic 3D drape, though slight variations may occur.' }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm font-medium text-white">{faq.q}</span>
                      <span className="material-symbols-outlined text-soft-gray">
                        {expandedFaq === idx ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {expandedFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-4"
                        >
                          <p className="text-sm text-soft-gray pt-2 border-t border-white/10">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust & Growth Links */}
            <div className="pt-8 border-t border-white/10 mt-auto">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a href="#" className="text-xs text-soft-gray hover:text-white transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">privacy_tip</span>
                  Privacy Policy
                </a>
                <a href="#" className="text-xs text-soft-gray hover:text-white transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">gavel</span>
                  Terms of Service
                </a>
                <a href="#" className="text-xs text-soft-gray hover:text-white transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">bug_report</span>
                  Report Issue
                </a>
                <a href="#" className="text-xs text-soft-gray hover:text-white transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">health_and_safety</span>
                  Data Safety
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
