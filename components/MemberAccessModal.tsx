'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabaseClient';

export default function MemberAccessModal() {
  const { isLoginModalOpen, setLoginModalOpen } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      setLoginModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`${provider} Login Error: ` + err.message);
      } else {
         setError(`${provider} Login Error`);
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-[#0a0a0a] border border-[#333] rounded-2xl p-8 relative shadow-2xl overflow-hidden"
          >
             {/* Gold decorative line */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />

            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>

            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-white mb-2 font-mono">
                Member Access
              </h2>
              <p className="text-xs text-[#666] uppercase tracking-widest">
                S_FIT PRIVATE CLUB
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] text-[#666] uppercase font-bold tracking-wider ml-1">Email Identity</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-xl focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/20 outline-none transition-all placeholder:text-[#333] font-mono text-sm"
                  placeholder="ENTER EMAIL"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#666] uppercase font-bold tracking-wider ml-1">Passcode</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-xl focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]/20 outline-none transition-all placeholder:text-[#333] font-mono text-sm"
                  placeholder="ENTER CODE"
                  required
                />
              </div>

              {error && (
                 <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-500 text-xs text-center">
                   {error}
                 </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-[#FFD700] transition-colors disabled:opacity-50 tracking-widest uppercase text-xs"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter Vault' : 'Request Access')}
              </button>
            </form>

            <div className="mt-8 flex flex-col items-center space-y-4">
              <div className="flex gap-4">
                 <button onClick={() => handleSocialLogin('google')} className="p-3 bg-[#111] rounded-full border border-[#333] hover:border-white transition-colors text-lg grayscale hover:grayscale-0">🇬</button>
                 <button onClick={() => handleSocialLogin('apple')} className="p-3 bg-[#111] rounded-full border border-[#333] hover:border-white transition-colors text-lg grayscale hover:grayscale-0">🍎</button>
                 <button onClick={() => handleSocialLogin('discord')} className="p-3 bg-[#111] rounded-full border border-[#333] hover:border-white transition-colors text-lg grayscale hover:grayscale-0">🎮</button>
              </div>

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-[#666] hover:text-[#FFD700] transition-colors uppercase tracking-widest"
              >
                {isLogin ? 'New Member? Apply Here' : 'Already a Member? Enter'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
