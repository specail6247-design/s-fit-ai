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
        className="bg-transparent border border-[#C9B037]/50 text-[#C9B037] px-6 py-2 rounded-full text-xs font-bold hover:bg-[#C9B037]/10 hover:border-[#C9B037] transition-all tracking-widest uppercase"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-[#C9B037]/30 w-full max-w-md rounded-3xl p-10 relative shadow-2xl shadow-[#C9B037]/10">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-3xl font-light text-white mb-8 text-center font-[family-name:var(--font-geist-sans)] tracking-tight">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none placeholder-gray-600 transition-colors rounded-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none placeholder-gray-600 transition-colors rounded-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold py-4 rounded-full hover:brightness-110 transition-all disabled:opacity-50 tracking-widest uppercase text-xs mt-4"
              >
                {loading ? 'Processing...' : (isLogin ? 'Enter' : 'Join')}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] bg-white/10 flex-1" />
              <span className="text-[10px] tracking-widest text-gray-500 uppercase">Or Continue With</span>
              <div className="h-[1px] bg-white/10 flex-1" />
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => handleSocialLogin('google')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group">
                <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FAE100]/10 transition-colors group">
                <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group">
                <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">🍎</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-gray-500">
              {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:underline ml-1 uppercase tracking-wider"
              >
                {isLogin ? 'Apply for access' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
