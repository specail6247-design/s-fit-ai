'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export default function MemberAccessModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  // Removed synchronous setState in useEffect to prevent cascading renders.
  // Use useLayoutEffect or handle mounting differently if hydration errors occur.
  // Given this is a client component relying on standard React mounting, we can just remove it.


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
        setMessage({ type: 'success', text: 'Check your email for the confirmation link!' });
        setTimeout(() => onClose(), 2000);
      }
      onClose();
    } catch (error: unknown) {
      setMessage({ type: 'error', text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setMessage({ type: 'error', text: `${provider} Login Error: ` + (error as Error).message });
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="member-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
          >
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-3xl font-black tracking-tighter uppercase mb-2 font-mono">
                  {isLogin ? 'Member Access' : 'Join the Club'}
                </h2>
                <p className="text-sm text-gray-400 font-sans">
                  {isLogin ? 'Enter your credentials to continue.' : 'Exclusive access to VIP fitting rooms.'}
                </p>
              </div>


              {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-mono border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                  {message.text}
                </div>
              )}
              <form onSubmit={handleAuth} className="space-y-4 mb-6">
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-white focus:bg-white/10 transition-all outline-none font-mono placeholder:text-gray-600"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-white focus:bg-white/10 transition-all outline-none font-mono placeholder:text-gray-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 mt-2 text-sm tracking-widest uppercase"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Request Access')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] text-gray-500 tracking-widest uppercase">Or Continue With</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                  onClick={() => handleSocialLogin('google')}
                  type="button"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                   <span className="text-sm font-medium text-white">Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin('apple')}
                  type="button"
                  className="bg-white hover:bg-gray-100 text-black py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                   <span className="text-sm font-bold">Apple</span>
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  {isLogin ? "Not a member? Apply now." : "Already a member? Sign in."}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
