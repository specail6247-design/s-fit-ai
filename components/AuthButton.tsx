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
        className="bg-transparent border border-white/20 text-white px-6 py-2 rounded-full text-xs tracking-widest uppercase hover:bg-white/10 hover:border-white/50 transition-all font-mono"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4">
          <div className="bg-[#050505] border border-white/10 w-full max-w-sm rounded-3xl p-8 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="mb-8 text-center space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tighter italic">
                {isLogin ? 'MEMBER SIGN IN' : 'VIP REGISTRATION'}
              </h2>
              <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">
                S_FIT Authentication
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border-b border-white/10 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors font-mono tracking-wide placeholder:text-white/20"
                  required
                />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border-b border-white/10 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors font-mono tracking-wide placeholder:text-white/20"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-black tracking-widest uppercase py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4 text-sm"
              >
                {loading ? 'PROCESSING...' : (isLogin ? 'AUTHORIZE' : 'INITIALIZE')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 opacity-50">
              <div className="h-px bg-white/20 flex-1" />
              <span className="text-[10px] text-white font-mono tracking-widest">SECURE OAUTH</span>
              <div className="h-px bg-white/20 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-colors">
                <span className="text-lg">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-[#FAE100]/20 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-colors group">
                <span className="text-lg grayscale group-hover:grayscale-0">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/20 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-colors">
                <span className="text-lg">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-[#5865F2]/20 border border-white/10 py-3 rounded-xl flex items-center justify-center transition-colors group">
                <span className="text-lg grayscale group-hover:grayscale-0">🎮</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] font-mono tracking-widest text-white/40 uppercase">
              {isLogin ? "Unregistered?" : "Already Authorized?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:underline ml-1 font-bold"
              >
                {isLogin ? 'Request Access' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
