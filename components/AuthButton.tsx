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
          <p className="text-sm font-medium text-white max-w-[100px] truncate" style={{ color: '#ecab13' }}>
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-[#ecab13] px-4 py-2 rounded-full text-xs font-medium transition-colors border border-[#ecab13]/30 uppercase tracking-widest"
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
        className="bg-transparent text-[#ecab13] px-5 py-2 text-xs font-bold hover:bg-[#ecab13]/10 transition-all border border-[#ecab13]/50 tracking-[0.2em] uppercase rounded-none"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-[#ecab13]/20 w-full max-w-sm p-8 relative shadow-[0_0_40px_rgba(236,171,19,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-soft-gray hover:text-[#ecab13] transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-normal text-[#ecab13] mb-8 text-center tracking-widest" style={{ fontFamily: '"Cinzel", serif' }}>
              {isLogin ? 'MEMBER ACCESS' : 'BECOME A MEMBER'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#ecab13] focus:ring-0 outline-none transition-colors placeholder:text-gray-600"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#ecab13] focus:ring-0 outline-none transition-colors placeholder:text-gray-600"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-black font-bold py-3 mt-4 hover:bg-[#d69a11] transition-colors disabled:opacity-50 tracking-widest uppercase text-xs"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Join')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-6 opacity-50">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-white tracking-widest uppercase">Privilege Access</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent hover:bg-white/5 border border-white/10 py-2 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-xs text-white uppercase tracking-wider">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent hover:bg-white/5 border border-white/10 py-2 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-xs text-white uppercase tracking-wider">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-gray-500 tracking-wider uppercase">
              {isLogin ? "Not on the list?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ecab13] hover:text-white transition-colors ml-2 border-b border-[#ecab13]/30 pb-0.5"
              >
                {isLogin ? 'Apply now' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
