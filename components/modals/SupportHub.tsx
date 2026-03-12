'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

const GUIDE_STEPS = [
  {
    title: 'Find Good Lighting',
    description: 'Natural, even lighting works best. Avoid harsh shadows or strong backlighting.',
    icon: '💡'
  },
  {
    title: 'Stand 6ft Away',
    description: 'Ensure your full body is visible in the frame for accurate proportions.',
    icon: '📏'
  },
  {
    title: 'Wear Fitted Clothes',
    description: 'Tight-fitting clothes help the AI accurately map your body shape.',
    icon: '👕'
  },
  {
    title: 'A-Pose',
    description: 'Stand with your arms slightly away from your body, like an "A".',
    icon: '🧍'
  }
];

const FAQS = [
  {
    question: 'How accurate is the sizing?',
    answer: 'Our Easy Fit mode provides a general size recommendation based on height, weight, and body shape. Digital Twin provides a more accurate fit visualization.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! All photos are processed securely and never shared. We adhere to strict privacy guidelines.'
  },
  {
    question: 'Why did my try-on fail?',
    answer: 'This usually happens if the lighting is too dark, or your full body is not visible. Please try again following the "How to Fit" guide.'
  }
];

export function SupportHub() {
  const isSupportHubOpen = useStore((state) => state.isSupportHubOpen);
  const setSupportHubOpen = useStore((state) => state.setSupportHubOpen);

  const [currentStep, setCurrentStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [reportIssue, setReportIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSupportHubOpen) return null;

  const nextStep = () => setCurrentStep((p) => (p + 1) % GUIDE_STEPS.length);
  const prevStep = () => setCurrentStep((p) => (p - 1 + GUIDE_STEPS.length) % GUIDE_STEPS.length);

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert('Issue reported successfully. Our team will look into it.');
      setReportIssue('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-end"
        onClick={() => setSupportHubOpen(false)}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-full max-w-md h-full bg-[#0A0A0A] border-l border-white/10 flex flex-col shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A0A0A] z-10">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">
                Support Hub
              </h2>
              <p className="text-xs text-gray-500 font-mono">Assistance & Guidelines</p>
            </div>
            <button
              onClick={() => setSupportHubOpen(false)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-10">

            {/* 1. Visual Guide Carousel */}
            <section>
              <h3 className="text-sm font-bold text-[#007AFF] uppercase mb-4 flex items-center gap-2">
                <span>01.</span> How to Fit
              </h3>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/5 to-transparent pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center relative z-10"
                  >
                    <div className="text-5xl mb-4 bg-black/50 w-20 h-20 rounded-full flex items-center justify-center border border-white/10">
                      {GUIDE_STEPS[currentStep].icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {GUIDE_STEPS[currentStep].title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {GUIDE_STEPS[currentStep].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between mt-6 relative z-10">
                  <button onClick={prevStep} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                    ←
                  </button>
                  <div className="flex gap-2">
                    {GUIDE_STEPS.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-6 bg-[#007AFF]' : 'w-1.5 bg-white/20'}`} />
                    ))}
                  </div>
                  <button onClick={nextStep} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                    →
                  </button>
                </div>
              </div>
            </section>

            {/* 2. Cautions */}
            <section>
              <h3 className="text-sm font-bold text-[#007AFF] uppercase mb-4 flex items-center gap-2">
                <span>02.</span> Essential Warnings
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                  <span className="text-2xl mb-2">⚠️</span>
                  <span className="text-xs font-bold text-red-400 uppercase">Lighting</span>
                  <span className="text-[10px] text-gray-400 mt-1">Avoid extreme shadows</span>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                  <span className="text-2xl mb-2">📸</span>
                  <span className="text-xs font-bold text-yellow-400 uppercase">Distance</span>
                  <span className="text-[10px] text-gray-400 mt-1">Keep 6ft / 2m distance</span>
                </div>
              </div>
            </section>

            {/* 3. FAQ */}
            <section>
              <h3 className="text-sm font-bold text-[#007AFF] uppercase mb-4 flex items-center gap-2">
                <span>03.</span> F.A.Q
              </h3>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm font-medium text-white">{faq.question}</span>
                      <span className="text-gray-500 transform transition-transform duration-200" style={{ transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        ▼
                      </span>
                    </button>
                    <AnimatePresence>
                      {expandedFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 text-xs text-gray-400 leading-relaxed"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Report Issue */}
            <section className="pb-10">
              <h3 className="text-sm font-bold text-[#007AFF] uppercase mb-4 flex items-center gap-2">
                <span>04.</span> Report Issue
              </h3>
              <form onSubmit={handleReportIssue} className="space-y-3">
                <textarea
                  value={reportIssue}
                  onChange={(e) => setReportIssue(e.target.value)}
                  placeholder="Describe the issue you are facing..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-[#007AFF] transition-colors resize-none h-24 font-mono placeholder:text-gray-600"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !reportIssue.trim()}
                  className="w-full bg-white text-black font-bold text-xs py-3 rounded-xl uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </form>
            </section>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
