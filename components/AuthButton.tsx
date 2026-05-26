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
          <p className="text-xs text-soft-gray uppercase tracking-widest">Member</p>
          <p className="text-sm font-bold text-white max-w-[100px] truncate tracking-wide">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/10 text-white px-5 py-2 rounded-none text-xs font-bold transition-colors border border-white/20 uppercase tracking-widest"
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
        className="bg-transparent text-white px-6 py-2.5 rounded-none text-xs font-bold transition-all border border-white/20 hover:border-white hover:bg-white/5 uppercase tracking-[0.2em]"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-white/10 w-full max-w-md rounded-none p-10 relative shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              aria-label="Close Member Access"
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-widest font-sans mb-2">
                {isLogin ? 'Sign In' : 'Join Us'}
              </h2>
              <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                {isLogin ? 'Enter The Vault' : 'Become A Member'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8 relative z-10">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-none hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4 uppercase tracking-[0.2em] text-sm"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Create Account')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Or Continue With</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-3 relative z-10">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-none flex items-center justify-center transition-colors" aria-label="Login with Google">
                <span className="text-lg">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-none flex items-center justify-center transition-colors text-[#FADB00]" aria-label="Login with Kakao">
                <span className="text-lg">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-none flex items-center justify-center transition-colors" aria-label="Login with Apple">
                <span className="text-lg">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-none flex items-center justify-center transition-colors text-[#5865F2]" aria-label="Login with Discord">
                <span className="text-lg">🎮</span>
              </button>
            </div>

            <div className="mt-10 text-center relative z-10">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-gray-400 hover:text-white uppercase tracking-widest transition-colors"
              >
                {isLogin ? 'Request Access (Sign Up)' : 'Already A Member? (Sign In)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
