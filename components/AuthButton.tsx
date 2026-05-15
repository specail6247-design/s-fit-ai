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
          <p className="text-xs text-soft-gray uppercase tracking-widest">Member</p>
          <p className="text-sm font-serif font-medium text-[#ecab13] max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-soft-gray hover:text-white px-4 py-2 rounded-full text-xs font-medium transition-colors border border-white/10"
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
        className="bg-transparent text-white px-6 py-2.5 rounded-full text-xs font-serif uppercase tracking-[0.2em] hover:bg-white/10 transition-all border border-white/20 hover:border-white/50"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-md p-4">
          <div className="bg-[#111111] border border-[#2d2d2d] w-full max-w-md p-10 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-soft-gray hover:text-[#ecab13] transition-colors text-sm font-sans"
            >
              ✕
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif text-white mb-2 tracking-wide">
                {isLogin ? 'Exclusive Access' : 'Become a Member'}
              </h2>
              <div className="w-12 h-px bg-[#ecab13] mx-auto opacity-50 mb-4"></div>
              <p className="text-xs text-soft-gray tracking-widest uppercase">
                {isLogin ? 'Enter the Vault' : 'Join the Elite'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-1">
                <label className="text-[10px] text-soft-gray uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#2d2d2d] px-1 py-2 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder:text-[#2d2d2d]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-soft-gray uppercase tracking-widest ml-1">Passkey</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[#2d2d2d] px-1 py-2 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder:text-[#2d2d2d]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-black font-serif uppercase tracking-[0.2em] text-sm py-4 mt-4 hover:bg-[#d49a11] transition-colors disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-[#2d2d2d] flex-1" />
              <span className="text-[10px] text-[#2d2d2d] uppercase tracking-widest">Or continue with</span>
              <div className="h-px bg-[#2d2d2d] flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8">
              <button onClick={() => handleSocialLogin('google')} className="bg-[#1a1a1a] hover:bg-[#2d2d2d] py-3 flex items-center justify-center transition-colors border border-[#2d2d2d]">
                <span className="text-lg opacity-70">G</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#1a1a1a] hover:bg-[#2d2d2d] py-3 flex items-center justify-center transition-colors border border-[#2d2d2d] text-[#FAE100]">
                <span className="text-lg opacity-70">K</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-[#1a1a1a] hover:bg-[#2d2d2d] py-3 flex items-center justify-center transition-colors border border-[#2d2d2d]">
                <span className="text-lg opacity-70">A</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#1a1a1a] hover:bg-[#2d2d2d] py-3 flex items-center justify-center transition-colors border border-[#2d2d2d] text-[#5865F2]">
                <span className="text-lg opacity-70">D</span>
              </button>
            </div>

            <p className="text-center text-xs text-soft-gray font-serif italic">
              {isLogin ? "Not on the list yet?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ecab13] hover:underline ml-1 not-italic font-sans uppercase tracking-widest text-[10px]"
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
