'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'report'>('guide');
  const [issueText, setIssueText] = useState('');
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportStatus('submitting');
    setTimeout(() => {
      setReportStatus('success');
      setIssueText('');
      setTimeout(() => setReportStatus('idle'), 3000);
    }, 1000);
  };

  const faqs = [
    { q: "How long does a try-on take?", a: "Usually around 10 seconds for standard fitting." },
    { q: "Is my data secure?", a: "Yes. Your photos are processed securely and not shared with third parties." },
    { q: "What's the best photo to upload?", a: "A clear, well-lit, front-facing photo with a plain background works best." },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#111] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-black tracking-tighter italic">SUPPORT <span className="text-[#007AFF]">HUB</span></h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-bold tracking-wider uppercase transition-colors ${
                  activeTab === 'guide' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white/80'
                }`}
              >
                Guide
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 text-xs font-bold tracking-wider uppercase transition-colors ${
                  activeTab === 'faq' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white/80'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`flex-1 py-4 text-xs font-bold tracking-wider uppercase transition-colors ${
                  activeTab === 'report' ? 'text-[#007AFF] border-b-2 border-[#007AFF]' : 'text-white/50 hover:text-white/80'
                }`}
              >
                Report
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                {activeTab === 'guide' && (
                  <motion.div
                    key="guide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                      <div className="text-3xl mb-4">📸</div>
                      <h3 className="text-sm font-bold text-white mb-2">Step 1: Upload Photo</h3>
                      <p className="text-xs text-white/50">Ensure good lighting. Stand straight, facing forward.</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                      <div className="text-3xl mb-4">👕</div>
                      <h3 className="text-sm font-bold text-white mb-2">Step 2: Pick Garment</h3>
                      <p className="text-xs text-white/50">Select a clothing item to try on. Front views are ideal.</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
                      <div className="text-3xl mb-4">⚡</div>
                      <h3 className="text-sm font-bold text-white mb-2">Step 3: Try It On</h3>
                      <p className="text-xs text-white/50">Click Try It On and wait 10 seconds for your results.</p>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">Cautions</h3>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li className="flex items-center gap-2"><span>⚠️</span> Avoid extreme shadows</li>
                        <li className="flex items-center gap-2"><span>⚠️</span> Keep appropriate distance from camera</li>
                        <li className="flex items-center gap-2"><span>⚠️</span> Avoid loose hair covering clothes</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'faq' && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {faqs.map((faq, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h4 className="text-sm font-bold text-white mb-2">{faq.q}</h4>
                        <p className="text-xs text-white/60 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'report' && (
                  <motion.div
                    key="report"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <p className="text-xs text-white/50 mb-6">Encountered an issue or bug? Let us know below so we can fix it.</p>
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/80 uppercase">Issue Description</label>
                        <textarea
                          value={issueText}
                          onChange={(e) => setIssueText(e.target.value)}
                          placeholder="Please describe what happened..."
                          className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#007AFF] transition-colors resize-none h-32"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={reportStatus !== 'idle'}
                        className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {reportStatus === 'idle' && 'Submit Report'}
                        {reportStatus === 'submitting' && 'Submitting...'}
                        {reportStatus === 'success' && '✓ Received!'}
                      </button>
                    </form>
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
