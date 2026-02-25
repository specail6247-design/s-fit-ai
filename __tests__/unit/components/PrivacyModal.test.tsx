import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrivacyModal } from '@/components/PrivacyModal';
import { useStore } from '@/store/useStore';

// Mock the store
vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: any) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('PrivacyModal', () => {
  const mockTogglePrivacyModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as any).mockReturnValue({
      isPrivacyOpen: true,
      togglePrivacyModal: mockTogglePrivacyModal,
    });
  });

  it('renders nothing when isPrivacyOpen is false', () => {
    (useStore as any).mockReturnValue({
      isPrivacyOpen: false,
      togglePrivacyModal: mockTogglePrivacyModal,
    });
    render(<PrivacyModal />);
    expect(screen.queryByText(/Privacy Policy/i)).not.toBeInTheDocument();
  });

  it('renders the Privacy Modal when isPrivacyOpen is true', () => {
    render(<PrivacyModal />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();

    // Check default tab content
    expect(screen.getByText(/Data Collection/i)).toBeInTheDocument();
  });

  it('switches to Terms of Service tab', () => {
    render(<PrivacyModal />);

    const termsButton = screen.getByText('Terms of Service');
    fireEvent.click(termsButton);

    expect(screen.getByText(/Acceptance of Terms/i)).toBeInTheDocument();
    expect(screen.queryByText(/Data Collection/i)).not.toBeInTheDocument();
  });

  it('closes the modal when close button is clicked', () => {
    render(<PrivacyModal />);
    const closeButton = screen.getByText('close');
    fireEvent.click(closeButton);
    expect(mockTogglePrivacyModal).toHaveBeenCalledWith(false);
  });
});
