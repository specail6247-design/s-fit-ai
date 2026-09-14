'use client';
import React, { useState } from 'react';
import ReportIssueModal from './ReportIssueModal';

export default function SupportHub() {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={() => setIsReportOpen(true)}
        className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-gray-300 hover:text-white border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-colors shadow-lg flex items-center gap-2"
      >
        <span>🐛</span> Report Issue
      </button>

      <ReportIssueModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
