'use client';

// S_FIT AI - Member Access Modal (Login)
// High-fidelity VIP club entrance feel

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabaseClient';

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
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.4,
    },
  },
};

export function LoginModal() {
  const { showLoginModal, setShowLoginModal } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleClose = () => {
    setShowLoginModal(false);
    setError(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        alert('Welcome to the club. Please check your email to verify.');
        handleClose();
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        handleClose();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Authentication failed');
      } else {
        setError('Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {showLoginModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop with intense blur for focus */}
          <motion.div
            className="absolute inset-0 bg-void-black/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-md glass-card border-pure-white/10 overflow-hidden rounded-2xl"
            variants={modalVariants}
          >
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-soft-gray hover:text-pure-white transition-colors z-10"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Inner Content */}
            <div className="p-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-light text-pure-white tracking-widest uppercase">
                  {isRegistering ? 'Join' : 'Member Access'}
                </h2>
                <div className="mt-4 w-12 h-[1px] bg-cyber-lime mx-auto" />
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-soft-gray/30 py-3 text-sm tracking-wider text-pure-white placeholder:text-soft-gray/50 focus:outline-none focus:border-pure-white transition-colors uppercase font-mono"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-soft-gray/30 py-3 text-sm tracking-wider text-pure-white placeholder:text-soft-gray/50 focus:outline-none focus:border-pure-white transition-colors uppercase font-mono"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-xs font-mono tracking-wide text-center uppercase">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-8 bg-pure-white text-void-black py-4 text-sm font-bold tracking-widest uppercase hover:bg-cyber-lime transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'PROCESSING...' : isRegistering ? 'REQUEST ACCESS' : 'ENTER'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-xs font-mono text-soft-gray hover:text-pure-white transition-colors uppercase tracking-wider"
                >
                  {isRegistering ? 'ALREADY A MEMBER?' : 'REQUEST MEMBERSHIP'}
                </button>
              </div>
            </div>

            {/* Subtle Shimmer for VIP Feel */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-pure-white/5 to-transparent opacity-50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
