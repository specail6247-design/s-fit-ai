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
          <p className="text-xs text-soft-gray uppercase tracking-widest font-bold">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors border border-white/10"
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
        className="bg-transparent border border-white/20 hover:border-white text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        Member Access
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl p-4"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-[101] w-full max-w-[420px]"
            >
              <div className="bg-[#0a0a0a] border border-white/10 w-full rounded-2xl p-8 relative shadow-2xl overflow-hidden group mx-auto">
                {/* Subtle gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>

                <div className="text-center mb-8 relative z-10">
                  <h2 className="text-2xl font-light text-white tracking-widest uppercase mb-2">
                    {isLogin ? 'Member Sign In' : 'Join the Club'}
                  </h2>
                  <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">
                    Exclusive Access
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4 mb-8 relative z-10">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-1">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-white focus:bg-white/5 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-1">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-white focus:bg-white/5 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                      {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply for Access')}
                    </button>
                  </div>
                </form>

                <div className="relative z-10 flex items-center gap-4 mb-8">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase whitespace-nowrap">Or Continue With</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-3 relative z-10 mb-8">
                  <button onClick={() => handleSocialLogin('apple')} className="bg-white hover:bg-gray-200 text-black py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <span className="text-lg"></span> <span className="text-[10px] font-bold uppercase tracking-wider">Apple</span>
                  </button>
                  <button onClick={() => handleSocialLogin('google')} className="bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-white/10 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <span className="text-lg">G</span> <span className="text-[10px] font-bold uppercase tracking-wider">Google</span>
                  </button>
                </div>

                <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest relative z-10">
                  {isLogin ? "Not a member?" : "Already a member?"}{' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-white hover:text-gray-300 ml-1 border-b border-white/30 hover:border-white transition-colors pb-0.5"
                  >
                    {isLogin ? 'Apply Now' : 'Sign In'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
