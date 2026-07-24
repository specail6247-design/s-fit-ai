'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

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
        className="bg-cyber-lime text-void-black px-5 py-2 rounded-full text-xs font-bold font-[family-name:var(--font-space-grotesk)] hover:brightness-110 transition-all shadow-lg"
      >
        LOGIN
      </button>

      <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-[#0A0A0A] border border-[#C9B037]/30 w-full max-w-md p-10 relative shadow-[0_0_50px_rgba(201,176,55,0.1)]"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-[#C9B037] transition-colors"
            >
              ✕
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl text-[#C9B037] mb-2 text-center tracking-widest font-[family-name:var(--font-cinzel)]">
                MEMBER ACCESS
              </h2>
              <p className="text-center text-white/50 text-xs mb-8 font-[family-name:var(--font-space-grotesk)] uppercase tracking-[0.2em]">
                {isLogin ? 'Enter the VIP Club' : 'Join the Elite'}
              </p>
            </motion.div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1"
              >
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors font-[family-name:var(--font-space-grotesk)] placeholder:text-white/30"
                  required
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-1"
              >
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors font-[family-name:var(--font-space-grotesk)] placeholder:text-white/30"
                  required
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#d4bb42' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold py-4 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 font-[family-name:var(--font-space-grotesk)] mt-4"
              >
                {loading ? 'AUTHENTICATING...' : (isLogin ? 'SIGN IN' : 'REQUEST ACCESS')}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 mb-8 opacity-50"
            >
              <div className="h-[1px] bg-white/20 flex-1" />
              <span className="text-[10px] text-white tracking-widest font-[family-name:var(--font-space-grotesk)]">OR CONNECT WITH</span>
              <div className="h-[1px] bg-white/20 flex-1" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                 <span className="text-white text-xs tracking-widest font-[family-name:var(--font-space-grotesk)]">GOOGLE</span>
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                 <span className="text-white text-xs tracking-widest font-[family-name:var(--font-space-grotesk)]">APPLE</span>
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center text-xs text-white/50 font-[family-name:var(--font-space-grotesk)]"
            >
              {isLogin ? "NOT A MEMBER?" : "ALREADY A MEMBER?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-white transition-colors tracking-widest ml-2"
              >
                {isLogin ? 'JOIN NOW' : 'SIGN IN'}
              </button>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence></>
  );
}
