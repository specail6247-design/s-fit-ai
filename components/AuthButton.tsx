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
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">VIP Member</p>
          <p className="text-xs font-serif text-[#C9B037] max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-[#C9B037] px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest transition-colors border border-[#C9B037]/30 hover:border-[#C9B037]"
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
        className="bg-transparent text-[#C9B037] px-6 py-2 rounded-none text-xs font-bold hover:bg-[#C9B037]/10 transition-all border border-[#C9B037]/50 tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(201,176,55,0.1)]"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-[#C9B037]/20 w-full max-w-md rounded-none p-8 relative shadow-[0_0_50px_rgba(201,176,55,0.05)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-[#C9B037] transition-colors text-xl font-light"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-[#C9B037] tracking-widest uppercase mb-2">
                {isLogin ? 'VIP Access' : 'Request Access'}
              </h2>
              <div className="h-px w-12 bg-[#C9B037]/50 mx-auto"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div>
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 rounded-none px-2 py-3 text-white text-xs tracking-widest focus:border-[#C9B037] outline-none transition-colors placeholder-gray-600 uppercase"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 rounded-none px-2 py-3 text-white text-xs tracking-widest focus:border-[#C9B037] outline-none transition-colors placeholder-gray-600 uppercase"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-bold py-4 rounded-none hover:bg-[#e0c43d] transition-colors disabled:opacity-50 tracking-[0.2em] uppercase text-xs mt-4"
              >
                {loading ? 'AUTHENTICATING...' : (isLogin ? 'ENTER CLUB' : 'APPLY FOR MEMBERSHIP')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8 opacity-60">
              <div className="h-px bg-gradient-to-r from-transparent to-white/20 flex-1" />
              <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">OR CONNECT WITH</span>
              <div className="h-px bg-gradient-to-l from-transparent to-white/20 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 rounded-none flex items-center justify-center gap-3 transition-colors">
                <span className="text-sm opacity-80 text-white">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent hover:bg-white/5 border border-white/10 py-3 rounded-none flex items-center justify-center gap-3 transition-colors">
                <span className="text-sm opacity-80 text-white">Apple</span>
              </button>
            </div>

            <div className="mt-8 text-center text-[10px] tracking-widest text-gray-500 uppercase">
              {isLogin ? "Not on the list?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-white transition-colors ml-2"
              >
                {isLogin ? 'Apply Here' : 'Enter Here'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
