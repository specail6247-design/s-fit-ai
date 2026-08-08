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
          <p className="text-xs text-gray-400">VIP Member,</p>
          <p className="text-sm font-serif italic text-[#C9B037] max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-[#111] text-[#C9B037] px-4 py-2 rounded-full text-xs font-serif italic transition-colors border border-[#C9B037]/30 hover:border-[#C9B037]"
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
        className="bg-transparent text-[#C9B037] px-5 py-2 rounded-full text-sm font-serif italic border border-[#C9B037]/30 hover:border-[#C9B037] hover:bg-[#C9B037]/10 transition-all shadow-[0_0_15px_rgba(201,176,55,0.15)]"
      >
        Member Access
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
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0A0A0A] border border-[#C9B037]/20 shadow-[0_0_40px_rgba(201,176,55,0.1)] w-full max-w-sm rounded-lg p-8 relative overflow-hidden"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#C9B037]/30 m-2" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C9B037]/30 m-2" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#C9B037]/30 m-2" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#C9B037]/30 m-2" />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 text-gray-500 hover:text-[#C9B037] transition-colors z-10"
              >
                ✕
              </button>

              <div className="text-center mb-8 relative z-10">
                <h2 className="text-3xl text-[#C9B037] font-serif italic mb-1 tracking-wider">
                  {isLogin ? 'Sign In' : 'Join'}
                </h2>
                <div className="w-12 h-px bg-[#C9B037]/40 mx-auto mt-4 mb-2" />
                <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Exclusive Access</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-5 mb-8 relative z-10">
                <div className="space-y-1">
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-800 px-2 py-3 text-white text-sm placeholder:text-gray-700 focus:border-[#C9B037] outline-none transition-colors font-mono tracking-widest"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-800 px-2 py-3 text-white text-sm placeholder:text-gray-700 focus:border-[#C9B037] outline-none transition-colors font-mono tracking-widest"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C9B037] text-black font-serif italic text-lg py-3 mt-4 hover:bg-[#F4E4BC] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Register')}
                </button>
              </form>

              <div className="flex flex-col items-center gap-4 relative z-10">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[10px] text-gray-500 hover:text-[#C9B037] uppercase tracking-[0.1em] transition-colors"
                >
                  {isLogin ? 'Request Membership' : 'Existing Member? Sign In'}
                </button>

                {/* Minimalist social options for VIP feel */}
                {isLogin && (
                  <div className="flex gap-4 mt-2">
                    <button type="button" onClick={() => handleSocialLogin('apple')} className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:border-[#C9B037] hover:text-[#C9B037] transition-all">
                      <span className="text-sm">🍎</span>
                    </button>
                    <button type="button" onClick={() => handleSocialLogin('google')} className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:border-[#C9B037] hover:text-[#C9B037] transition-all">
                      <span className="text-sm">G</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
