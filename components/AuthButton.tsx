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
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-white/50 tracking-widest uppercase">Member</p>
          <p className="text-xs font-mono text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/50 hover:text-white text-[10px] tracking-widest uppercase transition-colors"
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
        className="text-white/70 hover:text-white text-xs tracking-[0.2em] font-medium uppercase transition-colors"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="w-full max-w-md relative flex flex-col items-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white text-2xl transition-colors font-light"
            >
              ×
            </button>
            
            <h2 className="text-3xl font-light text-white mb-2 text-center tracking-widest uppercase">
              {isLogin ? 'Member Access' : 'Join the Club'}
            </h2>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-12">
              Exclusive Virtual Fitting
            </p>

            <form onSubmit={handleAuth} className="w-full space-y-6 mb-10">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none placeholder:text-white/30 tracking-widest transition-colors rounded-none"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none placeholder:text-white/30 tracking-widest transition-colors rounded-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-medium py-4 text-xs tracking-[0.3em] uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 w-full mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-white/30 tracking-widest">OR CONTINUE WITH</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-4 w-full">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-white/70 text-sm">G</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-white/70 text-sm">K</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-white/70 text-sm">A</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors">
                <span className="text-white/70 text-sm">D</span>
              </button>
            </div>

            <p className="mt-12 text-center text-[10px] text-white/40 tracking-widest uppercase">
              {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-gray-300 ml-2 transition-colors"
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
