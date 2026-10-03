import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [reportIssue, setReportIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'support' | 'legal'>('support');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportIssue.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setReportIssue('');
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center items-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-md bg-void-black border border-white/20 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl relative"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white p-2 z-10 bg-black/50 rounded-full"
          >
            ✕
          </button>
          <div className="p-6 border-b border-white/10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-50"></div>
            <h2 className="text-xl font-bold text-white relative z-10 flex justify-center items-center gap-2">
              <span>S_FIT HUB</span>
            </h2>
          </div>
          <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('support')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'support' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-gray-500 hover:text-white'}`}
              >
                  Support
              </button>
              <button
                 onClick={() => setActiveTab('legal')}
                 className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'legal' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-gray-500 hover:text-white'}`}
              >
                  Legal & Trust
              </button>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {activeTab === 'support' && (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Report an Issue</h3>
                        <p className="text-xs text-gray-400 mb-4">Help us improve the fitting experience.</p>
                        {submitted ? (
                            <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl text-center text-sm">
                                Thank you! Your feedback has been received.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={reportIssue}
                                    onChange={(e) => setReportIssue(e.target.value)}
                                    placeholder="Describe the issue (e.g., 'The AR tracking failed on my device')"
                                    className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyber-lime mb-3 min-h-[100px] resize-none"
                                    required
                                />
                                <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors">
                                    Submit Report
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
            {activeTab === 'legal' && (
                <div className="space-y-6">
                    <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex items-start gap-4">
                        <div className="text-2xl mt-1">🛡️</div>
                        <div>
                            <h4 className="text-sm font-bold text-blue-400 mb-1">Data Safety Guarantee</h4>
                            <p className="text-xs text-gray-400">Photos are processed securely and not shared. We use local device processing where possible and ephemeral server processing for complex models.</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">Policies</h3>
                        <div className="space-y-2">
                            <details className="group bg-white/5 border border-white/10 rounded-lg">
                                <summary className="p-3 text-sm font-medium cursor-pointer flex justify-between items-center text-gray-300 group-hover:text-white">
                                    Privacy Policy
                                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="p-3 pt-0 text-xs text-gray-400 border-t border-white/5 mt-2 h-32 overflow-y-auto">
                                    <strong>Last Updated: Oct 2026</strong><br/><br/>
                                    1. <strong>Information Collection:</strong> We collect uploaded images temporarily solely for the purpose of generating virtual try-on results.<br/>
                                    2. <strong>Data Security:</strong> Your images are processed using industry-standard encryption. Images sent to our backend are deleted immediately after processing.<br/>
                                    3. <strong>Third Parties:</strong> We do not sell your data. We use trusted API partners (like Replicate/Fashn) who comply with strict data deletion policies.
                                </div>
                            </details>
                            <details className="group bg-white/5 border border-white/10 rounded-lg">
                                <summary className="p-3 text-sm font-medium cursor-pointer flex justify-between items-center text-gray-300 group-hover:text-white">
                                    Terms of Service
                                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="p-3 pt-0 text-xs text-gray-400 border-t border-white/5 mt-2 h-32 overflow-y-auto">
                                    <strong>Last Updated: Oct 2026</strong><br/><br/>
                                    1. <strong>Usage:</strong> S_FIT AI is provided &quot;as is&quot;. You agree not to misuse the service or upload inappropriate content.<br/>
                                    2. <strong>AI Results:</strong> The virtual try-on results are estimations and may not perfectly reflect real-life fit.<br/>
                                    3. <strong>Subscriptions:</strong> Premium subscriptions are billed monthly. You can cancel anytime.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
