'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
          key="login-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Overlay Click to Close */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            key="login-modal"
            className="bg-[#050505] border border-white/10 w-full max-w-sm rounded-3xl p-8 relative shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-[#007AFF]/10 to-transparent pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors z-10"
              aria-label="Close Modal"
            >
              ✕
            </button>

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl font-black text-white tracking-tighter italic">
                S_FIT <span className="text-[#007AFF]">NEO</span>
              </h2>
              <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mt-2">
                Member Access
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-8 relative z-10">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-[#007AFF] outline-none transition-colors placeholder:text-gray-600"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-[#007AFF] outline-none transition-colors placeholder:text-gray-600"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 mt-2"
              >
                {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'BECOME A MEMBER')}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="h-[1px] bg-white/10 flex-1" />
              <span className="text-[10px] tracking-widest text-gray-500 uppercase">Or Connect With</span>
              <div className="h-[1px] bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button type="button" onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-xs text-white font-medium">Google</span>
              </button>
              <button type="button" onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100] hover:bg-[#FADB00] text-[#371D1E] py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">💬</span> <span className="text-xs font-bold">Kakao</span>
              </button>
              <button type="button" onClick={() => handleSocialLogin('apple')} className="bg-white hover:bg-gray-100 text-black py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-xs font-bold">Apple</span>
              </button>
              <button type="button" onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🎮</span> <span className="text-xs font-bold">Discord</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-gray-500 relative z-10">
              {isLogin ? "DON'T HAVE AN ACCOUNT?" : "ALREADY A MEMBER?"}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#007AFF] hover:text-white transition-colors ml-1 border-b border-[#007AFF] hover:border-white pb-0.5"
              >
                {isLogin ? 'APPLY NOW' : 'LOG IN'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
