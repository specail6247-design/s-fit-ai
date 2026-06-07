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
          <p className="text-[10px] uppercase tracking-widest text-soft-gray">Member</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate font-mono">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-black hover:bg-white/5 text-soft-gray hover:text-white px-4 py-2 rounded-full text-[10px] tracking-widest uppercase font-medium transition-colors border border-white/10 hover:border-cyber-lime/50"
        >
          Exit
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-black border border-cyber-lime/30 text-cyber-lime px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-cyber-lime/10 hover:shadow-[0_0_15px_rgba(204,255,0,0.2)] transition-all"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-black border border-cyber-lime/20 shadow-[0_0_40px_rgba(204,255,0,0.05)] w-full max-w-md rounded-3xl p-8 relative overflow-hidden">
            {/* Minimalist Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* Glowing orb effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-lime/10 rounded-full blur-3xl pointer-events-none"></div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-soft-gray hover:text-white text-xs tracking-widest uppercase transition-colors"
            >
              Close
            </button>
            
            <div className="mb-10 text-center relative z-10">
              <h2 className="text-sm tracking-[0.3em] uppercase text-cyber-lime mb-2">Protocol_Auth</h2>
              <h1 className="text-3xl font-[family-name:var(--font-display)] font-black text-white tracking-tight">
                {isLogin ? 'Sign In' : 'Request Access'}
              </h1>
            </div>

            <form onSubmit={handleAuth} className="space-y-5 mb-8 relative z-10">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL_ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-mono placeholder:text-soft-gray/50 focus:border-cyber-lime focus:bg-white/10 focus:shadow-[0_0_10px_rgba(204,255,0,0.1)] outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="AUTHORIZATION_KEY"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-mono placeholder:text-soft-gray/50 focus:border-cyber-lime focus:bg-white/10 focus:shadow-[0_0_10px_rgba(204,255,0,0.1)] outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyber-lime text-black font-black py-4 rounded-xl hover:bg-[#b3e600] tracking-[0.1em] uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Initiate Link' : 'Establish Record')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="h-[1px] bg-white/10 flex-1" />
              <span className="text-[10px] text-soft-gray tracking-widest uppercase">External Protocols</span>
              <div className="h-[1px] bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <button onClick={() => handleSocialLogin('google')} className="bg-black hover:bg-white/5 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-3 transition-colors group">
                <span className="text-xl grayscale group-hover:grayscale-0 transition-all">🇬</span> <span className="text-xs font-mono text-soft-gray group-hover:text-white transition-colors">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-black hover:bg-white/5 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-3 transition-colors group">
                <span className="text-xl grayscale opacity-70 group-hover:opacity-100 transition-all">🍎</span> <span className="text-xs font-mono text-soft-gray group-hover:text-white transition-colors">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[11px] text-soft-gray uppercase tracking-widest relative z-10">
              {isLogin ? "No record found?" : "Already established?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyber-lime hover:text-white ml-2 transition-colors border-b border-cyber-lime/30 hover:border-white/50 pb-0.5"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
