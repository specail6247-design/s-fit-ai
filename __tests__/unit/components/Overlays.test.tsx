import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import PrivacyModal from '@/components/PrivacyModal';
import SupportHub from '@/components/SupportHub';
import { useStore } from '@/store/useStore';

// Mock the store
vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(),
}));

describe('PrivacyModal', () => {
  it('renders nothing when isPrivacyOpen is false', () => {
    (useStore as unknown as Mock).mockReturnValue({
      isPrivacyOpen: false,
      setPrivacyOpen: vi.fn(),
    });
    const { container } = render(<PrivacyModal />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal content when isPrivacyOpen is true', () => {
    (useStore as unknown as Mock).mockReturnValue({
      isPrivacyOpen: true,
      setPrivacyOpen: vi.fn(),
    });
    render(<PrivacyModal />);
    // Use getByRole for better accessibility testing and resilience
    expect(screen.getByRole('heading', { name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getByText(/At S_FIT AI, we prioritize your privacy/i)).toBeInTheDocument();
  });
});

describe('SupportHub', () => {
  it('renders nothing when isSupportOpen is false', () => {
    (useStore as unknown as Mock).mockReturnValue({
      isSupportOpen: false,
      supportTab: 'guide',
      setSupportOpen: vi.fn(),
      setSupportTab: vi.fn(),
    });
    const { container } = render(<SupportHub />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders hub content when isSupportOpen is true', () => {
    (useStore as unknown as Mock).mockReturnValue({
      isSupportOpen: true,
      supportTab: 'guide',
      setSupportOpen: vi.fn(),
      setSupportTab: vi.fn(),
    });
    render(<SupportHub />);
    // Match "Support Hub"
    expect(screen.getByText(/Support Hub/i)).toBeInTheDocument();
    expect(screen.getByText(/Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/Report/i)).toBeInTheDocument();
  });

  it('renders report form when tab is issue', () => {
    (useStore as unknown as Mock).mockReturnValue({
      isSupportOpen: true,
      supportTab: 'issue', // Set tab to issue
      setSupportOpen: vi.fn(),
      setSupportTab: vi.fn(),
    });
    render(<SupportHub />);
    expect(screen.getByPlaceholderText(/Describe what happened/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Report/i)).toBeInTheDocument();
  });
});
