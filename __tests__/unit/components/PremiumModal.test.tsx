import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PremiumModal } from '@/components/PremiumModal';
import { useStore } from '@/store/useStore';
import { vi } from 'vitest';

// Mock the store
vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(),
  DAILY_LIMIT: 5,
}));

// Mock fetch
global.fetch = vi.fn();

// Mock window.location
Object.defineProperty(window, 'location', {
  value: { href: '' },
  writable: true,
});

describe('PremiumModal', () => {
  it('renders correctly when visible', () => {
    (useStore as any).mockReturnValue({
      showPremiumModal: true,
      setShowPremiumModal: vi.fn(),
    });

    render(<PremiumModal />);
    expect(screen.getByText('Unlock Unlimited')).toBeInTheDocument();
    expect(screen.getByText('Start Premium')).toBeInTheDocument();
  });

  it('triggers payment flow on button click', async () => {
    (useStore as any).mockReturnValue({
      showPremiumModal: true,
      setShowPremiumModal: vi.fn(),
    });

    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ url: 'http://stripe.com/checkout' }),
    });

    render(<PremiumModal />);

    const subscribeButton = screen.getByText('Start Premium');
    fireEvent.click(subscribeButton);

    expect(screen.getByText('Processing...')).toBeInTheDocument();

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/checkout_sessions', expect.objectContaining({
            method: 'POST'
        }));
    });
  });
});
