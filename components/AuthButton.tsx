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
      <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Member</p>
          <p className="text-sm text-[#C9B037] max-w-[100px] truncate font-serif">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
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
        className="bg-transparent text-[#C9B037] border border-[#C9B037]/30 hover:border-[#C9B037] hover:bg-[#C9B037]/5 px-6 py-2 rounded-none text-xs tracking-widest uppercase transition-all"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/90 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-[#C9B037]/20 w-full max-w-sm p-8 relative shadow-2xl shadow-[#C9B037]/5">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-[#C9B037] transition-colors"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-serif text-[#C9B037] mb-8 text-center uppercase tracking-widest">
              {isLogin ? 'Vip Access' : 'Join the Club'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#C9B037] outline-none placeholder:text-gray-600 transition-colors"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#C9B037] outline-none placeholder:text-gray-600 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9B037] text-black font-medium tracking-widest uppercase py-3 hover:bg-white transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Enter' : 'Register')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Or continue with</span>
              <div className="h-[1px] bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="border border-white/10 hover:border-[#C9B037] hover:bg-[#C9B037]/5 py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-sm">G</span> <span className="text-xs text-gray-400 uppercase tracking-wide">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="border border-white/10 hover:border-[#C9B037] hover:bg-[#C9B037]/5 py-3 flex items-center justify-center gap-2 transition-colors">
                <span className="text-sm">A</span> <span className="text-xs text-gray-400 uppercase tracking-wide">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-gray-500 uppercase tracking-wide">
              {isLogin ? "Not a member yet?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9B037] hover:text-white transition-colors ml-2"
              >
                {isLogin ? 'Apply' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
