import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAccess({ isOpen, onClose }: MemberAccessProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual login logic
    console.log(isLogin ? 'Signing in' : 'Creating account', { email, password });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(201,176,55,0.1)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 z-10 focus-visible:ring-2 outline-none"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="p-10 relative">
              {/* Luxury Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50" />

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-serif italic text-white tracking-wider mb-2">
                  {isLogin ? 'Member Access' : 'Join VIP'}
                </h2>
                <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-mono">
                  {isLogin ? 'Sign in to continue' : 'Create an exclusive account'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#C9B037] transition-colors text-sm">
                      mail
                    </span>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9B037]/50 focus:ring-1 focus:ring-[#C9B037]/50 transition-all font-mono"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#C9B037] transition-colors text-sm">
                      lock
                    </span>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9B037]/50 focus:ring-1 focus:ring-[#C9B037]/50 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#C9B037] to-[#e8d282] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:shadow-[0_0_20px_rgba(201,176,55,0.4)] transition-all transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#C9B037] outline-none"
                >
                  {isLogin ? 'Enter' : 'Create Account'}
                </button>
              </form>

              <div className="mt-8 text-center border-t border-white/10 pt-6">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-white/50 hover:text-white transition-colors font-mono focus-visible:ring-2 outline-none rounded p-1"
                >
                  {isLogin ? "Don't have an account? Apply" : 'Already a member? Sign In'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
