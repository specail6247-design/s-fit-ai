'use client';

import React from 'react';
import { SupportHub } from './SupportHub';
import { PrivacyTermsModal } from './PrivacyTermsModal';

export function ModalProvider() {
  return (
    <>
      <SupportHub />
      <PrivacyTermsModal />
    </>
  );
}
