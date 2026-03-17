import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-void-black border border-white/10 w-full max-w-sm rounded-3xl p-8 relative shadow-[0_0_40px_rgba(204,255,0,0.1)] overflow-hidden"
          >
            {/* VIP Ambience Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-lime to-transparent opacity-50" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-soft-gray hover:text-cyber-lime transition-colors z-10"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase font-mono">
                {isLogin ? 'Member Access' : 'Exclusive Portal'}
              </h2>
              <p className="text-xs text-cyber-lime mt-1 tracking-widest uppercase">
                {isLogin ? 'Identify Yourself' : 'Join The Club'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-8 relative z-10">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border-b border-white/20 px-0 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-gray-600 bg-transparent"
                  required
                />
              </div>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border-b border-white/20 px-0 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-gray-600 bg-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyber-lime text-void-black font-black py-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 tracking-widest uppercase mt-4 text-xs"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
              </button>
            </form>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] bg-white/10 flex-1" />
                <span className="text-[10px] text-gray-500 tracking-widest uppercase">Fast Track</span>
                <div className="h-[1px] bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-lg">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/10 hover:bg-[#FAE100]/20 border border-[#FAE100]/20 text-[#FAE100] py-3 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-lg">💬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-lg">🍎</span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/20 text-[#5865F2] py-3 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-lg">🎮</span>
                </button>
              </div>
            </div>

            <div className="mt-8 text-center relative z-10">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                {isLogin ? "Not a member yet? " : "Already have access? "}
                <span className="text-cyber-lime underline decoration-cyber-lime/30 underline-offset-4">
                  {isLogin ? 'Request Access' : 'Sign In'}
                </span>
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
