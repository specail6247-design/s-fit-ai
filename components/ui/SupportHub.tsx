import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { LegalModal } from './LegalModal';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [reportIssueMode, setReportIssueMode] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    setIssueSubmitted(true);
    setTimeout(() => {
      setIssueSubmitted(false);
      setReportIssueMode(false);
      setIssueText('');
    }, 2000);
  };

  return (
    <>
      <BottomSheet isOpen={isOpen} onClose={onClose} title="Support Hub">
        <div className="space-y-6 text-white pb-8">

          <AnimatePresence mode="wait">
            {!reportIssueMode ? (
              <motion.div
                key="menu"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => setReportIssueMode(true)}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#007AFF]">bug_report</span>
                      <span className="text-sm font-bold">Report an Issue</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                  </button>

                  <button
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-between transition-colors"
                    onClick={() => {
                      // Dummy action for opening guide
                      alert('User Guide / FAQ would open here.');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#007AFF]">help</span>
                      <span className="text-sm font-bold">User Guide & FAQ</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                  </button>
                </div>

                {/* Legal & Compliance */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Legal & Compliance</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setLegalModalType('privacy')}
                      className="p-3 rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 text-xs text-gray-300 transition-colors"
                    >
                      Privacy Policy
                    </button>
                    <button
                      onClick={() => setLegalModalType('terms')}
                      className="p-3 rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 text-xs text-gray-300 transition-colors"
                    >
                      Terms of Service
                    </button>
                  </div>
                </div>

                {/* Cautions */}
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/80">
                  <h4 className="text-xs font-bold mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    Lighting & Camera
                  </h4>
                  <p className="text-[10px] leading-relaxed">
                    For best results, ensure you are in a well-lit area and standing straight against a plain background. Avoid baggy clothing in your base photo.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="report"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <button
                  onClick={() => setReportIssueMode(false)}
                  className="mb-4 text-xs text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Back to Hub
                </button>

                {issueSubmitted ? (
                  <div className="p-6 text-center border border-green-500/30 bg-green-500/10 rounded-xl text-green-400">
                    <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                    <p className="text-sm font-bold">Issue Reported Successfully</p>
                    <p className="text-xs mt-1 opacity-80">Thank you for your feedback!</p>
                  </div>
                ) : (
                  <form onSubmit={handleIssueSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 block mb-2">Describe the issue</label>
                      <textarea
                        className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF]"
                        placeholder="What went wrong?"
                        value={issueText}
                        onChange={(e) => setIssueText(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#007AFF] text-white font-bold rounded-xl hover:bg-[#005bb5] transition-colors shadow-lg"
                    >
                      Submit Report
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BottomSheet>

      <LegalModal
        isOpen={!!legalModalType}
        onClose={() => setLegalModalType(null)}
        type={legalModalType}
      />
    </>
  );
};
