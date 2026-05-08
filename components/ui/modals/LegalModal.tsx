import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
};

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-2xl bg-[var(--color-surface)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[var(--border-color)]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-[var(--color-secondary)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] font-[family-name:var(--font-display)]">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full hover:bg-white/5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto overscroll-contain text-[var(--color-text-secondary)] text-sm leading-relaxed space-y-4">
              {content}
            </div>
            <div className="p-6 border-t border-[var(--border-color)] bg-[var(--color-secondary)] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-full font-medium hover:brightness-110 transition-all"
              >
                Accept & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
