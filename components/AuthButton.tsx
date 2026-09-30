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
        className="px-6 py-2 border border-white/20 rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors uppercase"
      >
        Member Login
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-white/10 w-full max-w-md p-10 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-sm"
            >
              ✕
            </button>
            
            <h2 className="text-3xl font-black text-white mb-1 text-center uppercase tracking-[0.2em]">
              Member Access
            </h2>
            <p className="text-center text-[10px] text-white/50 tracking-[0.3em] uppercase mb-10">
              Exclusive Virtual Fitting
            </p>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-white outline-none transition-colors"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase tracking-widest">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-white outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 tracking-[0.2em] uppercase text-xs mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-white/30 uppercase tracking-widest">Or Continue With</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent border border-white/10 hover:border-white/30 py-3 flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-xs text-white tracking-wider uppercase">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent border border-white/10 hover:border-white/30 py-3 flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-xs text-white tracking-wider uppercase">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-white/50 tracking-wide">
              {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:underline ml-2 uppercase text-[10px] tracking-widest"
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
