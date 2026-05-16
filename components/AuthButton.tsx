'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
      setShowModal(false);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-xs text-soft-gray uppercase tracking-widest font-mono">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white px-4 py-2 rounded-none text-xs font-medium transition-colors border border-white/20 uppercase tracking-widest"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-transparent text-white border border-white/30 px-6 py-2.5 text-xs font-mono font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
      >
        MEMBER ACCESS
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0a0a0a] border border-[#2d2d2d] w-full max-w-sm p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 text-[#8a8a8a] hover:text-white transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-white tracking-widest uppercase font-mono">
                  {isLogin ? 'Member Access' : 'Join Club'}
                </h2>
                <div className="w-12 h-px bg-cyber-lime mx-auto mt-4" />
              </div>

              <form onSubmit={handleAuth} className="space-y-5 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-[#2d2d2d] px-0 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-[#4a4a4a] tracking-wider uppercase font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-[#2d2d2d] px-0 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-[#4a4a4a] tracking-wider uppercase font-mono text-xs"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold font-mono tracking-widest text-xs py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 uppercase mt-4"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Create Access')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-[#2d2d2d] flex-1" />
                <span className="text-[10px] tracking-widest text-[#4a4a4a] font-mono uppercase">Or Continue With</span>
                <div className="h-px bg-[#2d2d2d] flex-1" />
              </div>

              <div className="grid grid-cols-4 gap-3 mb-8">
                <button onClick={() => handleSocialLogin('google')} className="bg-[#111] hover:bg-[#222] border border-[#2d2d2d] py-3 flex items-center justify-center transition-colors group">
                  <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} className="bg-[#111] hover:bg-[#222] border border-[#2d2d2d] py-3 flex items-center justify-center transition-colors group">
                  <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">💬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-[#111] hover:bg-[#222] border border-[#2d2d2d] py-3 flex items-center justify-center transition-colors group">
                  <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity text-white"></span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} className="bg-[#111] hover:bg-[#222] border border-[#2d2d2d] py-3 flex items-center justify-center transition-colors group">
                  <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🎮</span>
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[10px] tracking-widest text-[#8a8a8a] hover:text-cyber-lime transition-colors uppercase font-mono"
                >
                  {isLogin ? 'Request Membership' : 'Already a Member?'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
