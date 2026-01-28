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
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate font-serif italic">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full text-[10px] font-medium transition-colors border border-white/10 tracking-widest uppercase"
        >
          Exit
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-[10px] font-bold text-white tracking-[0.2em] uppercase hover:text-white/70 transition-colors flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Member Access
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#050505] border border-white/10 w-full max-w-sm rounded-none p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-8">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2">S_FIT PRIVATE</p>
                <h2 className="text-3xl font-serif italic text-white">
                  {isLogin ? 'Welcome Back' : 'Join the Club'}
                </h2>
              </div>

              <form onSubmit={handleAuth} className="space-y-4 mb-8">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/20"
                    placeholder="vip@sfit.ai"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/20"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-4 mt-4 uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
                </button>
              </form>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Or connect via</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 h-10 flex items-center justify-center transition-colors">
                    <span className="text-base grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">🇬</span>
                  </button>
                  <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 border border-white/10 h-10 flex items-center justify-center transition-colors">
                    <span className="text-base grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">💬</span>
                  </button>
                  <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 h-10 flex items-center justify-center transition-colors">
                    <span className="text-base grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">🍎</span>
                  </button>
                  <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 border border-white/10 h-10 flex items-center justify-center transition-colors">
                    <span className="text-base grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">🎮</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                 <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                >
                  {isLogin ? "Request Access" : "Have Access?"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
