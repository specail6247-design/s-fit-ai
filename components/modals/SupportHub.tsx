'use client';

// S_FIT AI - Support Hub Drawer
// Slide-out drawer with User Guide, Cautions, and FAQs

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 25, stiffness: 200 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { type: 'spring', damping: 25, stiffness: 200 },
  },
};

const guideSteps = [
  { title: "01. IDENTIFY", desc: "Upload a full-body photo of yourself." },
  { title: "02. TARGET", desc: "Upload the garment you want to try on." },
  { title: "03. TRY IT ON", desc: "Our AI maps the garment onto your body in 10 seconds." },
];

const faqs = [
  { q: "How does the AI sizing work?", a: "We use MediaPipe to analyze key body landmarks and estimate proportions." },
  { q: "Is my data stored?", a: "No, photos are processed ephemerally and deleted immediately after the fitting." },
  { q: "What types of garments work best?", a: "Flat-lay images of clothing with clear boundaries work best for the mapping algorithm." },
];

export function SupportHub() {
  const { showSupportHub, setShowSupportHub } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {showSupportHub && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90] bg-void-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSupportHub(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-void-black border-l border-pure-white/10 z-[100] flex flex-col shadow-2xl"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-pure-white/10">
              <h2 className="text-xl font-display font-light text-pure-white tracking-widest uppercase">
                Support Hub
              </h2>
              <button
                onClick={() => setShowSupportHub(false)}
                className="text-soft-gray hover:text-pure-white transition-colors p-2"
                aria-label="Close Support Hub"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-pure-white/10 text-sm font-mono tracking-wider uppercase">
              {['guide', 'caution', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'guide' | 'caution' | 'faq')}
                  className={`flex-1 py-4 text-center transition-colors ${
                    activeTab === tab
                      ? 'text-cyber-lime border-b-2 border-cyber-lime'
                      : 'text-soft-gray hover:text-pure-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <AnimatePresence mode="wait">
                {/* Guide Tab */}
                {activeTab === 'guide' && (
                  <motion.div
                    key="guide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-6">
                      <p className="text-soft-gray text-sm font-mono tracking-wide">
                        3 STEPS TO YOUR PERFECT FIT
                      </p>
                    </div>
                    {guideSteps.map((step, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full border border-cyber-lime flex items-center justify-center text-cyber-lime text-xs font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-pure-white tracking-wider mb-1">{step.title}</h3>
                          <p className="text-sm text-soft-gray leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Caution Tab */}
                {activeTab === 'caution' && (
                  <motion.div
                    key="caution"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="p-4 border border-pure-white/10 rounded-lg bg-pure-white/5 flex gap-4">
                      <span className="text-2xl">💡</span>
                      <div>
                        <h3 className="font-bold text-pure-white text-sm mb-1 uppercase tracking-wide">Lighting</h3>
                        <p className="text-xs text-soft-gray">Ensure you are in a well-lit room. Harsh shadows can confuse the AI mapping.</p>
                      </div>
                    </div>
                    <div className="p-4 border border-pure-white/10 rounded-lg bg-pure-white/5 flex gap-4">
                      <span className="text-2xl">📏</span>
                      <div>
                        <h3 className="font-bold text-pure-white text-sm mb-1 uppercase tracking-wide">Distance</h3>
                        <p className="text-xs text-soft-gray">Stand 3-5 feet from the camera so your full body is visible.</p>
                      </div>
                    </div>
                    <div className="p-4 border border-pure-white/10 rounded-lg bg-pure-white/5 flex gap-4">
                      <span className="text-2xl">🧍</span>
                      <div>
                        <h3 className="font-bold text-pure-white text-sm mb-1 uppercase tracking-wide">Pose</h3>
                        <p className="text-xs text-soft-gray">Stand straight with your arms slightly away from your body (A-pose).</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-pure-white/10 pb-4">
                        <button
                          className="w-full text-left flex justify-between items-center py-2"
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        >
                          <span className="font-bold text-sm text-pure-white">{faq.q}</span>
                          <span className="text-cyber-lime ml-4">
                            {activeFaq === index ? '−' : '+'}
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-soft-gray pt-2 leading-relaxed">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}

                    <div className="pt-8">
                       <h4 className="text-xs text-soft-gray uppercase tracking-widest mb-4">Still need help?</h4>
                       <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported.'); }}>
                         <textarea
                           className="w-full bg-transparent border border-pure-white/20 rounded p-3 text-sm text-pure-white placeholder:text-soft-gray/50 focus:border-pure-white focus:outline-none resize-none h-24"
                           placeholder="Describe your issue..."
                           required
                         />
                         <button type="submit" className="w-full py-3 bg-pure-white/10 hover:bg-pure-white/20 text-pure-white text-xs tracking-widest uppercase transition-colors rounded">
                           Report Issue
                         </button>
                       </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
