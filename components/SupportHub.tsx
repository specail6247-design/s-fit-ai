import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    setIsSubmitting(true);

    // Mock submission API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Thank you for your report! Our team will review it shortly.');
      setSubject('');
      setDescription('');

      // Auto close after success
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#007AFF]/20 to-transparent">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛠️</span>
                <h2 className="text-xl font-bold tracking-tight text-white">Support Hub</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {successMessage ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center"
                >
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">{successMessage}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#007AFF] uppercase tracking-widest">
                      Report Issue / Feedback
                    </label>
                    <p className="text-xs text-gray-500">
                      Help us improve S_FIT NEO. Let us know if you found a bug or have a suggestion.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-gray-400 mb-1">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., Image upload failed"
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#007AFF] focus:outline-none transition-colors placeholder:text-gray-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-xs font-bold text-gray-400 mb-1">Description</label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please describe what happened..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm h-32 resize-none focus:border-[#007AFF] focus:outline-none transition-colors placeholder:text-gray-600"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.2)] transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Submit Report</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
