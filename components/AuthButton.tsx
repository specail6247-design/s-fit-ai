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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in-up">
          <div className="bg-[#0a0a0a] border border-[#2d2d2d] w-full max-w-md rounded-xl p-8 relative shadow-2xl overflow-hidden">
            {/* VIP Club aesthetic accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ecab13] to-transparent opacity-50" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-white uppercase tracking-[0.2em] mb-2 font-light">
                {isLogin ? 'Member Access' : 'Join the Club'}
              </h2>
              <p className="text-xs text-soft-gray uppercase tracking-widest font-mono">
                S_FIT AI Exclusive
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[#2d2d2d] px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder:text-soft-gray placeholder:tracking-widest placeholder:text-xs"
                required
              />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#2d2d2d] px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder:text-soft-gray placeholder:tracking-widest placeholder:text-xs"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 mt-4 text-xs tracking-widest uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 relative overflow-hidden group"
              >
                <span className="relative z-10">{loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}</span>
                <div className="absolute inset-0 bg-[#ecab13] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-0" />
              </button>
            </form>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-soft-gray uppercase tracking-widest">Privileged Access</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent hover:bg-white/5 border border-[#2d2d2d] py-3 rounded flex items-center justify-center transition-colors" title="Google">
                <span className="text-lg opacity-70 hover:opacity-100 grayscale">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-transparent hover:bg-white/5 border border-[#2d2d2d] py-3 rounded flex items-center justify-center transition-colors" title="Kakao">
                <span className="text-lg opacity-70 hover:opacity-100 grayscale">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent hover:bg-white/5 border border-[#2d2d2d] py-3 rounded flex items-center justify-center transition-colors" title="Apple">
                <span className="text-lg opacity-70 hover:opacity-100 grayscale">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-transparent hover:bg-white/5 border border-[#2d2d2d] py-3 rounded flex items-center justify-center transition-colors" title="Discord">
                <span className="text-lg opacity-70 hover:opacity-100 grayscale">🎮</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-soft-gray uppercase tracking-widest">
              {isLogin ? "Not on the list?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-[#ecab13] transition-colors ml-1 underline decoration-white/30 underline-offset-4"
              >
                {isLogin ? 'Apply for access' : 'Enter'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
