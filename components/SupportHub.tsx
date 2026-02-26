'use client';

// S_FIT AI - Support Hub Component
// Slide-out drawer for FAQ and Issue Reporting

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: {
    x: '100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I ensure the best fit?",
    answer: "Ensure your full-body photo is well-lit and you are standing straight. Avoid baggy clothing for better body measurement accuracy."
  },
  {
    question: "Why did my try-on fail?",
    answer: "Try-ons can fail if the image is too blurry, the person is not clearly visible, or the server is overloaded. Try uploading a clearer photo."
  },
  {
    question: "Is this service free?",
    answer: "We offer a free tier with daily limits. Premium users get unlimited try-ons and higher resolution results."
  },
  {
    question: "How do I save my results?",
    answer: "You can download the result image directly or use the 'Share to Story' feature."
  }
];

export function SupportHub() {
  const { isSupportOpen, setSupportOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'faq' | 'report'>('faq');
  const [reportSubject, setReportSubject] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleClose = () => {
    setSupportOpen(false);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setReportSubject('');
      setReportDescription('');

      // Auto switch back or close after delay
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-end overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            className="relative h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col z-10"
            variants={drawerVariants}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'faq'
                    ? 'text-luxury-gold border-b-2 border-luxury-gold bg-white/5'
                    : 'text-soft-gray hover:text-white hover:bg-white/5'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'report'
                    ? 'text-luxury-gold border-b-2 border-luxury-gold bg-white/5'
                    : 'text-soft-gray hover:text-white hover:bg-white/5'
                }`}
              >
                Report Issue
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {activeTab === 'faq' ? (
                <div className="space-y-4">
                  <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-4 items-start">
                    <span className="material-symbols-outlined text-blue-400">help</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">Need help fitting?</h3>
                      <p className="text-xs text-soft-gray mt-1">Check our quick guide on taking the perfect photo for AI analysis.</p>
                    </div>
                  </div>

                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm font-medium text-white pr-4">{faq.question}</span>
                        <span className={`material-symbols-outlined text-soft-gray transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/5">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-4 items-start">
                    <span className="material-symbols-outlined text-yellow-400">bug_report</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">Found a bug?</h3>
                      <p className="text-xs text-soft-gray mt-1">Let us know so we can fix it ASAP.</p>
                    </div>
                  </div>

                  {submitSuccess ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-green-500/10 border border-green-500/20 p-8 rounded-xl text-center"
                    >
                      <span className="material-symbols-outlined text-green-400 text-5xl mb-4">check_circle</span>
                      <h3 className="text-white font-bold text-lg">Report Sent!</h3>
                      <p className="text-soft-gray text-sm mt-2">Thank you for your feedback. We'll look into it.</p>
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="mt-6 text-xs text-green-400 hover:text-green-300 underline"
                      >
                        Send another report
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-soft-gray uppercase tracking-wider mb-2">Subject</label>
                        <input
                          type="text"
                          required
                          value={reportSubject}
                          onChange={(e) => setReportSubject(e.target.value)}
                          placeholder="e.g., Try-on crashed, Photo upload failed"
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-soft-gray uppercase tracking-wider mb-2">Description</label>
                        <textarea
                          required
                          value={reportDescription}
                          onChange={(e) => setReportDescription(e.target.value)}
                          rows={6}
                          placeholder="Describe what happened..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-luxury-gold hover:bg-yellow-500 text-void-black font-bold rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-void-black border-t-transparent rounded-full animate-spin"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined">send</span>
                            Submit Report
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Footer Branding */}
            <div className="p-6 border-t border-white/10 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                S_FIT AI Support
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
