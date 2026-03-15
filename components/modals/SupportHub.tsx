import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

const steps = [
  { title: "Good Lighting", desc: "Ensure you are well lit from the front. Avoid strong backlight." },
  { title: "Clear Background", desc: "Stand in front of a plain wall for best segmentation results." },
  { title: "Full Body", desc: "For full-body try-ons, ensure head to toe is visible in frame." },
];

const faqs = [
  { q: "Why is the image taking so long?", a: "AI generation typically takes 10-20 seconds. Heavy server load may extend this slightly." },
  { q: "The garment looks distorted", a: "Ensure the uploaded garment image is a clear, front-facing view on a flat surface or plain background." },
  { q: "Can I use photos with other people?", a: "For best results, upload photos containing only the person who will be wearing the garment." }
];

export function SupportHub({ isOpen, onClose, onOpenLegal }: SupportHubProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [reportIssue, setReportIssue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportIssue.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setReportIssue("");
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="support-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Drawer */}
          <motion.div
            key="support-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[91] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">Support Hub</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Content Area (To be populated) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10">

              {/* Visual Carousel Guide */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-widest">How to get the best fit</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="text-center space-y-2"
                    >
                      <div className="text-4xl mb-4">
                        {currentStep === 0 && "💡"}
                        {currentStep === 1 && "📸"}
                        {currentStep === 2 && "🧍"}
                      </div>
                      <h4 className="font-bold text-white">{steps[currentStep].title}</h4>
                      <p className="text-xs text-gray-400">{steps[currentStep].desc}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Controls */}
                  <div className="flex justify-center gap-2 mt-6">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentStep(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentStep ? 'bg-[#007AFF]' : 'bg-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Icon-Based Cautions */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-widest">Important Cautions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex items-start gap-3">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <div>
                      <div className="text-xs font-bold text-white">Distance</div>
                      <div className="text-[10px] text-gray-500 mt-1">Stand 2-3 meters away</div>
                    </div>
                  </div>
                  <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex items-start gap-3">
                    <span className="text-yellow-500 text-xl">⚡</span>
                    <div>
                      <div className="text-xs font-bold text-white">Blur</div>
                      <div className="text-[10px] text-gray-500 mt-1">Keep camera steady</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Accordion */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-widest">FAQ</h3>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-black/40">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-bold text-white">{faq.q}</span>
                        <span className="text-gray-500">{expandedFaq === idx ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {expandedFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-xs text-gray-400"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

              {/* Report Issue Form */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-widest">Feedback Loop</h3>
                <form onSubmit={handleReportSubmit} className="space-y-3 bg-black/40 p-4 border border-white/10 rounded-xl">
                  <label className="block text-xs font-bold text-white">Report an Issue</label>
                  <textarea
                    value={reportIssue}
                    onChange={(e) => setReportIssue(e.target.value)}
                    placeholder="Describe the bug or issue..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors resize-none h-24"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !reportIssue.trim()}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : submitSuccess ? "Sent! Thanks" : "Submit Report"}
                  </button>
                </form>
              </section>

              {/* Legal Links */}
              <section className="pt-4 border-t border-white/10 flex justify-center gap-6">
                <button onClick={() => onOpenLegal('privacy')} className="text-xs text-gray-500 hover:text-white transition-colors underline">
                  Privacy Policy
                </button>
                <button onClick={() => onOpenLegal('terms')} className="text-xs text-gray-500 hover:text-white transition-colors underline">
                  Terms of Service
                </button>
              </section>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
