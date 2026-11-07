import React from 'react';
import { BottomSheet } from './ui/BottomSheet';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | null;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!type) return null;

  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={title}>
      <div className="prose prose-invert max-w-none text-sm text-gray-300">
        {type === 'privacy' ? (
          <div>
            <h4 className="text-white font-bold mb-2">1. Data Collection</h4>
            <p className="mb-4">We collect photos solely for the purpose of the virtual try-on experience. Photos are not shared with third parties without your explicit consent.</p>

            <h4 className="text-white font-bold mb-2">2. Data Storage</h4>
            <p className="mb-4">Images are temporarily stored on our secure servers for processing and are automatically deleted after 24 hours.</p>

            <h4 className="text-white font-bold mb-2">3. User Rights</h4>
            <p>You have the right to request deletion of your data at any time through the app settings.</p>
          </div>
        ) : (
          <div>
            <h4 className="text-white font-bold mb-2">1. Acceptance</h4>
            <p className="mb-4">By using S_FIT AI, you agree to these terms of service.</p>

            <h4 className="text-white font-bold mb-2">2. Acceptable Use</h4>
            <p className="mb-4">You may not use the service to generate inappropriate, offensive, or illegal content.</p>

            <h4 className="text-white font-bold mb-2">3. Intellectual Property</h4>
            <p>The virtual try-on technology and brand assets are the property of S_FIT AI.</p>
          </div>
        )}
      </div>
      <button
        onClick={onClose}
        className="mt-6 w-full py-3 bg-[#007AFF] text-white rounded-xl font-bold"
      >
        I Understand
      </button>
    </BottomSheet>
  );
};
