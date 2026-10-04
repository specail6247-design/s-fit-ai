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
        className="bg-transparent border border-white/20 text-white px-6 py-2.5 rounded-none text-[10px] font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-[#0a0a0a] border border-[#2d2d2d] w-full max-w-sm p-8 relative shadow-[0_0_50px_rgba(236,171,19,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-[#ecab13] text-3xl mb-2">vpn_key</span>
              <h2 className="text-white text-xs font-bold tracking-[0.3em] uppercase">
                {isLogin ? 'VIP Access' : 'Apply for Membership'}
              </h2>
              <div className="w-12 h-px bg-[#ecab13]/50 mx-auto mt-4" />
            </div>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <div>
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#2d2d2d] px-0 py-3 text-white text-xs tracking-widest placeholder:text-zinc-600 focus:border-[#ecab13] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[#2d2d2d] px-0 py-3 text-white text-xs tracking-widest placeholder:text-zinc-600 focus:border-[#ecab13] focus:outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-black text-xs font-bold tracking-widest uppercase py-4 hover:bg-[#c48a0a] transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Submit')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-[#2d2d2d] flex-1" />
              <span className="text-[10px] text-zinc-500 tracking-widest uppercase">Or</span>
              <div className="h-px bg-[#2d2d2d] flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent border border-[#2d2d2d] hover:border-[#ecab13]/50 py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-zinc-400 group-hover:text-white text-sm">G</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent border border-[#2d2d2d] hover:border-[#ecab13]/50 py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-zinc-400 group-hover:text-white text-sm"></span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-zinc-500 tracking-widest uppercase">
                {isLogin ? "Not a member?" : "Already a member?"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ecab13] hover:text-white text-xs tracking-widest uppercase mt-2 transition-colors"
              >
                {isLogin ? 'Apply Now' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
