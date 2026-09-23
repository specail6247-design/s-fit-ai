'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });

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
        className="bg-gradient-to-r from-[#C9B037] to-[#8A7922] text-void-black px-6 py-2.5 rounded-full text-xs font-extrabold hover:brightness-110 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(201,176,55,0.4)]"
      >
        Member Access
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#050505] border border-[#C9B037]/30 w-full max-w-md rounded-none p-10 relative shadow-[0_0_50px_rgba(201,176,55,0.1)] before:absolute before:inset-0 before:bg-[url('/noise.png')] before:opacity-5 before:pointer-events-none">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-[#C9B037] transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="text-center mb-10">
              <h2 className={`${cinzel.className} text-3xl font-serif text-[#C9B037] mb-2 tracking-widest uppercase`}>
                {isLogin ? 'Sign In' : 'Join VIP'}
              </h2>
              <div className="w-12 h-px bg-[#C9B037]/50 mx-auto mt-4 mb-2"></div>
              <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Exclusive Fitting Room</p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5 mb-8">
              <div>
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-xs tracking-widest focus:border-[#C9B037] outline-none placeholder:text-white/20 transition-colors"
                  required
                  aria-label="Email"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-xs tracking-widest focus:border-[#C9B037] outline-none placeholder:text-white/20 transition-colors"
                  required
                  aria-label="Password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="w-full mt-4 bg-[#C9B037] text-black font-bold py-4 text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Request Access')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-white/30 tracking-widest">OR</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="bg-transparent border border-white/10 hover:border-[#C9B037] hover:text-[#C9B037] text-white/50 py-3 flex items-center justify-center gap-2 transition-all">
                 <span className="text-[10px] font-bold tracking-widest uppercase">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-transparent border border-white/10 hover:border-[#C9B037] hover:text-[#C9B037] text-white/50 py-3 flex items-center justify-center gap-2 transition-all">
                 <span className="text-[10px] font-bold tracking-widest uppercase">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-white/40 tracking-widest uppercase">
              {isLogin ? "Not a member?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-white transition-colors ml-2"
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
