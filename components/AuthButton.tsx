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
        className="bg-cyber-lime text-void-black px-5 py-2 rounded-full text-xs font-bold hover:brightness-110 transition-all"
      >
        MEMBER ACCESS
      </button>

      <AnimatePresence>
      {showModal && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-sm rounded-2xl p-8 relative shadow-2xl overflow-hidden"
          >
            {/* VIP Shimmer Effect */}
            <div className="absolute inset-0 pointer-events-none luxury-shimmer opacity-20" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-white z-10"
            >
              ✕
            </button>
            
            <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-2 text-center uppercase tracking-widest font-mono">
                {isLogin ? 'VIP Access' : 'Join the Club'}
                </h2>
                <p className="text-center text-xs text-soft-gray mb-8 uppercase tracking-widest">
                    {isLogin ? 'Enter your credentials' : 'Create your digital identity'}
                </p>

                <form onSubmit={handleAuth} className="space-y-4 mb-6">
                <input
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono uppercase tracking-wider focus:border-cyber-lime outline-none transition-colors"
                    required
                />
                <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono uppercase tracking-wider focus:border-cyber-lime outline-none transition-colors"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 text-xs tracking-widest uppercase mt-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                    {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </button>
                </form>

                <div className="flex items-center gap-2 mb-6">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] text-soft-gray font-mono uppercase tracking-widest">Or authenticate via</span>
                <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <span className="text-lg">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-white hover:bg-gray-100 text-black py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <span className="text-lg">🍎</span>
                </button>
                </div>

                <p className="mt-8 text-center text-[10px] text-soft-gray font-mono uppercase tracking-widest">
                {isLogin ? "No access pass?" : "Already a member?"}{' '}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-cyber-lime hover:underline ml-1 font-bold"
                >
                    {isLogin ? 'Request Invite' : 'Sign In'}
                </button>
                </p>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
