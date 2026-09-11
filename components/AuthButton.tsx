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
          <p className="text-[10px] uppercase tracking-widest text-soft-gray font-mono">Member</p>
          <p className="text-sm font-medium text-white max-w-[120px] truncate font-sans">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white px-5 py-2 text-xs font-medium tracking-widest uppercase transition-all border-b border-white/20 hover:border-white/80 cursor-pointer"
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
        className="text-white px-6 py-2 text-xs font-medium tracking-widest uppercase transition-all border-b border-white/20 hover:border-white/80 cursor-pointer"
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-transparent w-full max-w-md relative p-8 border border-white/10"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-0 right-0 text-white/50 hover:text-white text-xl p-4 cursor-pointer"
              >
                ✕
              </button>

              <div className="mb-10 text-center">
                <h2 className="text-3xl font-serif text-white mb-2 italic">
                  {isLogin ? 'Member Access' : 'Apply for Membership'}
                </h2>
                <p className="text-xs text-white/50 tracking-widest uppercase font-mono">
                  {isLogin ? 'Enter your credentials' : 'Join the exclusive club'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-8 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 rounded-none px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/30 tracking-widest uppercase"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 rounded-none px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/30 tracking-widest uppercase"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-medium py-4 text-sm tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4 cursor-pointer"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Enter' : 'Submit')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] text-white/30 tracking-widest uppercase font-mono">Or Continue With</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['google', 'apple', 'kakao', 'discord'].map((provider) => (
                  <button
                    key={provider}
                    type="button"
                    onClick={() => handleSocialLogin(provider as any)}
                    className="bg-transparent border border-white/10 hover:bg-white/5 text-white/70 hover:text-white py-3 flex items-center justify-center transition-colors uppercase text-[10px] tracking-widest cursor-pointer"
                  >
                    {provider}
                  </button>
                ))}
              </div>

              <p className="mt-10 text-center text-[10px] text-white/40 tracking-widest uppercase">
                {isLogin ? "Not a member?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:text-gray-300 ml-2 border-b border-white/30 pb-0.5 transition-colors cursor-pointer"
                >
                  {isLogin ? 'Apply' : 'Enter'}
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
