import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

export default function MemberAccessModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-md bg-[#0A0A0A] border border-[#C9B037]/30 p-10 shadow-2xl rounded-sm"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#C9B037] transition-colors"
            >
              ✕
            </button>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif text-[#C9B037] tracking-widest uppercase mb-2">
                Member Access
              </h2>
              <p className="text-xs text-gray-500 tracking-widest uppercase">
                Exclusive VIP Entrance
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-800 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9B037] transition-colors text-sm tracking-wider"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-800 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9B037] transition-colors text-sm tracking-wider"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C9B037] text-black font-serif uppercase tracking-widest py-4 mt-8 hover:bg-[#F4E4BC] transition-colors"
              >
                Sign In
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
