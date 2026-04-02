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
          className="bg-transparent hover:bg-white/5 text-white px-4 py-2 rounded-none text-xs font-mono tracking-widest transition-colors border border-white/20"
        >
          SIGN OUT
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-transparent text-white px-5 py-2 border border-white/20 text-xs font-mono tracking-widest hover:bg-white/5 transition-all uppercase"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-white/10 w-full max-w-md p-10 relative shadow-[0_0_40px_rgba(255,255,255,0.05)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined font-light">close</span>
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-2xl font-serif text-white tracking-widest uppercase">
                {isLogin ? 'Member Sign In' : 'Apply for Access'}
              </h2>
              <div className="w-12 h-px bg-white/20 mx-auto mt-4"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-soft-gray tracking-widest uppercase">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-white outline-none transition-colors rounded-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-soft-gray tracking-widest uppercase">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-white outline-none transition-colors rounded-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-mono text-xs tracking-widest py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4 uppercase"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Submit')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] font-mono text-soft-gray tracking-widest uppercase">Alternate</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center transition-colors text-white/70 hover:text-white">
                <span className="text-sm font-serif">G</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center transition-colors text-white/70 hover:text-white">
                <span className="text-sm font-serif">K</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center transition-colors text-white/70 hover:text-white">
                <span className="text-sm font-serif">A</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center transition-colors text-white/70 hover:text-white">
                <span className="text-sm font-serif">D</span>
              </button>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] font-mono text-soft-gray hover:text-white transition-colors tracking-widest uppercase"
              >
                {isLogin ? 'Request Membership' : 'Existing Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
