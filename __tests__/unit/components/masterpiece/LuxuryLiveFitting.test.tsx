import { render, screen, fireEvent } from '@testing-library/react';
import LuxuryLiveFitting from '@/components/masterpiece/LuxuryLiveFitting';
import { useStore } from '@/store/useStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(),
}));

vi.mock('@/components/masterpiece/LuxuryCursor', () => ({
  default: () => <div data-testid="luxury-cursor">Cursor</div>,
}));

vi.mock('@/components/masterpiece/LuxuryImageDistortion', () => ({
  default: () => <div data-testid="luxury-image-distortion">Image</div>,
}));

// Mock framer-motion to avoid animation issues
vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('LuxuryLiveFitting', () => {
  const setAnalyzing = vi.fn();
  const setFitting = vi.fn();

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useStore as any).mockReturnValue({
      isAnalyzing: false,
      isFitting: false,
      setAnalyzing,
      setFitting,
    });
    setAnalyzing.mockClear();
    setFitting.mockClear();
  });

  it('renders correctly', () => {
    render(<LuxuryLiveFitting />);
    expect(screen.getByText('S_FIT AI')).toBeInTheDocument();
    expect(screen.getByText('Masterpiece Collection')).toBeInTheDocument();
    expect(screen.getByTestId('luxury-cursor')).toBeInTheDocument();
    expect(screen.getByTestId('luxury-image-distortion')).toBeInTheDocument();
  });

  it('toggles analysis state when button clicked', () => {
    render(<LuxuryLiveFitting />);
    const button = screen.getByText('Start Fitting');
    fireEvent.click(button);
    expect(setAnalyzing).toHaveBeenCalledWith(true);
  });

  it('hides UI when immersive mode is active', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useStore as any).mockReturnValue({
      isAnalyzing: true,
      isFitting: false,
      setAnalyzing,
      setFitting,
    });
    render(<LuxuryLiveFitting />);

    // Check for "Start Fitting" button which is part of UI
    const button = screen.queryByText('Start Fitting');
    expect(button).not.toBeInTheDocument();

    // Check for immersive overlay text
    expect(screen.getByText('Scanning Geometry')).toBeInTheDocument();
  });
});
