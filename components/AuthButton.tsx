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
        className="bg-transparent border border-luxury-gold text-luxury-gold px-6 py-2 rounded-full text-xs font-[family-name:var(--font-display)] tracking-widest uppercase hover:bg-luxury-gold/10 transition-all"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-luxury-gold/20 w-full max-w-sm rounded-2xl p-8 relative shadow-[0_0_40px_rgba(201,176,55,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-[family-name:var(--font-display)] uppercase tracking-widest text-luxury-gold mb-8 text-center font-light">
              {isLogin ? 'Sign In' : 'Join Club'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white text-sm focus:border-luxury-gold outline-none placeholder:text-white/30 font-[family-name:var(--font-display)] tracking-wider"
                required
              />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 px-0 py-2 text-white text-sm focus:border-luxury-gold outline-none placeholder:text-white/30 font-[family-name:var(--font-display)] tracking-wider"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-luxury-gold text-black font-[family-name:var(--font-display)] tracking-widest uppercase py-3 rounded hover:brightness-110 transition-all disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[10px] text-white/30 font-[family-name:var(--font-display)] tracking-widest uppercase">Or</span>
              <div className="h-px bg-white/5 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/5 py-2.5 rounded flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-[10px] text-white uppercase tracking-wider">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/5 py-2.5 rounded flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-[10px] text-white uppercase tracking-wider">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-white/40 font-[family-name:var(--font-display)] tracking-wide">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-luxury-gold hover:text-white transition-colors ml-1 uppercase text-[10px] tracking-widest"
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
