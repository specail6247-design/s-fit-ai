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
          <p className="text-xs text-soft-gray font-serif italic text-[#ecab13]">Welcome,</p>
          <p className="text-sm font-medium text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent border border-[#ecab13]/30 hover:bg-[#ecab13]/10 text-[#ecab13] px-4 py-2 rounded-full text-xs font-medium transition-colors"
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
        className="bg-transparent border border-[#ecab13] text-[#ecab13] px-5 py-2 rounded-full text-xs font-serif tracking-widest uppercase hover:bg-[#ecab13]/10 transition-all shadow-[0_0_15px_rgba(236,171,19,0.15)] hover:shadow-[0_0_20px_rgba(236,171,19,0.3)]"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-[#ecab13]/30 w-full max-w-sm p-8 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-[#ecab13] transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-serif text-[#ecab13] mb-8 text-center tracking-wider">
              {isLogin ? 'Member Access' : 'Join the Club'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder:text-gray-600"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder:text-gray-600"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-black font-serif tracking-widest uppercase py-3 hover:brightness-110 transition-all disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Apply')}
              </button>
            </form>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Or authenticate with</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 hover:border-[#ecab13] border border-white/10 py-2.5 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg grayscale opacity-70">🇬</span> <span className="text-xs text-gray-300">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 hover:border-[#ecab13] border border-white/10 py-2.5 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg grayscale opacity-70">💬</span> <span className="text-xs text-gray-300">Kakao</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 hover:border-[#ecab13] border border-white/10 py-2.5 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg grayscale opacity-70">🍎</span> <span className="text-xs text-gray-300">Apple</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 hover:border-[#ecab13] border border-white/10 py-2.5 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg grayscale opacity-70">🎮</span> <span className="text-xs text-gray-300">Discord</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-gray-500">
              {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ecab13] hover:underline ml-1 font-serif italic"
              >
                {isLogin ? 'Request access' : 'Enter'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
