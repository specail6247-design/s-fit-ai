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
          <p className="text-[10px] text-gray-400 tracking-widest uppercase font-serif">Member</p>
          <p className="text-sm font-bold text-white max-w-[120px] truncate tracking-wide">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-colors border border-white/20 hover:border-white uppercase"
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
        className="bg-transparent hover:bg-white/5 text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border border-white/20 hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] font-serif"
      >
        MEMBER ACCESS
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal-container"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
              className="bg-[#050505] border border-white/10 w-full max-w-md p-8 sm:p-10 relative z-10 shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              <div className="text-center mb-10">
                <span className="material-symbols-outlined text-4xl text-white/50 mb-4">vpn_key</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-[0.2em] uppercase">
                  {isLogin ? 'Sign In' : 'Request Access'}
                </h2>
                <p className="text-xs text-gray-500 mt-3 tracking-widest uppercase">
                  {isLogin ? 'Enter your credentials' : 'Join the exclusive club'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6 mb-8">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 text-sm">mail</span>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-8 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-gray-600 tracking-widest uppercase"
                    required
                  />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 text-sm">lock</span>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-8 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-gray-600 tracking-widest uppercase"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 tracking-[0.2em] uppercase font-serif mt-4"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Submit Request')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] text-gray-500 tracking-widest uppercase font-serif">Alternate Access</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors group">
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors group">
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">💬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors group">
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">🍎</span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors group">
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">🎮</span>
                </button>
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[10px] text-gray-400 hover:text-white transition-colors tracking-widest uppercase border-b border-transparent hover:border-white pb-1"
                >
                  {isLogin ? 'Request Membership' : 'Existing Member Sign In'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
