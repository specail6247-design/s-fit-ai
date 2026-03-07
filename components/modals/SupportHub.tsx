'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SupportHub() {
  const { isSupportHubOpen, setSupportHubOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'report'>('guide');
  const [reportIssue, setReportIssue] = useState('');
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);

  if (!isSupportHubOpen) return null;

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportIssue.trim()) {
      setIsReportSubmitted(true);
      setTimeout(() => {
        setIsReportSubmitted(false);
        setReportIssue('');
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setSupportHubOpen(false)}
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/50">
            <div>
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span className="text-[#007AFF]">S_FIT</span> SUPPORT HUB
              </h2>
              <p className="text-xs text-gray-400 mt-1 tracking-wider uppercase">How can we help you?</p>
            </div>
            <button
              onClick={() => setSupportHubOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex px-4 pt-4 border-b border-white/10 gap-2 overflow-x-auto custom-scrollbar">
            {[
              { id: 'guide', label: 'Guide & Tips' },
              { id: 'faq', label: 'FAQ' },
              { id: 'report', label: 'Report Issue' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'guide' | 'faq' | 'report')}
                className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors whitespace-nowrap rounded-t-lg ${
                  activeTab === tab.id
                    ? 'text-[#007AFF] bg-[#007AFF]/10 border-b-2 border-[#007AFF]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-300 custom-scrollbar">
            {activeTab === 'guide' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-white font-bold mb-4 text-base tracking-wider uppercase">Photo Guidelines</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center space-y-3">
                      <div className="text-3xl text-[#007AFF]">💡</div>
                      <div>
                        <div className="text-white font-bold text-xs mb-1">Good Lighting</div>
                        <div className="text-xs text-gray-500">Ensure subject is well lit, avoid strong shadows.</div>
                      </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center space-y-3">
                      <div className="text-3xl text-[#007AFF]">🧍</div>
                      <div>
                        <div className="text-white font-bold text-xs mb-1">Full View</div>
                        <div className="text-xs text-gray-500">Keep entire body or upper body in frame.</div>
                      </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center space-y-3">
                      <div className="text-3xl text-red-500">🚫</div>
                      <div>
                        <div className="text-white font-bold text-xs mb-1">No Obstructions</div>
                        <div className="text-xs text-gray-500">Avoid items blocking the body (bags, hands).</div>
                      </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center space-y-3">
                      <div className="text-3xl text-red-500">👕</div>
                      <div>
                        <div className="text-white font-bold text-xs mb-1">Tight Clothing</div>
                        <div className="text-xs text-gray-500">Baggy clothes reduce fitting accuracy.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#007AFF]/10 border border-[#007AFF]/20 rounded-xl p-5">
                  <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span>⚡️</span> Pro Tip
                  </h3>
                  <p className="text-xs text-[#007AFF]/80 leading-relaxed">
                    For the best &quot;Digital Twin&quot; experience, use a neutral background and strike a simple A-pose. The AI analyzes your posture for precise clothing draping.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'faq' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {[
                  {
                    q: "How long does the virtual try-on take?",
                    a: "Most generations complete in under 10 seconds. Highly complex garments or luxury shaders may take up to 15 seconds."
                  },
                  {
                    q: "Is my photo saved?",
                    a: "No. Your photos are temporarily processed in memory and immediately discarded. See our Privacy Policy for more details."
                  },
                  {
                    q: "Why did the AI warp my background?",
                    a: "The AI focuses on integrating the garment perfectly onto your body. Complex backgrounds might slightly warp during this blending process. Using a solid background helps."
                  },
                  {
                    q: "Can I try on pants or shoes?",
                    a: "Currently, our S_FIT NEO engine focuses on upper-body garments (tops, jackets, dresses). Lower body support is coming in Phase 4."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <h4 className="text-white font-bold text-sm mb-2">{faq.q}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'report' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-6">
                  <h3 className="text-white font-bold text-sm mb-2">Help Us Improve</h3>
                  <p className="text-xs text-gray-400">Encountered a bug or a weird fitting result? Let our engineering team know.</p>
                </div>

                {isReportSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center"
                  >
                    <div className="text-4xl mb-3">✅</div>
                    <div className="text-white font-bold text-sm mb-1">Report Received</div>
                    <div className="text-xs text-green-500/80">Thank you! Our team will investigate shortly.</div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleReportSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Issue Description</label>
                      <textarea
                        value={reportIssue}
                        onChange={(e) => setReportIssue(e.target.value)}
                        placeholder="Please describe what went wrong..."
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] resize-none transition-colors"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!reportIssue.trim()}
                      className="w-full py-3 bg-white hover:bg-gray-200 text-black font-bold text-sm rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Report
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
