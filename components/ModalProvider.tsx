'use client';

import React from 'react';
import SupportHub from './modals/SupportHub';
import PrivacyTermsModal from './modals/PrivacyTermsModal';

export default function ModalProvider() {
  return (
    <>
      <SupportHub />
      <PrivacyTermsModal />
    </>
  );
}
