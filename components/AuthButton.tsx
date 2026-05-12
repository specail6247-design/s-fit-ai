// 한국어 주석: 로그인/회원가입 컴포넌트, VIP 멤버십 모달
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
          <p className="text-[10px] text-soft-gray uppercase tracking-widest font-mono">Member</p>
          <p className="text-xs font-bold text-white max-w-[120px] truncate tracking-wide">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white px-5 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all border border-white/20 hover:border-white/40"
        >
          Sign Out
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className="relative overflow-hidden group bg-transparent text-white px-6 py-2.5 rounded-full text-[11px] font-mono font-bold tracking-[0.2em] uppercase transition-all border border-white/20 hover:border-white/60 active:scale-95"
      >
        <span className="relative z-10">Member Access</span>
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-void-black/90 border border-white/10 w-full max-w-md rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-white/5 blur-3xl rounded-full pointer-events-none" />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="mb-10 text-center">
                <h2 className="text-2xl font-light text-white tracking-wide mb-2">
                  {isLogin ? 'Sign In' : 'Apply for Access'}
                </h2>
                <p className="text-[11px] font-mono text-soft-gray uppercase tracking-[0.2em]">
                  {isLogin ? 'Enter the Vault' : 'Become a Member'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-5 mb-8 relative z-10">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/60 uppercase tracking-widest pl-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border-b border-white/20 px-1 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/20 font-light"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-white/60 uppercase tracking-widest pl-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border-b border-white/20 px-1 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/20 font-light tracking-widest"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-medium py-3.5 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4 text-sm tracking-wide"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Submit Application')}
                </motion.button>
              </form>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Or Continue With</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-4 gap-3 mb-8">
                <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 aspect-square rounded-2xl flex items-center justify-center transition-colors group">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/10 hover:bg-[#FAE100]/20 text-[#FAE100] border border-[#FAE100]/20 aspect-square rounded-2xl flex items-center justify-center transition-colors group">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">💬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 aspect-square rounded-2xl flex items-center justify-center transition-colors group">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">🍎</span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/20 aspect-square rounded-2xl flex items-center justify-center transition-colors group">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">🎮</span>
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[11px] text-white/50 hover:text-white transition-colors uppercase tracking-widest font-mono"
                >
                  {isLogin ? 'Request Membership' : 'Existing Member Sign In'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
