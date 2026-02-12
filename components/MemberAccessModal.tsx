'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export function MemberAccessModal() {
  const { isMemberAccessOpen, setMemberAccessOpen } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setMemberAccessOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      alert('Welcome back, Member.');
      setMemberAccessOpen(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isMemberAccessOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#333] rounded-none overflow-hidden shadow-2xl"
            variants={modalVariants}
          >
            {/* Gold Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#996515] via-[#FFD700] to-[#996515]" />

            <div className="p-12 relative">
               {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
              >
                ✕
              </button>

              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-[#FFD700] mb-2 tracking-widest uppercase">
                  Member Access
                </h2>
                <p className="text-white/40 text-xs tracking-[0.2em] font-mono uppercase">
                  Enter the Inner Circle
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#FFD700]/70 uppercase tracking-widest font-bold ml-1">
                    Identity
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700] transition-colors font-mono text-sm"
                    placeholder="EMAIL ADDRESS"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#FFD700]/70 uppercase tracking-widest font-bold ml-1">
                    Passcode
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700] transition-colors font-mono text-sm"
                    placeholder="PASSWORD"
                    required
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-white/5 hover:bg-[#FFD700] hover:text-black border border-white/10 hover:border-[#FFD700] text-[#FFD700] font-bold tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      {isLoading ? 'Authenticating...' : 'Sign In'}
                    </span>
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
                  </button>
                </div>

                <div className="flex justify-between items-center text-[10px] text-white/30 uppercase tracking-widest mt-6">
                  <button type="button" className="hover:text-white transition-colors">
                    Forgot Passcode?
                  </button>
                  <button type="button" className="hover:text-white transition-colors">
                    Apply for Membership
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
