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
          <p className="text-xs text-soft-gray tracking-widest uppercase">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-white transition-colors"
          title="Sign Out"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
      >
        <span className="material-symbols-outlined text-sm text-[#C9B037]">key</span>
        <span className="text-xs font-bold tracking-widest uppercase">Member Access</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-sm rounded-2xl relative shadow-2xl overflow-hidden">
            {/* Ambient luxury glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#C9B037]/10 blur-3xl pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="p-8 relative z-10">
              <div className="text-center mb-8">
                <span className="material-symbols-outlined text-[#C9B037] text-3xl mb-2">diamond</span>
                <h2 className="text-2xl text-white font-serif italic">
                  {isLogin ? 'VIP Access' : 'Become a Member'}
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-2">
                  Exclusive Digital Wardrobe
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6 mb-8">
                <div className="space-y-4">
                  <div className="relative border-b border-white/20 focus-within:border-[#C9B037] transition-colors pb-1">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-600"
                      required
                    />
                  </div>
                  <div className="relative border-b border-white/20 focus-within:border-[#C9B037] transition-colors pb-1">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-600"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#C9B037] to-[#e8d282] text-black font-bold tracking-widest uppercase text-xs py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Join')}
                </button>
              </form>

              <div className="flex items-center gap-3 mb-8 opacity-50">
                <div className="h-px bg-white/20 flex-1" />
                <span className="text-[10px] text-white uppercase tracking-widest">Or</span>
                <div className="h-px bg-white/20 flex-1" />
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => handleSocialLogin('google')} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors" title="Google">
                  <span className="text-lg">🇬</span>
                </button>
                <button onClick={() => handleSocialLogin('kakao')} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors" title="Kakao">
                  <span className="text-lg">💬</span>
                </button>
                <button onClick={() => handleSocialLogin('apple')} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors" title="Apple">
                  <span className="text-lg">🍎</span>
                </button>
                <button onClick={() => handleSocialLogin('discord')} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors" title="Discord">
                  <span className="text-lg">🎮</span>
                </button>
              </div>

              <p className="mt-8 text-center text-[10px] text-gray-500 uppercase tracking-widest">
                {isLogin ? "Not a member?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#C9B037] hover:text-white transition-colors ml-1 font-bold"
                >
                  {isLogin ? 'Apply' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
