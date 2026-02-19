"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useState } from "react";

export default function MemberAccessModal() {
  const { isMemberAccessOpen, setMemberAccessOpen } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AnimatePresence>
      {isMemberAccessOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setMemberAccessOpen(false)}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-2xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setMemberAccessOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-mono tracking-widest text-white uppercase mb-2">
                Member Access
              </h2>
              <p className="text-sm text-white/50 font-light">
                Enter the inner circle.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-mono text-sm"
                  placeholder="vip@s-fit.ai"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-mono text-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <button className="text-xs text-white/30 hover:text-white/70 transition-colors font-mono">
                Request Invitation
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
