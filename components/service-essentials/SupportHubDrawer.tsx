'use client';
import { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const userGuideSteps = [
  {
    title: "Upload Photo",
    desc: "Use a clear, front-facing full body photo with good lighting.",
    icon: "📸"
  },
  {
    title: "Select Garment",
    desc: "Choose from our premium catalog or upload your own piece.",
    icon: "👕"
  },
  {
    title: "AI Processing",
    desc: "Our engine maps the garment to your unique body shape.",
    icon: "⚡️"
  }
];

const faqs = [
  {
    q: "Why did my try-on fail?",
    a: "Make sure your photo has clear lighting and you are facing forward. Avoid bulky clothing in your base photo."
  },
  {
    q: "Is my data secure?",
    a: "We do not store your photos permanently. They are processed and immediately deleted."
  },
  {
    q: "What is 'Vibe Check'?",
    a: "A fast, selfie-only mode to see if a garment suits your overall aesthetic."
  }
];

export default function SupportHubDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment key="support-drawer">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black font-mono tracking-tight text-white">SUPPORT HUB</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-white transition-colors p-2"
                  aria-label="Close Support Hub"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              {/* Caution Section */}
              <div className="mb-10 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">
                <h3 className="text-yellow-500 font-bold text-sm mb-3 flex items-center gap-2">
                  <span aria-hidden="true">⚠️</span> ESSENTIAL GUIDELINES
                </h3>
                <ul className="text-xs text-gray-300 space-y-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500/50 mt-0.5" aria-hidden="true">•</span>
                    Ensure balanced, natural lighting. Avoid harsh shadows.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500/50 mt-0.5" aria-hidden="true">•</span>
                    Stand 1.5m - 2m away from the camera.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500/50 mt-0.5" aria-hidden="true">•</span>
                    Keep arms slightly away from the body.
                  </li>
                </ul>
              </div>

              {/* User Guide Carousel */}
              <div className="mb-12">
                <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">How to Fit</h3>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="text-center"
                    >
                      <div className="text-5xl mb-4" aria-hidden="true">{userGuideSteps[activeStep].icon}</div>
                      <h4 className="font-bold text-white mb-2">{userGuideSteps[activeStep].title}</h4>
                      <p className="text-xs text-gray-400">{userGuideSteps[activeStep].desc}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center gap-2 mt-6">
                    {userGuideSteps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === activeStep ? 'w-6 bg-white' : 'w-1.5 bg-white/20'}`}
                        aria-label={`Go to step ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">Q&A</h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 flex justify-between items-center text-sm font-medium text-gray-200 hover:text-white transition-colors"
                        aria-expanded={openFaq === idx}
                      >
                        {faq.q}
                        <span className={`transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} aria-hidden="true">
                          ▼
                        </span>
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}
