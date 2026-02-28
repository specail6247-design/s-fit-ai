'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export function LoginModal() {
  const isLoginOpen = useStore((state) => state.isLoginOpen);
  const setLoginOpen = useStore((state) => state.setLoginOpen);

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

  if (!isLoginOpen) return null;

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="glass-card bg-void-black border border-white/10 w-full max-w-sm rounded-2xl p-8 relative overflow-hidden"
          >
            {/* VIP Club aesthetic accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-50"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl"></div>

            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors p-2"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-2xl font-bold text-white tracking-wide font-display">
                {isLogin ? 'Member Access' : 'Join the Club'}
              </h2>
              <p className="text-xs text-soft-gray mt-2 tracking-widest uppercase font-mono">
                {isLogin ? 'Enter your credentials' : 'Create your VIP profile'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-6 relative z-10">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/50 outline-none transition-all placeholder:text-white/20 font-mono"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/50 outline-none transition-all placeholder:text-white/20 font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pure-white text-void-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 mt-2 uppercase tracking-wider text-sm"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-6 opacity-60">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-soft-gray tracking-widest uppercase font-mono">Or Connect Via</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/5 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-xs text-white/80 font-medium">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/10 hover:bg-[#FAE100]/20 border border-[#FAE100]/20 text-[#FAE100] py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">💬</span> <span className="text-xs font-medium">Kakao</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/5 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-xs font-medium">Apple</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/20 text-[#5865F2] py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🎮</span> <span className="text-xs font-medium">Discord</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-soft-gray font-mono">
              {isLogin ? "Not on the list?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-luxury-gold hover:text-white transition-colors ml-1 uppercase tracking-widest"
              >
                {isLogin ? 'Apply Here' : 'Sign In'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
