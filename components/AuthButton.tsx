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
        className="bg-transparent border border-white/20 text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-[#0a0a0a] border border-[#2d2d2d] shadow-[0_0_50px_rgba(236,171,19,0.1)] w-full max-w-md rounded-2xl p-8 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ecab13] opacity-[0.05] blur-[100px] pointer-events-none rounded-full" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black tracking-widest text-[#ecab13] uppercase font-serif">
                {isLogin ? 'Member Access' : 'Join the Club'}
              </h2>
              <p className="text-xs text-gray-400 mt-2 tracking-widest uppercase">
                Exclusive Virtual Fitting
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-8">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder-gray-600 font-mono bg-transparent"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder-gray-600 font-mono bg-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#ecab13] to-[#c48a0a] text-black font-bold py-4 mt-4 rounded hover:brightness-110 transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Apply for Access')}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-500 tracking-widest uppercase">Or authenticate via</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => handleSocialLogin('google')} className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors bg-black/50">
                <span className="text-xl">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors bg-black/50">
                <span className="text-xl">🍎</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-gray-500 tracking-widest uppercase">
              {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ecab13] hover:text-white transition-colors ml-1 font-bold"
              >
                {isLogin ? 'Apply Now' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
