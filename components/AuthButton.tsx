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
        className="bg-cyber-lime text-void-black px-5 py-2 rounded-full text-xs font-bold hover:brightness-110 transition-all"
      >
        LOGIN
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-black border border-white/20 w-full max-w-md rounded-none p-10 relative shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest"
            >
              Close
            </button>
            
            <div className="text-center mb-10 mt-4">
              <p className="text-xs text-white/50 tracking-[0.3em] uppercase mb-4">Member Access</p>
              <h2 className="text-4xl font-serif text-white tracking-widest italic">
                {isLogin ? 'Sign In' : 'Join Us'}
              </h2>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/30"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-serif italic tracking-widest py-4 mt-4 hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm uppercase"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Register')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 opacity-50">
              <div className="h-px bg-white/20 flex-1" />
              <span className="text-[10px] text-white tracking-[0.2em] uppercase">Partners</span>
              <div className="h-px bg-white/20 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-lg grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-[#FAE100]/20 border border-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-lg grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/20 border border-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-lg grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-[#5865F2]/20 border border-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-lg grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">🎮</span>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-white/50 hover:text-white tracking-[0.2em] uppercase transition-colors"
              >
                {isLogin ? 'Request Access' : 'Existing Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
