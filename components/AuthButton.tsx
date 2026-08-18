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
        className="text-[#C9B037] font-[family-name:var(--font-display)] text-sm italic font-bold tracking-widest uppercase hover:text-white transition-colors"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0A0A0A] border border-[#C9B037]/20 w-full max-w-sm rounded-none p-8 relative shadow-[0_0_50px_rgba(201,176,55,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-[family-name:var(--font-display)] font-bold text-[#C9B037] mb-2 text-center italic">
              VIP ACCESS
            </h2>
            <p className="text-center text-xs text-gray-500 tracking-[0.2em] mb-8 uppercase">Private Fitting Room</p>

            <form onSubmit={handleAuth} className="space-y-4 mb-8">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-gray-800 px-2 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-gray-800 px-2 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold py-4 mt-6 text-xs tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Enter'}
              </button>
            </form>

            <div className="flex flex-col gap-4">
              <button type="button" onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center gap-3 transition-colors text-xs text-gray-300 tracking-wider">
                CONTINUE WITH GOOGLE
              </button>
              <button type="button" onClick={() => handleSocialLogin('apple')} className="bg-white hover:bg-gray-200 text-black py-3 flex items-center justify-center gap-3 transition-colors text-xs font-bold tracking-wider">
                CONTINUE WITH APPLE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
