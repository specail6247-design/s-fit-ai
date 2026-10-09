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
        className="border border-white/20 hover:border-[#007AFF] text-white px-5 py-2 rounded-full text-[10px] tracking-widest font-bold uppercase transition-all bg-black/40 hover:bg-black/60 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="w-full max-w-sm relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-gray-500 hover:text-white transition-colors"
            >
              ✕ CLOSE
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light tracking-widest text-white mb-2 font-serif">
                {isLogin ? 'Sign In' : 'Join VIP'}
              </h2>
              <div className="h-px w-12 bg-[#007AFF] mx-auto"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-gray-400 uppercase">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#007AFF] outline-none transition-colors"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-gray-400 uppercase">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#007AFF] outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full border border-white text-white font-light tracking-widest text-sm py-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 mt-4"
              >
                {loading ? 'AUTHENTICATING...' : (isLogin ? 'ENTER' : 'REGISTER')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 opacity-50">
              <div className="h-px bg-white flex-1" />
              <span className="text-[10px] tracking-widest text-white uppercase">OR</span>
              <div className="h-px bg-white flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="border border-white/20 py-3 text-xs tracking-widest text-gray-300 hover:border-white hover:text-white transition-all uppercase">
                Google
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="border border-white/20 py-3 text-xs tracking-widest text-gray-300 hover:border-white hover:text-white transition-all uppercase">
                Apple
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-gray-500 tracking-widest uppercase">
              {isLogin ? "New to the club?" : "Existing member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-[#007AFF] ml-2 transition-colors border-b border-transparent hover:border-[#007AFF]"
              >
                {isLogin ? 'Apply' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
