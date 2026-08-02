'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-xs text-gray-400">Welcome,</p>
          <p className={`text-sm text-[#ecab13] max-w-[100px] truncate ${playfair.className}`}>
            {user.email?.split('@')[0]}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white/10 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors border border-white/20"
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
        className={`bg-transparent text-[#ecab13] px-6 py-2 rounded-full text-sm hover:bg-[#ecab13]/10 transition-all border border-[#ecab13]/30 ${playfair.className}`}
      >
        MEMBER ACCESS
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0a0a0a] border border-[#ecab13]/30 w-full max-w-sm p-8 relative shadow-[0_0_40px_rgba(236,171,19,0.1)]"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-[#ecab13] transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className={`text-3xl text-[#ecab13] mb-8 text-center tracking-widest uppercase ${playfair.className}`}>
                {isLogin ? 'Sign In' : 'Join Us'}
              </h2>

              <form onSubmit={handleAuth} className="space-y-6 mb-8">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder:text-gray-600 tracking-widest uppercase"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#ecab13] outline-none transition-colors placeholder:text-gray-600 tracking-widest uppercase"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#ecab13] text-[#0a0a0a] py-4 hover:bg-[#ffc13b] transition-colors disabled:opacity-50 tracking-widest uppercase text-sm mt-4 ${playfair.className}`}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Enter' : 'Apply')}
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-gray-500 hover:text-[#ecab13] transition-colors tracking-widest uppercase"
                >
                  {isLogin ? 'Request Access' : 'Existing Member'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
