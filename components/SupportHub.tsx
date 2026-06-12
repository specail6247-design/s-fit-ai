"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIssueSubmitted(true);
    setTimeout(() => setIssueSubmitted(false), 3000);
  };

  return (
    <>
      {/* Floating Support Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black/80 hover:bg-[#007AFF] text-white p-4 rounded-full shadow-2xl border border-white/20 transition-colors backdrop-blur-md"
        aria-label="Support Hub"
      >
        <span className="text-xl">💬</span>
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#111] z-50 border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close Support Hub"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-8">
                {/* Report Issue Form */}
                <section>
                  <h3 className="text-sm font-bold text-[#007AFF] mb-4 uppercase">Report an Issue</h3>
                  <form onSubmit={handleIssueSubmit} className="space-y-4">
                    <textarea
                      placeholder="Describe the bug or issue..."
                      className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] resize-none h-24"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-white/10 hover:bg-[#007AFF] text-white text-sm font-bold rounded-xl transition-colors border border-white/10"
                    >
                      {issueSubmitted ? '✓ Submitted' : 'Submit Report'}
                    </button>
                  </form>
                </section>

                {/* Legal & Compliance */}
                <section>
                  <h3 className="text-sm font-bold text-[#007AFF] mb-4 uppercase">Legal & Compliance</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setModalContent('privacy')}
                      className="w-full text-left py-3 px-4 bg-black/40 border border-white/20 rounded-xl text-sm hover:border-white/50 transition-colors flex justify-between items-center"
                    >
                      <span>Privacy Policy</span>
                      <span className="text-gray-500">→</span>
                    </button>
                    <button
                      onClick={() => setModalContent('terms')}
                      className="w-full text-left py-3 px-4 bg-black/40 border border-white/20 rounded-xl text-sm hover:border-white/50 transition-colors flex justify-between items-center"
                    >
                      <span>Terms of Service</span>
                      <span className="text-gray-500">→</span>
                    </button>
                  </div>
                </section>

                {/* User Guide & FAQ placeholders (as per memory) */}
                <section>
                  <h3 className="text-sm font-bold text-[#007AFF] mb-4 uppercase">Help & Resources</h3>
                  <div className="space-y-3">
                    <div className="w-full py-3 px-4 bg-black/40 border border-white/10 rounded-xl text-sm text-gray-400">
                      User Guide Carousel (Coming Soon)
                    </div>
                    <div className="w-full py-3 px-4 bg-black/40 border border-white/10 rounded-xl text-sm text-gray-400">
                      FAQ Accordion (Coming Soon)
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals for Privacy & Terms */}
      <AnimatePresence>
        {modalContent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalContent(null)}
              className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#111] border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl relative"
              >
                <button
                  onClick={() => setModalContent(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white"
                  aria-label="Close Modal"
                >
                  ✕
                </button>
                <h2 className="text-2xl font-bold mb-6">
                  {modalContent === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h2>
                <div className="flex-1 overflow-y-auto pr-4 space-y-4 text-sm text-gray-300 leading-relaxed">
                  {modalContent === 'privacy' ? (
                    <>
                      <p><strong>1. Data Collection:</strong> We collect only the photos you explicitly upload for the purpose of virtual fitting. We do not use these photos for any other purpose.</p>
                      <p><strong>2. Data Safety:</strong> Your photos are processed securely and are not shared with third parties. All processing is done via secure API endpoints.</p>
                      <p><strong>3. Retention:</strong> Uploaded images are temporarily stored during the session and are deleted from our servers immediately after the fitting result is generated.</p>
                      <p><strong>4. User Rights:</strong> You have the right to request deletion of any of your data at any time by contacting our support team.</p>
                    </>
                  ) : (
                    <>
                      <p><strong>1. Usage:</strong> S_FIT AI provides a virtual fitting room experience. You agree to use this service for lawful purposes only.</p>
                      <p><strong>2. Intellectual Property:</strong> The generated images and platform content are protected by copyright. You may share generated images for personal, non-commercial use.</p>
                      <p><strong>3. Liability:</strong> We strive for accuracy, but the AI-generated fittings are approximations and may not reflect the exact real-world fit.</p>
                      <p><strong>4. Modifications:</strong> We reserve the right to update these terms at any time. Continued use of the app constitutes acceptance of the new terms.</p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
