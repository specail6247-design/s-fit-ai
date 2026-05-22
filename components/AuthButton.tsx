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
          <p className="text-xs text-white/50 tracking-widest uppercase font-serif">Member</p>
          <p className="text-sm font-medium text-[#ecab13] max-w-[120px] truncate tracking-wide">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white/70 hover:text-[#ecab13] px-4 py-2 rounded-none text-xs font-medium transition-all duration-500 border border-white/10 hover:border-[#ecab13]/50 uppercase tracking-widest"
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
        className="bg-transparent text-white px-6 py-2 border border-white/20 hover:border-[#ecab13] hover:text-[#ecab13] rounded-none text-xs font-serif uppercase tracking-[0.2em] transition-all duration-700"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md p-4 transition-all duration-700">
          <div className="bg-[#0a0a0a] border border-[#ecab13]/30 w-full max-w-md rounded-none p-8 relative shadow-[0_0_40px_rgba(236,171,19,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-[#ecab13] transition-colors text-xl font-light"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-white tracking-[0.15em] uppercase mb-2">
                {isLogin ? 'Member Access' : 'Apply for Access'}
              </h2>
              <div className="w-12 h-[1px] bg-[#ecab13]/50 mx-auto"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div>
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors tracking-widest placeholder:text-white/30 font-light"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors tracking-widest placeholder:text-white/30 font-light"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ecab13] text-[#0a0a0a] font-serif uppercase tracking-[0.2em] py-4 hover:bg-[#ecab13]/90 transition-all duration-500 disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-white/10 flex-1" />
              <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-serif">or continue with</span>
              <div className="h-[1px] bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center gap-3 transition-colors duration-500 group">
                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🇬</span> <span className="text-[10px] text-white/70 uppercase tracking-widest group-hover:text-white transition-colors">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 flex items-center justify-center gap-3 transition-colors duration-500 group">
                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">🍎</span> <span className="text-[10px] text-white/70 uppercase tracking-widest group-hover:text-white transition-colors">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-white/50 uppercase tracking-[0.1em]">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ecab13] hover:text-white transition-colors ml-2 tracking-widest"
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
