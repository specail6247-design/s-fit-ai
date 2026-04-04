import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid calling setState synchronously within an effect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative bg-[#111] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white tracking-wide">Privacy Policy & Terms of Service</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-6 custom-scrollbar">
              <section>
                <h3 className="text-[#007AFF] font-bold text-base mb-2 uppercase tracking-wider">1. Privacy Policy</h3>
                <p className="mb-2">Your privacy is important to us. S_FIT NEO respects your privacy regarding any information we may collect from you across our application.</p>
                <p>We only ask for personal information (such as photos) when we truly need it to provide the virtual fitting service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
              </section>

              <section>
                <h3 className="text-[#007AFF] font-bold text-base mb-2 uppercase tracking-wider">2. Data Security</h3>
                <p>Any photos uploaded for the virtual fitting process are processed securely. We do not store your personal photos permanently, nor do we share them with any third parties for advertising or profiling purposes. Once the fitting result is generated, the temporary files are scheduled for deletion.</p>
              </section>

              <section>
                <h3 className="text-[#007AFF] font-bold text-base mb-2 uppercase tracking-wider">3. Terms of Service</h3>
                <p className="mb-2">By accessing or using S_FIT NEO, you agree to be bound by these Terms of Service.</p>
                <p>The generated images are for personal use only. S_FIT NEO makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
              </section>

              <section>
                <h3 className="text-[#007AFF] font-bold text-base mb-2 uppercase tracking-wider">4. User Content</h3>
                <p>You retain all your ownership rights in your User Content. By submitting User Content to S_FIT NEO, you hereby grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, and process the User Content strictly for the purpose of providing the Service.</p>
              </section>
            </div>

            <div className="p-6 border-t border-white/10 bg-black/50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
