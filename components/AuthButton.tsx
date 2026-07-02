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
          <p className="text-xs text-soft-gray font-sans">MEMBER,</p>
          <p className="text-sm font-medium text-[#C9B037] max-w-[100px] truncate tracking-wider" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white/50 hover:text-white px-4 py-2 rounded-full text-xs font-medium transition-colors border border-white/10 uppercase tracking-widest"
        >
          Exit
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-transparent text-[#C9B037] border border-[#C9B037]/30 px-6 py-2.5 rounded-full text-xs hover:bg-[#C9B037]/10 transition-all uppercase tracking-[0.2em]"
        style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-[#C9B037]/20 w-full max-w-md rounded-none p-10 relative shadow-[0_0_50px_rgba(201,176,55,0.1)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/30 hover:text-[#C9B037] transition-colors"
            >
              <span className="text-xl leading-none">✕</span>
            </button>
            
            <div className="text-center mb-10 mt-4">
              <h2 className="text-3xl font-light text-white tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
                {isLogin ? 'Member Access' : 'Join the Club'}
              </h2>
              <div className="w-12 h-px bg-[#C9B037]/50 mx-auto mt-6" />
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder:text-white/20 tracking-widest uppercase font-mono"
                  required
                />
              </div>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder:text-white/20 tracking-widest uppercase font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold py-4 mt-8 hover:bg-white transition-colors disabled:opacity-50 uppercase tracking-[0.2em] text-sm"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Private Access</span>
              <div className="h-px bg-white/5 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/5 py-3 flex items-center justify-center gap-3 transition-colors group">
                <span className="text-white/50 group-hover:text-white transition-colors">G</span>
                <span className="text-[10px] text-white/50 group-hover:text-white uppercase tracking-widest transition-colors">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/5 py-3 flex items-center justify-center gap-3 transition-colors group">
                <span className="text-white/50 group-hover:text-white transition-colors"></span>
                <span className="text-[10px] text-white/50 group-hover:text-white uppercase tracking-widest transition-colors">Apple</span>
              </button>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-white/40 hover:text-[#C9B037] transition-colors tracking-[0.1em] uppercase"
              >
                {isLogin ? 'Request Membership' : 'Existing Member?'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
