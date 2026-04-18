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
          <p className="text-xs text-soft-gray uppercase tracking-widest font-serif">Welcome,</p>
          <p className="text-sm font-medium text-[#C9B037] max-w-[100px] truncate font-serif">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-[#C9B037] px-6 py-2 rounded-none border border-[#C9B037]/30 text-xs tracking-widest uppercase transition-all duration-300 font-serif"
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
        className="bg-transparent text-[#C9B037] px-8 py-3 border border-[#C9B037] text-xs uppercase tracking-widest font-serif hover:bg-[#C9B037] hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(201,176,55,0.15)] hover:shadow-[0_0_25px_rgba(201,176,55,0.4)]"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-[#C9B037]/20 w-full max-w-sm rounded-none p-8 relative shadow-[0_0_50px_rgba(201,176,55,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#C9B037] transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-serif text-[#C9B037] mb-8 text-center uppercase tracking-[0.2em]">
              {isLogin ? 'Sign In' : 'Join Club'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 rounded-none px-2 py-3 text-white text-sm focus:border-[#C9B037] outline-none font-sans transition-colors placeholder:text-gray-600"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 rounded-none px-2 py-3 text-white text-sm focus:border-[#C9B037] outline-none font-sans transition-colors placeholder:text-gray-600"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-serif uppercase tracking-widest py-4 mt-4 hover:bg-[#F4E4BC] transition-colors disabled:opacity-50 text-sm"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Partners</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-sm">G</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-sm"></span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-gray-500 uppercase tracking-widest">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-[#F4E4BC] ml-2 transition-colors"
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
