import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: 'privacy' | 'terms' }) {
  if (!isOpen) return null;

  const content = type === 'privacy' ? (
    <>
      <h3 className="text-xl font-bold mb-4">Privacy Policy</h3>
      <div className="space-y-4 text-sm text-soft-gray overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
        <p><strong>1. Data Collection:</strong> We collect only the information necessary to provide you with the best virtual try-on experience. This includes uploaded photos and body measurements you provide.</p>
        <p><strong>2. Photo Processing:</strong> <span className="text-cyber-lime">Photos are processed securely and not shared.</span> All processing happens ephemerally, and your photos are deleted from our active servers immediately after the fitting result is generated unless you explicitly save them to your account.</p>
        <p><strong>3. Third-Party Services:</strong> We use industry-leading AI models (like Replicate and Runway) to process images. Data sent to these services is anonymized where possible and strictly governed by our security agreements.</p>
        <p><strong>4. Your Rights:</strong> You have the right to request deletion of your account and all associated data at any time through the settings menu.</p>
      </div>
    </>
  ) : (
    <>
      <h3 className="text-xl font-bold mb-4">Terms of Service</h3>
      <div className="space-y-4 text-sm text-soft-gray overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
        <p><strong>1. Acceptance:</strong> By using S_FIT AI, you agree to these terms. If you disagree, please do not use the service.</p>
        <p><strong>2. Usage Limits:</strong> Free tier users are limited to 5 virtual try-ons per day. Premium users enjoy unlimited access.</p>
        <p><strong>3. Content Ownership:</strong> You retain ownership of the photos you upload. You grant us a temporary license to process them solely for generating your virtual fitting results.</p>
        <p><strong>4. Prohibited Content:</strong> Uploading explicit, offensive, or copyrighted material without permission is strictly prohibited and will result in account termination.</p>
      </div>
    </>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-[#111] border border-white/10 p-6 rounded-2xl max-w-md w-full shadow-2xl"
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors text-xl">✕</button>

          <div className="mb-6">
            {content}
          </div>

          {type === 'privacy' && (
            <div className="mt-4 p-3 bg-cyber-lime/10 border border-cyber-lime/30 rounded-lg flex items-start gap-3">
              <span className="text-xl">🛡️</span>
              <div>
                <p className="text-xs font-bold text-cyber-lime">Data Safety Guarantee</p>
                <p className="text-[10px] text-soft-gray mt-1">Photos are processed securely and not shared. We value your privacy above all.</p>
              </div>
            </div>
          )}

          <div className="mt-6 border-t border-white/10 pt-4">
            <button onClick={onClose} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-colors border border-white/10">
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
