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
        className="bg-[#C9B037] text-[#0A0A0A] px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all border border-[#F4E4BC]/50 shadow-[0_0_15px_rgba(201,176,55,0.3)] font-sans"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/90 backdrop-blur-md p-4">
          <div className="bg-[#1A1A1A] border border-[#C9B037]/30 w-full max-w-sm rounded-none p-8 relative shadow-[0_0_40px_rgba(201,176,55,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#C9B037] transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                {isLogin ? 'VIP Access' : 'Join the Club'}
              </h2>
              <div className="h-px w-12 bg-[#C9B037] mx-auto mt-4 mb-2"></div>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase font-mono">
                Exclusive Fitting Room
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-8">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-xs tracking-widest focus:border-[#C9B037] outline-none transition-colors font-mono placeholder-gray-600"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-xs tracking-widest focus:border-[#C9B037] outline-none transition-colors font-mono placeholder-gray-600"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-[#0A0A0A] font-bold py-4 mt-4 tracking-widest uppercase text-xs hover:bg-[#F4E4BC] transition-colors disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            <p className="text-center text-[10px] text-gray-500 tracking-widest uppercase font-mono mt-8">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-[#F4E4BC] ml-2 transition-colors border-b border-[#C9B037]/30 pb-0.5"
              >
                {isLogin ? 'Apply Here' : 'Enter'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
