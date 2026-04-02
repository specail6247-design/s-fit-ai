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
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">VIP Member</p>
          <p className="text-sm font-bold text-[#ecab13] max-w-[120px] truncate font-serif">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-[10px] font-mono tracking-widest uppercase border border-white/20 text-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
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
        className="text-[10px] font-mono tracking-widest uppercase border border-white/20 text-white px-6 py-3 hover:bg-white hover:text-black transition-colors"
      >
        MEMBER ACCESS
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-[#ecab13]/30 w-full max-w-sm p-8 relative shadow-[0_0_40px_rgba(236,171,19,0.1)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-[#ecab13] tracking-widest mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                VIP ACCESS
              </h2>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                {isLogin ? 'Authenticate Identity' : 'Register Identity'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6 mb-8">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#ecab13] outline-none transition-colors font-mono placeholder:text-gray-600"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white text-sm focus:border-[#ecab13] outline-none transition-colors font-mono placeholder:text-gray-600"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-transparent border border-[#ecab13] text-[#ecab13] font-mono text-xs tracking-widest uppercase py-3 hover:bg-[#ecab13] hover:text-black transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Social</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleSocialLogin('google')} className="border border-white/10 py-2 flex items-center justify-center gap-2 hover:border-white/40 transition-colors">
                <span className="text-sm">G</span> <span className="text-[10px] text-gray-400 font-mono uppercase">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="border border-white/10 py-2 flex items-center justify-center gap-2 hover:border-white/40 transition-colors">
                <span className="text-sm">A</span> <span className="text-[10px] text-gray-400 font-mono uppercase">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-gray-500 font-mono uppercase tracking-widest">
              {isLogin ? "No access key?" : "Already verified?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#ecab13] hover:text-white transition-colors ml-2"
              >
                {isLogin ? 'Request Access' : 'Authenticate'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
