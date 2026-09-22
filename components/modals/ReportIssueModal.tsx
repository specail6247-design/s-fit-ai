import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function ReportIssueModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111] border border-white/20 rounded-2xl p-6 max-w-lg w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Report an Issue</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-green-400 text-4xl mb-4">✓</div>
            <p className="text-gray-300">Thanks for your feedback!</p>
            <button onClick={onClose} className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white">Close</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Issue Type</label>
              <select className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white">
                <option>Bug</option>
                <option>Fit Issue</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Description</label>
              <textarea required className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white h-24" placeholder="Please describe the issue..." />
            </div>
            <button type="submit" className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] rounded-xl font-bold text-white">
              Submit Report
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
