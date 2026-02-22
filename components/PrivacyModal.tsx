"use client";

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
            className="relative w-full max-w-2xl max-h-[80vh] bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#151515]">
              <h2 className="text-xl font-bold text-white tracking-tight">Legal & Privacy</h2>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 text-gray-300 text-sm leading-relaxed custom-scrollbar">
              <section>
                <h3 className="text-lg font-bold text-white mb-3">1. Privacy Policy</h3>
                <p>
                  At S_FIT AI, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                  <li><strong>Data Collection:</strong> We collect images you upload solely for the purpose of virtual try-on processing.</li>
                  <li><strong>Data Usage:</strong> Your photos are processed securely using our AI algorithms and are deleted from our processing servers after the session.</li>
                  <li><strong>No Sharing:</strong> We do not share, sell, or rent your personal data or photos to third parties.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-3">2. Terms of Service</h3>
                <p>
                  By using S_FIT AI, you agree to the following terms:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                  <li><strong>Usage:</strong> The service is provided &quot;as is&quot; for personal entertainment and fashion visualization.</li>
                  <li><strong>Content:</strong> You must own the rights to the photos you upload. Do not upload offensive or illegal content.</li>
                  <li><strong>Liability:</strong> S_FIT AI is not liable for any decisions made based on the virtual try-on results.</li>
                </ul>
              </section>

               <section>
                <h3 className="text-lg font-bold text-white mb-3">3. Data Safety</h3>
                 <div className="flex items-center gap-3 p-4 bg-[#0a0a0a] border border-green-500/20 rounded-xl">
                   <div className="text-2xl">🛡️</div>
                   <div>
                     <p className="text-green-400 font-bold text-xs uppercase tracking-wider">Secure Processing</p>
                     <p className="text-xs text-gray-500">All uploads are encrypted and processed in isolated environments.</p>
                   </div>
                 </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#151515] flex justify-end">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm"
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
