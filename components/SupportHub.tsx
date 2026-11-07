import React, { useState } from 'react';
import { LegalModal } from './LegalModal';
import { ReportIssueModal } from './ReportIssueModal';

export const SupportHub: React.FC = () => {
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <>
      <div className="absolute top-8 right-8 z-50 flex gap-4">
        <button
          onClick={() => setIsReportOpen(true)}
          className="text-xs text-gray-400 hover:text-white transition-colors underline decoration-white/30 underline-offset-4"
        >
          Report Issue
        </button>
        <button
          onClick={() => setLegalType('privacy')}
          className="text-xs text-gray-400 hover:text-white transition-colors underline decoration-white/30 underline-offset-4"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setLegalType('terms')}
          className="text-xs text-gray-400 hover:text-white transition-colors underline decoration-white/30 underline-offset-4"
        >
          Terms
        </button>
      </div>

      <LegalModal
        isOpen={!!legalType}
        onClose={() => setLegalType(null)}
        type={legalType}
      />

      <ReportIssueModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </>
  );
};
