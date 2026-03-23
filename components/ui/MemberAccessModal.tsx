import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
  setIsLogin: (val: boolean) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  onSocialLogin: (provider: 'google' | 'kakao' | 'apple' | 'discord') => void;
}

export const MemberAccessModal: React.FC<MemberAccessModalProps> = ({
  isOpen,
  onClose,
  isLogin,
  setIsLogin,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  loading,
  onSocialLogin,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#0A0A0A] border border-[#C9B037]/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(201,176,55,0.1)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Gold Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9B037] to-transparent opacity-50" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-[#C9B037] transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-[family-name:var(--font-display)] tracking-widest text-[#C9B037] uppercase mb-2">
                  Member Access
                </h2>
                <p className="text-xs text-gray-400 tracking-wider">
                  {isLogin ? 'ENTER THE CLUB' : 'REQUEST INVITATION'}
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder-gray-600 font-[family-name:var(--font-body)] tracking-widest"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white text-sm focus:border-[#C9B037] outline-none transition-colors placeholder-gray-600 font-[family-name:var(--font-body)] tracking-widest"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !email || !password}
                  className="w-full mt-8 bg-[#C9B037] text-black font-bold py-4 rounded-sm hover:bg-[#F4E4BC] transition-colors disabled:opacity-50 tracking-[0.2em] uppercase text-sm"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </button>
              </form>

              <div className="flex items-center gap-4 my-8">
                <div className="h-[1px] bg-white/10 flex-1" />
                <span className="text-[10px] text-gray-500 tracking-widest uppercase">Or</span>
                <div className="h-[1px] bg-white/10 flex-1" />
              </div>

              <div className="grid grid-cols-4 gap-3">
                <button onClick={() => onSocialLogin('google')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-sm flex items-center justify-center transition-colors">
                  <span className="text-lg">🇬</span>
                </button>
                <button onClick={() => onSocialLogin('kakao')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-sm flex items-center justify-center transition-colors">
                  <span className="text-lg">💬</span>
                </button>
                <button onClick={() => onSocialLogin('apple')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-sm flex items-center justify-center transition-colors">
                  <span className="text-lg">🍎</span>
                </button>
                <button onClick={() => onSocialLogin('discord')} className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-sm flex items-center justify-center transition-colors">
                  <span className="text-lg">🎮</span>
                </button>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[10px] text-gray-500 hover:text-[#C9B037] tracking-widest uppercase transition-colors"
                >
                  {isLogin ? 'Apply for Membership' : 'Existing Member Login'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
