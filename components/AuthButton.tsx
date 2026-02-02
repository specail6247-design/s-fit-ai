'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auto focus when modal opens
  useEffect(() => {
    if (showModal && emailInputRef.current) {
      // Small delay to ensure render
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
  }, [showModal]);

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
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">Member</p>
          <p className="text-sm font-mono text-white tracking-tight">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
          aria-label="Sign Out"
        >
          [ Sign Out ]
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-white/70 hover:text-[#ecab13] transition-colors uppercase"
        aria-label="Open Member Access"
      >
        <span>Member Access</span>
        <span className="text-[#ecab13] group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {showModal && (
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#0a0a0a] border border-[#ecab13]/20 rounded-none p-10 relative shadow-[0_0_40px_rgba(236,171,19,0.1)]"
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                  aria-label="Close Modal"
                >
                  ✕
                </button>

                <div className="text-center mb-10">
                    <h2 id="modal-title" className="text-2xl font-serif italic text-white mb-2">
                      {isLogin ? 'The Inner Circle' : 'Join the Elite'}
                    </h2>
                    <div className="h-0.5 w-10 bg-[#ecab13] mx-auto" />
                </div>

                <form onSubmit={handleAuth} className="space-y-6 mb-8">
                  <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Email Coordinates</label>
                      <input
                        ref={emailInputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white text-lg font-mono focus:border-[#ecab13] outline-none transition-colors rounded-none placeholder:text-white/10"
                        placeholder="name@example.com"
                        aria-label="Email Address"
                        required
                      />
                  </div>
                  <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-1">Access Code</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white text-lg font-mono focus:border-[#ecab13] outline-none transition-colors rounded-none placeholder:text-white/10"
                        placeholder="••••••••"
                        aria-label="Password"
                        required
                      />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#ecab13] text-black font-bold py-4 hover:bg-[#d49a11] transition-colors disabled:opacity-50 tracking-widest uppercase text-xs mt-4"
                  >
                    {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
                  </button>
                </form>

                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-500">
                   <span>Or connect via</span>
                   <div className="flex gap-4 text-lg">
                       {/* Minimal Social Icons */}
                       <button onClick={() => handleSocialLogin('google')} className="hover:text-white transition-colors" aria-label="Sign in with Google">G</button>
                       <button onClick={() => handleSocialLogin('apple')} className="hover:text-white transition-colors" aria-label="Sign in with Apple">A</button>
                       <button onClick={() => handleSocialLogin('kakao')} className="hover:text-white transition-colors" aria-label="Sign in with Kakao">K</button>
                   </div>
                </div>

                <p className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-widest">
                  {isLogin ? "No access pass?" : "Already a member?"}{' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#ecab13] hover:underline ml-1"
                  >
                    {isLogin ? 'Request Access' : 'Enter Lounge'}
                  </button>
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
