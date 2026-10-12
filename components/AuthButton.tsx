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
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-xs text-[#C9B037] font-[family-name:var(--font-display)] tracking-widest uppercase">Member</p>
          <p className="text-sm font-bold text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/10 text-white/70 hover:text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest transition-colors border border-white/20 uppercase"
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
        className="bg-transparent border border-[#C9B037]/50 text-[#C9B037] px-6 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-[#C9B037]/10 hover:border-[#C9B037] transition-all uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(201,176,55,0.15)]"
      >
        <span className="material-symbols-outlined text-[16px]">key</span>
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-[#0A0A0A] border border-[#C9B037]/30 w-full max-w-md rounded-2xl p-8 relative shadow-[0_0_50px_rgba(201,176,55,0.1)] overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9B037]/10 via-transparent to-transparent pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="text-center mb-8 relative z-10">
              <span className="material-symbols-outlined text-[#C9B037] text-4xl mb-2 opacity-80">diamond</span>
              <h2 className="text-2xl text-white font-[family-name:var(--font-display)] tracking-[0.2em] uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                {isLogin ? 'Sign In' : 'Join the Club'}
              </h2>
              <p className="text-[#C9B037] text-xs font-mono mt-2 tracking-widest uppercase opacity-70">
                Exclusive Access
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8 relative z-10">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase tracking-widest ml-1 font-bold">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-1 py-2 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder:text-white/20"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase tracking-widest ml-1 font-bold">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-1 py-2 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder:text-white/20"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#C9B037] to-[#e8d282] text-black font-bold py-3 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 tracking-widest uppercase text-sm mt-4 shadow-[0_0_20px_rgba(201,176,55,0.3)]"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply for Access')}
              </button>
            </form>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-soft-gray">OR SOCIAL LOGIN</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-xs text-white">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100] hover:bg-[#FADB00] text-[#371D1E] py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">💬</span> <span className="text-xs font-bold">Kakao</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white hover:bg-gray-100 text-black py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-xs font-bold">Apple</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2] hover:bg-[#4752C4] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🎮</span> <span className="text-xs font-bold">Discord</span>
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-soft-gray">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyber-lime hover:underline ml-1"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
