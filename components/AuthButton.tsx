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
        className="border border-[#C9B037]/50 text-[#C9B037] hover:bg-[#C9B037]/10 px-6 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all bg-black/40 backdrop-blur-md"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-[#C9B037]/20 w-full max-w-md rounded-none p-10 relative shadow-[0_0_50px_rgba(201,176,55,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-[#C9B037] transition-colors text-xl font-light"
            >
              ✕
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif italic text-[#C9B037] mb-2 tracking-wide">
                {isLogin ? 'Sign In' : 'Exclusive Access'}
              </h2>
              <p className="text-xs text-white/40 tracking-widest uppercase">
                S_FIT VIP Members Only
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-10">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-xs tracking-widest focus:border-[#C9B037] outline-none transition-colors placeholder:text-white/20"
                required
              />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-xs tracking-widest focus:border-[#C9B037] outline-none transition-colors placeholder:text-white/20"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold tracking-widest text-xs py-4 hover:bg-white transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'JOIN THE CLUB')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] bg-white/10 flex-1" />
              <span className="text-[10px] tracking-widest text-white/30 uppercase">Alternative</span>
              <div className="h-[1px] bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="border border-white/10 hover:border-[#C9B037]/50 py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-xs text-white/60 group-hover:text-[#C9B037]">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="border border-white/10 hover:border-[#C9B037]/50 py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-xs text-white/60 group-hover:text-[#C9B037]">Kakao</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="border border-white/10 hover:border-[#C9B037]/50 py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-xs text-white/60 group-hover:text-[#C9B037]">Apple</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="border border-white/10 hover:border-[#C9B037]/50 py-3 flex items-center justify-center gap-2 transition-colors group">
                <span className="text-xs text-white/60 group-hover:text-[#C9B037]">Discord</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-white/40 tracking-widest uppercase">
              {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-white transition-colors ml-2 font-bold"
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
