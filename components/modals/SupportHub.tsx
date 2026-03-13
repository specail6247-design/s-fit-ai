import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [issueType, setIssueType] = useState('bug');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setSubmitted(false);
          setDescription('');
        }, 500);
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-[#111] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Support Hub</h2>
                <p className="text-xs text-gray-400 mt-1">Help & Feedback</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

              {/* Guides */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">Best Results Guide</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center space-y-2">
                    <div className="text-2xl">💡</div>
                    <div className="text-sm font-bold text-white">Lighting</div>
                    <div className="text-xs text-gray-400">Use well-lit, frontal photos without harsh shadows.</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center space-y-2">
                    <div className="text-2xl">🧍</div>
                    <div className="text-sm font-bold text-white">Pose</div>
                    <div className="text-xs text-gray-400">Stand straight facing the camera, hands visible.</div>
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">Common Questions</h3>
                <div className="space-y-2">
                  <details className="bg-white/5 border border-white/10 rounded-lg group">
                    <summary className="p-4 cursor-pointer text-sm font-bold text-white group-open:border-b group-open:border-white/10">
                      Why does my result look distorted?
                    </summary>
                    <div className="p-4 text-xs text-gray-400">
                      This usually happens if the user photo is taken from a low/high angle, or if baggy clothing in the original photo confuses the AI body mapping. Try wearing form-fitting clothes in your base photo.
                    </div>
                  </details>
                  <details className="bg-white/5 border border-white/10 rounded-lg group">
                    <summary className="p-4 cursor-pointer text-sm font-bold text-white group-open:border-b group-open:border-white/10">
                      Is my data safe?
                    </summary>
                    <div className="p-4 text-xs text-gray-400">
                      Yes. Your photos are securely processed to generate the try-on result and are never shared, sold, or permanently stored.
                    </div>
                  </details>
                </div>
              </section>

              {/* Feedback Form */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-[#007AFF] uppercase tracking-wider">Report an Issue</h3>

                {submitted ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center space-y-2">
                    <div className="text-3xl">✅</div>
                    <div className="text-sm font-bold text-green-400">Report Submitted</div>
                    <div className="text-xs text-gray-400">Thank you for helping us improve S_FIT NEO.</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400">Issue Type</label>
                      <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none"
                      >
                        <option value="bug">Technical Bug / Crash</option>
                        <option value="quality">Poor Try-On Quality</option>
                        <option value="feature">Feature Request</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-400">Description</label>
                      <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please describe what went wrong..."
                        className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none min-h-[100px] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !description.trim()}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-colors flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Submit Report"
                      )}
                    </button>
                  </form>
                )}
              </section>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
