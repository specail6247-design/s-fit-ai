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
          <p className="text-xs text-soft-gray">Welcome,</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors border border-white/10"
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
        className="bg-transparent border border-white/20 text-white px-5 py-2 rounded-full text-xs font-bold hover:border-cyber-lime hover:text-cyber-lime transition-all tracking-[0.2em] uppercase"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          {/* Glowing Accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-cyber-lime/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="bg-black border border-white/10 shadow-[0_0_40px_rgba(204,255,0,0.05)] w-full max-w-sm rounded-none p-8 relative z-10">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 text-xl font-light"
            >
              ✕
            </button>
            
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-black text-white font-[var(--font-display)] tracking-widest uppercase mb-2">
                {isLogin ? 'MEMBER ACCESS' : 'BECOME A MEMBER'}
              </h2>
              <div className="w-12 h-0.5 bg-cyber-lime mx-auto" />
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-white/30 tracking-wider"
                  required
                />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-white/30 tracking-wider"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyber-lime text-black font-black py-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 tracking-[0.2em] uppercase text-sm"
              >
                {loading ? 'AUTHENTICATING...' : (isLogin ? 'ENTER' : 'APPLY')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-white/40 tracking-widest">OR CONNECT WITH</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-all hover:border-white/30">
                <span className="text-lg">G</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/10 hover:bg-[#FAE100]/20 text-[#FAE100] border border-[#FAE100]/20 py-3 flex items-center justify-center transition-all hover:border-[#FAE100]/50 font-bold">
                K
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-all hover:border-white/30">
                <span className="text-lg">A</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/20 py-3 flex items-center justify-center transition-all hover:border-[#5865F2]/50 font-bold">
                D
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-white/50 hover:text-cyber-lime transition-colors tracking-widest uppercase"
              >
                {isLogin ? 'REQUEST MEMBERSHIP' : 'ALREADY A MEMBER?'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
