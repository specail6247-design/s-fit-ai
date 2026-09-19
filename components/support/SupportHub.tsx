import React, { useState } from 'react';

export function SupportHub() {
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue.trim()) {
      // In a real app, send to backend
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setIssue('');
    }
  };

  return (
    <div className="bg-black/50 p-4 rounded-xl border border-white/20 mt-4">
      <h3 className="text-sm font-bold text-[#007AFF] mb-2">Support Hub</h3>
      {submitted ? (
        <p className="text-xs text-green-500">Thank you! We&apos;ve received your report.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Report an issue or bug..."
            className="w-full bg-black/40 border border-white/20 rounded p-2 text-xs text-white"
            rows={2}
          />
          <button
            type="submit"
            className="self-end bg-[#007AFF] hover:bg-[#005bb5] text-white text-xs px-3 py-1 rounded transition-colors"
          >
            Report Issue
          </button>
        </form>
      )}
    </div>
  );
}
