'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabaseClient';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 } as const
  },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export default function MemberAccessModal() {
  const { isLoginModalOpen, setLoginModalOpen } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleClose = () => {
    setLoginModalOpen(false);
    setMessage(null);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Confirmation link sent to your email.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        handleClose(); // Success!
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#d4af37] rounded-xl p-8 shadow-[0_0_40px_rgba(212,175,55,0.1)] overflow-hidden"
            variants={modalVariants}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/40 hover:text-[#d4af37] transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl text-[#d4af37] tracking-[0.2em] uppercase mb-2">
                Member Access
              </h2>
              <p className="text-xs text-white/40 font-mono tracking-widest">
                EXCLUSIVE ENTRY
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="group relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#d4af37] transition-colors peer placeholder-transparent"
                  />
                  <label className="absolute left-0 top-2 text-white/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#d4af37] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#d4af37]">
                    Email Address
                  </label>
                </div>

                <div className="group relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#d4af37] transition-colors peer placeholder-transparent"
                  />
                  <label className="absolute left-0 top-2 text-white/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#d4af37] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#d4af37]">
                    Password
                  </label>
                </div>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`text-xs text-center p-2 border ${message.type === 'error' ? 'border-red-500/50 text-red-400' : 'border-green-500/50 text-green-400'} bg-white/5`}>
                  {message.text}
                </div>
              )}

              {/* Actions */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#d4af37] hover:bg-[#b5952f] text-black font-bold py-3 uppercase tracking-[0.15em] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : (isSignUp ? 'Join Club' : 'Enter')}
                </button>
              </div>
            </form>

            {/* Toggle Sign Up */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setMessage(null); }}
                className="text-xs text-white/40 hover:text-[#d4af37] transition-colors font-mono tracking-wider uppercase"
              >
                {isSignUp ? 'Already a member? Sign In' : 'New here? Request Access'}
              </button>
            </div>

            {/* Decorative Corner Lines */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4af37]/30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#d4af37]/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#d4af37]/30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4af37]/30 pointer-events-none" />

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
