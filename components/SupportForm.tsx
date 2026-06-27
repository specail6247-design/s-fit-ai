'use client';
import React, { useState } from 'react';

export function SupportForm() {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setIssue('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white/5 p-6 rounded-xl border border-white/10">
      {submitted ? (
        <div className="text-green-400 font-bold text-center py-4">Thank you! Your issue has been reported.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-bold text-gray-300">Report an Issue</label>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
            className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#007AFF] transition-colors resize-none"
            rows={4}
            placeholder="Describe the bug or issue you encountered..."
          />
          <button type="submit" className="bg-[#007AFF] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            Submit Report
          </button>
        </form>
      )}
    </div>
  );
}
