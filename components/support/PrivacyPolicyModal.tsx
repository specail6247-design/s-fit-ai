import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-[#111] border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy & Terms</h2>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-sm text-gray-300">
              <section>
                <h3 className="text-white font-bold mb-2">1. Data Privacy & Security</h3>
                <p>
                  At S_FIT NEO, we take your privacy seriously. The photos you upload are processed securely in real-time.
                  We do not permanently store, sell, or share your personal images with third parties.
                  Once the virtual try-on session is complete, your uploaded photos and generated images are automatically deleted from our servers.
                </p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-2">2. Usage Terms</h3>
                <p>
                  By using this application, you agree to upload only images that you own or have explicit permission to use.
                  You may not use this service to generate harmful, offensive, or explicit content.
                </p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-2">3. AI Processing</h3>
                <p>
                  The images are processed using advanced AI models. While we strive for accuracy, the resulting try-on images are simulations and may not perfectly reflect real-world physical fit or appearance.
                </p>
              </section>
              <section>
                <h3 className="text-white font-bold mb-2">4. Data Safety Badge</h3>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg mt-2 border border-green-500/30">
                  <span className="text-green-500 text-2xl">🛡️</span>
                  <div>
                    <strong className="text-white block">Photos are processed securely and not shared.</strong>
                    <span className="text-xs">End-to-end encryption for your peace of mind.</span>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#007AFF] hover:bg-[#005bb5] text-white px-6 py-2 rounded-lg font-bold transition-colors"
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
