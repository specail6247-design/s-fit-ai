import React from 'react';
import { BottomSheet } from './BottomSheet';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Privacy Policy & Terms">
      <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
        <section>
          <h4 className="text-[var(--color-text-primary)] font-bold mb-2">Privacy Policy</h4>
          <p>Your photos are processed securely and are never shared with third parties without your explicit consent. We use end-to-end encryption to ensure your data safety.</p>
        </section>
        <section>
          <h4 className="text-[var(--color-text-primary)] font-bold mb-2">Terms of Service</h4>
          <p>By using S_FIT AI, you agree to our terms. This service is provided for personal virtual fitting use only. AI generated images may not be perfectly accurate to real life.</p>
        </section>
        <button onClick={onClose} className="w-full mt-6 py-3 bg-[#007AFF] text-white font-bold rounded-xl">
          I Understand
        </button>
      </div>
    </BottomSheet>
  );
};
