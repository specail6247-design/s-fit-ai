import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle outside click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md p-1 border border-white/10 rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-black shadow-2xl relative overflow-hidden"
          >
            {/* VIP Gold/Lux Accent */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#ecab13] to-transparent opacity-50" />

            <div className="p-10 flex flex-col items-center text-center relative z-10">
              <h2 className="text-3xl font-cinzel text-white mb-2">
                {isLogin ? 'MEMBER ACCESS' : 'JOIN THE ELITE'}
              </h2>
              <p className="text-[#ecab13] text-xs tracking-[0.2em] uppercase mb-8">
                S_FIT PRIVATE CLUB
              </p>

              <div className="w-full space-y-5">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-[#ecab13] transition-colors peer"
                  />
                  <label className="absolute left-0 top-3 text-gray-500 text-xs uppercase tracking-wider transition-all peer-focus:-top-2 peer-focus:text-[#ecab13] peer-focus:text-[10px] peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-[10px]">
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-[#ecab13] transition-colors peer"
                  />
                  <label className="absolute left-0 top-3 text-gray-500 text-xs uppercase tracking-wider transition-all peer-focus:-top-2 peer-focus:text-[#ecab13] peer-focus:text-[10px] peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-[10px]">
                    Passcode
                  </label>
                </div>
              </div>

              <button className="w-full mt-10 bg-white text-black font-bold py-4 rounded-none hover:bg-[#ecab13] transition-colors duration-300 uppercase tracking-widest text-sm">
                {isLogin ? 'Enter' : 'Apply'}
              </button>

              <div className="mt-6 flex items-center justify-between w-full text-[10px] uppercase tracking-wider text-gray-500">
                <button onClick={() => setIsLogin(!isLogin)} className="hover:text-white transition-colors">
                  {isLogin ? 'Request Access' : 'Have an Account?'}
                </button>
                <button className="hover:text-white transition-colors">
                  Lost Key?
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-50"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
