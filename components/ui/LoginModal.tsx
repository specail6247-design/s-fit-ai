'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function LoginModal() {
  const { isLoginOpen, toggleLogin } = useStore();
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
      toggleLogin();
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleLogin}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md p-8 bg-void-black border border-white/10 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] rounded-sm glass-card"
          >
            {/* Close Button */}
            <button
              onClick={toggleLogin}
              className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl font-cinzel text-white mb-2 tracking-widest uppercase">
                Member Access
              </h2>
              <p className="text-xs text-soft-gray tracking-widest font-mono uppercase">
                {isLogin ? 'Enter the Vault' : 'Join the Collective'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-sm font-mono focus:border-white outline-none placeholder:text-white/20 transition-colors rounded-none"
                  required
                />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-sm font-mono focus:border-white outline-none placeholder:text-white/20 transition-colors rounded-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 text-xs tracking-[0.2em] hover:bg-gray-200 transition-all disabled:opacity-50 uppercase"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-soft-gray tracking-widest">OR CONNECT WITH</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Social Buttons (Minimalist) */}
            <div className="grid grid-cols-4 gap-4">
              <SocialButton icon="🇬" onClick={() => handleSocialLogin('google')} label="Google" />
              <SocialButton icon="💬" onClick={() => handleSocialLogin('kakao')} label="Kakao" />
              <SocialButton icon="🍎" onClick={() => handleSocialLogin('apple')} label="Apple" />
              <SocialButton icon="🎮" onClick={() => handleSocialLogin('discord')} label="Discord" />
            </div>

            {/* Footer Toggle */}
            <p className="mt-8 text-center text-[10px] text-soft-gray tracking-widest uppercase">
              {isLogin ? "New to S_FIT?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:underline ml-1 font-bold"
              >
                {isLogin ? 'Apply Here' : 'Enter Here'}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SocialButton({ icon, onClick, label }: { icon: string; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="aspect-square flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
      title={label}
    >
      <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">{icon}</span>
    </button>
  );
}
