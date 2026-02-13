import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemberAccessModal } from '@/components/MemberAccessModal';
import { SupportHub } from '@/components/SupportHub';

// Mock useStore
const mockSetLoginModalOpen = vi.fn();
const mockSetSupportHubOpen = vi.fn();
const mockSetPremium = vi.fn();
const mockSetActiveSupportTab = vi.fn();

const defaultStore = {
  isLoginModalOpen: false,
  setLoginModalOpen: mockSetLoginModalOpen,
  isSupportHubOpen: false,
  setSupportHubOpen: mockSetSupportHubOpen,
  setPremium: mockSetPremium,
  activeSupportTab: 'guide',
  setActiveSupportTab: mockSetActiveSupportTab,
  isPremium: false,
};

// Mock the hook
vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(() => defaultStore),
}));

import { useStore } from '@/store/useStore';

describe('Modals', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('MemberAccessModal', () => {
    it('renders when isLoginModalOpen is true', () => {
      (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...defaultStore,
        isLoginModalOpen: true,
      });

      render(<MemberAccessModal />);
      expect(screen.getByText(/Member Access/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/ENTER ID/i)).toBeInTheDocument();
    });

    it('does not render when isLoginModalOpen is false', () => {
      (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...defaultStore,
        isLoginModalOpen: false,
      });

      render(<MemberAccessModal />);
      expect(screen.queryByText(/Member Access/i)).not.toBeInTheDocument();
    });

    it('closes on cancel click', () => {
      (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...defaultStore,
        isLoginModalOpen: true,
      });

      render(<MemberAccessModal />);
      const cancelButton = screen.getByText(/Cancel Sequence/i);
      fireEvent.click(cancelButton);
      expect(mockSetLoginModalOpen).toHaveBeenCalledWith(false);
    });

    it('calls setPremium and closes on submit', () => {
      (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...defaultStore,
        isLoginModalOpen: true,
      });

      render(<MemberAccessModal />);

      const emailInput = screen.getByPlaceholderText(/ENTER ID/i);
      const passwordInput = screen.getByPlaceholderText(/••••••••/i);
      const submitButton = screen.getByText(/Authenticate/i);

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(submitButton);

      expect(mockSetPremium).toHaveBeenCalledWith(true);
      expect(mockSetLoginModalOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('SupportHub', () => {
    it('renders when isSupportHubOpen is true', () => {
      (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...defaultStore,
        isSupportHubOpen: true,
      });

      render(<SupportHub />);
      expect(screen.getByText(/Support Hub/i)).toBeInTheDocument();
      expect(screen.getByText(/USER GUIDE/i)).toBeInTheDocument();
    });

    it('does not render when isSupportHubOpen is false', () => {
      (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...defaultStore,
        isSupportHubOpen: false,
      });

      render(<SupportHub />);
      expect(screen.queryByText(/Support Hub/i)).not.toBeInTheDocument();
    });

    it('closes on close button click', () => {
      (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...defaultStore,
        isSupportHubOpen: true,
      });

      render(<SupportHub />);
      const closeButton = screen.getByLabelText(/Close Support Hub/i);
      fireEvent.click(closeButton);
      expect(mockSetSupportHubOpen).toHaveBeenCalledWith(false);
    });

    it('switches tabs', () => {
       (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        ...defaultStore,
        isSupportHubOpen: true,
        activeSupportTab: 'guide',
      });

      render(<SupportHub />);

      const cautionTab = screen.getByText(/CAUTION/i);
      fireEvent.click(cautionTab);

      expect(mockSetActiveSupportTab).toHaveBeenCalledWith('caution');
    });
  });
});
