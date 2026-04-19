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
        className="bg-[#050505] border border-[#C9B037]/50 text-[#C9B037] px-6 py-2.5 text-xs font-serif tracking-[0.2em] uppercase hover:bg-[#C9B037] hover:text-black transition-all shadow-[0_0_15px_rgba(201,176,55,0.15)] focus-visible:ring-2 outline-none"
        aria-label="Member Access Login"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-[#C9B037]/30 w-full max-w-sm p-8 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#C9B037] transition-colors"
              aria-label="Close Login"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif tracking-widest text-white uppercase mb-2">
                {isLogin ? 'Sign In' : 'Apply'}
              </h2>
              <div className="h-px w-12 bg-[#C9B037] mx-auto opacity-50"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-gray-500 uppercase">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#C9B037] outline-none transition-colors rounded-none placeholder-transparent"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-gray-500 uppercase">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#C9B037] outline-none transition-colors rounded-none placeholder-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-serif tracking-widest uppercase text-xs py-4 hover:bg-white transition-colors mt-4 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Submit')}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] tracking-[0.2em] text-gray-600 uppercase">Or Connect</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-[10px] tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-[10px] tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] tracking-widest text-gray-500 uppercase">
              {isLogin ? "No Access?" : "Already a Member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-white transition-colors ml-1"
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
