'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const isSupportOpen = useStore((state) => state.isSupportOpen);
  const setIsSupportOpen = useStore((state) => state.setIsSupportOpen);

  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'report'>('guide');
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: 'Step 1: Front Facing', text: 'Ensure you are facing the camera directly.', icon: '📸' },
    { title: 'Step 2: Good Lighting', text: 'Natural light works best. Avoid backlighting.', icon: '☀️' },
    { title: 'Step 3: Distance', text: 'Stand about 2-3 meters away from the camera.', icon: '📏' },
    { title: 'Step 4: Form Fitting', text: 'Wear tight-fitting clothes for accurate results.', icon: '👕' },
  ];

  if (!isSupportOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSupportOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-void-black border-l border-white/10 shadow-2xl flex flex-col z-10 glass-panel"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-widest text-white">Support Hub</h2>
            <button
              onClick={() => setIsSupportOpen(false)}
              className="text-soft-gray hover:text-white transition-colors p-2"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <div className="flex border-b border-white/10">
            {['guide', 'faq', 'report'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'guide' | 'faq' | 'report')}
                className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeTab === tab ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-soft-gray hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'guide' && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">How to Fit</h3>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={guideStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col items-center text-center space-y-4"
                    >
                      <div className="text-5xl mb-2" role="img" aria-label="Step Icon">{guideSteps[guideStep].icon}</div>
                      <h4 className="text-white font-bold">{guideSteps[guideStep].title}</h4>
                      <p className="text-xs text-soft-gray">{guideSteps[guideStep].text}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setGuideStep((prev) => Math.max(0, prev - 1))}
                      disabled={guideStep === 0}
                      className="text-xs text-soft-gray hover:text-white disabled:opacity-30 uppercase tracking-widest"
                    >
                      Prev
                    </button>
                    <div className="flex gap-2">
                      {guideSteps.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === guideStep ? 'bg-cyber-lime' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    <button
                      onClick={() => setGuideStep((prev) => Math.min(guideSteps.length - 1, prev + 1))}
                      disabled={guideStep === guideSteps.length - 1}
                      className="text-xs text-soft-gray hover:text-white disabled:opacity-30 uppercase tracking-widest"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span role="img" aria-label="Caution">⚠️</span> Cautions
                  </h3>
                  <div className="space-y-2">
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-start gap-3">
                      <span role="img" aria-label="Light Bulb">💡</span>
                      <p className="text-xs text-red-200">Poor lighting will result in distorted textures.</p>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg flex items-start gap-3">
                      <span role="img" aria-label="Camera">📷</span>
                      <p className="text-xs text-orange-200">Avoid using wide-angle lenses close up to prevent proportion distortion.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Frequently Asked Questions</h3>
                {[
                  { q: 'Why does the garment look blurry?', a: 'Ensure you upload a high-resolution front-facing photo of the garment. Wrinkles or folds in the photo can also affect the AI output.' },
                  { q: 'My proportions look wrong.', a: 'Try taking your photo from slightly further away (2-3 meters) and ensure the camera is around chest height.' },
                  { q: 'Is my data stored?', a: 'No, photos are processed in real-time and deleted immediately after generating the fit result.' },
                ].map((faq, i) => (
                  <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <summary className="p-4 cursor-pointer text-sm font-bold text-white flex justify-between items-center hover:bg-white/5 transition-colors">
                      {faq.q}
                      <span className="text-soft-gray group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 text-xs text-soft-gray border-t border-white/10 bg-black/40">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            )}

            {activeTab === 'report' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Report an Issue</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported successfully.'); setIsSupportOpen(false); }}>
                  <div className="space-y-2">
                    <label className="text-xs text-soft-gray uppercase tracking-widest">Issue Type</label>
                    <select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white text-sm outline-none focus:border-cyber-lime">
                      <option value="bug" className="bg-void-black">Software Bug</option>
                      <option value="quality" className="bg-void-black">Poor Fitting Quality</option>
                      <option value="other" className="bg-void-black">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-soft-gray uppercase tracking-widest">Description</label>
                    <textarea
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white text-sm outline-none focus:border-cyber-lime h-32 resize-none"
                      placeholder="Describe the problem you encountered..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors">
                    Submit Report
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
