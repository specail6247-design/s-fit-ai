'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function PrivacyModal() {
  const isPrivacyOpen = useStore((state) => state.isPrivacyOpen);
  const setPrivacyOpen = useStore((state) => state.setPrivacyOpen);

  const handleClose = () => setPrivacyOpen(false);

  return (
    <AnimatePresence>
      {isPrivacyOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
          >
            <div className="w-full max-w-2xl bg-void-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-void-black/90">
                <h2 className="text-xl font-display font-bold text-white">
                  Privacy & Terms
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 text-soft-gray hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto text-soft-gray text-sm space-y-4">
                <section>
                    <h3 className="text-white font-bold mb-2">1. Data Privacy</h3>
                    <p>At S_FIT AI, we prioritize your privacy. All biometric data (images, measurements) is processed in real-time and is not permanently stored on our servers unless you explicitly save it to your Vault.</p>
                </section>
                 <section>
                    <h3 className="text-white font-bold mb-2">2. Usage Rights</h3>
                    <p>By using our service, you grant us a temporary license to process your uploaded images solely for the purpose of generating virtual try-on results.</p>
                </section>
                 <section>
                    <h3 className="text-white font-bold mb-2">3. Third-Party AI</h3>
                    <p>We utilize third-party AI models (like Runway and Replicate) for image processing. Data sent to these providers is anonymized and ephemeral.</p>
                </section>
                <section>
                    <h3 className="text-white font-bold mb-2">4. User Conduct</h3>
                    <p>Users are prohibited from uploading illegal, offensive, or non-consensual content. Violations will result in immediate ban.</p>
                </section>
                 <p className="text-xs pt-4 opacity-50">Last updated: {new Date().toLocaleDateString()}</p>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-cyber-lime transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
