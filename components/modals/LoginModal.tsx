'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { createClient } from '@supabase/supabase-js';

// Since we may not have initialized the Supabase client elsewhere globally yet, we can init it here or use a helper.
// For now, we'll initialize it if the env variables are present to support the UI functionality.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function LoginModal() {
  const { isLoginOpen, setLoginOpen } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  React.useEffect(() => {
    const handleTestLogin = () => setLoginOpen(true);
    document.addEventListener('test-login', handleTestLogin);
    return () => document.removeEventListener('test-login', handleTestLogin);
  }, [setLoginOpen]);

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setLoginOpen(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Authentication is currently unavailable.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // On success, we might show a message or login directly
        setError('Check your email to confirm sign up.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setLoginOpen(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during authentication.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void-black/80 backdrop-blur-md p-4"
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md relative overflow-hidden rounded-2xl border border-white/10 bg-void-black/90 p-8 shadow-2xl"
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/5 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-[100]"
              aria-label="Close"
            >
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl font-light tracking-widest text-pure-white mb-2" style={{ fontFamily: 'var(--font-cinzel, serif)' }}>
                MEMBER ACCESS
              </h2>
              <div className="h-[1px] w-12 bg-white/20 mx-auto my-4" />
              <p className="text-sm text-white/60 font-light tracking-wide">
                {isSignUp ? 'Join the exclusive club.' : 'Welcome back to the vault.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-6 relative z-10">
              <div className="space-y-4">
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-pure-white placeholder-transparent focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all peer"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white/70"
                  >
                    EMAIL
                  </label>
                </div>

                <div className="relative group mt-8">
                  <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-pure-white placeholder-transparent focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all peer"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-3 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white/70"
                  >
                    PASSWORD
                  </label>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-xs text-center font-mono tracking-wide">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden group bg-pure-white text-void-black py-4 font-medium tracking-widest hover:bg-white/90 transition-colors disabled:opacity-50"
                style={{ fontFamily: 'var(--font-cinzel, serif)' }}
              >
                <span className="relative z-10">
                  {isLoading ? 'AUTHENTICATING...' : (isSignUp ? 'APPLY FOR ACCESS' : 'SIGN IN')}
                </span>
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center relative z-10">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-white/40 hover:text-white/80 tracking-widest transition-colors uppercase"
              >
                {isSignUp ? 'ALREADY A MEMBER? SIGN IN' : 'REQUEST INVITATION'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
