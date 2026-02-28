'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const HOW_TO_STEPS = [
  {
    title: 'Stand Back',
    desc: 'Position your camera 2-3 meters away for full body view.',
    icon: '📸',
  },
  {
    title: 'Find Good Light',
    desc: 'Ensure your environment is well-lit, avoiding harsh backlighting.',
    icon: '💡',
  },
  {
    title: 'Pose Naturally',
    desc: 'Keep arms slightly away from your body for best AI analysis.',
    icon: '🧍',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How accurate is the sizing?',
    a: 'Our AI analyzes millions of data points to estimate your size with ~92% accuracy across global brands.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. Photos are processed in real-time and immediately deleted from our servers after analysis.',
  },
  {
    q: 'Why did the 3D fitting fail?',
    a: 'Ensure your photo meets our guidelines: full body visible, good lighting, and form-fitting clothing.',
  },
];

export function SupportHub() {
  const isSupportOpen = useStore((state) => state.isSupportOpen);
  const setSupportOpen = useStore((state) => state.setSupportOpen);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {isSupportOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
        onClick={() => setSupportOpen(false)}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 shadow-2xl overflow-y-auto"
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold font-display uppercase tracking-widest text-pure-white">Support Hub</h2>
              <button
                onClick={() => setSupportOpen(false)}
                className="text-soft-gray hover:text-white transition-colors"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            {/* User Guide Carousel */}
            <div className="mb-12">
              <h3 className="text-xs font-mono text-cyber-lime tracking-widest uppercase mb-6">01. How to Fit</h3>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative min-h-[160px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <div className="text-4xl mb-4">{HOW_TO_STEPS[currentSlide].icon}</div>
                    <h4 className="font-bold text-white mb-2">{HOW_TO_STEPS[currentSlide].title}</h4>
                    <p className="text-xs text-soft-gray leading-relaxed">{HOW_TO_STEPS[currentSlide].desc}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {HOW_TO_STEPS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        currentSlide === idx ? 'bg-cyber-lime w-4' : 'bg-white/20 hover:bg-white/50'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Caution Section */}
            <div className="mb-12">
              <h3 className="text-xs font-mono text-[#ff4444] tracking-widest uppercase mb-6 flex items-center gap-2">
                <span>⚠️</span> 02. Crucial Guidelines
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <span className="text-lg">🚫</span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Avoid Baggy Clothes</h4>
                    <p className="text-xs text-soft-gray">The AI cannot accurately detect body shape under loose garments.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <span className="text-lg">🎭</span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Clear Background</h4>
                    <p className="text-xs text-soft-gray">Use a solid, contrasting background for best silhouette detection.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-xs font-mono text-soft-gray tracking-widest uppercase mb-6">03. Q&A</h3>
              <div className="space-y-2">
                {FAQ_ITEMS.map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-colors hover:bg-white/10">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                      className="w-full text-left p-4 flex justify-between items-center text-sm font-medium text-white"
                    >
                      {item.q}
                      <span className={`text-soft-gray transition-transform ${expandedFAQ === idx ? 'rotate-180' : ''}`}>↓</span>
                    </button>
                    <AnimatePresence>
                      {expandedFAQ === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 text-xs text-soft-gray leading-relaxed"
                        >
                          {item.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
