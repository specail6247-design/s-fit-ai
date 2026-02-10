'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabaseClient';

export default function MemberAccessModal() {
  const { isLoginModalOpen, setLoginModalOpen } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'apple') => {
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
      } catch (error: any) {
        alert(`${provider} Login Error: ` + error.message);
      }
    };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoginModalOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4"
          >
            <div className="bg-[#0a0a0a] border border-[#ecab13]/20 w-full max-w-md p-8 md:p-12 relative shadow-[0_0_50px_rgba(236,171,19,0.1)] pointer-events-auto overflow-hidden">
                {/* Gold Line Decoration */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ecab13] to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ecab13] to-transparent opacity-50" />

                <button
                    onClick={() => setLoginModalOpen(false)}
                    className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>

                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-serif text-white tracking-widest mb-2">
                        {isLogin ? 'MEMBER ACCESS' : 'JOIN THE CLUB'}
                    </h2>
                    <p className="text-[#ecab13] text-xs tracking-[0.2em] uppercase">
                        {isLogin ? 'Welcome Back' : 'Exclusive Benefits'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-[#ecab13] outline-none transition-colors font-mono text-sm placeholder-white/10"
                            placeholder="user@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-[#ecab13] outline-none transition-colors font-mono text-sm placeholder-white/10"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ecab13] hover:bg-[#d49a11] text-black font-bold py-4 mt-4 uppercase tracking-widest text-xs transition-all hover:scale-[1.02]"
                    >
                        {loading ? 'Authenticating...' : (isLogin ? 'Enter Vault' : 'Apply for Access')}
                    </button>
                </form>

                <div className="mt-8 flex items-center gap-4">
                     <div className="h-px bg-white/10 flex-1" />
                     <span className="text-[10px] text-gray-600 uppercase tracking-widest">Or Continue With</span>
                     <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">
                    {['google', 'apple', 'kakao'].map((provider) => (
                        <button
                            key={provider}
                            onClick={() => handleSocialLogin(provider as any)}
                            className="border border-white/10 hover:border-white/30 py-3 flex items-center justify-center transition-colors group"
                        >
                             <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">
                                {provider === 'google' && '🇬'}
                                {provider === 'apple' && '🍎'}
                                {provider === 'kakao' && '💬'}
                             </span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-xs text-gray-500 hover:text-[#ecab13] transition-colors tracking-widest uppercase"
                    >
                        {isLogin ? 'New Member? Apply Here' : 'Already a Member? Access'}
                    </button>
                </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
