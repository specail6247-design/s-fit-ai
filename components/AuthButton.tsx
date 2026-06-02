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
        aria-label="Member Access"
        className="w-10 h-10 rounded-full bg-void-black border border-white/10 hover:border-white/30 transition-all flex items-center justify-center group"
      >
        <span className="material-symbols-outlined text-white group-hover:text-cyber-lime transition-colors">
          person
        </span>
      </button>

      <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="bg-[#050505] border border-white/10 shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-black uppercase italic tracking-widest text-white mb-8 text-center">
              {isLogin ? 'MEMBER ACCESS' : 'Create Account'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-white/20 bg-transparent px-0 py-2 text-white text-sm focus:border-cyber-lime outline-none transition-colors"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-white/20 bg-transparent px-0 py-2 text-white text-sm focus:border-cyber-lime outline-none transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-3 uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-soft-gray">OR SOCIAL LOGIN</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-xs text-white">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100] hover:bg-[#FADB00] text-[#371D1E] py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">💬</span> <span className="text-xs font-bold">Kakao</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white hover:bg-gray-100 text-black py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-xs font-bold">Apple</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2] hover:bg-[#4752C4] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🎮</span> <span className="text-xs font-bold">Discord</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-soft-gray uppercase tracking-widest">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-cyber-lime transition-colors ml-1 font-bold underline underline-offset-2"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
