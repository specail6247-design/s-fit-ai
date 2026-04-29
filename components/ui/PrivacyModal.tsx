'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
              <h2 className="text-xl font-bold text-white">Privacy Policy & Terms</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-gray-300">
              <section>
                <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">1. Data Collection</h3>
                <p>We only collect the photos you explicitly upload for the virtual fitting process. These images are temporarily processed by our AI engines to generate your fitting result.</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">2. Data Safety & Storage</h3>
                <p>Your photos are securely processed and are <strong>never</strong> shared with third parties for marketing purposes. Uploaded images are automatically deleted from our active servers after your session ends.</p>
              </section>

              <section>
                <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">3. Terms of Service</h3>
                <p>By using S_FIT, you agree to only upload images you have the right to use. We reserve the right to suspend accounts that violate our community guidelines or attempt to misuse the AI generation features.</p>
              </section>
            </div>

            <div className="p-6 border-t border-white/10 bg-black/50 flex justify-end">
              <button onClick={onClose} className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
