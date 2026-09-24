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
        LOGIN
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-[#0a0a0a] border border-white/5 w-full max-w-md p-10 relative shadow-2xl">
            {/* VIP Club Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] z-0"></div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10 font-mono text-xs tracking-widest"
              aria-label="Close Modal"
            >
              CLOSE ✕
            </button>
            
            <div className="relative z-10 mb-10 text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2">Member Access</p>
              <h2 className="text-3xl font-serif italic text-white tracking-wide font-['Cinzel']">
                {isLogin ? 'Sign In' : 'Exclusive Entry'}
              </h2>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-10 relative z-10">
              <div className="relative">
                <input
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full bg-transparent border-0 border-b border-white/20 px-0 py-2 text-white text-sm focus:border-white focus:ring-0 outline-none transition-colors"
                  required
                  aria-label="Email address"
                />
                <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest pointer-events-none">
                  Email Address
                </label>
              </div>

              <div className="relative mt-8">
                <input
                  type="password"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full bg-transparent border-0 border-b border-white/20 px-0 py-2 text-white text-sm focus:border-white focus:ring-0 outline-none transition-colors"
                  required
                  aria-label="Password"
                />
                <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest pointer-events-none">
                  Password
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="w-full bg-white text-black font-bold py-4 text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 relative z-10 opacity-50">
              <div className="h-px bg-white/20 flex-1" />
              <span className="text-[10px] font-mono text-white tracking-widest uppercase">Or Connect</span>
              <div className="h-px bg-white/20 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2 relative z-10">
              <button onClick={() => handleSocialLogin('google')} aria-label="Login with Google" className="bg-white/5 hover:bg-white/10 border border-white/5 py-3 flex items-center justify-center transition-colors grayscale hover:grayscale-0">
                <span className="text-xl">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} aria-label="Login with Kakao" className="bg-white/5 hover:bg-[#FAE100]/20 border border-white/5 py-3 flex items-center justify-center transition-colors grayscale hover:grayscale-0">
                <span className="text-xl">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} aria-label="Login with Apple" className="bg-white/5 hover:bg-white/20 border border-white/5 py-3 flex items-center justify-center transition-colors grayscale hover:grayscale-0">
                <span className="text-xl">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} aria-label="Login with Discord" className="bg-white/5 hover:bg-[#5865F2]/20 border border-white/5 py-3 flex items-center justify-center transition-colors grayscale hover:grayscale-0">
                <span className="text-xl">🎮</span>
              </button>
            </div>

            <div className="mt-8 text-center relative z-10">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest font-mono transition-colors border-b border-transparent hover:border-white pb-1"
              >
                {isLogin ? 'Apply for Membership' : 'Existing Member Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
