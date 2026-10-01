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
        className="bg-transparent text-white px-5 py-2 rounded-full text-xs font-mono font-bold hover:text-cyber-lime transition-all border border-white/20 hover:border-cyber-lime tracking-widest uppercase"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-[#050505] border border-white/10 w-full max-w-sm rounded-none p-8 relative shadow-2xl shadow-white/5">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-white"
            >
              <span aria-hidden="true">✕</span>
            </button>
            
            <h2 className="text-2xl font-serif text-white mb-8 text-center tracking-widest uppercase italic">
              {isLogin ? 'Member Access' : 'Join the Club'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-white outline-none placeholder:text-white/30 font-mono"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-white outline-none placeholder:text-white/30 font-mono"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 tracking-widest uppercase text-xs"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Apply')}
              </button>
            </form>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest">or continue with</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-[10px] text-white/70 font-mono tracking-wider">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-[10px] text-white/70 font-mono tracking-wider">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-white/40 font-mono uppercase tracking-widest">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-cyber-lime hover:underline ml-2 transition-colors"
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
