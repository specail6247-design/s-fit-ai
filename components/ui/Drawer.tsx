'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const drawerVariants: Variants = {
    hidden: {
      x: position === 'right' ? '100%' : '-100%',
      opacity: 0.5
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", damping: 30, stiffness: 300 }
    },
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
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
            className={`fixed top-0 bottom-0 ${position === 'right' ? 'right-0' : 'left-0'} z-[1000] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col ${className}`}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
             {/* Close Button */}
             <button
               onClick={onClose}
               className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
             >
               ✕
             </button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain relative">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
