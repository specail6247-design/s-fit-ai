import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa' | 'report'>('guide');
  const [issueText, setIssueText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
    setIssueText('');

    // Reset success message after 3s
    setTimeout(() => setSubmitted(false), 3000);
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
            onClick={() => setSupportHubOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
              <h2 className="text-xl font-black italic tracking-tighter">
                SUPPORT <span className="text-[#007AFF]">HUB</span>
              </h2>
              <button
                onClick={() => setSupportHubOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-black/20 overflow-x-auto no-scrollbar">
              {['guide', 'caution', 'qa', 'report'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'guide' | 'caution' | 'qa' | 'report')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider text-center transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'text-[#007AFF] border-[#007AFF] bg-white/5'
                      : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {tab === 'qa' ? 'Q&A' : tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'guide' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">How to get the best result?</h3>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="text-[#007AFF] font-bold mb-2">01. Good Lighting</div>
                      <p className="text-sm text-gray-400">Ensure your photo is well-lit. Avoid strong shadows or backlighting.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="text-[#007AFF] font-bold mb-2">02. Full Body Shot</div>
                      <p className="text-sm text-gray-400">For best fit, include your full body or at least from knees up.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="text-[#007AFF] font-bold mb-2">03. Clean Background</div>
                      <p className="text-sm text-gray-400">A plain background helps the AI distinguish you from the surroundings.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'caution' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white text-orange-500">Important Cautions</h3>
                  <ul className="space-y-4 list-disc pl-5 text-sm text-gray-400">
                    <li>Do not upload sensitive or explicit images.</li>
                    <li>Results are AI-generated and may not be 100% accurate to real-life fit.</li>
                    <li>Avoid wearing very loose clothing in your source photo for better body estimation.</li>
                    <li>Uploaded images are processed temporarily and deleted shortly after.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Common Questions</h3>
                  <div className="space-y-4">
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-bold text-white flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        Is this free? <span className="text-[#007AFF]">+</span>
                      </summary>
                      <p className="mt-2 text-xs text-gray-400 pl-3">
                        Yes, S_FIT AI offers free try-ons daily. Premium plans offer unlimited access.
                      </p>
                    </details>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-bold text-white flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        What formats are supported? <span className="text-[#007AFF]">+</span>
                      </summary>
                      <p className="mt-2 text-xs text-gray-400 pl-3">
                        We support JPG, PNG, and WEBP formats up to 5MB.
                      </p>
                    </details>
                  </div>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Report an Issue</h3>
                  <p className="text-xs text-gray-400">
                    Found a bug or have feedback? Let us know so we can improve S_FIT AI.
                  </p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center"
                    >
                      <span className="text-2xl block mb-2">✅</span>
                      <span className="font-bold">Thank You!</span>
                      <p className="text-xs mt-1">Your report has been submitted successfully.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitIssue} className="space-y-4">
                      <textarea
                        value={issueText}
                        onChange={(e) => setIssueText(e.target.value)}
                        placeholder="Describe the issue or feedback..."
                        className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#007AFF] transition-colors resize-none placeholder-gray-600"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                          isSubmitting
                            ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                            : 'bg-[#007AFF] hover:bg-[#005bb5] text-white shadow-[0_0_20px_rgba(0,122,255,0.3)]'
                        }`}
                      >
                        {isSubmitting ? 'SENDING...' : 'SEND REPORT'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">S_FIT AI v1.0.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
