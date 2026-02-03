'use client';

// S_FIT AI - Member Access Modal (VIP Login)
// Minimalist, high-fidelity design

import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
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
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as any,
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

  const handleClose = () => {
    setMemberAccessOpen(false);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    console.log('Login attempt:', email);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isMemberAccessOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            variants={modalVariants}
          >
            {/* Golden Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ecab13] to-transparent opacity-50" />

            <div className="p-10 relative">
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-white tracking-tighter mb-2 font-display italic">
                  MEMBER <span className="text-[#ecab13]">ACCESS</span>
                </h2>
                <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">
                  Private Fitting Room
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider ml-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ecab13]/50 focus:bg-white/10 transition-all font-mono placeholder-gray-700"
                    placeholder="vip@s-fit.ai"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider ml-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ecab13]/50 focus:bg-white/10 transition-all font-mono placeholder-gray-700"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-4 bg-white text-black hover:bg-[#ecab13] hover:text-white font-bold tracking-widest text-xs uppercase rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Enter
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-[10px] text-gray-600">
                  By entering, you agree to our <span className="text-gray-400 hover:text-white cursor-pointer underline">Terms of Service</span>
                </p>
              </div>
            </div>

            {/* Subtle Texture */}
             <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
