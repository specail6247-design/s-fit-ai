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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-void-black border border-cyber-lime/30 shadow-[0_0_25px_rgba(204,255,0,0.15)] w-full max-w-sm rounded-xl p-8 relative overflow-hidden">
            {/* VIP Glow Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyber-lime/10 rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-cyber-lime transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl text-pure-white mb-8 text-center font-display tracking-[0.2em] uppercase">
              {isLogin ? 'Member Access' : 'Join the Club'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-5 mb-8 relative z-10">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-pure-white text-xs font-mono tracking-widest placeholder-soft-gray focus:border-cyber-lime focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-pure-white text-xs font-mono tracking-widest placeholder-soft-gray focus:border-cyber-lime focus:outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyber-lime text-void-black font-display font-bold tracking-[0.2em] py-4 rounded-sm hover:brightness-110 transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)] disabled:opacity-50 mt-4 uppercase"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] font-mono tracking-widest text-soft-gray uppercase">Or Continue With</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/10 hover:bg-[#FAE100]/20 border border-[#FAE100]/20 text-[#FAE100] py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/20 text-[#5865F2] py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">🎮</span>
              </button>
            </div>

            <p className="text-center text-[10px] font-mono tracking-widest text-soft-gray uppercase">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyber-lime hover:underline ml-1"
              >
                {isLogin ? 'Apply Here' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
