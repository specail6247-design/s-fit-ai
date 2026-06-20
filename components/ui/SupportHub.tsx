import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LegalModal } from './LegalModal';

export const SupportHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLegal, setShowLegal] = useState<'privacy' | 'terms' | null>(null);
  const [issueReported, setIssueReported] = useState(false);

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIssueReported(true);
      setTimeout(() => setIssueReported(false), 3000);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-[#101622]/80 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors shadow-lg"
      >
        <span className="material-symbols-outlined">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-[#101622] border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Report Issue Form */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">bug_report</span>
                    Report Issue
                  </h3>
                  {issueReported ? (
                    <div className="text-sm text-green-400 flex items-center gap-2 p-2 bg-green-400/10 rounded-lg">
                      <span className="material-symbols-outlined">check_circle</span>
                      Thanks! We&apos;ll look into it.
                    </div>
                  ) : (
                    <form onSubmit={handleReportIssue} className="space-y-3">
                      <textarea
                        required
                        placeholder="Describe what went wrong..."
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#256af4] resize-none h-24"
                      />
                      <button
                        type="submit"
                        className="w-full py-2 bg-[#256af4] text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Submit Report
                      </button>
                    </form>
                  )}
                </div>

                {/* Legal Links */}
                <div className="space-y-2">
                  <button
                    onClick={() => setShowLegal('privacy')}
                    className="w-full text-left p-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
                  >
                    Privacy Policy
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                  <button
                    onClick={() => setShowLegal('terms')}
                    className="w-full text-left p-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
                  >
                    Terms of Service
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LegalModal
        isOpen={!!showLegal}
        onClose={() => setShowLegal(null)}
        type={showLegal || 'privacy'}
      />
    </>
  );
};
