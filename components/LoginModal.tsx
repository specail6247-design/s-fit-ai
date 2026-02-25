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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClose = () => {
    setLoginOpen(false);
    setErrorMsg(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      handleClose();
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
      setErrorMsg((error as Error).message);
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
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full max-w-sm pointer-events-auto mx-4">
              <div className="glass-card bg-void-black/90 p-8 relative overflow-hidden border border-white/10">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-lime to-transparent opacity-50" />

                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors"
                >
                  ✕
                </button>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-wider">
                    MEMBER ACCESS
                  </h2>
                  <p className="text-xs text-soft-gray uppercase tracking-widest">
                    Enter the VIP Lounge
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4 mb-8">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-soft-gray ml-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-cyber-lime focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                      placeholder="vip@s-fit.ai"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-soft-gray ml-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-cyber-lime focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-cyber-lime hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? 'PROCESSING...' : (isLogin ? 'ENTER CLUB' : 'APPLY FOR ACCESS')}
                  </button>
                </form>

                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[10px] text-soft-gray uppercase tracking-widest">Or Connect With</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-4 gap-2 mb-6">
                   <SocialButton icon="🇬" onClick={() => handleSocialLogin('google')} label="Google" />
                   <SocialButton icon="💬" onClick={() => handleSocialLogin('kakao')} label="Kakao" />
                   <SocialButton icon="🍎" onClick={() => handleSocialLogin('apple')} label="Apple" />
                   <SocialButton icon="🎮" onClick={() => handleSocialLogin('discord')} label="Discord" />
                </div>

                <p className="text-center text-xs text-soft-gray">
                  {isLogin ? "Not on the list?" : "Already a member?"}{' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-cyber-lime hover:text-white transition-colors ml-1 font-bold"
                  >
                    {isLogin ? 'Apply Now' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SocialButton({ icon, onClick, label }: { icon: string; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="bg-white/5 hover:bg-white/10 border border-white/10 h-10 rounded-lg flex items-center justify-center transition-all hover:border-white/30"
      title={label}
    >
      <span className="text-lg">{icon}</span>
    </button>
  );
}
