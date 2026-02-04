import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ModeSelector } from '@/components/ModeSelector';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, className, onClick, ...props }: any) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ({ children, className, onClick, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
}));

// Mock the store
const mockSetSelectedMode = vi.fn();
const mockResetSession = vi.fn();

vi.mock('@/store/useStore', () => ({
  useStore: () => ({
    setSelectedMode: mockSetSelectedMode,
    resetSession: mockResetSession,
  }),
}));

describe('ModeSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders mode options', () => {
    render(<ModeSelector />);
    expect(screen.getByText('VIBE CHECK')).toBeInTheDocument();
    expect(screen.getByText('DIGITAL TWIN')).toBeInTheDocument();
    expect(screen.getByText('EASY FIT')).toBeInTheDocument();
  });

  it('renders modes as accessible buttons and handles clicks', () => {
    render(<ModeSelector />);

    // We expect the main container to be a button that contains the title "VIBE CHECK"
    // Currently (before fix), this should fail or find nothing if we look for a button with this name
    // The inner button only says "Select Mode_"

    const vibeCheckButton = screen.getByRole('button', { name: /vibe check/i });
    expect(vibeCheckButton).toBeInTheDocument();

    // Verify interaction
    fireEvent.click(vibeCheckButton);
    expect(mockResetSession).toHaveBeenCalled();
    expect(mockSetSelectedMode).toHaveBeenCalledWith('vibe-check');
  });
});
