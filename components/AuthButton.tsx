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

  return (
    <>
      <div className="fixed top-6 right-6 z-40">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-[10px] tracking-widest text-soft-gray uppercase">Member</p>
              <p className="text-sm font-medium text-pure-white max-w-[100px] truncate">
                {user.email?.split('@')[0]}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-transparent hover:bg-white/5 text-pure-white px-4 py-2 rounded-none text-xs font-medium transition-colors border border-white/20 uppercase tracking-widest"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="bg-transparent text-pure-white px-5 py-2 text-xs font-bold hover:bg-white/5 transition-all border border-white/20 uppercase tracking-[0.2em]"
          >
            Member Access
          </button>
        )}
      </div>

      <AnimatePresence>
        {showModal && !user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-void-black border border-white/10 p-10 relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 luxury-shimmer opacity-20 pointer-events-none" />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-soft-gray hover:text-pure-white transition-colors p-2 z-10"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              <div className="text-center mb-10 relative z-10">
                <h2 className="text-2xl font-light text-pure-white uppercase tracking-[0.3em] font-serif">
                  {isLogin ? 'VIP Access' : 'Join Club'}
                </h2>
                <div className="h-px w-12 bg-luxury-gold mx-auto mt-4" />
              </div>

              <form onSubmit={handleAuth} className="space-y-6 relative z-10 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-pure-white text-xs tracking-widest focus:border-luxury-gold outline-none transition-colors uppercase placeholder:text-white/30"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-pure-white text-xs tracking-widest focus:border-luxury-gold outline-none transition-colors uppercase placeholder:text-white/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pure-white text-void-black font-bold py-4 text-xs uppercase tracking-[0.2em] hover:bg-luxury-gold transition-colors disabled:opacity-50 mt-4"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </button>
              </form>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[10px] text-soft-gray tracking-widest uppercase">Or Continue With</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                    <span className="text-lg">🇬</span>
                  </button>
                  <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                    <span className="text-lg">💬</span>
                  </button>
                  <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                    <span className="text-lg">🍎</span>
                  </button>
                  <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                    <span className="text-lg">🎮</span>
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[10px] text-soft-gray hover:text-pure-white tracking-widest uppercase transition-colors"
                  >
                    {isLogin ? 'Request Membership' : 'Existing Member Login'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
