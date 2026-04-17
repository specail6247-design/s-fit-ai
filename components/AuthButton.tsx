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
          <p className="text-xs text-soft-gray uppercase font-[family-name:var(--font-display)] tracking-widest">MEMBER,</p>
          <p className="text-sm font-bold text-[#C9B037] max-w-[100px] truncate uppercase font-[family-name:var(--font-display)]">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-[#C9B037]/10 text-[#C9B037] px-4 py-2 rounded-none text-xs font-bold transition-colors border border-[#C9B037]/50 uppercase tracking-widest font-[family-name:var(--font-display)]"
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
        className="bg-transparent text-[#C9B037] border border-[#C9B037]/50 px-6 py-2 rounded-none text-xs font-bold hover:bg-[#C9B037] hover:text-black transition-all tracking-widest uppercase font-[family-name:var(--font-display)]"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-[#C9B037]/30 w-full max-w-md p-8 relative shadow-[0_0_40px_rgba(201,176,55,0.15)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#C9B037]/50 hover:text-[#C9B037] transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold text-[#C9B037] mb-8 text-center uppercase tracking-[0.2em] font-[family-name:var(--font-display)]">
              {isLogin ? 'MEMBER ACCESS' : 'JOIN THE CLUB'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[#C9B037]/30 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none placeholder:text-white/30 uppercase tracking-widest font-[family-name:var(--font-display)] transition-colors"
                required
              />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#C9B037]/30 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none placeholder:text-white/30 uppercase tracking-widest font-[family-name:var(--font-display)] transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold py-4 rounded-none hover:bg-white transition-colors disabled:opacity-50 mt-4 uppercase tracking-[0.2em] font-[family-name:var(--font-display)]"
              >
                {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'BECOME A MEMBER')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-6 opacity-50">
              <div className="h-px bg-[#C9B037]/30 flex-1" />
              <span className="text-[10px] text-[#C9B037] uppercase tracking-widest font-[family-name:var(--font-display)]">OR CONNECT WITH</span>
              <div className="h-px bg-[#C9B037]/30 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/5 py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-xs text-white uppercase tracking-widest font-[family-name:var(--font-display)]">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/90 hover:bg-[#FAE100] text-[#371D1E] py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">💬</span> <span className="text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-display)]">Kakao</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/90 hover:bg-white text-black py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-display)]">Apple</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/90 hover:bg-[#5865F2] text-white py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🎮</span> <span className="text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-display)]">Discord</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-white/50 uppercase tracking-widest font-[family-name:var(--font-display)]">
              {isLogin ? "NOT A MEMBER YET?" : "ALREADY A MEMBER?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-white transition-colors ml-2 font-bold"
              >
                {isLogin ? 'APPLY NOW' : 'SIGN IN'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
