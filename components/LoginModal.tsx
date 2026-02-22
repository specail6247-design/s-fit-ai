'use client';

// S_FIT AI - Member Access Modal
// High-fidelity VIP login experience

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

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
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
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

export function LoginModal() {
  const { isLoginOpen, setLoginOpen } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setLoginOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Implement actual auth
      handleClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
            className="relative w-full max-w-sm glass-card overflow-hidden border border-white/10"
            variants={modalVariants}
          >
            {/* VIP Header */}
            <div className="p-8 pb-0 text-center">
              <div className="inline-block mb-4">
                 <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mx-auto">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-pure-white uppercase font-display">
                Member Access
              </h2>
              <p className="text-soft-gray text-xs mt-2 tracking-widest uppercase">
                Enter the inner circle
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="p-8 pt-6 space-y-5">
              <div className="space-y-1">
                <label className="text-xs text-soft-gray uppercase tracking-wider font-bold ml-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-luxury-gold/50 transition-colors text-sm"
                  placeholder="vip@sfit.ai"
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs text-soft-gray uppercase tracking-wider font-bold">Password</label>
                  <button type="button" className="text-[10px] text-luxury-gold hover:text-white transition-colors">
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-luxury-gold/50 transition-colors text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pure-white hover:bg-luxury-gold text-void-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="animate-pulse">Accessing...</span>
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <span className="text-xs opacity-50">→</span>
                  </>
                )}
              </button>

              <div className="text-center mt-6">
                <p className="text-xs text-soft-gray">
                  Not a member?{' '}
                  <button type="button" className="text-white hover:text-luxury-gold underline transition-colors" onClick={() => alert('Applications closed.')}>
                    Apply for Access
                  </button>
                </p>
              </div>
            </form>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 p-4 pointer-events-none">
              <div className="text-[10px] text-white/5 font-mono">S_FIT V.2.0</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
