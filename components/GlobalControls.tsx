"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";

export default function GlobalControls() {
  const { setMemberAccessOpen, setSupportHubOpen } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
      {/* Support Hub Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSupportHubOpen(true)}
        className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors shadow-lg"
        aria-label="Open Support Hub"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </motion.button>

      {/* Member Access Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMemberAccessOpen(true)}
        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
        aria-label="Member Access"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </motion.button>
    </div>
  );
}
