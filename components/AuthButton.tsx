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
          <p className="text-xs text-soft-gray font-mono uppercase tracking-widest">MEMBER</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-mono tracking-widest text-soft-gray hover:text-white transition-colors uppercase"
        >
          LOGOUT
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-xs font-mono tracking-widest text-soft-gray hover:text-white transition-colors uppercase"
      >
        MEMBER
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="w-full max-w-sm relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-soft-gray hover:text-white text-2xl font-light"
              aria-label="Close"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-mono font-light tracking-widest text-white mb-8 text-center uppercase">
              MEMBER ACCESS
            </h2>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 rounded-none px-2 py-3 text-white text-sm focus:border-white outline-none font-mono placeholder:text-white/30"
                required
              />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 rounded-none px-2 py-3 text-white text-sm focus:border-white outline-none font-mono placeholder:text-white/30"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-mono tracking-widest text-sm py-4 hover:bg-white/90 transition-colors disabled:opacity-50 mt-4 uppercase"
              >
                {loading ? 'PROCESSING...' : (isLogin ? 'ENTER' : 'JOIN')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 opacity-50">
              <div className="h-px bg-white/20 flex-1" />
              <span className="text-[10px] font-mono tracking-widest text-white">OR SOCIAL</span>
              <div className="h-px bg-white/20 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/5 h-12 flex items-center justify-center transition-colors">
                <span className="text-xl grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 border border-white/5 h-12 flex items-center justify-center transition-colors">
                <span className="text-xl grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/5 h-12 flex items-center justify-center transition-colors">
                <span className="text-xl grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 border border-white/5 h-12 flex items-center justify-center transition-colors">
                <span className="text-xl grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">🎮</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] font-mono tracking-widest text-soft-gray uppercase">
              {isLogin ? "NEW TO S_FIT?" : "ALREADY A MEMBER?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:underline ml-2"
              >
                {isLogin ? 'REQUEST ACCESS' : 'ENTER'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
