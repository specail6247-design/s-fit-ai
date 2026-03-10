'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
  }
};

const STEPS = [
  {
    title: '1. Take a Photo',
    description: 'Ensure good lighting and a plain background. Stand straight with arms slightly apart.',
    icon: '📸'
  },
  {
    title: '2. Select Garment',
    description: 'Upload a clear front-facing image of the clothing you want to try on.',
    icon: '👕'
  },
  {
    title: '3. Generate',
    description: 'Our AI processes your images securely to generate a hyper-realistic fitting result.',
    icon: '✨'
  }
];

const FAQS = [
  {
    q: 'How long does processing take?',
    a: 'Typically between 5 to 15 seconds depending on server load and image complexity.'
  },
  {
    q: 'Are my photos safe?',
    a: 'Yes. Photos are processed ephemerally and are never stored on our servers or shared with third parties.'
  },
  {
    q: 'Why did my try-on fail?',
    a: 'Ensure both images are under 5MB, clear, and feature a single person/garment. Poor lighting or complex backgrounds can cause issues.'
  }
];

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'issue'>('guide');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Issue Form State
  const [issueDesc, setIssueDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDesc.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIssueDesc('');
      alert('Issue reported successfully. Thank you!');
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <h2 className="text-xl font-black text-white tracking-widest uppercase">Support Hub</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'guide' ? 'text-white border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                Help & Guide
              </button>
              <button
                onClick={() => setActiveTab('issue')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'issue' ? 'text-white border-b-2 border-[#007AFF]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                Report Issue
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'guide' ? (
                    <div className="space-y-10">
                      {/* Step-by-Step Carousel Guide (Static for now, can be swipable) */}
                      <section>
                        <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">How to Use</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                          {STEPS.map((step, idx) => (
                            <div key={idx} className="min-w-[200px] bg-white/5 border border-white/10 rounded-xl p-4 snap-start shrink-0">
                              <div className="text-3xl mb-2">{step.icon}</div>
                              <h4 className="text-white font-bold text-sm mb-1">{step.title}</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Photo Cautions */}
                      <section>
                        <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">Best Practices</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                            <span className="text-2xl mb-2">✅</span>
                            <span className="text-xs text-green-400 font-bold">Good Lighting</span>
                          </div>
                          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                            <span className="text-2xl mb-2">❌</span>
                            <span className="text-xs text-red-400 font-bold">Busy Backgrounds</span>
                          </div>
                        </div>
                      </section>

                      {/* FAQ Accordion */}
                      <section>
                        <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">FAQ</h3>
                        <div className="space-y-2">
                          {FAQS.map((faq, idx) => (
                            <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
                              <button
                                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 flex justify-between items-center text-sm font-bold text-gray-200 transition-colors"
                              >
                                {faq.q}
                                <span className="text-gray-500">{expandedFaq === idx ? '−' : '+'}</span>
                              </button>
                              <AnimatePresence>
                                {expandedFaq === idx && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 py-3 bg-black/40 text-xs text-gray-400 leading-relaxed"
                                  >
                                    {faq.a}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-sm text-gray-300 leading-relaxed mb-4">
                          Encountered a bug or unexpected behavior? Describe it below to help us improve the platform.
                        </p>
                        <form onSubmit={handleReportIssue} className="space-y-4">
                          <div>
                            <label htmlFor="issue" className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Description</label>
                            <textarea
                              id="issue"
                              rows={5}
                              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none transition-all resize-none"
                              placeholder="Please describe what happened..."
                              value={issueDesc}
                              onChange={(e) => setIssueDesc(e.target.value)}
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={isSubmitting || !issueDesc.trim()}
                            className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-800 disabled:text-gray-500 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
