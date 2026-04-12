import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MemberAccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Ambient Background */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#007AFF] opacity-10 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-2xl font-black italic tracking-tighter mb-2">
                {isLogin ? 'MEMBER_ACCESS' : 'BECOME_MEMBER'}
              </h2>
              <p className="text-xs text-white/50 tracking-widest uppercase">
                Exclusive Virtual Fitting
              </p>
            </div>

            <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#007AFF] focus:bg-white/10 outline-none transition-all"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#007AFF] focus:bg-white/10 outline-none transition-all"
                />
              </div>
              <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors mt-2">
                {isLogin ? 'SIGN IN' : 'JOIN NOW'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                {isLogin ? "Don't have an account? Join" : "Already a member? Sign in"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
