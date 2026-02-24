'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, SupportTab } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportOpen, setSupportOpen, supportTab, setSupportTab } = useStore();
  const [reportText, setReportText] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const tabs: { id: SupportTab; label: string; icon: string }[] = [
    { id: 'guide', label: 'Guide', icon: '📖' },
    { id: 'caution', label: 'Caution', icon: '⚠️' },
    { id: 'qa', label: 'Q&A', icon: '❓' },
    { id: 'issue', label: 'Report', icon: '🐞' },
  ];

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Report submitted:', { email: reportEmail, text: reportText });
      setIsSubmitting(false);
      setSubmitStatus('success');
      setReportText('');
      setReportEmail('');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
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
            onClick={() => setSupportOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[100] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>🛠️</span> Support Hub
              </h2>
              <button
                onClick={() => setSupportOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSupportTab(tab.id)}
                  className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
                    supportTab === tab.id ? 'text-[#007AFF] bg-[#007AFF]/5' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                  {supportTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {supportTab === 'guide' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">How to use S_FIT AI</h3>
                  <div className="space-y-4 text-sm text-gray-400">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <strong className="text-white block mb-1">1. Upload Your Photo</strong>
                      Use a clear, full-body photo with good lighting. Avoid baggy clothes for best results.
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <strong className="text-white block mb-1">2. Choose a Garment</strong>
                      Upload an image of the clothing item you want to try on, preferably on a plain background.
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <strong className="text-white block mb-1">3. Generate</strong>
                      Click &quot;Try On&quot; and wait for the AI to process your images.
                    </div>
                  </div>
                </div>
              )}

              {supportTab === 'caution' && (
                <div className="space-y-6">
                   <h3 className="text-lg font-bold text-white">Limitations & Tips</h3>
                   <div className="space-y-4 text-sm text-gray-400">
                      <p>
                        Our AI is constantly learning. Sometimes, complex poses or busy backgrounds can confuse the model.
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Hands in pockets might disappear.</li>
                        <li>Complex patterns might warp slightly.</li>
                        <li>Very loose clothing on the user photo makes it harder to estimate body shape.</li>
                      </ul>
                   </div>
                </div>
              )}

              {supportTab === 'qa' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Common Questions</h3>
                  <div className="space-y-4">
                    <details className="group">
                      <summary className="cursor-pointer font-bold text-gray-300 group-hover:text-white transition-colors">Is my photo saved?</summary>
                      <p className="mt-2 text-sm text-gray-400 pl-4 border-l-2 border-[#007AFF]">
                        Only temporarily for processing. We delete it shortly after your session unless you save it to your Vault.
                      </p>
                    </details>
                    <details className="group">
                      <summary className="cursor-pointer font-bold text-gray-300 group-hover:text-white transition-colors">Why did the try-on fail?</summary>
                      <p className="mt-2 text-sm text-gray-400 pl-4 border-l-2 border-[#007AFF]">
                        This usually happens if the AI cannot detect a person in the uploaded photo. Try a different image.
                      </p>
                    </details>
                  </div>
                </div>
              )}

              {supportTab === 'issue' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Report an Issue</h3>
                  <p className="text-sm text-gray-400">
                    Found a bug? Let us know so we can fix it.
                  </p>

                  {submitStatus === 'success' ? (
                     <motion.div
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center"
                     >
                       <div className="text-2xl mb-2">✅</div>
                       <strong>Thank you!</strong>
                       <p className="text-xs mt-1">Your report has been submitted.</p>
                     </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitReport} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Email (Optional)</label>
                        <input
                          type="email"
                          value={reportEmail}
                          onChange={(e) => setReportEmail(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors"
                          placeholder="name@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Issue Description</label>
                        <textarea
                          required
                          value={reportText}
                          onChange={(e) => setReportText(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm h-32 focus:border-[#007AFF] outline-none transition-colors resize-none"
                          placeholder="Describe what happened..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#007AFF] hover:bg-[#0066cc] disabled:bg-gray-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                             <span>🚀</span> Submit Report
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
