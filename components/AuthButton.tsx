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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-void-black border border-white/10 w-full max-w-sm rounded-2xl p-6 relative">
            {/* VIP Club Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 via-transparent to-cyber-lime/5 rounded-2xl pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-white z-10 transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-2xl font-serif text-white tracking-widest uppercase mb-1">
                {isLogin ? 'Member Access' : 'Join the Club'}
              </h2>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent mx-auto mt-2"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-8 relative z-10">
              <div className="group relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-luxury-gold outline-none transition-colors placeholder:text-soft-gray/50"
                  required
                />
              </div>
              <div className="group relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-luxury-gold outline-none transition-colors placeholder:text-soft-gray/50"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-luxury-gold/80 to-luxury-gold text-void-black font-serif font-bold tracking-widest py-4 rounded-sm hover:brightness-110 transition-all disabled:opacity-50 mt-4 shadow-[0_0_15px_rgba(201,176,55,0.3)] uppercase text-xs"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-soft-gray/50 tracking-widest uppercase">Or</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2 relative z-10">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-lg">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-[#FADB00]/20 border border-white/10 hover:border-[#FADB00]/50 py-3 rounded-lg flex items-center justify-center transition-colors text-[#FADB00]">
                <span className="text-lg">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-lg">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-[#5865F2]/20 border border-white/10 hover:border-[#5865F2]/50 py-3 rounded-lg flex items-center justify-center transition-colors text-[#5865F2]">
                <span className="text-lg">🎮</span>
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-soft-gray">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyber-lime hover:underline ml-1"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
