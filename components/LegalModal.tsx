import React from 'react';
import { BottomSheet } from './ui/BottomSheet';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Legal & Compliance">
      <div className="space-y-6 text-sm text-gray-300">
        <div>
          <h4 className="text-white font-bold mb-2">Privacy Policy</h4>
          <p>
            Your privacy is important to us. We process your photos securely.
            Images are only stored temporarily for the duration of the fitting
            process and are not shared with third parties.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Terms of Service</h4>
          <p>
            By using S_FIT NEO, you agree to our terms. This service is provided
            &quot;as is&quot; for virtual fitting purposes. We reserve the right to
            modify or discontinue the service at any time.
          </p>
        </div>
      </div>
    </BottomSheet>
  );
};
