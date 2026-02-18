'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportHubOpen, activeSupportTab, setSupportHubOpen, setSupportTab } = useStore();

  // Local state for the Report Issue form
  const [reportSubject, setReportSubject] = useState('bug');
  const [reportDescription, setReportDescription] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
        setReportDescription('');
        setReportEmail('');
      }, 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'guide', label: 'User Guide', icon: '📖' },
    { id: 'caution', label: 'Caution', icon: '⚠️' },
    { id: 'qa', label: 'Q&A', icon: '❓' },
    { id: 'issue', label: 'Support', icon: '🔧' },
  ] as const;

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSupportHubOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0F0F0F] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
              <h2 className="text-xl font-bold text-white tracking-tight">Support Hub</h2>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto border-b border-white/10 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSupportTab(tab.id)}
                  className={`flex-1 min-w-[80px] py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                    activeSupportTab === tab.id ? 'text-[#007AFF] bg-white/5' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <div className="text-lg mb-1">{tab.icon}</div>
                  {tab.label}
                  {activeSupportTab === tab.id && (
                    <motion.div
                      layoutId="activeSupportTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 text-gray-300">

              {activeSupportTab === 'guide' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-4">How to use S_FIT AI</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-[#007AFF] font-bold mb-2">01. Upload User Photo</div>
                      <p className="text-sm">Choose a clear, full-body photo of yourself. Ensure good lighting and a simple background for best results.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-[#007AFF] font-bold mb-2">02. Select Garment</div>
                      <p className="text-sm">Upload a photo of the clothing item you want to try on. Front-facing images work best.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-[#007AFF] font-bold mb-2">03. Generate</div>
                      <p className="text-sm">Click &quot;Try On&quot; and let our AI do the magic. This usually takes 15-30 seconds.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSupportTab === 'caution' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-4">Safety & Best Practices</h3>
                  <div className="space-y-4">
                     <div className="flex gap-4 items-start p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                       <span className="text-2xl">🚫</span>
                       <div>
                         <h4 className="font-bold text-red-400 text-sm mb-1">Do Not Upload Nudity</h4>
                         <p className="text-xs text-gray-400">Our system automatically detects and blocks explicit content. Repeated violations may result in a ban.</p>
                       </div>
                     </div>
                     <div className="flex gap-4 items-start p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                       <span className="text-2xl">⚠️</span>
                       <div>
                         <h4 className="font-bold text-yellow-400 text-sm mb-1">Image Quality Matters</h4>
                         <p className="text-xs text-gray-400">Blurry, dark, or cropped photos will produce poor results. Use high-resolution images.</p>
                       </div>
                     </div>
                  </div>
                </div>
              )}

              {activeSupportTab === 'qa' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all">
                      <summary className="p-4 font-bold text-sm cursor-pointer list-none flex justify-between items-center">
                        Is my photo saved?
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="px-4 pb-4 text-xs text-gray-400 leading-relaxed">
                        Photos are temporarily processed for the try-on session and are automatically deleted after 24 hours. We do not use them for training without consent.
                      </div>
                    </details>
                    <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all">
                      <summary className="p-4 font-bold text-sm cursor-pointer list-none flex justify-between items-center">
                        Why does it take time?
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="px-4 pb-4 text-xs text-gray-400 leading-relaxed">
                        We use advanced generative AI models that require significant computational power to create realistic results.
                      </div>
                    </details>
                    <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all">
                      <summary className="p-4 font-bold text-sm cursor-pointer list-none flex justify-between items-center">
                        Can I try on accessories?
                        <span className="transform group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="px-4 pb-4 text-xs text-gray-400 leading-relaxed">
                        Yes! Our model supports tops, bottoms, dresses, and general accessories.
                      </div>
                    </details>
                  </div>
                </div>
              )}

              {activeSupportTab === 'issue' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-4">Report an Issue</h3>
                  <p className="text-xs text-gray-400 mb-6">Found a bug? Have a suggestion? Let us know.</p>

                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 bg-green-500/10 border border-green-500/20 rounded-xl text-center"
                    >
                      <div className="text-4xl mb-4">✅</div>
                      <h4 className="font-bold text-green-400 mb-2">Report Sent!</h4>
                      <p className="text-xs text-gray-400">Thank you for helping us improve S_FIT AI.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
                        <select
                          value={reportSubject}
                          onChange={(e) => setReportSubject(e.target.value)}
                          className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors"
                        >
                          <option value="bug">Report a Bug</option>
                          <option value="feature">Feature Request</option>
                          <option value="account">Account Issue</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                         <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                         <textarea
                           required
                           value={reportDescription}
                           onChange={(e) => setReportDescription(e.target.value)}
                           rows={5}
                           placeholder="Please describe the issue in detail..."
                           className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors resize-none"
                         />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Email (Optional)</label>
                        <input
                          type="email"
                          value={reportEmail}
                          onChange={(e) => setReportEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                      >
                        {isSubmitting ? 'SENDING...' : 'SUBMIT REPORT'}
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
