'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

export function LoginModal() {
  const isLoginOpen = useStore((state) => state.isLoginOpen);
  const setIsLoginOpen = useStore((state) => state.setIsLoginOpen);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLoginOpen) return null;

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
      setIsLoginOpen(false);
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-void-black border border-white/10 w-full max-w-sm rounded-2xl p-8 relative shadow-[0_0_40px_rgba(255,255,255,0.05)] glass-card"
        >
          <button
            onClick={() => setIsLoginOpen(false)}
            className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
          >
            ✕
          </button>

          <h2 className="text-2xl font-black text-white mb-2 tracking-tight text-center uppercase">
            {isLogin ? 'Member Access' : 'Apply for Access'}
          </h2>
          <p className="text-xs text-soft-gray text-center mb-8 uppercase tracking-widest">
            Exclusive Virtual Fitting
          </p>

          <form onSubmit={handleAuth} className="space-y-4 mb-8">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/30"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/30"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-none hover:bg-gray-200 transition-colors disabled:opacity-50 mt-6 uppercase tracking-wider text-xs"
            >
              {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="flex items-center gap-3 mb-8">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-[10px] text-soft-gray uppercase tracking-widest">Or continue with</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center gap-2 transition-colors">
              <span className="text-lg" role="img" aria-label="Google">🇬</span> <span className="text-[10px] text-white uppercase tracking-wider">Google</span>
            </button>
            <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center gap-2 transition-colors">
              <span className="text-lg" role="img" aria-label="Apple">🍎</span> <span className="text-[10px] text-white uppercase tracking-wider">Apple</span>
            </button>
          </div>

          <p className="mt-8 text-center text-[10px] text-soft-gray uppercase tracking-widest">
            {isLogin ? "Not a member?" : "Already a member?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:underline ml-1 font-bold"
            >
              {isLogin ? 'Apply' : 'Sign In'}
            </button>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
