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
      <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-2 pl-4 rounded-full border border-white/10">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Member</p>
          <p className="text-xs font-bold text-white max-w-[100px] truncate">
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-colors border border-white/10"
        >
          LOGOUT
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white/5 px-6 py-2.5 border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <span className="text-xs font-bold tracking-[0.2em] text-white">MEMBER ACCESS</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-sm rounded-2xl p-8 relative shadow-2xl overflow-hidden">
            {/* VIP Club Atmosphere Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#007AFF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#007AFF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-2xl font-black italic tracking-widest text-white mb-2 uppercase">
                {isLogin ? 'Sign In' : 'Join Club'}
              </h2>
              <p className="text-xs text-gray-500 tracking-widest uppercase">
                Exclusive Access
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4 mb-8 relative z-10">
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono tracking-wider focus:border-[#007AFF] outline-none transition-colors"
                  required
                />
              </div>
              <div className="space-y-1">
                <input
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono tracking-wider focus:border-[#007AFF] outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold text-xs tracking-[0.2em] py-4 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 mt-4 uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                {loading ? 'Processing...' : (isLogin ? 'Enter' : 'Create Account')}
              </button>
            </form>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] font-mono tracking-widest text-gray-500">OR</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button onClick={() => handleSocialLogin('google')} className="bg-black/50 hover:bg-white/5 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🇬</span> <span className="text-[10px] font-bold tracking-wider text-white uppercase">Google</span>
              </button>
              <button onClick={() => handleSocialLogin('apple')} className="bg-black/50 hover:bg-white/5 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span className="text-lg">🍎</span> <span className="text-[10px] font-bold tracking-wider text-white uppercase">Apple</span>
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] tracking-widest text-gray-500 uppercase relative z-10">
              {isLogin ? "No access yet?" : "Already a member?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-[#007AFF] transition-colors ml-1 font-bold"
              >
                {isLogin ? 'Apply Here' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
