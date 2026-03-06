'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportOpen, setSupportOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'report'>('guide');

  // Slide-out animations
  const slideVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: '0%',
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { ease: 'easeInOut', duration: 0.3 }
    }
  };

  React.useEffect(() => {
    const handleTestSupport = () => setSupportOpen(true);
    document.addEventListener('test-support', handleTestSupport);
    return () => document.removeEventListener('test-support', handleTestSupport);
  }, [setSupportOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSupportOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-void-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-md bg-void-black border-l border-white/10 shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Support Hub"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl tracking-widest text-pure-white font-light uppercase" style={{ fontFamily: 'var(--font-cinzel, serif)' }}>
                SUPPORT HUB
              </h2>
              <button
                onClick={() => setSupportOpen(false)}
                className="p-2 text-white/50 hover:text-white transition-colors group"
                aria-label="Close Support Hub"
              >
                <span className="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-6 px-6 py-4 border-b border-white/5 bg-white/5">
              <button
                onClick={() => setActiveTab('guide')}
                className={`text-sm tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-pure-white font-medium border-b border-white' : 'text-white/40 hover:text-white/80'}`}
              >
                HOW TO FIT
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`text-sm tracking-widest uppercase transition-colors ${activeTab === 'faq' ? 'text-pure-white font-medium border-b border-white' : 'text-white/40 hover:text-white/80'}`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`text-sm tracking-widest uppercase transition-colors ${activeTab === 'report' ? 'text-pure-white font-medium border-b border-white' : 'text-white/40 hover:text-white/80'}`}
              >
                REPORT ISSUE
              </button>
            </nav>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <AnimatePresence mode="wait">
                {activeTab === 'guide' && (
                  <motion.div
                    key="guide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    {/* Visual Carousel (Simplified for structural compliance) */}
                    <div className="space-y-4">
                      <h3 className="text-sm text-white/60 tracking-widest uppercase font-medium">STEP-BY-STEP</h3>
                      <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-center aspect-video flex flex-col items-center justify-center space-y-4 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-4xl text-white/80">photo_camera</span>
                        <p className="text-pure-white font-light tracking-wide text-sm">
                          1. Take a full-body photo against a plain background.
                        </p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-center aspect-video flex flex-col items-center justify-center space-y-4 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-4xl text-white/80">checkroom</span>
                        <p className="text-pure-white font-light tracking-wide text-sm">
                          2. Select an item from the curated catalog.
                        </p>
                      </div>
                    </div>

                    {/* Cautions */}
                    <div className="space-y-4">
                      <h3 className="text-sm text-white/60 tracking-widest uppercase font-medium">CAUTIONS</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex flex-col items-center text-center space-y-2">
                          <span className="material-symbols-outlined text-red-400">lightbulb</span>
                          <p className="text-xs text-red-200/80">Avoid harsh backlight or dark shadows.</p>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex flex-col items-center text-center space-y-2">
                          <span className="material-symbols-outlined text-yellow-400">straighten</span>
                          <p className="text-xs text-yellow-200/80">Maintain a distance of 6-8 feet.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'faq' && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Accordion List */}
                    {[
                      { q: "How accurate is the virtual fit?", a: "Our AI models analyze your body shape and the garment's cut to provide a hyper-realistic representation. However, actual fabric feel may vary." },
                      { q: "Is my data secure?", a: "Yes. All images are processed securely and discarded immediately unless you explicitly save them to The Vault." },
                      { q: "Why is the generation taking long?", a: "High-fidelity motion synthesis (Masterpiece Fit) requires complex cloud computing and may take 5-10 seconds." },
                    ].map((item, idx) => (
                      <details key={idx} className="group border border-white/10 rounded-lg overflow-hidden bg-white/5 cursor-pointer">
                        <summary className="px-5 py-4 flex items-center justify-between text-sm font-medium tracking-wide text-pure-white list-none">
                          {item.q}
                          <span className="material-symbols-outlined text-white/50 group-open:rotate-180 transition-transform">expand_more</span>
                        </summary>
                        <div className="px-5 pb-4 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                          {item.a}
                        </div>
                      </details>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'report' && (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <p className="text-sm text-white/60 tracking-wide">
                      Experiencing a glitch or an inaccurate fit? Let our engineering team know.
                    </p>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Report submitted!'); }}>
                      <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80 focus:border-white/40 focus:outline-none">
                        <option value="fit">Inaccurate Fit / Artifacts</option>
                        <option value="crash">Application Crash</option>
                        <option value="slow">Slow Performance</option>
                        <option value="other">Other</option>
                      </select>
                      <textarea
                        className="w-full h-32 bg-white/5 border border-white/10 px-4 py-3 text-sm text-pure-white placeholder-white/30 focus:border-white/40 focus:outline-none resize-none"
                        placeholder="Describe the issue in detail..."
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-pure-white text-void-black py-3 text-sm tracking-widest uppercase font-medium hover:bg-white/90 transition-colors"
                      >
                        Submit Report
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Data Safety Badge */}
            <div className="p-6 border-t border-white/10 bg-white/5 flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-lg">verified_user</span>
              <p className="text-xs text-white/50 tracking-wide font-light">
                <strong>Data Safety Verified:</strong> End-to-end encryption active. No photos are stored without explicit consent.
              </p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
