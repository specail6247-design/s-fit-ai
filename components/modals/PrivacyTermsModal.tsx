import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface PrivacyTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyTermsModal({ isOpen, onClose }: PrivacyTermsModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-[#111] border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === 'privacy'
                    ? 'text-white border-b-2 border-[#007AFF] bg-white/5'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === 'terms'
                    ? 'text-white border-b-2 border-[#007AFF] bg-white/5'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                Terms of Service
              </button>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 text-sm text-gray-300">
              {activeTab === 'privacy' ? (
                <>
                  <section>
                    <h3 className="text-white font-bold mb-2">1. Data Collection & Processing</h3>
                    <p>
                      S_FIT NEO processes your uploaded photos locally where possible or via secure, encrypted channels to our AI providers.
                      <strong> Photos are strictly used for the virtual try-on session and are never shared, sold, or used to train third-party models.</strong>
                    </p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">2. Data Retention</h3>
                    <p>
                      Session data, including uploaded images and generated try-on results, are automatically purged from our temporary servers within 1 hour of session inactivity. We do not store permanent records of your likeness without explicit consent.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">3. Security</h3>
                    <p>
                      We implement industry-standard security measures, including HTTPS/TLS encryption for all data in transit, to protect your personal information against unauthorized access, alteration, or destruction.
                    </p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
                    <p>
                      By accessing or using S_FIT NEO, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">2. Acceptable Use</h3>
                    <p>
                      You agree to use the service only for lawful purposes. You must not upload any content that is offensive, discriminatory, or infringes upon the intellectual property rights of others.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold mb-2">3. Disclaimer of Warranties</h3>
                    <p>
                      The virtual try-on results are AI-generated representations and may not perfectly reflect real-world fit, color, or material properties. The service is provided &quot;as is&quot; without warranties of any kind.
                    </p>
                  </section>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-black/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
