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
          className="bg-void-black hover:bg-white/5 text-soft-gray px-4 py-2 rounded-none border border-white/10 text-xs font-medium transition-colors tracking-widest uppercase"
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
        className="bg-transparent border border-white/20 text-white px-6 py-2.5 rounded-none text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-void-black border border-white/10 w-full max-w-sm rounded-2xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-white"
            >
              ✕
            </button>
            
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-white mb-8 text-center tracking-widest uppercase">
              {isLogin ? 'Member Access' : 'Apply for Access'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-void-black border border-white/10 rounded-none border-b focus:border-white outline-none px-2 py-3 text-white text-sm transition-colors"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-void-black border border-white/10 rounded-none border-b focus:border-white outline-none px-2 py-3 text-white text-sm transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pure-white text-void-black font-bold py-4 mt-4 tracking-widest uppercase text-xs hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-soft-gray">OR SOCIAL LOGIN</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-void-black hover:bg-white/5 border border-white/10 py-3 rounded-none flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg" aria-hidden="true">🇬</span> <span className="text-xs text-soft-gray uppercase tracking-wider">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-void-black hover:bg-white/5 border border-white/10 py-3 rounded-none flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg" aria-hidden="true">🍎</span> <span className="text-xs text-soft-gray uppercase tracking-wider">Apple</span>
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-soft-gray">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyber-lime hover:underline ml-1"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
