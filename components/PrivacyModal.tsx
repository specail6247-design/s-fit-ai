'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function PrivacyModal() {
  const { isPrivacyOpen, setPrivacyOpen } = useStore();

  return (
    <AnimatePresence>
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPrivacyOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Legal & Privacy
              </h2>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto space-y-8 text-gray-300 text-sm leading-relaxed custom-scrollbar">
              <section>
                <h3 className="text-lg font-bold text-white mb-3">Privacy Policy</h3>
                <p className="mb-2">
                  At S_FIT AI, we prioritize your privacy. We collect only the data necessary to provide our virtual fitting service.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  <li><strong>Image Processing:</strong> Your photos are processed securely and are not permanently stored on our servers without your explicit consent (e.g., saving to Vault).</li>
                  <li><strong>Data Usage:</strong> We do not sell your personal data to third parties.</li>
                  <li><strong>Cookies:</strong> We use essential cookies to maintain your session and preferences.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-3">Terms of Service</h3>
                <p className="mb-2">
                  By using S_FIT AI, you agree to our Terms of Service.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  <li><strong>Usage:</strong> The service is provided &quot;as is&quot; for personal, non-commercial use.</li>
                  <li><strong>Content:</strong> You retain ownership of the photos you upload.</li>
                  <li><strong>Limitations:</strong> We are not liable for any inaccuracies in the virtual fitting results.</li>
                </ul>
              </section>

              <div className="bg-[#007AFF]/10 border border-[#007AFF]/20 p-4 rounded-xl">
                 <h4 className="font-bold text-[#007AFF] mb-1">Data Safety Commitment</h4>
                 <p className="text-xs text-[#007AFF]/80">
                   All uploaded images are processed in ephemeral containers and deleted after the session ends, unless explicitly saved by the user.
                 </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
