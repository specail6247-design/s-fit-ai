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
        className="bg-transparent border border-luxury-gold/50 text-luxury-gold px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-luxury-gold/10 hover:border-luxury-gold transition-all"
      >
        MEMBER ACCESS
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setShowModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 w-full max-w-sm rounded-none p-8 relative shadow-2xl z-10"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-10">
                <h2 className="text-2xl font-light tracking-[0.3em] uppercase text-white mb-2">
                  {isLogin ? 'VIP Sign In' : 'Join Club'}
                </h2>
                <div className="w-12 h-px bg-luxury-gold mx-auto" />
              </div>

              <form onSubmit={handleAuth} className="space-y-6 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-luxury-gold outline-none tracking-widest placeholder:text-white/30 transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-luxury-gold outline-none tracking-widest placeholder:text-white/30 transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-4 text-xs tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4"
                >
                  {loading ? 'AUTHENTICATING...' : (isLogin ? 'ACCESS' : 'APPLY')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] tracking-widest text-soft-gray uppercase">Alternative</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleSocialLogin('google')} className="bg-transparent border border-white/20 hover:border-white py-3 flex items-center justify-center gap-2 transition-colors">
                  <span className="text-sm">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-transparent border border-white/20 hover:border-white py-3 flex items-center justify-center gap-2 transition-colors">
                  <span className="text-sm">🍎</span>
                </button>
              </div>

              <p className="mt-8 text-center text-[10px] tracking-widest text-soft-gray uppercase">
                {isLogin ? "Not a member?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-luxury-gold hover:text-white transition-colors ml-2"
                >
                  {isLogin ? 'APPLY HERE' : 'SIGN IN'}
                </button>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
