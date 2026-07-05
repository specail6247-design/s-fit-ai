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
          className="bg-transparent border border-[#C9B037]/30 text-[#C9B037] px-4 py-2 rounded-none text-xs font-bold tracking-widest hover:bg-[#C9B037]/10 transition-all uppercase"
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
        className="bg-transparent border border-[#C9B037]/30 text-[#C9B037] px-6 py-2 rounded-none text-xs font-bold tracking-widest hover:bg-[#C9B037]/10 transition-all uppercase"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#050505] border border-[#C9B037]/30 w-full max-w-sm rounded-none p-8 relative shadow-[0_0_40px_rgba(201,176,55,0.15)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-white"
            >
              ✕
            </button>
            
            <h2 className="text-xl font-[family-name:var(--font-display)] tracking-[0.2em] uppercase text-[#C9B037] mb-8 text-center">
              {isLogin ? 'Member Sign In' : 'Request Access'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 rounded-none px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder:text-gray-600"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 rounded-none px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder:text-gray-600"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold py-4 rounded-none hover:bg-[#F4E4BC] tracking-[0.2em] uppercase transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-[#C9B037] transition-colors"
              >
                {isLogin ? 'Request Access' : 'Return to Sign In'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
