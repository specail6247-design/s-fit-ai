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
        className="bg-transparent border border-[#ecab13]/50 text-[#ecab13] px-5 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-[#ecab13]/10 hover:shadow-[0_0_15px_rgba(236,171,19,0.2)] transition-all"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-[#ecab13]/30 shadow-[0_0_40px_rgba(236,171,19,0.15)] w-full max-w-sm rounded-2xl p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-[#ecab13] tracking-widest uppercase">
                VIP Access
              </h2>
              <p className="text-[10px] text-gray-500 tracking-[0.2em] mt-2 uppercase">
                {isLogin ? 'Enter The Club' : 'Join The Club'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none placeholder:text-gray-600 transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none placeholder:text-gray-600 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-black font-bold py-4 rounded-lg hover:bg-[#d49911] transition-all disabled:opacity-50 uppercase tracking-widest text-xs"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-500 tracking-widest uppercase">Social</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-sm">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FAE100]/30 py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-sm">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-sm">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5865F2]/30 py-3 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-sm">🎮</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-gray-500 tracking-widest uppercase">
              {isLogin ? "No Access?" : "Have Access?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ecab13] hover:text-white transition-colors ml-1 underline underline-offset-4"
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
