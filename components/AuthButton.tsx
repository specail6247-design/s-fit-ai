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
        className="border border-white/20 bg-black/40 text-pure-white px-6 py-2 rounded-full text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest"
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
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-void-black border border-white/10 w-full max-w-md rounded-3xl p-10 relative shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <span className="text-xl">✕</span>
              </button>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                  S_FIT <span className="text-cyber-lime">VIP</span>
                </h2>
                <p className="text-xs text-soft-gray uppercase tracking-widest mt-2">
                  {isLogin ? 'Authenticate Identity' : 'Request Access'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder-soft-gray/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder-soft-gray/50"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pure-white text-void-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 mt-4 uppercase tracking-widest text-sm"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Join Club')}
                </button>
              </form>

              <div className="flex items-center gap-2 mb-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-xs text-soft-gray uppercase tracking-widest">OR</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <span className="text-lg">🇬</span> <span className="text-xs text-white uppercase tracking-wider">Google</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/90 hover:bg-[#FADB00] text-[#371D1E] py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <span className="text-lg">💬</span> <span className="text-xs font-bold uppercase tracking-wider">Kakao</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-white/90 hover:bg-white text-black py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <span className="text-lg">🍎</span> <span className="text-xs font-bold uppercase tracking-wider">Apple</span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/90 hover:bg-[#4752C4] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <span className="text-lg">🎮</span> <span className="text-xs font-bold uppercase tracking-wider">Discord</span>
                </button>
              </div>

              <p className="mt-8 text-center text-xs text-soft-gray uppercase tracking-widest">
                {isLogin ? "New to S_FIT?" : "Existing Member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-pure-white hover:text-cyber-lime transition-colors ml-2 font-bold underline underline-offset-4"
                >
                  {isLogin ? 'Request Access' : 'Authenticate'}
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
