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
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.3 } },
};

export function LoginModal() {
  const { isLoginOpen, setIsLoginOpen } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => setIsLoginOpen(false);

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
      handleClose();
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm glass-card overflow-hidden border border-white/10 shadow-2xl rounded-2xl"
            variants={modalVariants}
          >
             {/* Decorative Elements */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

            {/* Content */}
            <div className="p-8 relative z-10">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-light tracking-wider text-pure-white uppercase font-serif italic">
                  Member Access
                 </h2>
                 <button onClick={handleClose} className="text-white/50 hover:text-white transition-colors">
                   ✕
                 </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-5">
                <div className="space-y-1">
                   <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Email Identity</label>
                   <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-white/30 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="space-y-1">
                   <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Passkey</label>
                   <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-white/30 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pure-white text-void-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-all transform hover:scale-[1.01] active:scale-[0.99] tracking-widest text-xs uppercase"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Register')}
                </button>
              </form>

              <div className="flex items-center gap-4 my-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] text-gray-600 uppercase tracking-widest">Or Continue With</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={() => handleSocialLogin('google')} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110" title="Google">
                   <span className="text-xl">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110" title="Apple">
                   <span className="text-xl">🍎</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} className="w-12 h-12 rounded-full border border-white/10 bg-[#FAE100]/10 hover:bg-[#FAE100]/20 flex items-center justify-center transition-all hover:scale-110" title="Kakao">
                   <span className="text-xl">💬</span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} className="w-12 h-12 rounded-full border border-white/10 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 flex items-center justify-center transition-all hover:scale-110" title="Discord">
                   <span className="text-xl">🎮</span>
                </button>
              </div>

              <p className="mt-8 text-center text-xs text-gray-500">
                {isLogin ? "New to S_FIT?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:text-[#007AFF] underline underline-offset-4 transition-colors ml-1"
                >
                  {isLogin ? 'Apply for Access' : 'Sign In'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
