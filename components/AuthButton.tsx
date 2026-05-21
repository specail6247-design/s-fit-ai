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
          <p className="text-xs text-soft-gray uppercase tracking-widest">Member,</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate tracking-wide">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white px-4 py-2 rounded-none text-xs font-medium transition-colors border border-white/20 tracking-widest uppercase"
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
        className="bg-cyber-lime text-void-black px-6 py-2 rounded-none text-xs font-bold hover:brightness-110 transition-all tracking-widest uppercase"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-opacity">
          <div className="bg-[#050505] border border-white/10 w-full max-w-md rounded-none p-10 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors text-xl font-light"
            >
              ✕
            </button>
            
            <div className="text-center mb-10 mt-4">
              <h2 className="text-3xl font-serif text-white tracking-[0.1em] uppercase">
                {isLogin ? 'Member Access' : 'Join the Club'}
              </h2>
              <div className="w-12 h-px bg-cyber-lime mx-auto mt-6 opacity-80" />
            </div>

            <form onSubmit={handleAuth} className="space-y-8 mb-10">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-white/30 placeholder:tracking-widest"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-white/30 placeholder:tracking-widest"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-serif tracking-[0.2em] uppercase py-4 mt-4 hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Private Identity</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleSocialLogin('google')} className="group border border-white/10 hover:border-white/40 py-3 flex items-center justify-center transition-all bg-white/5 hover:bg-white/10">
                <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">G</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="group border border-white/10 hover:border-white/40 py-3 flex items-center justify-center transition-all bg-white/5 hover:bg-white/10">
                <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">K</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="group border border-white/10 hover:border-white/40 py-3 flex items-center justify-center transition-all bg-white/5 hover:bg-white/10">
                <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">A</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="group border border-white/10 hover:border-white/40 py-3 flex items-center justify-center transition-all bg-white/5 hover:bg-white/10">
                <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">D</span>
              </button>
            </div>

            <p className="mt-10 text-center text-[10px] text-white/40 tracking-widest uppercase">
              {isLogin ? "Not on the list?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-cyber-lime transition-colors ml-2 border-b border-transparent hover:border-cyber-lime pb-0.5"
              >
                {isLogin ? 'Apply' : 'Enter'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
