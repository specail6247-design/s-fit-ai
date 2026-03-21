import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PrivacyTermsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-2xl max-h-[80vh] bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <h2 className="text-xl font-bold text-white tracking-wide">Legal & Compliance</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-6">
              <section>
                <h3 className="text-lg font-semibold text-white mb-2">Privacy Policy</h3>
                <p className="mb-2">Your privacy is important to us. We collect, process, and protect your data carefully.</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  <li>Photos are processed securely and not shared with third parties.</li>
                  <li>We only retain data necessary for the virtual try-on experience.</li>
                  <li>You can request data deletion at any time.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">Terms of Service</h3>
                <p className="mb-2">By using S_FIT, you agree to these terms:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  <li>The app is for personal, non-commercial use.</li>
                  <li>Do not upload inappropriate or copyrighted images.</li>
                  <li>We are not responsible for exact fit inaccuracies.</li>
                </ul>
              </section>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg font-medium transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
