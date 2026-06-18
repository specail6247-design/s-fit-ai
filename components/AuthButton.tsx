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
        className="bg-cyber-lime text-void-black px-5 py-2 rounded-full text-xs font-bold hover:brightness-110 transition-all uppercase tracking-widest"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(204,255,0,0.1)] w-full max-w-sm rounded-3xl p-8 relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyber-lime/20 rounded-full blur-[60px] pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-2xl font-display font-light text-white tracking-[0.2em] uppercase mb-2">
                {isLogin ? 'VIP Access' : 'Join the Club'}
              </h2>
              <div className="w-10 h-[1px] bg-cyber-lime mx-auto mb-2" />
              <p className="text-xs text-white/40 tracking-widest uppercase">
                Exclusive Fitting Room
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-8 relative z-10">
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-white/30 font-mono"
                  required
                />
              </div>
              <div className="space-y-1">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-sm focus:border-cyber-lime outline-none transition-colors placeholder:text-white/30 font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-white text-black font-display tracking-[0.1em] uppercase py-4 rounded-full hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Access')}
              </button>
            </form>

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-full flex items-center gap-4">
                <div className="h-[1px] bg-white/10 flex-1" />
                <span className="text-[10px] text-white/30 tracking-widest uppercase">Social</span>
                <div className="h-[1px] bg-white/10 flex-1" />
              </div>

              <div className="flex gap-4">
                <button onClick={() => handleSocialLogin('google')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group" aria-label="Sign in with Google">
                  <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FAE100]/10 transition-colors group" aria-label="Sign in with Kakao">
                  <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">💬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group" aria-label="Sign in with Apple">
                  <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🍎</span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#5865F2]/10 transition-colors group" aria-label="Sign in with Discord">
                  <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🎮</span>
                </button>
              </div>

              <p className="text-[10px] text-white/40 tracking-widest uppercase mt-2">
                {isLogin ? "No access?" : "Have access?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-cyber-lime hover:text-white transition-colors ml-1"
                >
                  {isLogin ? 'Request' : 'Return'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
