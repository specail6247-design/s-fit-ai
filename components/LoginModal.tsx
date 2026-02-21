'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabaseClient';

const LoginModal = () => {
  const { isLoginOpen, setLoginOpen } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clear state on close
  useEffect(() => {
    if (!isLoginOpen) {
      setErrorMsg(null);
      setLoading(false);
    }
  }, [isLoginOpen]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setLoginOpen(false); // Close on success
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
        setLoginOpen(false);
      }
    } catch (error: unknown) {
      setErrorMsg((error as Error).message);
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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoginOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit p-8 z-50 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black italic tracking-tighter mb-2">
                MEMBER <span className="text-[#007AFF]">ACCESS</span>
              </h2>
              <p className="text-xs text-gray-500 tracking-[0.2em] uppercase">
                Enter the inner circle
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#007AFF] focus:bg-white/10 outline-none transition-all placeholder:text-gray-700"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#007AFF] focus:bg-white/10 outline-none transition-all placeholder:text-gray-700"
                  placeholder="••••••••"
                  required
                />
              </div>

              {errorMsg && (
                <div className="text-red-500 text-xs text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,122,255,0.3)] text-sm tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : (isLogin ? 'Enter' : 'Join Now')}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-600 uppercase tracking-widest">Or via</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Social Login (Minimal) */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              <SocialButton icon="🇬" onClick={() => handleSocialLogin('google')} label="Google" />
              <SocialButton icon="💬" onClick={() => handleSocialLogin('kakao')} label="Kakao" color="text-[#371D1E] bg-[#FAE100] hover:bg-[#FADB00]" />
              <SocialButton icon="🍎" onClick={() => handleSocialLogin('apple')} label="Apple" />
              <SocialButton icon="🎮" onClick={() => handleSocialLogin('discord')} label="Discord" color="bg-[#5865F2] hover:bg-[#4752C4]" />
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500">
              {isLogin ? "New to the club?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-[#007AFF] font-bold transition-colors ml-1 underline underline-offset-4 decoration-white/20 hover:decoration-[#007AFF]"
              >
                {isLogin ? 'Apply for Access' : 'Sign In'}
              </button>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SocialButton = ({
  icon,
  onClick,
  label,
  color = "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
}: {
  icon: string;
  onClick: () => void;
  label: string;
  color?: string;
}) => (
  <button
    onClick={onClick}
    className={`h-12 rounded-xl flex items-center justify-center text-lg transition-all ${color}`}
    title={label}
  >
    {icon}
  </button>
);

export default LoginModal;
