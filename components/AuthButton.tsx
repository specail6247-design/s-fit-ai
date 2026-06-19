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
        className="bg-transparent border border-[#C9B037] text-[#C9B037] px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#C9B037]/10 transition-all font-[family-name:var(--font-display)] shadow-[0_0_15px_rgba(201,176,55,0.2)]"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-opacity duration-500">
          <div className="bg-void-black border border-[#C9B037]/30 w-full max-w-md rounded-none p-10 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] before:content-[''] before:absolute before:inset-0 before:border before:border-white/5 before:m-2 before:pointer-events-none">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-soft-gray hover:text-[#C9B037] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="text-center mb-10 mt-4">
              <h2 className="text-2xl tracking-widest text-[#C9B037] font-[family-name:var(--font-display)] uppercase mb-2">
                {isLogin ? 'VIP Sign In' : 'Request Access'}
              </h2>
              <p className="text-xs text-soft-gray tracking-widest uppercase font-mono">
                Exclusive Virtual Fitting Experience
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="relative group">
                <input
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors"
                  required
                />
                <label className="absolute left-0 top-3 text-sm text-soft-gray transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9B037] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                  Email Address
                </label>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors"
                  required
                />
                <label className="absolute left-0 top-3 text-sm text-soft-gray transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9B037] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                  Passcode
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold tracking-widest py-4 mt-4 hover:bg-[#e8d282] transition-colors disabled:opacity-50 uppercase text-xs"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Join')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 opacity-60 hover:opacity-100 transition-opacity">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-soft-gray tracking-widest uppercase">Alternate Access</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent border border-white/10 hover:border-[#C9B037] hover:bg-[#C9B037]/5 py-3 flex items-center justify-center transition-all group">
                <span className="text-lg opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-transparent border border-white/10 hover:border-[#C9B037] hover:bg-[#C9B037]/5 py-3 flex items-center justify-center transition-all group">
                <span className="text-lg opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent border border-white/10 hover:border-[#C9B037] hover:bg-[#C9B037]/5 py-3 flex items-center justify-center transition-all group">
                <span className="text-lg opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-transparent border border-white/10 hover:border-[#C9B037] hover:bg-[#C9B037]/5 py-3 flex items-center justify-center transition-all group">
                <span className="text-lg opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all">🎮</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-soft-gray tracking-widest font-mono uppercase">
                {isLogin ? "Not a member?" : "Already a member?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#C9B037] hover:text-white transition-colors ml-2 font-bold"
                >
                  {isLogin ? 'Apply' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
