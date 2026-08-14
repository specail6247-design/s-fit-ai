import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 w-full max-w-md relative"
            initial={{ y: 20, scale: 0.9 }} animate={{ y: 0, scale: 1 }}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>

            <h2 className="text-xl font-bold mb-2">Support Hub</h2>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-bold text-[#CCFF00] mb-2">Issue Reported</h3>
                <p className="text-sm text-gray-400">Thanks for catching that! Our engineers will look into it.</p>
                <button onClick={() => { setSubmitted(false); onClose(); }} className="mt-6 px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 text-sm">Close</button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-6">Found a bug or have feedback? Let us know below.</p>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe the issue..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm h-32 mb-4 focus:border-[#CCFF00] focus:outline-none text-white"
                />
                <button
                  onClick={() => {
                    if(issue.trim()) setSubmitted(true);
                  }}
                  className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Submit Report
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
