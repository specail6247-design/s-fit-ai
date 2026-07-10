import React from 'react';
import { motion } from 'framer-motion';

interface PrivacyModalProps {
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black italic tracking-tighter mb-6">
          PRIVACY POLICY & TERMS
        </h2>

        <div className="space-y-6 text-sm text-gray-300 leading-relaxed font-sans">
          <section>
            <h3 className="text-white font-bold text-base mb-2">1. Data Privacy & Security</h3>
            <p>
              Your privacy is our paramount concern. All uploaded photos are processed securely and are never shared with third parties. Images are retained only for the duration of the fitting session and are automatically deleted from our servers immediately afterward.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-base mb-2">2. Usage Terms</h3>
            <p>
              By using S_FIT NEO, you agree to upload only images for which you have the legal right to use. The generated virtual fitting images are for personal use and evaluation.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-base mb-2">3. AI Processing</h3>
            <p>
              Our virtual try-on utilizes advanced AI models. While we strive for the highest accuracy, the generated results are simulations. We do not guarantee exact physical fit or color matching.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold text-base mb-2">4. User Content</h3>
            <p>
              We do not claim ownership of any content you upload. However, by uploading, you grant us a temporary license solely to process the image for the purpose of generating your virtual fitting result.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </div>
  );
};
