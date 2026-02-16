import { render, screen, act } from '@testing-library/react';
import PhotoFitting from '@/components/PhotoFitting';
import { vi } from 'vitest';

// Mock LuxuryImageDistortion to avoid WebGL in tests
vi.mock('@/components/masterpiece/LuxuryImageDistortion', () => ({
  default: () => <div data-testid="luxury-image-distortion">Mocked Distortion</div>,
}));

// Mock timer
vi.useFakeTimers();

describe('PhotoFitting', () => {
  it('renders the initial state correctly', () => {
    render(<PhotoFitting />);

    // Check if headers are present
    expect(screen.getByText('S_FIT AI')).toBeInTheDocument();

    // Check if processing overlay is initially visible
    expect(screen.getByText('Processing...')).toBeInTheDocument();

    // Check if distortion component is rendered
    expect(screen.getByTestId('luxury-image-distortion')).toBeInTheDocument();
  });

  it('transitions from processing state after timeout', () => {
    render(<PhotoFitting />);

    // Initial state: Processing is visible
    expect(screen.getByText('Processing...')).toBeVisible(); // Or check class if opacity logic makes it "visible" in DOM but hidden visually.
    // Note: opacity-0 elements are still in the DOM.
    // In our code: `isProcessing ? 'opacity-100' : 'opacity-0'` for the overlay.

    const overlay = screen.getByText('Processing...').closest('div.absolute.inset-x-0');
    expect(overlay).toHaveClass('opacity-100');

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(4500);
    });

    // After timeout: Processing overlay should be hidden (opacity-0)
    expect(overlay).toHaveClass('opacity-0');

    // And controls should be visible
    const controls = screen.getByText('Fitting Controls').closest('div.mt-auto');
    expect(controls).toHaveClass('opacity-100');
  });
});
