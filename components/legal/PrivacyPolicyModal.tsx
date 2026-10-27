import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-10">
              <h2 className="text-xl font-bold text-white tracking-wide">Privacy Policy & Terms</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar text-sm text-gray-300 space-y-6">
              <section>
                <h3 className="text-white font-semibold text-base mb-2">1. Data Safety & Photo Processing</h3>
                <p>
                  At S_FIT AI, your privacy is our top priority. The photos you upload for the virtual try-on experience are processed securely using our proprietary AI algorithms. We explicitly state that:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Photos are processed securely and not shared with any third parties.</li>
                  <li>Uploaded images are used solely for generating the virtual fitting result.</li>
                  <li>All processing happens in isolated environments.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold text-base mb-2">2. Data Retention</h3>
                <p>
                  We do not store your original photos or the generated results beyond the active session unless you explicitly choose to save or share them. Once your session ends, the temporary data is securely wiped from our servers.
                </p>
              </section>

              <section>
                <h3 className="text-white font-semibold text-base mb-2">3. Terms of Service</h3>
                <p>
                  By using S_FIT AI, you agree to our terms. You must be at least 13 years old to use this service. The virtual try-on results are for personal visualization purposes. Commercial use of the generated imagery without explicit permission is prohibited.
                </p>
              </section>

              <section>
                <h3 className="text-white font-semibold text-base mb-2">4. User Responsibilities</h3>
                <p>
                  You agree not to upload inappropriate, offensive, or copyrighted materials. We reserve the right to terminate access for users who violate these guidelines.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#050505] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-semibold rounded-lg transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
