import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally this would send to an API. We simulate it.
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDescription('');
        onClose();
      }, 2000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
              <h2 className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
                <span>🔧</span> Support Hub
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-[#007AFF]/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl text-[#007AFF]">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Report Submitted</h3>
                    <p className="text-sm text-gray-400 mt-2">Thank you for catching this! Our team will investigate.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-sm text-gray-300">
                    Found a bug or need help? Send us a quick report so we can improve S_FIT NEO.
                  </p>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#007AFF] uppercase">Issue Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['bug', 'feature_request'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setIssueType(type)}
                          className={`py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                            issueType === type
                              ? 'bg-[#007AFF]/20 border-[#007AFF] text-white'
                              : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'
                          }`}
                        >
                          {type === 'bug' ? '🐛 Bug Report' : '💡 Idea'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#007AFF] uppercase">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="What happened? Or what would you like to see?"
                      className="w-full h-32 bg-black/40 border border-white/20 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!description.trim()}
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Submit Report
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
