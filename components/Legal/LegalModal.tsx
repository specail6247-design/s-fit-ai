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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`text-lg font-bold tracking-tight transition-colors ${
                    activeTab === 'privacy' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`text-lg font-bold tracking-tight transition-colors ${
                    activeTab === 'terms' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Terms of Service
                </button>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300 space-y-4">
              {activeTab === 'privacy' ? (
                <>
                  <h3 className="text-white font-bold text-lg">1. Data Collection</h3>
                  <p>We collect photos uploaded for the purpose of virtual fitting. These photos are processed securely and temporarily to generate your fitting results.</p>

                  <h3 className="text-white font-bold text-lg">2. Data Usage & Security</h3>
                  <p>Your photos are strictly used for the virtual try-on feature. We do not use your personal images for training AI models without explicit consent. Data is encrypted in transit and at rest.</p>

                  <h3 className="text-white font-bold text-lg">3. Data Retention</h3>
                  <p>Uploaded photos and generated results are automatically deleted from our servers after 24 hours unless you explicitly save them to your account.</p>

                  <h3 className="text-white font-bold text-lg">4. Third-Party Services</h3>
                  <p>We use trusted third-party providers (like Replicate and cloud storage) to process your fitting. These providers are bound by strict data privacy agreements.</p>
                </>
              ) : (
                <>
                  <h3 className="text-white font-bold text-lg">1. Acceptance of Terms</h3>
                  <p>By accessing and using S_FIT AI, you agree to be bound by these Terms of Service.</p>

                  <h3 className="text-white font-bold text-lg">2. User Responsibilities</h3>
                  <p>You must only upload photos that you have the right to use. You agree not to upload any inappropriate, explicit, or copyrighted material without permission.</p>

                  <h3 className="text-white font-bold text-lg">3. Service Limitations</h3>
                  <p>The virtual try-on is an AI-generated approximation. We do not guarantee perfect accuracy of fit, color, or material representation.</p>

                  <h3 className="text-white font-bold text-lg">4. Intellectual Property</h3>
                  <p>The S_FIT AI platform, including its software, designs, and brand assets, are the property of S_FIT AI. The generated images belong to you, but we retain a license to display them within your account.</p>
                </>
              )}
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
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
