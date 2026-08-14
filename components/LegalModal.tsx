import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void, type: 'privacy' | 'terms' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-2xl relative flex flex-col max-h-[80vh]"
            initial={{ y: 20, scale: 0.9 }} animate={{ y: 0, scale: 1 }}>
            <div className="p-6 border-b border-white/10 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold">{type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="p-6 overflow-y-auto text-sm text-gray-300 space-y-4">
              {type === 'privacy' ? (
                <>
                  <h3 className="text-white font-bold">1. Data Safety & Processing</h3>
                  <p>Your photos are securely processed to generate virtual try-on results. We do not use your photos to train our public models, and they are not shared with unauthorized third parties.</p>

                  <h3 className="text-white font-bold">2. Data Retention</h3>
                  <p>Uploaded images are held temporarily for processing and are automatically deleted from our primary servers after your session ends or within 24 hours.</p>

                  <h3 className="text-white font-bold">3. Your Rights</h3>
                  <p>You have the right to request deletion of your account and any associated metadata. Contact our support team for any privacy-related requests.</p>
                </>
              ) : (
                <>
                  <h3 className="text-white font-bold">1. Acceptance of Terms</h3>
                  <p>By using S_FIT AI, you agree to these Terms of Service. You must be at least 13 years old to use this service.</p>

                  <h3 className="text-white font-bold">2. Acceptable Use</h3>
                  <p>You agree not to upload explicit, offensive, or illegal content. We reserve the right to ban users who violate these guidelines.</p>

                  <h3 className="text-white font-bold">3. Service Limitations</h3>
                  <p>S_FIT AI provides a virtual try-on simulation. We do not guarantee 100% accuracy of fit or color.</p>
                </>
              )}
            </div>

            <div className="p-4 border-t border-white/10 shrink-0">
               <button onClick={onClose} className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                 I Understand
               </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
