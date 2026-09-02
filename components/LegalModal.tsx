import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LegalModal({ isOpen, onClose }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#111] border border-white/20 p-6 rounded-2xl max-w-lg w-full text-white shadow-2xl overflow-y-auto max-h-[80vh]"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-[#007AFF]">Privacy Policy &amp; Terms</h2>
            <div className="space-y-4 text-sm text-gray-300">
              <p>
                <strong>1. Data Collection:</strong> We collect only the necessary data to provide our virtual try-on services, including photos and measurements.
              </p>
              <p>
                <strong>2. Data Usage:</strong> Your photos are processed securely and are never shared with third parties without your explicit consent.
              </p>
              <p>
                <strong>3. Terms of Service:</strong> By using S_FIT, you agree to our terms. We reserve the right to update these terms at any time.
              </p>
              <p>
                <strong>4. User Rights:</strong> You can request the deletion of your data at any time through the support hub.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-[#007AFF] hover:bg-blue-600 rounded-xl font-bold transition-colors"
            >
              I Understand
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
