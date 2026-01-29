import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  side?: 'left' | 'right';
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  side = 'right',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const drawerVariants: Variants = {
    hidden: { x: side === 'right' ? '100%' : '-100%' },
    visible: {
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 },
    },
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={`fixed top-0 bottom-0 ${
              side === 'right' ? 'right-0 rounded-l-[24px]' : 'left-0 rounded-r-[24px]'
            } z-[1000] bg-[var(--color-surface)] w-full max-w-md flex flex-col shadow-[var(--shadow-premium)] h-screen overflow-hidden border-l border-white/10`}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
              {title && (
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white uppercase tracking-wider">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-soft-gray hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
