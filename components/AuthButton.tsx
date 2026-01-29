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
          <p className="text-[10px] uppercase tracking-widest text-soft-gray">Member</p>
          <p className="text-sm font-bold text-white max-w-[120px] truncate font-mono">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-bold text-white hover:text-cyber-lime transition-colors uppercase tracking-widest border-b border-transparent hover:border-cyber-lime pb-0.5"
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
        className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white/40 bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all"
      >
        <span className="w-2 h-2 rounded-full bg-cyber-lime animate-pulse" />
        <span className="text-xs font-bold text-white tracking-widest uppercase">Member Access</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-void-black border border-white/10 w-full max-w-sm rounded-none p-8 relative shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white uppercase tracking-[0.2em] font-[family-name:var(--font-display)] mb-2">
                  VIP Access
                </h2>
                <p className="text-xs text-soft-gray uppercase tracking-widest">
                  {isLogin ? 'Enter the Club' : 'Join the List'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6 mb-8">
                <div className="space-y-4">
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-white/20 tracking-wider font-mono"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-white/20 tracking-wider font-mono"
                            required
                        />
                    </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-4 text-xs uppercase tracking-[0.2em] hover:bg-cyber-lime transition-all disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Enter' : 'Apply')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-6 opacity-50">
                <div className="h-px bg-white/20 flex-1" />
                <span className="text-[10px] uppercase tracking-widest text-soft-gray">Or</span>
                <div className="h-px bg-white/20 flex-1" />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {(['google', 'kakao', 'apple', 'discord'] as const).map((provider) => (
                    <button
                        key={provider}
                        onClick={() => handleSocialLogin(provider)}
                        className="aspect-square flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        title={provider}
                    >
                        <span className="text-lg opacity-80">
                            {provider === 'google' && '🇬'}
                            {provider === 'kakao' && '💬'}
                            {provider === 'apple' && '🍎'}
                            {provider === 'discord' && '🎮'}
                        </span>
                    </button>
                ))}
              </div>

              <p className="mt-8 text-center text-[10px] text-soft-gray uppercase tracking-wider">
                {isLogin ? "Not on the list?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:text-cyber-lime transition-colors underline decoration-white/20 underline-offset-4"
                >
                  {isLogin ? 'Apply Now' : 'Sign In'}
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
