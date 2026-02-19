'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportOpen, setSupportOpen, supportTab } = useStore();
  const [activeTab, setActiveTab] = useState(supportTab);

  // Sync with store if tab changes externally
  useEffect(() => {
    setActiveTab(supportTab);
  }, [supportTab]);

  const handleClose = () => setSupportOpen(false);

  // Form State
  const [subject, setSubject] = useState('bug');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
        setSubmitSuccess(false);
        setDescription('');
        setEmail('');
    }, 3000);
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[9999] flex flex-col"
          >
             {/* Header */}
             <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold font-mono tracking-wider text-white">SUPPORT HUB</h2>
                <button onClick={handleClose} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                  ✕
                </button>
             </div>

             {/* Tabs */}
             <div className="flex border-b border-white/10">
                {(['guide', 'caution', 'qa', 'report'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                      activeTab === tab ? 'text-[#007AFF] bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"
                      />
                    )}
                  </button>
                ))}
             </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'guide' && (
                  <div className="space-y-6 text-sm text-gray-300">
                    <h3 className="text-lg font-bold text-white">How to Use S_FIT</h3>
                    <p>1. Upload a full-body photo of yourself.</p>
                    <p>2. Upload a clear front-facing photo of a garment.</p>
                    <p>3. Click &quot;Try It On&quot; and wait for the AI to process.</p>
                    <p>4. Use the &quot;Share to Story&quot; button to save your look.</p>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-6 text-sm text-gray-300">
                     <h3 className="text-lg font-bold text-white text-yellow-500">⚠ Important Cautions</h3>
                     <ul className="list-disc pl-5 space-y-2">
                        <li>Ensure your photo has good lighting.</li>
                        <li>Avoid wearing loose or baggy clothing in the source photo for best results.</li>
                        <li>The AI generation is an estimation and may not reflect exact physical fit.</li>
                        <li>Do not upload inappropriate or explicit content.</li>
                     </ul>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-6 text-sm text-gray-300">
                    <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-white">Is my photo saved?</p>
                            <p className="text-xs text-gray-400">Photos are processed temporarily and deleted shortly after generation.</p>
                        </div>
                        <div>
                            <p className="font-bold text-white">Why is the generation slow?</p>
                            <p className="text-xs text-gray-400">High-quality AI rendering takes significant computational power.</p>
                        </div>
                    </div>
                  </div>
                )}

                {activeTab === 'report' && (
                  <div className="space-y-6">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                        <p className="text-yellow-500 text-xs font-bold">FOUND A BUG? LET US KNOW.</p>
                    </div>

                    {submitSuccess ? (
                        <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-lg text-center animate-pulse">
                            <span className="text-4xl">✅</span>
                            <p className="mt-4 text-green-400 font-bold">Report Submitted!</p>
                            <p className="text-xs text-gray-400">Thank you for helping us improve.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Issue Type</label>
                                <select
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors"
                                >
                                    <option value="bug">🐛 Bug Report</option>
                                    <option value="feedback">💡 Feature Request</option>
                                    <option value="other">📝 Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    rows={5}
                                    className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors resize-none"
                                    placeholder="Please describe the issue in detail..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Email (Optional)</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-3 text-sm focus:border-[#007AFF] outline-none transition-colors"
                                    placeholder="For follow-up..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
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
