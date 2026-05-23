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
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Member</p>
          <p className="text-xs font-bold text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="hover:bg-white/10 text-white p-2 rounded-full text-xs font-medium transition-colors"
          aria-label="Sign Out"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-6 right-6 z-40 bg-transparent text-white px-5 py-2 rounded-none text-xs font-bold hover:bg-white/5 transition-all border-b border-white/30 uppercase tracking-widest backdrop-blur-sm"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-sm p-10 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors text-xl font-light"
            >
              ✕
            </button>
            
            <div className="mb-10 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Secure Entry</p>
              <h2 className="text-2xl font-light tracking-widest text-white uppercase font-serif">
                {isLogin ? 'Sign In' : 'Register'}
              </h2>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-10">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white text-xs tracking-widest focus:border-white outline-none transition-colors uppercase placeholder:text-gray-600"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white text-xs tracking-widest focus:border-white outline-none transition-colors uppercase placeholder:text-gray-600"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black text-xs font-bold py-4 hover:bg-gray-200 transition-colors tracking-widest uppercase disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter Vault' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-600 uppercase tracking-widest">Or authenticate via</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="flex justify-center gap-6">
              <button onClick={() => handleSocialLogin('google')} className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">🍎</span>
              </button>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-white pb-1"
              >
                {isLogin ? 'Create new credentials' : 'Use existing credentials'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
