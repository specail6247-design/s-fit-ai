import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemberAccess({ isOpen, onClose }: MemberAccessProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual login logic
    console.log('Authenticating', email, password);
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
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-[#0A0A0A] border border-white/10 w-full max-w-md rounded-3xl p-10 relative shadow-[0_0_50px_rgba(204,255,0,0.05)] overflow-hidden"
          >
            {/* VIP Club Ambient Glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#CCFF00]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#007AFF]/10 rounded-full blur-[80px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase font-mono">
                Member <span className="text-[#CCFF00]">Access</span>
              </h2>
              <p className="text-xs text-gray-400 mt-2 tracking-widest uppercase">
                {isLogin ? 'Enter the VIP Lounge' : 'Join the Inner Circle'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Email / ID</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] outline-none transition-all"
                  placeholder="name@domain.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">Passkey</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-[#CCFF00] transition-colors tracking-widest uppercase mt-4 flex items-center justify-center gap-2 group"
              >
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>

            <div className="mt-8 text-center relative z-10">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                {isLogin ? "Request Access (Sign Up)" : "Already a Member? (Sign In)"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
