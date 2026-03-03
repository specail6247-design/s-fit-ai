'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useStore } from '@/store/useStore';

export function LoginModal() {
  const isLoginOpen = useStore((state) => state.isLoginOpen);
  const setLoginOpen = useStore((state) => state.setLoginOpen);

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card bg-void-black border border-white/10 w-full max-w-sm rounded-2xl p-8 relative shadow-2xl overflow-hidden"
        >
          {/* subtle gold luxury gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />

          <button
            onClick={() => setLoginOpen(false)}
            className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
            aria-label="Close Member Access"
          >
            ✕
          </button>

          <h2 className="text-2xl font-black text-pure-white mb-2 text-center uppercase tracking-widest" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
            {isLogin ? 'Member Access' : 'VIP Access'}
          </h2>
          <p className="text-center text-xs text-soft-gray tracking-[0.2em] mb-8 uppercase">
            {isLogin ? 'Sign In to your account' : 'Apply for membership'}
          </p>

          <form onSubmit={handleAuth} className="space-y-4 mb-8 font-sans">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white text-xs tracking-widest focus:border-[#FFD700] outline-none transition-colors"
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white text-xs tracking-widest focus:border-[#FFD700] outline-none transition-colors"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pure-white text-void-black font-bold py-3 rounded-none hover:bg-gray-200 transition-colors disabled:opacity-50 text-xs tracking-[0.2em] uppercase mt-2"
            >
              {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <div className="flex items-center gap-4 mb-6 opacity-50">
            <div className="h-px bg-white/20 flex-1" />
            <span className="text-[10px] text-pure-white tracking-widest uppercase">OR CONNECT</span>
            <div className="h-px bg-white/20 flex-1" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleSocialLogin('google')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-none flex items-center justify-center transition-colors"
              aria-label="Login with Google"
            >
              <span className="text-sm grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" role="img" aria-label="Google">🇬</span>
            </button>
            <button
              onClick={() => handleSocialLogin('kakao')}
              className="bg-white/5 hover:bg-[#FAE100] border border-white/10 hover:border-[#FAE100] text-pure-white hover:text-void-black py-3 rounded-none flex items-center justify-center transition-colors group"
              aria-label="Login with Kakao"
            >
              <span className="text-sm opacity-80 group-hover:opacity-100 transition-all" role="img" aria-label="Kakao">💬</span>
            </button>
            <button
              onClick={() => handleSocialLogin('apple')}
              className="bg-white/5 hover:bg-pure-white border border-white/10 hover:border-pure-white text-pure-white hover:text-void-black py-3 rounded-none flex items-center justify-center transition-colors group"
              aria-label="Login with Apple"
            >
              <span className="text-sm opacity-80 group-hover:opacity-100 transition-all" role="img" aria-label="Apple">🍎</span>
            </button>
            <button
              onClick={() => handleSocialLogin('discord')}
              className="bg-white/5 hover:bg-[#5865F2] border border-white/10 hover:border-[#5865F2] text-pure-white py-3 rounded-none flex items-center justify-center transition-colors group"
              aria-label="Login with Discord"
            >
              <span className="text-sm opacity-80 group-hover:opacity-100 transition-all" role="img" aria-label="Discord">🎮</span>
            </button>
          </div>

          <p className="mt-8 text-center text-[10px] text-soft-gray tracking-widest uppercase">
            {isLogin ? "Not a member?" : "Already a member?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-pure-white hover:text-[#FFD700] ml-2 transition-colors border-b border-transparent hover:border-[#FFD700]"
            >
              {isLogin ? 'Apply Now' : 'Sign In'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
