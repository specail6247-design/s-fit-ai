import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SupportHub } from '@/components/SupportHub';
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

describe('SupportHub', () => {
  const mockToggleSupportModal = vi.fn();
  const mockSetSupportTab = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as any).mockReturnValue({
      isSupportOpen: true,
      toggleSupportModal: mockToggleSupportModal,
      supportTab: 'guide',
      setSupportTab: mockSetSupportTab,
    });
  });

  it('renders nothing when isSupportOpen is false', () => {
    (useStore as any).mockReturnValue({
      isSupportOpen: false,
      toggleSupportModal: mockToggleSupportModal,
      supportTab: 'guide',
      setSupportTab: mockSetSupportTab,
    });
    render(<SupportHub />);
    expect(screen.queryByText('Support Hub')).not.toBeInTheDocument();
  });

  it('renders the Support Hub when isSupportOpen is true', () => {
    render(<SupportHub />);
    expect(screen.getByText('Support Hub')).toBeInTheDocument();
    expect(screen.getByText('Guide')).toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    render(<SupportHub />);

    const qaTab = screen.getByText('Q&A');
    fireEvent.click(qaTab);

    expect(mockSetSupportTab).toHaveBeenCalledWith('qa');
  });

  it('renders the Report Issue form when on the issue tab', () => {
    (useStore as any).mockReturnValue({
      isSupportOpen: true,
      toggleSupportModal: mockToggleSupportModal,
      supportTab: 'issue',
      setSupportTab: mockSetSupportTab,
    });

    render(<SupportHub />);
    expect(screen.getByText(/Found a bug or have feedback/i)).toBeInTheDocument();

    // Check for the button text specifically
    const button = screen.getByRole('button', { name: /Submit Report/i });
    expect(button).toBeInTheDocument();
  });

  it('submits the form', async () => {
    (useStore as any).mockReturnValue({
      isSupportOpen: true,
      toggleSupportModal: mockToggleSupportModal,
      supportTab: 'issue',
      setSupportTab: mockSetSupportTab,
    });

    render(<SupportHub />);

    const textarea = screen.getByPlaceholderText(/describe the issue/i);
    fireEvent.change(textarea, { target: { value: 'This is a bug report.' } });

    const submitButton = screen.getByRole('button', { name: /Submit Report/i });
    const form = submitButton.closest('form');
    fireEvent.submit(form!);

    expect(screen.getByText('Sending...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Report Sent!')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('closes the modal when close button is clicked', () => {
    render(<SupportHub />);
    // There are multiple buttons (close, tabs). The close button has icon 'close'.
    // We can find by the material symbol text.
    const closeIcon = screen.getByText('close');
    const closeButton = closeIcon.closest('button');
    fireEvent.click(closeButton!);
    expect(mockToggleSupportModal).toHaveBeenCalledWith(false);
  });
});
