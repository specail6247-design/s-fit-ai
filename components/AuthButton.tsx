'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], display: 'swap' });

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
          <p className="text-xs text-soft-gray">MEMBER</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors border border-white/20"
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
        className="text-white hover:text-luxury-gold px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase transition-colors"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="w-full max-w-sm relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors tracking-widest text-xs uppercase"
            >
              Close ✕
            </button>
            
            <h2 className={`${cinzel.className} text-3xl text-white mb-10 text-center tracking-widest`}>
              {isLogin ? 'Member Access' : 'Join the Club'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-8 mb-8">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-white/30 px-0 py-2 text-white text-sm focus:border-luxury-gold focus:ring-0 outline-none transition-colors placeholder:text-white/30"
                  required
                  aria-label="Email address"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-white/30 px-0 py-2 text-white text-sm focus:border-luxury-gold focus:ring-0 outline-none transition-colors placeholder:text-white/30"
                  required
                  aria-label="Password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="w-full bg-white text-black font-medium py-3 hover:bg-luxury-gold hover:text-black transition-all disabled:opacity-50 tracking-[0.2em] text-xs uppercase mt-4"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] tracking-widest text-white/50 uppercase">Or Continue With</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button type="button" onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-lg opacity-80 hover:opacity-100">🇬</span>
              </button>
              <button type="button" onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-lg opacity-80 hover:opacity-100">💬</span>
              </button>
              <button type="button" onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-lg opacity-80 hover:opacity-100">🍎</span>
              </button>
              <button type="button" onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-lg opacity-80 hover:opacity-100">🎮</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <button type="button" onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-white/50 hover:text-white tracking-widest uppercase transition-colors"
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
