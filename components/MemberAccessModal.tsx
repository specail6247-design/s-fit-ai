import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAccessModal({ isOpen, onClose }: MemberAccessModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate login
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
          />

          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#C9B037]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-md bg-[#0A0A0A] border border-white/5 rounded-3xl p-10 shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Minimalist Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9B037]/50 to-transparent opacity-50" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="flex flex-col items-center mb-12">
              <span className="text-xs text-[#C9B037] tracking-[0.3em] uppercase mb-4 font-mono opacity-80">
                VIP Access
              </span>
              <h2 className="text-3xl font-display font-light tracking-tight text-white/90">
                Member Sign In
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 text-white/90 px-0 py-3 text-lg font-light focus:outline-none focus:border-[#C9B037] transition-colors peer placeholder-transparent"
                  placeholder="Email Address"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 text-white/40 text-lg font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#C9B037] peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/40"
                >
                  Email Address
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-4 bg-white text-black font-medium tracking-wide rounded-full hover:bg-[#C9B037] hover:text-white transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden"
              >
                {isSubmitting ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <span>ENTER CLUB</span>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-white/30 font-light tracking-wide">
                Strictly by invitation or approved application.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
