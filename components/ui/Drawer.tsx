'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  position?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  position = 'right'
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

  const variants: Variants = {
    hidden: { x: position === 'right' ? '100%' : '-100%' },
    visible: { x: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 200 } }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`fixed top-0 bottom-0 ${position === 'right' ? 'right-0' : 'left-0'} z-[1000] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
             {/* Header */}
             <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">{title || 'Panel'}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
             </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {children}
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
