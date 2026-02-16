import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  LEGAL & COMPLIANCE
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`flex-1 py-4 text-sm font-bold tracking-wider uppercase transition-colors ${
                    activeTab === 'privacy'
                      ? 'bg-white/10 text-[#007AFF] border-b-2 border-[#007AFF]'
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`flex-1 py-4 text-sm font-bold tracking-wider uppercase transition-colors ${
                    activeTab === 'terms'
                      ? 'bg-white/10 text-[#007AFF] border-b-2 border-[#007AFF]'
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Terms of Service
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 overflow-y-auto custom-scrollbar text-gray-300 text-sm leading-relaxed space-y-4">
                {activeTab === 'privacy' ? (
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-white font-bold mb-2">1. Data Collection</h3>
                      <p>
                        We collect images you upload solely for the purpose of generating virtual try-on results.
                        Your biometric data is processed securely and is not used for any other purpose.
                      </p>
                    </section>
                    <section>
                      <h3 className="text-white font-bold mb-2">2. Data Retention</h3>
                      <p>
                        Uploaded images and generated results are stored temporarily on our secure servers.
                        We automatically delete all user data after 24 hours or immediately upon request.
                      </p>
                    </section>
                    <section>
                      <h3 className="text-white font-bold mb-2">3. Third-Party Sharing</h3>
                      <p>
                        We do not sell your personal data. We may use trusted third-party AI providers (e.g., Replicate)
                        to process your images, subject to strict confidentiality agreements.
                      </p>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
                      <p>
                        By using S_FIT AI, you agree to these Terms of Service. If you do not agree, please do not use our services.
                      </p>
                    </section>
                    <section>
                      <h3 className="text-white font-bold mb-2">2. User Conduct</h3>
                      <p>
                        You agree not to upload illegal, offensive, or infringing content. We reserve the right to ban users who violate these rules.
                      </p>
                    </section>
                    <section>
                      <h3 className="text-white font-bold mb-2">3. Limitation of Liability</h3>
                      <p>
                        The service is provided "as is". We are not liable for any damages arising from the use or inability to use our service.
                      </p>
                    </section>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-white/5 text-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#007AFF] hover:bg-[#0066cc] text-white font-bold rounded-lg transition-colors text-sm"
                >
                  I UNDERSTAND
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
