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
        className="bg-cyber-lime text-void-black px-5 py-2 rounded-full text-xs font-bold hover:brightness-110 transition-all"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-black border border-cyber-lime/30 shadow-[0_0_40px_rgba(204,255,0,0.1)] w-full max-w-sm rounded-3xl p-8 relative overflow-hidden">
            {/* VIP Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-cyber-lime shadow-[0_0_20px_rgba(204,255,0,0.8)]"></div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-3xl font-black font-display tracking-widest text-white mb-2 text-center uppercase">
              {isLogin ? 'Sign In' : 'Join VIP'}
            </h2>
            <p className="text-center text-[10px] text-gray-500 tracking-widest uppercase mb-8">
               S_FIT Exclusive Membership
            </p>

            <form onSubmit={handleAuth} className="space-y-4 mb-8">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-xs tracking-widest focus:border-cyber-lime outline-none transition-colors"
                required
              />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-xs tracking-widest focus:border-cyber-lime outline-none transition-colors"
                required
              />
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyber-lime text-black font-black py-4 rounded-xl text-sm tracking-widest uppercase hover:brightness-110 transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Enter' : 'Apply')}
                </button>
              </div>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-500 tracking-widest">SOCIAL</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="flex gap-3 justify-center mb-8">
              <button onClick={() => handleSocialLogin('google')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white">
                <span className="text-lg">G</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white">
                <span className="text-lg">A</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-[#FAE100]">
                <span className="text-lg">K</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-[#5865F2]">
                <span className="text-lg">D</span>
              </button>
            </div>

            <p className="text-center text-[10px] text-gray-500 tracking-widest uppercase">
              {isLogin ? "Don't have access?" : "Already a member?"}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyber-lime hover:underline ml-1 font-bold"
              >
                {isLogin ? 'Apply now' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
