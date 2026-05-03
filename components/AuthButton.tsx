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
        className="bg-transparent border border-white/20 text-white px-6 py-2 rounded-full text-xs tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-all"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-transparent border border-white/10 w-full max-w-sm p-10 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl tracking-[0.3em] font-serif text-center text-[#ecab13] mb-2 uppercase">
              {isLogin ? 'VIP Access' : 'Apply'}
            </h2>
            <div className="h-px w-12 bg-[#ecab13] mx-auto mb-8 opacity-50"></div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-xs tracking-widest placeholder:text-white/30 focus:border-[#ecab13] focus:outline-none transition-colors"
                required
              />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-xs tracking-widest placeholder:text-white/30 focus:border-[#ecab13] focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-black font-bold py-4 text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'AUTHENTICATING...' : (isLogin ? 'ENTER' : 'JOIN')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 opacity-50">
              <div className="h-px bg-white flex-1" />
              <span className="text-[10px] tracking-widest uppercase text-white">OR CONTINUE WITH</span>
              <div className="h-px bg-white flex-1" />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => handleSocialLogin('google')} className="size-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-sm">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="size-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-sm">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="size-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-sm">🍎</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] tracking-widest text-white/50 uppercase">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ecab13] hover:text-white ml-2 transition-colors"
              >
                {isLogin ? 'Apply Now' : 'Enter'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
