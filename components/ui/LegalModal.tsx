import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const LegalModal: React.FC = () => {
  const { isLegalModalOpen, toggleLegalModal } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  if (!isLegalModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={() => toggleLegalModal(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-white/5 to-transparent">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Legal & Compliance</h2>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">S_FIT AI Protocol</p>
            </div>
            <button
              onClick={() => toggleLegalModal(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-white/5 text-[#007AFF] border-b-2 border-[#007AFF]'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'terms'
                  ? 'bg-white/5 text-[#007AFF] border-b-2 border-[#007AFF]'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              Terms of Service
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {activeTab === 'privacy' && (
              <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
                <section>
                  <h3 className="text-white font-bold mb-2">1. Data Collection & Usage</h3>
                  <p>
                    S_FIT AI collects user-uploaded photos solely for the purpose of generating virtual try-on visualizations.
                    Images are processed in real-time and are <strong>not permanently stored</strong> on our servers.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">2. Image Processing</h3>
                  <p>
                    We utilize advanced AI algorithms to analyze body pose and garment structure.
                    All biometric data (pose estimation, body segmentation) is transient and discarded immediately after the session ends.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">3. Third-Party Services</h3>
                  <p>
                    This service may utilize third-party GPU providers for accelerated inference.
                    Data transmitted to these providers is encrypted and strictly limited to the duration of the request.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">4. User Rights</h3>
                  <p>
                    You retain full ownership of your uploaded content. You may request deletion of any temporary session data at any time by clearing your browser cache or resetting the session.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
                <section>
                  <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using S_FIT AI, you agree to be bound by these Terms of Service.
                    If you do not agree, please discontinue use immediately.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">2. Usage License</h3>
                  <p>
                    We grant you a limited, non-exclusive, non-transferable license to use the application for personal, non-commercial purposes.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">3. Prohibited Conduct</h3>
                  <p>
                    You agree not to upload explicit, illegal, or offensive content.
                    We reserve the right to block access to any user violating these guidelines.
                  </p>
                </section>
                <section>
                  <h3 className="text-white font-bold mb-2">4. Disclaimer</h3>
                  <p>
                    The virtual try-on results are AI-generated simulations and may not perfectly reflect real-world fit or fabric physics.
                    S_FIT AI is provided &quot;as is&quot; without warranties of any kind.
                  </p>
                </section>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-black/40 text-center">
            <button
              onClick={() => toggleLegalModal(false)}
              className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-sm uppercase tracking-wide"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
