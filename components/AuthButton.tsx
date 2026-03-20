'use client';

import { useState, useEffect } from 'react';
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
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs tracking-widest uppercase font-bold text-white/70 hover:text-white transition-colors"
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
        className="px-5 py-2.5 border border-white/20 hover:bg-white/10 text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all backdrop-blur-sm"
      >
        Sign In
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            key="auth-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              key="auth-modal-content"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 relative overflow-hidden"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#007AFF] to-transparent opacity-50" />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
                  Member Access
                </h2>
                <p className="text-xs text-gray-500 tracking-[0.3em] uppercase mt-2">
                  {isLogin ? 'Welcome Back' : 'Join the Club'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6 mb-8">
                <div className="space-y-1">
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors placeholder:text-gray-600 tracking-widest"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#007AFF] outline-none transition-colors placeholder:text-gray-600 tracking-widest"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !email || !password}
                  className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:hover:bg-white tracking-widest uppercase mt-4"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] text-gray-600 tracking-widest uppercase">Or Continue With</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-4 gap-3">
                <button onClick={() => handleSocialLogin('google')} aria-label="Login with Google" className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-lg">G</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} aria-label="Login with Kakao" className="bg-[#FAE100]/10 hover:bg-[#FAE100]/20 text-[#FAE100] border border-[#FAE100]/20 py-3 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-lg">K</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} aria-label="Login with Apple" className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-colors text-white">
                  <span className="text-lg">A</span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} aria-label="Login with Discord" className="bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/20 py-3 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-lg">D</span>
                </button>
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[10px] text-gray-500 hover:text-white tracking-widest uppercase transition-colors"
                >
                  {isLogin ? "Request Access (Sign Up)" : "Already a Member? (Sign In)"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
