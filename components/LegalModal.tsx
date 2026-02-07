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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto max-w-2xl h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-colors ${
                    activeTab === 'privacy'
                      ? 'text-white border-[#007AFF]'
                      : 'text-gray-500 border-transparent hover:text-gray-300'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-colors ${
                    activeTab === 'terms'
                      ? 'text-white border-[#007AFF]'
                      : 'text-gray-500 border-transparent hover:text-gray-300'
                  }`}
                >
                  Terms of Service
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 text-gray-300 text-sm leading-relaxed">
              {activeTab === 'privacy' ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">Privacy Policy</h3>
                  <p>Last updated: October 2023</p>
                  <p>
                    Your privacy is important to us. It is S_FIT AI&apos;s policy to respect your privacy regarding any information we may collect from you across our website.
                  </p>
                  <h4 className="font-bold text-white mt-4">1. Information We Collect</h4>
                  <p>
                    We collect user-uploaded photos solely for the purpose of generating virtual try-on results. These photos are processed securely and are not stored permanently on our servers after the session ends.
                  </p>
                  <h4 className="font-bold text-white mt-4">2. Data Security</h4>
                  <p>
                    We use commercially acceptable means to protect your personal information to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.
                  </p>
                  <h4 className="font-bold text-white mt-4">3. Third-Party Services</h4>
                  <p>
                    Our application may use third-party services (e.g., AI processing APIs) which have their own privacy policies. We encourage you to review them.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">Terms of Service</h3>
                  <p>
                    By accessing or using S_FIT AI, you agree to be bound by these terms of service and all applicable laws and regulations.
                  </p>
                  <h4 className="font-bold text-white mt-4">1. Use License</h4>
                  <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on S_FIT AI&apos;s website for personal, non-commercial transitory viewing only.
                  </p>
                  <h4 className="font-bold text-white mt-4">2. Disclaimer</h4>
                  <p>
                    The materials on S_FIT AI&apos;s website are provided on an &apos;as is&apos; basis. S_FIT AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                  <h4 className="font-bold text-white mt-4">3. Limitations</h4>
                  <p>
                    In no event shall S_FIT AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on S_FIT AI&apos;s website.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 text-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-colors w-full sm:w-auto"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
