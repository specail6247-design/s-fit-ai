'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | null;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' as const }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 }
  },
};

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen || !type) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-4 text-sm text-gray-300">
          <p><strong>Last Updated:</strong> Today</p>
          <p>At S_FIT AI, we take your privacy seriously. This policy outlines how we collect, use, and protect your data.</p>
          <h3 className="text-white font-bold mt-4">1. Information We Collect</h3>
          <p>We collect photos you upload for virtual try-on and basic usage analytics.</p>
          <h3 className="text-white font-bold mt-4">2. How We Use Information</h3>
          <p>Your photos are strictly used to generate the virtual try-on result and are NOT shared with third parties without your explicit consent.</p>
          <h3 className="text-white font-bold mt-4">3. Data Security</h3>
          <p>We implement industry-standard security measures to ensure your data is safe.</p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="space-y-4 text-sm text-gray-300">
          <p><strong>Last Updated:</strong> Today</p>
          <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>
          <h3 className="text-white font-bold mt-4">1. Acceptance of Terms</h3>
          <p>By accessing or using our app, you agree to be bound by these Terms.</p>
          <h3 className="text-white font-bold mt-4">2. User Content</h3>
          <p>You retain all rights to the photos you upload. You grant us a temporary license to process them for the try-on feature.</p>
          <h3 className="text-white font-bold mt-4">3. Acceptable Use</h3>
          <p>Please do not upload offensive or illegal content. We reserve the right to ban users who violate this rule.</p>
        </div>
      )
    }
  };

  const { title, body } = content[type];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className="relative w-full max-w-lg bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
          variants={modalVariants}
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {body}
          </div>
          <div className="p-4 border-t border-white/10 bg-black/50 flex justify-end">
             <button onClick={onClose} className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg font-medium transition-colors">
               I Understand
             </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
