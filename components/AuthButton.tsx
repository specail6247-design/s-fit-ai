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
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#ecab13] font-[family-name:var(--font-space-grotesk)]">VIP Member</p>
          <p className="text-sm font-[family-name:var(--font-cinzel)] text-white max-w-[120px] truncate tracking-wide">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-gray-300 px-5 py-2 rounded-none text-xs tracking-widest uppercase transition-all duration-500 border border-white/20 hover:border-[#ecab13] font-[family-name:var(--font-space-grotesk)]"
        >
          Exit
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group relative px-6 py-2.5 overflow-hidden border border-[#ecab13]/40 bg-black hover:border-[#ecab13] transition-colors duration-1000"
      >
        <div className="absolute inset-0 w-0 bg-[#ecab13]/10 transition-all duration-1000 ease-out group-hover:w-full" />
        <span className="relative text-[#ecab13] text-xs tracking-[0.2em] font-[family-name:var(--font-space-grotesk)] uppercase">
          Member Access
        </span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all duration-1000">
          <div className="bg-[#050505] border border-[#ecab13]/20 w-full max-w-md p-10 relative shadow-[0_0_50px_rgba(236,171,19,0.05)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-[#ecab13] transition-colors duration-500"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            
            <div className="text-center mb-10">
              <span className="material-symbols-outlined text-[#ecab13] text-4xl mb-4 opacity-80">local_police</span>
              <h2 className="text-2xl text-white font-[family-name:var(--font-cinzel)] tracking-[0.15em] uppercase">
                {isLogin ? 'Enter VIP Club' : 'Request Access'}
              </h2>
              <p className="text-xs text-gray-500 tracking-widest uppercase mt-3 font-[family-name:var(--font-space-grotesk)]">
                Exclusive Virtual Styling
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white text-sm focus:border-[#ecab13] outline-none placeholder:text-gray-700 tracking-widest uppercase font-[family-name:var(--font-space-grotesk)] transition-colors duration-500 rounded-none"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white text-sm focus:border-[#ecab13] outline-none placeholder:text-gray-700 tracking-widest uppercase font-[family-name:var(--font-space-grotesk)] transition-colors duration-500 rounded-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-black font-bold py-4 text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-1000 disabled:opacity-50 mt-4 font-[family-name:var(--font-space-grotesk)]"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Join the Club')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 opacity-50">
              <div className="h-px bg-white/20 flex-1" />
              <span className="text-[10px] text-white tracking-widest uppercase font-[family-name:var(--font-space-grotesk)]">Social Connect</span>
              <div className="h-px bg-white/20 flex-1" />
            </div>

            <div className="grid grid-cols-4 gap-3">
              <button onClick={() => handleSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors duration-500 hover:border-white/30 group">
                <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">🇬</span>
              </button>
              <button onClick={() => handleSocialLogin('kakao')} className="bg-[#FAE100]/10 hover:bg-[#FAE100]/20 border border-[#FAE100]/20 py-3 flex items-center justify-center transition-colors duration-500 hover:border-[#FAE100]/50 group">
                <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">💬</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 flex items-center justify-center transition-colors duration-500 hover:border-white/30 group text-white">
                <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">🍎</span>
              </button>
              <button onClick={() => handleSocialLogin('discord')} className="bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/20 py-3 flex items-center justify-center transition-colors duration-500 hover:border-[#5865F2]/50 group">
                <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">🎮</span>
              </button>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-gray-500 hover:text-[#ecab13] tracking-[0.2em] uppercase transition-colors duration-500 font-[family-name:var(--font-space-grotesk)]"
              >
                {isLogin ? 'Apply for Membership' : 'Return to Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
