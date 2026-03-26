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
          <p className="text-xs text-soft-gray">MEMBER</p>
          <p className="text-sm font-medium text-[#C9B037] max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest transition-colors border border-white/20"
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
        className="bg-transparent text-white border border-[#C9B037]/50 px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] hover:bg-[#C9B037]/10 hover:border-[#C9B037] transition-all flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9B037]"></span>
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0A0A0A] border border-white/10 shadow-[0_0_40px_rgba(201,176,55,0.1)] w-full max-w-md rounded-2xl p-8 relative overflow-hidden">
            {/* Ambient luxury glow inside modal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9B037]/20 via-transparent to-transparent pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="mb-10 mt-2">
              <h2 className="text-2xl font-[family-name:var(--font-display)] tracking-widest text-center text-white mb-2 uppercase">
                {isLogin ? 'Member Access' : 'Join Club'}
              </h2>
              <p className="text-xs text-center text-[#C9B037]/80 tracking-[0.1em] font-mono uppercase">
                {isLogin ? 'Enter your credentials' : 'Request membership'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8 relative z-10">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors peer placeholder-transparent"
                  required
                />
                <label className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9B037] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white/60 pointer-events-none uppercase tracking-widest font-mono">
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors peer placeholder-transparent"
                  required
                />
                <label className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9B037] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white/60 pointer-events-none uppercase tracking-widest font-mono">
                  Password
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-[family-name:var(--font-display)] font-semibold tracking-[0.2em] py-4 rounded-none hover:bg-[#F4E4BC] transition-colors disabled:opacity-50 mt-4 uppercase text-sm"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Alternate</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent hover:bg-white/5 border border-white/20 py-3 flex items-center justify-center gap-3 transition-colors group">
                <span className="text-lg opacity-80 group-hover:opacity-100">🇬</span> <span className="text-xs text-white/80 group-hover:text-white font-mono tracking-wider">GOOGLE</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent hover:bg-white/5 border border-white/20 py-3 flex items-center justify-center gap-3 transition-colors group">
                <span className="text-lg opacity-80 group-hover:opacity-100">🍎</span> <span className="text-xs text-white/80 group-hover:text-white font-mono tracking-wider">APPLE</span>
              </button>
            </div>

            <p className="mt-10 text-center text-[10px] text-white/40 font-mono tracking-widest uppercase">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-[#F4E4BC] ml-2 transition-colors inline-flex items-center gap-1"
              >
                {isLogin ? 'Apply Now' : 'Sign In'}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
