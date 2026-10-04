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
        className="bg-[#007AFF] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-[#005bb5] transition-all tracking-widest uppercase shadow-[0_0_15px_rgba(0,122,255,0.3)]"
      >
        MEMBER ACCESS
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-2xl p-10 relative shadow-2xl z-10"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-black tracking-tighter italic mb-2 text-white uppercase">
                  {isLogin ? 'Member Access' : 'Join the Club'}
                </h2>
                <p className="text-xs text-[#007AFF] tracking-widest uppercase">
                  {isLogin ? 'VIP Entry' : 'Exclusive Access'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-black tracking-widest uppercase py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4 rounded-none"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Join Now')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Or connect with</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center gap-2 transition-colors rounded-none">
                  <span className="text-lg">🇬</span> <span className="text-xs text-white font-bold tracking-wider">GOOGLE</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-white hover:bg-gray-100 text-black py-3 flex items-center justify-center gap-2 transition-colors rounded-none">
                  <span className="text-lg">🍎</span> <span className="text-xs font-black tracking-wider">APPLE</span>
                </button>
              </div>

              <p className="mt-8 text-center text-xs text-gray-500 tracking-widest uppercase">
                {isLogin ? "New here?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:text-[#007AFF] transition-colors ml-1 font-bold"
                >
                  {isLogin ? 'Apply' : 'Sign in'}
                </button>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
