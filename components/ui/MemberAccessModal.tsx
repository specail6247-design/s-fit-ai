import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
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
      onClose();
    } catch (err: unknown) {
      setError((err as Error).message);
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
       setError((err as Error).message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2000]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[2001] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-void-black border border-white/10 w-full max-w-sm rounded-none p-8 relative shadow-[0_0_40px_rgba(0,0,0,0.5)] pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-soft-gray hover:text-white transition-colors"
              >
                ✕
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-[family-name:var(--font-display)] font-bold text-white tracking-wider uppercase mb-2">
                  {isLogin ? 'Member Access' : 'Join the Club'}
                </h2>
                <div className="h-0.5 w-12 bg-[var(--color-primary)] mx-auto" />
              </div>

              {/* Form */}
              <form onSubmit={handleAuth} className="space-y-6">
                 {error && (
                    <div className="text-red-500 text-xs text-center bg-red-500/10 py-2 rounded">
                        {error}
                    </div>
                 )}
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/30 text-sm focus:border-[var(--color-primary)] outline-none transition-colors font-mono"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="PASSWORD"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder-white/30 text-sm focus:border-[var(--color-primary)] outline-none transition-colors font-mono"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-4 hover:bg-[var(--color-primary)] transition-all duration-300 disabled:opacity-50 uppercase tracking-widest text-sm"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Enter' : 'Apply')}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] text-soft-gray uppercase tracking-widest">Via</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* Socials */}
              <div className="flex justify-center gap-6">
                {[
                    { id: 'google', icon: '🇬' },
                    { id: 'apple', icon: '🍎' },
                    { id: 'kakao', icon: '💬' },
                    { id: 'discord', icon: '🎮' }
                ].map((social) => (
                    <button
                        key={social.id}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onClick={() => handleSocialLogin(social.id as any)}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-lg hover:border-white hover:bg-white/5 transition-all"
                    >
                        {social.icon}
                    </button>
                ))}
              </div>

              {/* Toggle */}
              <p className="mt-8 text-center text-xs text-soft-gray uppercase tracking-wider">
                {isLogin ? "Not on the list?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white border-b border-transparent hover:border-white transition-all ml-2"
                >
                  {isLogin ? 'Apply for access' : 'Sign in'}
                </button>
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
