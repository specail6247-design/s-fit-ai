'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
      onClose();
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
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 p-10 shadow-[0_0_50px_rgba(201,176,55,0.05)] rounded-sm"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors text-xl font-light"
            >
              ✕
            </button>

            <div className="text-center mb-10">
              <h2 className="text-2xl font-['Geist'] tracking-widest text-[#F4E4BC] uppercase mb-2">Member Access</h2>
              <p className="text-xs text-white/40 tracking-[0.2em] uppercase font-mono">Exclusive Fitting Privileges</p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase tracking-widest pl-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-1 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder:text-white/20"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase tracking-widest pl-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-1 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder:text-white/20"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 text-xs tracking-widest uppercase hover:bg-[#C9B037] transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Apply for Access')}
              </button>
            </form>

            <div className="mt-10 mb-8 flex items-center gap-4 opacity-50">
              <div className="h-px bg-white flex-1" />
              <span className="text-[10px] text-white uppercase tracking-widest">Or authenticate via</span>
              <div className="h-px bg-white flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent border border-white/20 hover:border-white/50 py-3 flex items-center justify-center gap-3 transition-colors">
                <span className="text-sm opacity-80">🇬</span> <span className="text-[10px] text-white uppercase tracking-widest">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent border border-white/20 hover:border-white/50 py-3 flex items-center justify-center gap-3 transition-colors">
                <span className="text-sm opacity-80">🍎</span> <span className="text-[10px] text-white uppercase tracking-widest">Apple</span>
              </button>
            </div>

            <p className="mt-10 text-center text-[10px] text-white/40 uppercase tracking-widest">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-white ml-2 transition-colors"
              >
                {isLogin ? 'Request Invite' : 'Sign In'}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
