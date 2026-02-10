import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportHubOpen, toggleSupportHub } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'report'>('guide');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/support/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, description }),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setSubject('');
        setDescription('');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isSupportHubOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleSupportHub(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
                <span className="text-[#007AFF]">Support</span> HUB
              </h2>
              <button
                onClick={() => toggleSupportHub(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex bg-[#0a0a0a]">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                  activeTab === 'guide'
                    ? 'border-[#007AFF] text-[#007AFF] bg-white/5'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                User Guide
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                  activeTab === 'report'
                    ? 'border-[#007AFF] text-[#007AFF] bg-white/5'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                Report Issue
              </button>
            </nav>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#050505]">
              {activeTab === 'guide' ? (
                <div className="space-y-6 text-sm text-gray-300">
                  <section>
                    <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">How to use S_FIT NEO</h3>
                    <p className="leading-relaxed">Upload a clear, front-facing photo of yourself. Ensure good lighting and minimal background clutter for the best results.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">Troubleshooting</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>If the fitting fails, try reducing the image size (max 5MB).</li>
                      <li>Ensure your browser supports WebGL for the 3D environment.</li>
                      <li>Use supported formats: JPG, PNG.</li>
                    </ul>
                  </section>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/5">
                    <h3 className="text-white font-bold mb-2 text-sm">Found a bug?</h3>
                    <p className="text-xs text-gray-400 mb-4">Let our engineering team know so we can fix it ASAP.</p>

                    <form onSubmit={handleSubmitReport} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Subject</label>
                        <input
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-black border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors"
                          placeholder="e.g., Image upload failing"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Description</label>
                        <textarea
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={5}
                          className="w-full bg-black border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors resize-none"
                          placeholder="Describe what happened..."
                        />
                      </div>

                      {submitStatus === 'success' && (
                        <div className="p-3 bg-green-500/20 text-green-400 text-xs rounded-lg border border-green-500/30">
                          Report submitted successfully. Thank you!
                        </div>
                      )}
                      {submitStatus === 'error' && (
                        <div className="p-3 bg-red-500/20 text-red-400 text-xs rounded-lg border border-red-500/30">
                          Failed to submit report. Please try again.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide"
                      >
                        {isSubmitting ? 'Sending...' : 'Submit Report'}
                      </button>
                    </form>
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
