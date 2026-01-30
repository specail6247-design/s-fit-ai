import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 30, stiffness: 300 }
  },
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  width = "max-w-sm",
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

  // Use document.body only after mount to avoid SSR issues
  if (typeof document === 'undefined') return null;

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
            className={`fixed top-0 bottom-0 right-0 z-[1000] bg-[#0a0a0a] border-l border-white/10 ${width} w-full flex flex-col shadow-2xl`}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {title}
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2">
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
