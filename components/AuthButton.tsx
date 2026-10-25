'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, KeyRound, ArrowRight } from 'lucide-react';

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      setShowModal(false);
    } catch (error: unknown) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'apple' | 'discord') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      alert(`${provider} Login Error: ` + (error as Error).message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">Member</p>
          <p className="text-sm font-[family-name:var(--font-display)] text-[var(--color-primary)] max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors uppercase tracking-wider"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group relative px-6 py-2.5 bg-transparent border border-[var(--color-primary)]/30 rounded-full overflow-hidden transition-all duration-500 hover:border-[var(--color-primary)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative z-10 text-[11px] font-bold text-[var(--color-primary)] uppercase tracking-[0.2em]">
          Member Access
        </span>
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[var(--color-secondary)]/90 backdrop-blur-xl"
              onClick={() => setShowModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="relative w-full max-w-[420px] bg-[var(--color-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Luxury Accent Line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" />

              <div className="p-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-10">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-text-primary)] mb-2">
                    {isLogin ? 'VIP Access' : 'Become a Member'}
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {isLogin ? 'Enter your credentials to continue.' : 'Join the exclusive club.'}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5 mb-8">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-primary)] transition-colors" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-[var(--border-color)] px-12 py-3 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-primary)] outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-primary)] transition-colors" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-[var(--border-color)] px-12 py-3 text-[var(--color-text-primary)] text-sm focus:border-[var(--color-primary)] outline-none transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full bg-[var(--color-primary)] text-[var(--color-secondary)] font-bold py-4 rounded-xl overflow-hidden transition-all disabled:opacity-50 mt-4"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
                      {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Join Now')}
                      {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </span>
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-[var(--color-primary)] hover:underline uppercase tracking-wide ml-1 font-medium"
                    >
                      {isLogin ? 'Apply Here' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
