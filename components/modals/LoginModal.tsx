'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function LoginModal() {
  const { isLoginOpen, setLoginOpen } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoginOpen(false);
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

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void-black/80 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm relative"
          >
            {/* VIP Glass Card */}
            <div className="bg-void-black/60 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
              <button
                onClick={() => setLoginOpen(false)}
                className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                {isLogin ? 'Member Access' : 'Apply for Access'}
              </h2>

              <form onSubmit={handleAuth} className="space-y-6 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/40 font-mono"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/40 font-mono"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pure-white text-void-black font-bold py-3 rounded-none tracking-widest hover:bg-white/80 transition-colors disabled:opacity-50 mt-4 uppercase text-sm"
                  style={{ fontFamily: 'var(--font-cinzel), serif' }}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Join')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-6 opacity-60">
                <div className="h-px bg-white/20 flex-1" />
                <span className="text-[10px] text-white tracking-widest uppercase font-mono">Or Connect</span>
                <div className="h-px bg-white/20 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-none flex items-center justify-center gap-2 transition-colors">
                  <span className="text-lg">🇬</span> <span className="text-xs text-white uppercase tracking-wider">Google</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-none flex items-center justify-center gap-2 transition-colors">
                  <span className="text-lg">🍎</span> <span className="text-xs text-white uppercase tracking-wider">Apple</span>
                </button>
              </div>

              <p className="text-center text-xs text-soft-gray font-mono">
                {isLogin ? "Not a member?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:underline ml-1 uppercase tracking-wider"
                >
                  {isLogin ? 'Apply' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
