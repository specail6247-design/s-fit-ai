import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyTermsModal({ isOpen, onClose }: PrivacyTermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <h2 className="text-xl font-bold tracking-tight">Privacy Policy & Terms</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-gray-300">
              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white">1. Data Collection & Processing</h3>
                <p>
                  S_FIT AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. When you use our virtual try-on service, the photos you upload are processed securely in real-time.
                </p>
                <p className="text-[#007AFF] font-medium">
                  We do not permanently store, share, or sell your personal photos. Uploaded images are immediately deleted from our servers after the try-on result is generated.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white">2. Usage of AI Models</h3>
                <p>
                  Our service utilizes advanced AI models (including Replicate and internal APIs) to generate your virtual fitting results. By using this service, you consent to the temporary processing of your images by these secure third-party infrastructure providers strictly for the purpose of fulfilling your request.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white">3. User Conduct & Terms of Service</h3>
                <p>
                  You agree to only upload images for which you have the legal right or permission to use. Uploading inappropriate, explicit, or copyrighted material without consent is strictly prohibited and may result in the termination of your access to S_FIT AI.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-lg font-bold text-white">4. Limitations of Liability</h3>
                <p>
                  The virtual fitting results are AI-generated approximations and may not perfectly reflect real-world fit, texture, or color. We provide this service &quot;as is&quot; without warranties of any kind.
                </p>
              </section>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
