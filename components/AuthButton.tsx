'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

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
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-white/40 tracking-widest uppercase">Member</p>
          <p className="text-sm font-bold text-white max-w-[120px] truncate tracking-tight">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white/70 hover:text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest transition-all border border-white/10 hover:border-white/30"
        >
          EXIT
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group relative overflow-hidden bg-transparent border border-white/20 hover:border-white/50 text-white px-8 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] transition-all"
      >
        <span className="relative z-10">MEMBER ACCESS</span>
        <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-2xl p-8 relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#007AFF] to-transparent opacity-50" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                {isLogin ? 'Member Access' : 'Join the Club'}
              </h2>
              <p className="text-xs text-[#007AFF] tracking-[0.3em] uppercase mt-2">
                Exclusive Fitting Experience
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <div>
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-xs tracking-widest placeholder:text-white/20 focus:border-[#007AFF] focus:bg-white/5 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-xs tracking-widest placeholder:text-white/20 focus:border-[#007AFF] focus:bg-white/5 outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold tracking-widest text-xs py-4 rounded-lg transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(0,122,255,0.2)]"
              >
                {loading ? 'AUTHENTICATING...' : (isLogin ? 'SIGN IN' : 'REGISTER')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[10px] text-white/30 tracking-[0.2em]">OR CONTINUE WITH</span>
              <div className="h-px bg-white/5 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/5 py-3 rounded-lg flex items-center justify-center gap-3 transition-colors group">
                <span className="text-sm grayscale group-hover:grayscale-0 transition-all">🇬</span>
                <span className="text-[10px] text-white/50 group-hover:text-white font-bold tracking-widest">GOOGLE</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-[#FADB00]/10 border border-white/5 hover:border-[#FADB00]/30 py-3 rounded-lg flex items-center justify-center gap-3 transition-colors group">
                <span className="text-sm grayscale group-hover:grayscale-0 transition-all">💬</span>
                <span className="text-[10px] text-white/50 group-hover:text-[#FADB00] font-bold tracking-widest">KAKAO</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white border border-white/5 py-3 rounded-lg flex items-center justify-center gap-3 transition-colors group">
                <span className="text-sm grayscale group-hover:grayscale-0 transition-all">🍎</span>
                <span className="text-[10px] text-white/50 group-hover:text-black font-bold tracking-widest">APPLE</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-[#5865F2]/10 border border-white/5 hover:border-[#5865F2]/30 py-3 rounded-lg flex items-center justify-center gap-3 transition-colors group">
                <span className="text-sm grayscale group-hover:grayscale-0 transition-all">🎮</span>
                <span className="text-[10px] text-white/50 group-hover:text-[#5865F2] font-bold tracking-widest">DISCORD</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-white/30 tracking-widest">
              {isLogin ? "NEW TO S_FIT?" : "ALREADY A MEMBER?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#007AFF] hover:text-white ml-2 transition-colors font-bold"
              >
                {isLogin ? 'JOIN NOW' : 'SIGN IN'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
