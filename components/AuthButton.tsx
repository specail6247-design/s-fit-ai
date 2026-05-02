'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

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
        alert('확인 이메일을 전송했습니다!'); // 한국어 주석: 사용자에게 확인 이메일 전송 알림
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
          queryParams: { access_type: 'offline', prompt: 'consent' },
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
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-xs text-[#F4E4BC]/70 font-mono tracking-widest uppercase">Member</p>
          <p className="text-sm font-serif text-[#F4E4BC] max-w-[120px] truncate italic">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent border border-[#F4E4BC]/30 hover:border-[#F4E4BC] text-[#F4E4BC] px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300"
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
        className="fixed top-6 right-6 z-50 bg-transparent border border-[#F4E4BC]/50 hover:border-[#F4E4BC] text-[#F4E4BC] px-8 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 backdrop-blur-sm"
      >
        Member Access
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0A0A0A] border border-[#F4E4BC]/20 w-full max-w-md rounded-sm p-10 relative overflow-hidden shadow-2xl"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#F4E4BC]/30 m-4" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#F4E4BC]/30 m-4" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#F4E4BC]/30 m-4" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#F4E4BC]/30 m-4" />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-[#F4E4BC]/50 hover:text-[#F4E4BC] text-sm font-mono transition-colors"
              >
                [ CLOSE ]
              </button>

              <div className="text-center mb-10 mt-4">
                <h2 className="text-4xl font-serif text-[#F4E4BC] italic mb-2 tracking-wide">
                  {isLogin ? 'Sign In' : 'Join Us'}
                </h2>
                <p className="text-xs font-mono text-[#F4E4BC]/50 tracking-widest uppercase">
                  {isLogin ? 'VIP Access' : 'Become a Member'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-8 mb-10">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-[#F4E4BC]/30 px-0 py-3 text-[#F4E4BC] text-sm font-mono focus:ring-0 focus:border-[#F4E4BC] outline-none transition-colors placeholder:text-[#F4E4BC]/30"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-[#F4E4BC]/30 px-0 py-3 text-[#F4E4BC] text-sm font-mono focus:ring-0 focus:border-[#F4E4BC] outline-none transition-colors placeholder:text-[#F4E4BC]/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F4E4BC] text-[#0A0A0A] font-serif italic py-4 text-lg hover:bg-white transition-colors disabled:opacity-50 mt-4"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Register')}
                </button>
              </form>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] bg-[#F4E4BC]/10 flex-1" />
                <span className="text-[10px] font-mono text-[#F4E4BC]/40 uppercase tracking-[0.2em]">Social Access</span>
                <div className="h-[1px] bg-[#F4E4BC]/10 flex-1" />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <button onClick={() => handleSocialLogin('google')} className="bg-[#111] hover:bg-[#222] border border-[#F4E4BC]/10 py-3 flex items-center justify-center transition-colors group">
                  <span className="text-xl grayscale group-hover:grayscale-0 transition-all">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} className="bg-[#111] hover:bg-[#222] border border-[#F4E4BC]/10 py-3 flex items-center justify-center transition-colors group">
                  <span className="text-xl grayscale group-hover:grayscale-0 transition-all text-[#FAE100]">💬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="bg-[#111] hover:bg-[#222] border border-[#F4E4BC]/10 py-3 flex items-center justify-center transition-colors group">
                  <span className="text-xl grayscale group-hover:grayscale-0 transition-all text-white">🍎</span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} className="bg-[#111] hover:bg-[#222] border border-[#F4E4BC]/10 py-3 flex items-center justify-center transition-colors group">
                  <span className="text-xl grayscale group-hover:grayscale-0 transition-all text-[#5865F2]">🎮</span>
                </button>
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs font-mono text-[#F4E4BC]/50 hover:text-[#F4E4BC] transition-colors tracking-widest uppercase border-b border-transparent hover:border-[#F4E4BC]/50 pb-1"
                >
                  {isLogin ? 'Request Membership' : 'Existing Member?'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
