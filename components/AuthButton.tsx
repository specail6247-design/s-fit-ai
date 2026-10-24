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
          <p className="text-xs text-[#8A8A8A] font-serif italic">Welcome,</p>
          <p className="text-sm text-[#C9B037] max-w-[100px] truncate tracking-widest uppercase">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white px-4 py-2 rounded-full text-xs transition-colors border border-white/20 uppercase tracking-[0.2em]"
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
        className="text-[#C9B037] bg-transparent border border-[#C9B037]/50 px-6 py-2 rounded-full text-xs hover:bg-[#C9B037]/10 transition-all uppercase tracking-[0.2em]"
      >
        Sign In
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-[#C9B037]/30 shadow-[0_0_50px_rgba(201,176,55,0.1)] w-full max-w-md p-10 relative overflow-hidden">
            {/* Ambient luxury glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Close
            </button>
            
            <div className="mb-10 text-center space-y-2 mt-4">
              <h2 className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#C9B037] to-[#F4E4BC] tracking-widest uppercase">
                {isLogin ? 'Member Access' : 'Exclusive Entry'}
              </h2>
              <p className="text-xs text-[#8A8A8A] tracking-[0.3em] uppercase">
                {isLogin ? 'Provide your credentials' : 'Request membership'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-8 mb-10">
              <div className="space-y-6">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none placeholder:text-white/30 tracking-widest transition-colors font-mono"
                  required
                />
                <input
                  type="password"
                  placeholder="PASSPHRASE"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none placeholder:text-white/30 tracking-widest transition-colors font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#C9B037] to-[#8C7A26] text-black py-4 hover:brightness-110 transition-all disabled:opacity-50 uppercase tracking-[0.3em] font-bold"
              >
                {loading ? 'Authenticating...' : 'Enter'}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-white/10 flex-1" />
              <span className="text-[10px] text-white/30 tracking-widest uppercase">OR CONNECT WITH</span>
              <div className="h-[1px] bg-white/10 flex-1" />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => handleSocialLogin('google')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9B037]/50 hover:bg-white/5 transition-all text-white/70">
                G
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9B037]/50 hover:bg-white/5 transition-all text-white/70">
                A
              </button>
            </div>

            <p className="mt-10 text-center text-[10px] text-white/50 tracking-widest uppercase">
              {isLogin ? "Not on the list?" : "Already privileged?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-white transition-colors ml-2 border-b border-[#C9B037]/30 pb-1"
              >
                {isLogin ? 'Apply' : 'Enter'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
