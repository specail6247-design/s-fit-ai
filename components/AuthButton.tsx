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
          <p className="text-[10px] uppercase tracking-widest text-[#ecab13]/70 font-mono">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate font-[family-name:var(--font-display)] tracking-wider">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-white/20 hover:border-[#ecab13]/50 hover:bg-[#ecab13]/10 text-white/80 hover:text-[#ecab13] px-5 py-2 rounded-none text-xs tracking-widest uppercase transition-all duration-500"
        >
          Depart
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group relative overflow-hidden border border-white/20 hover:border-[#ecab13]/50 px-6 py-2 bg-transparent text-white/90 text-xs tracking-widest uppercase transition-all duration-700"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ecab13]/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
        <span className="relative z-10 font-[family-name:var(--font-display)]">Member Access</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-xl p-4">
          <div className="bg-[#111] border border-white/10 w-full max-w-md p-10 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-[#ecab13] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-2xl text-white font-[family-name:var(--font-display)] tracking-widest uppercase font-light">
                {isLogin ? 'Access Granted' : 'Request Access'}
              </h2>
              <div className="h-[1px] w-12 bg-[#ecab13]/50 mx-auto mt-4" />
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors font-mono placeholder:text-white/30"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors font-mono placeholder:text-white/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white hover:bg-[#ecab13] text-black hover:text-white py-4 text-xs tracking-widest uppercase transition-colors duration-500 disabled:opacity-50 font-bold"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Join the Club')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 opacity-50">
              <div className="h-px bg-white/20 flex-1" />
              <span className="text-[10px] tracking-widest uppercase font-mono text-white/50">Exclusive Partners</span>
              <div className="h-px bg-white/20 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="border border-white/10 hover:border-white/30 py-3 flex items-center justify-center gap-3 transition-colors group">
                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🇬</span>
                <span className="text-[10px] tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="border border-white/10 hover:border-white/30 py-3 flex items-center justify-center gap-3 transition-colors group">
                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🍎</span>
                <span className="text-[10px] tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">Apple</span>
              </button>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] tracking-widest uppercase font-mono text-white/40 hover:text-[#ecab13] transition-colors"
              >
                {isLogin ? 'Apply for Membership' : 'Existing Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
