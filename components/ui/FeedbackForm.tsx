import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setDescription('');
      }, 2000);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-[#111] border border-white/10 hover:border-[#007AFF] text-xs text-gray-400 hover:text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2 shadow-lg"
      >
        <span>🐛</span> Report Issue
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-gray-400 text-sm">Your feedback helps us improve S_FIT NEO.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-white mb-6">Report an Issue</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#007AFF] uppercase">Issue Type</label>
                      <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors"
                      >
                        <option value="bug">🐛 Bug / Glitch</option>
                        <option value="fitting">👕 Fitting Result Issue</option>
                        <option value="ui">🎨 UI / Design Issue</option>
                        <option value="other">💡 Suggestion / Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#007AFF] uppercase">Description</label>
                      <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please describe what happened..."
                        className="w-full h-32 bg-black/40 border border-white/20 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !description.trim()}
                      className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2 mt-4"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">SUBMITTING...</span>
                      ) : (
                        "Submit Report"
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
