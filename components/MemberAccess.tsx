import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAccess({ isOpen, onClose }: MemberAccessProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="member-access-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md p-8 overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl"
          >
            {/* Ambient Background Effect inside the Modal */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/10 to-[#007AFF]/20 pointer-events-none" />

            <button
              onClick={onClose}
              aria-label="Close Member Access Modal"
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors focus-visible:ring-2 outline-none p-1 rounded-full z-20"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="relative z-10 space-y-8">
              <header className="text-center space-y-2">
                <h2 className="text-3xl font-black tracking-tighter italic text-white uppercase font-sans">
                  VIP <span className="text-[#007AFF]">ACCESS</span>
                </h2>
                <p className="text-xs text-gray-400 tracking-[0.2em] uppercase">
                  Member Exclusive Domain
                </p>
              </header>

              <form className="space-y-6 mt-8" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input
                    type="email"
                    id="member-email"
                    required
                    placeholder=" "
                    className="peer w-full bg-black/50 border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-[#007AFF] transition-colors placeholder-transparent bg-transparent rounded-none"
                  />
                  <label
                    htmlFor="member-email"
                    className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#007AFF] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none font-medium uppercase tracking-widest"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    id="member-password"
                    required
                    placeholder=" "
                    className="peer w-full bg-black/50 border-b-2 border-white/20 px-0 py-3 text-white focus:outline-none focus:border-[#007AFF] transition-colors placeholder-transparent bg-transparent rounded-none"
                  />
                  <label
                    htmlFor="member-password"
                    className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#007AFF] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none font-medium uppercase tracking-widest"
                  >
                    Passkey
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-6 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#007AFF] hover:text-white transition-all duration-300 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,122,255,0.4)]"
                >
                  Enter
                </button>
              </form>

              <div className="text-center pt-4 border-t border-white/10 mt-6">
                <a href="#" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                  Request Invitation
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
