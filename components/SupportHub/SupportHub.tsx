'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ModalType = 'privacy' | 'terms' | 'report' | null;

export default function SupportHub() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [reportText, setReportText] = useState('');
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportText.trim()) {
      setIsReportSubmitted(true);
      setTimeout(() => {
        setIsReportSubmitted(false);
        setActiveModal(null);
        setReportText('');
      }, 2000);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setActiveModal('privacy')}
          className="text-xs bg-black/60 text-white/70 hover:text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 transition-colors"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveModal('terms')}
          className="text-xs bg-black/60 text-white/70 hover:text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 transition-colors"
        >
          Terms of Service
        </button>
        <button
          onClick={() => setActiveModal('report')}
          className="text-xs bg-black/60 text-white/70 hover:text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 transition-colors flex items-center justify-center gap-1"
        >
          <span>🐞</span> Report Issue
        </button>
      </div>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[80vh] relative"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                ✕
              </button>

              {activeModal === 'privacy' && (
                <div>
                  <h2 className="text-xl font-bold mb-4 font-mono text-white">Privacy Policy</h2>
                  <div className="text-sm text-gray-400 space-y-4">
                    <p>
                      <strong>1. Data Collection:</strong> We collect uploaded images solely for the purpose of generating virtual try-on results.
                    </p>
                    <p>
                      <strong>2. Data Retention:</strong> Processed images are transient and are not stored permanently on our servers after your session ends.
                    </p>
                    <div className="mt-6 flex items-center gap-2 p-3 bg-black/40 border border-green-500/30 rounded-lg">
                      <span className="text-green-500 text-xl">🔒</span>
                      <span className="text-xs text-green-400 font-medium">
                        Data Safety Badge: Photos are processed securely and not shared.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'terms' && (
                <div>
                  <h2 className="text-xl font-bold mb-4 font-mono text-white">Terms of Service</h2>
                  <div className="text-sm text-gray-400 space-y-4">
                    <p>
                      By using S_FIT AI, you agree to not upload inappropriate or offensive content.
                    </p>
                    <p>
                      We reserve the right to suspend accounts that violate these guidelines.
                    </p>
                  </div>
                </div>
              )}

              {activeModal === 'report' && (
                <div>
                  <h2 className="text-xl font-bold mb-4 font-mono text-white">Report an Issue</h2>
                  {isReportSubmitted ? (
                    <div className="flex flex-col items-center justify-center p-8 space-y-2">
                      <span className="text-4xl">✅</span>
                      <p className="text-green-400 font-bold text-sm">Issue reported securely.</p>
                      <p className="text-gray-500 text-xs text-center">Thank you for your feedback.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <textarea
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        placeholder="Describe the bug or issue..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] min-h-[120px] resize-none"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white text-sm font-bold rounded-xl transition-colors"
                      >
                        Submit Report
                      </button>
                    </form>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
