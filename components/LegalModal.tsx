'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function LegalModal() {
  const { isLegalModalOpen, setLegalModalOpen } = useStore();

  return (
    <AnimatePresence>
      {isLegalModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLegalModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111]">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Legal & Compliance</h2>
                <p className="text-xs text-gray-400 mt-1">S_FIT AI Platform Policies</p>
              </div>
              <button
                onClick={() => setLegalModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 text-gray-300 text-sm leading-relaxed">

              {/* Privacy Policy */}
              <section>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#007AFF]">lock</span>
                  Privacy Policy
                </h3>
                <div className="space-y-4">
                  <p>
                    <strong>1. Data Collection:</strong> We collect only the data necessary to provide our virtual fitting services, including user-uploaded photos and body measurements derived from them.
                  </p>
                  <p>
                    <strong>2. Image Processing:</strong> Your photos are processed securely using temporary instances. We do not store your original photos permanently unless you explicitly save them to your profile (The Vault).
                  </p>
                  <p>
                    <strong>3. Data Usage:</strong> We do not sell your personal data to third parties. Anonymized aggregation may be used for service improvement.
                  </p>
                </div>
              </section>

              <hr className="border-white/10" />

              {/* Terms of Service */}
              <section>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#007AFF]">gavel</span>
                  Terms of Service
                </h3>
                <div className="space-y-4">
                  <p>
                    <strong>1. Acceptable Use:</strong> You agree to use S_FIT AI only for lawful purposes. You must not upload content that is illegal, offensive, or infringes on others&apos; rights.
                  </p>
                  <p>
                    <strong>2. Service Availability:</strong> While we strive for 99.9% uptime, S_FIT AI is provided &quot;as is&quot; without warranties of any kind regarding reliability or availability.
                  </p>
                  <p>
                    <strong>3. User Content:</strong> You retain ownership of your content. By uploading, you grant us a limited license to process the content for the purpose of generating fitting results.
                  </p>
                </div>
              </section>

              <hr className="border-white/10" />

              {/* User Rights */}
              <section>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#007AFF]">shield_person</span>
                  Your Rights
                </h3>
                 <p>
                    You have the right to request deletion of your data at any time via the Support Hub.
                 </p>
              </section>

            </div>

            {/* Footer */}
            <div className="p-4 bg-[#111] border-t border-white/10 flex justify-end">
              <button
                onClick={() => setLegalModalOpen(false)}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#0062cc] text-white font-bold rounded-lg text-sm transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
