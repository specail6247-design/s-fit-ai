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
          <p className="text-[10px] text-white/50 uppercase tracking-widest">VIP Access</p>
          <p className="text-sm font-medium text-white max-w-[120px] truncate tracking-wider">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/5 text-white px-5 py-2 rounded-none text-[10px] font-bold transition-colors border border-white/20 uppercase tracking-widest backdrop-blur-sm"
        >
          Depart
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-transparent border border-white/20 text-white px-6 py-2.5 text-[10px] font-bold hover:bg-white/10 hover:border-white/40 transition-all uppercase tracking-[0.2em] shadow-lg backdrop-blur-md rounded-none"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          <div className="bg-[#050505] border border-white/10 w-full max-w-md p-10 relative shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-10 mt-4">
               <h2 className="text-3xl font-black text-white mb-2 font-display uppercase tracking-[0.2em]">
                 {isLogin ? 'Member Access' : 'VIP Invite'}
               </h2>
               <p className="text-soft-gray text-[10px] tracking-[0.3em] uppercase">
                 {isLogin ? 'Enter the inner circle' : 'Join the elite'}
               </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-6">
                <input
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/20 tracking-widest uppercase"
                  required
                />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-white outline-none transition-colors placeholder:text-white/20 tracking-widest uppercase"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 tracking-[0.2em] uppercase text-xs mt-8"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-white/30 tracking-widest uppercase">Or</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent border border-white/10 hover:bg-white/5 py-3 flex items-center justify-center gap-3 transition-colors">
                <span className="text-white text-[10px] tracking-[0.2em] uppercase font-bold">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent border border-white/10 hover:bg-white/5 py-3 flex items-center justify-center gap-3 transition-colors">
                <span className="text-white text-[10px] tracking-[0.2em] uppercase font-bold">Apple</span>
              </button>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] text-soft-gray hover:text-white tracking-[0.2em] uppercase transition-colors border-b border-transparent hover:border-white pb-1"
              >
                {isLogin ? 'Apply for membership' : 'Already a member?'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
