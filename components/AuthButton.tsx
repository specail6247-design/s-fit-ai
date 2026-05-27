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
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-xs text-soft-gray">Welcome,</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          aria-label="Sign Out"
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors border border-white/10"
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
        className="text-white hover:text-white/70 px-4 py-2 text-xs tracking-widest uppercase font-mono transition-colors"
      >
        MEMBER ACCESS
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm relative"
            >
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-white tracking-widest font-[family-name:var(--font-cinzel)] uppercase">
                  {isLogin ? 'Sign In' : 'Join Us'}
                </h2>
                <div className="h-px w-12 bg-white/30 mx-auto mt-6" />
              </div>

              <form onSubmit={handleAuth} className="space-y-8 mb-12">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-xs tracking-widest focus:border-white outline-none transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-xs tracking-widest focus:border-white outline-none transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black text-xs font-bold tracking-[0.2em] uppercase py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4"
                >
                  {loading ? 'PROCESSING...' : (isLogin ? 'ENTER' : 'CREATE')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-8 opacity-50">
                <div className="h-px bg-white/20 flex-1" />
                <span className="text-[10px] text-white tracking-widest uppercase">Or Continue With</span>
                <div className="h-px bg-white/20 flex-1" />
              </div>

              <div className="flex justify-center gap-6">
                <button aria-label="Google" onClick={() => handleSocialLogin('google')} className="text-white/50 hover:text-white transition-colors">
                  <span className="text-xl">🇬</span>
                </button>
                <button aria-label="Kakao" onClick={() => handleSocialLogin('kakao')} className="text-[#FAE100]/50 hover:text-[#FAE100] transition-colors">
                  <span className="text-xl">💬</span>
                </button>
                <button aria-label="Apple" onClick={() => handleSocialLogin('apple')} className="text-white/50 hover:text-white transition-colors">
                  <span className="text-xl">🍎</span>
                </button>
                <button aria-label="Discord" onClick={() => handleSocialLogin('discord')} className="text-[#5865F2]/50 hover:text-[#5865F2] transition-colors">
                  <span className="text-xl">🎮</span>
                </button>
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[10px] text-white/50 hover:text-white tracking-widest uppercase transition-colors"
                >
                  {isLogin ? 'Request Access' : 'Return to Login'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
