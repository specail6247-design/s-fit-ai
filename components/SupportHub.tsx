'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportOpen, toggleSupport } = useStore();
  const [activeTab, setActiveTab] = useState<'help' | 'report' | 'legal'>('help');
  const [reportSubject, setReportSubject] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setReportSubject('');
      setReportDescription('');
      setTimeout(() => setSubmitSuccess(false), 3000);
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
            onClick={toggleSupport}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[9999] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Support Hub</h2>
                <p className="text-xs text-gray-400 mt-1">S_FIT ASSISTANT</p>
              </div>
              <button
                onClick={toggleSupport}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {(
                [
                  { id: 'help', label: 'Help & Guide' },
                  { id: 'report', label: 'Report Issue' },
                  { id: 'legal', label: 'Legal' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                    activeTab === tab.id ? 'text-[#007AFF]' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'help' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white">Getting Started</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Upload a clear, front-facing photo of yourself. Ensure good lighting and minimal background clutter for the best AI fitting results.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white">Supported Files</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      We support JPG, PNG, and WEBP formats. Max file size is 5MB.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white">Tips for Best Results</h3>
                    <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                      <li>Wear tight-fitting clothes for accurate body mapping.</li>
                      <li>Avoid loose or baggy clothing in your source photo.</li>
                      <li>Ensure the garment image is on a plain background.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="space-y-6">
                  <p className="text-xs text-gray-400">
                    Found a bug or have feedback? Let us know. We appreciate your help in improving S_FIT.
                  </p>

                  {submitSuccess ? (
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center gap-3 text-green-400">
                      <span className="material-symbols-outlined">check_circle</span>
                      <span className="text-xs font-bold">Report sent successfully!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-300">Subject</label>
                        <input
                          type="text"
                          required
                          value={reportSubject}
                          onChange={(e) => setReportSubject(e.target.value)}
                          placeholder="e.g., Upload failed"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-300">Description</label>
                        <textarea
                          required
                          value={reportDescription}
                          onChange={(e) => setReportDescription(e.target.value)}
                          placeholder="Describe the issue..."
                          rows={5}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#007AFF] hover:bg-[#0066cc] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span className="animate-spin text-lg">↻</span>
                        ) : (
                          <>
                            <span>Send Report</span>
                            <span className="material-symbols-outlined text-sm">send</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {activeTab === 'legal' && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">Privacy Policy</h3>
                    <div className="text-xs text-gray-400 space-y-2 leading-relaxed">
                      <p><strong>1. Data Collection:</strong> We collect only the images you upload for the purpose of generating the virtual try-on result.</p>
                      <p><strong>2. Data Usage:</strong> Your photos are processed securely by our AI engine. We do not use your photos for training public models without your explicit consent.</p>
                      <p><strong>3. Data Retention:</strong> Uploaded images are temporarily stored for the duration of your session and are automatically deleted after 24 hours.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">Terms of Service</h3>
                    <div className="text-xs text-gray-400 space-y-2 leading-relaxed">
                      <p>By using S_FIT AI, you agree to these terms.</p>
                      <p>The AI-generated images are for personal visualization purposes only. We do not guarantee 100% accuracy in sizing or fit.</p>
                      <p>You must own the rights to the photos you upload. Do not upload inappropriate or offensive content.</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 text-center">
                    <p className="text-[10px] text-gray-600">
                      Last updated: March 2025<br/>
                      S_FIT AI Inc.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
