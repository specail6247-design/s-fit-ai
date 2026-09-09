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
          <p className="text-[10px] text-[#C9B037] tracking-[0.2em] uppercase">VIP Member</p>
          <p className="text-xs font-mono text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent border border-white/20 hover:border-white/50 text-white px-4 py-2 text-[10px] font-bold tracking-[0.1em] uppercase transition-colors"
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
        className="px-6 py-2 bg-transparent text-white border border-white/20 hover:border-[#C9B037] hover:text-[#C9B037] text-[10px] font-bold tracking-[0.2em] uppercase transition-all"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <div className="bg-[#0a0a0a] border border-[#C9B037]/20 w-full max-w-md p-10 relative shadow-[0_0_80px_rgba(201,176,55,0.05)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-[#C9B037] transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-2xl font-mono font-bold text-[#C9B037] tracking-[0.3em] uppercase">
                {isLogin ? 'Sign In' : 'Join VIP'}
              </h2>
              <div className="w-8 h-px bg-[#C9B037]/50 mx-auto mt-4"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div>
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-xs font-mono focus:border-[#C9B037] outline-none transition-colors tracking-widest placeholder:text-white/30"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-xs font-mono focus:border-[#C9B037] outline-none transition-colors tracking-widest placeholder:text-white/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold py-4 text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Connect</span>
              <div className="h-px bg-white/5 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent border border-white/10 hover:border-white/30 py-3 flex items-center justify-center gap-3 transition-colors group">
                <span className="text-base grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">🇬</span>
                <span className="text-[10px] text-white/50 group-hover:text-white font-mono tracking-widest uppercase">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent border border-white/10 hover:border-white/30 py-3 flex items-center justify-center gap-3 transition-colors group">
                <span className="text-base grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">🍎</span>
                <span className="text-[10px] text-white/50 group-hover:text-white font-mono tracking-widest uppercase">Apple</span>
              </button>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-white/40 hover:text-[#C9B037] tracking-[0.1em] uppercase transition-colors underline-offset-4 hover:underline"
              >
                {isLogin ? 'Apply for membership' : 'Return to sign in'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
