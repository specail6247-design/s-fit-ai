'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabaseClient';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export function LoginModal() {
  const { isLoginOpen, setIsLoginOpen } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsLoginOpen(false);
  };

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
      {isLoginOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm glass-card border border-white/10 bg-void-black rounded-2xl p-8 overflow-hidden"
            variants={modalVariants}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white tracking-widest uppercase" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                {isLogin ? 'Member Access' : 'Join VIP'}
              </h2>
              <p className="text-xs text-soft-gray mt-2 tracking-wider">
                {isLogin ? 'Welcome back to S_FIT' : 'Create your digital identity'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-8 relative z-10">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/30"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-void-black font-bold py-4 rounded-none hover:bg-gray-200 transition-colors disabled:opacity-50 mt-6 tracking-widest uppercase text-xs"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-soft-gray tracking-widest uppercase">Or Continue With</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2 relative z-10">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors" aria-label="Google Login">
                <span className="text-lg">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100] hover:bg-[#FADB00] py-3 flex items-center justify-center transition-colors" aria-label="Kakao Login">
                <span className="text-lg text-[#371D1E]">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white hover:bg-gray-100 py-3 flex items-center justify-center transition-colors" aria-label="Apple Login">
                <span className="text-lg text-black">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2] hover:bg-[#4752C4] py-3 flex items-center justify-center transition-colors" aria-label="Discord Login">
                <span className="text-lg text-white">🎮</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-soft-gray relative z-10">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:underline ml-1 uppercase tracking-widest text-[10px]"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
