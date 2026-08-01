import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LegalModal({ isOpen, onClose, type }: { isOpen: boolean, onClose: () => void, type: 'privacy' | 'terms' | null }) {
  const content = {
    privacy: {
      title: "Privacy Policy",
      text: "Your privacy is our priority. We collect photos solely for the purpose of the virtual try-on experience. Photos are processed securely on our servers and are not shared with any third parties. They are deleted immediately after your session ends."
    },
    terms: {
      title: "Terms of Service",
      text: "By using S_FIT AI, you agree to use the service for personal, non-commercial purposes only. You must hold the rights to any photos you upload. We reserve the right to modify or terminate the service at any time without notice."
    }
  };

  return (
    <AnimatePresence>
      {isOpen && type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg bg-[#111] border border-white/20 rounded-2xl p-8 text-white relative shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              aria-label="Close Legal Modal"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-[#007AFF]">{content[type].title}</h2>
            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
              {content[type].text}
            </div>
            <div className="mt-8">
              <button
                onClick={onClose}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
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
