import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ModeSelector } from '@/components/ModeSelector';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick }: { children: React.ReactNode; className: string; onClick?: () => void }) => (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    ),
    button: ({ children, className, onClick, ...props }: { children: React.ReactNode; className: string; onClick?: () => void; [key: string]: unknown }) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
}));

// Mock useStore
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
    expect(screen.getByText('VIBE CHECK')).toBeDefined();
    expect(screen.getByText('DIGITAL TWIN')).toBeDefined();
    expect(screen.getByText('EASY FIT')).toBeDefined();
  });

  it('renders accessible buttons for each mode', () => {
    render(<ModeSelector />);
    // This expects the card itself to be a button with a descriptive label
    // encompassing the title.
    const vibeCheckButton = screen.getByRole('button', { name: /Select VIBE CHECK/i });
    expect(vibeCheckButton).toBeDefined();

    const digitalTwinButton = screen.getByRole('button', { name: /Select DIGITAL TWIN/i });
    expect(digitalTwinButton).toBeDefined();

    const easyFitButton = screen.getByRole('button', { name: /Select EASY FIT/i });
    expect(easyFitButton).toBeDefined();
  });

  it('selects a mode when clicked', () => {
    render(<ModeSelector />);

    const vibeCheckButton = screen.getByRole('button', { name: /Select VIBE CHECK/i });
    fireEvent.click(vibeCheckButton);

    expect(mockResetSession).toHaveBeenCalled();
    expect(mockSetSelectedMode).toHaveBeenCalledWith('vibe-check');
  });
});
