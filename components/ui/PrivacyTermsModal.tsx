import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function PrivacyTermsModal({ isOpen, onClose, type }: PrivacyTermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] flex flex-col bg-[#111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-4 font-mono leading-relaxed">
              {type === 'privacy' ? (
                <>
                  <h3 className="text-[#007AFF] font-bold text-base mb-2">1. Data Collection</h3>
                  <p>We collect only the photos you explicitly upload for the virtual try-on process. We do not secretly access your camera or photo library.</p>

                  <h3 className="text-[#007AFF] font-bold text-base mt-6 mb-2">2. Data Safety</h3>
                  <p>All photos are processed securely. The images you upload are sent directly to our secure AI processing servers and are immediately deleted after the resulting image is generated. We do not store, sell, or share your photos with third parties.</p>

                  <h3 className="text-[#007AFF] font-bold text-base mt-6 mb-2">3. Usage Analytics</h3>
                  <p>We collect anonymized usage data (such as which brands are clicked most often) to improve the application. This data contains no personally identifiable information.</p>

                  <h3 className="text-[#007AFF] font-bold text-base mt-6 mb-2">4. Contact</h3>
                  <p>If you have any questions about this privacy policy, please contact support via the Support Hub.</p>
                </>
              ) : (
                <>
                  <h3 className="text-[#007AFF] font-bold text-base mb-2">1. Acceptance of Terms</h3>
                  <p>By using S_FIT AI, you agree to these terms. If you do not agree, please do not use the application.</p>

                  <h3 className="text-[#007AFF] font-bold text-base mt-6 mb-2">2. User Content</h3>
                  <p>You retain all rights to the photos you upload. You are responsible for ensuring you have the right to use and upload any images submitted to the service.</p>

                  <h3 className="text-[#007AFF] font-bold text-base mt-6 mb-2">3. Acceptable Use</h3>
                  <p>You agree not to use the service for any illegal or unauthorized purpose. Do not upload inappropriate, explicit, or copyrighted materials that you do not own.</p>

                  <h3 className="text-[#007AFF] font-bold text-base mt-6 mb-2">4. Service Availability</h3>
                  <p>We strive to provide a highly available service, but we do not guarantee uninterrupted access. The AI models may occasionally be unavailable due to high demand.</p>
                </>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors text-sm"
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
