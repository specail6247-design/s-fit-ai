import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModeSelector } from '@/components/ModeSelector';
import * as useStoreModule from '@/store/useStore';

// Mock the store
const setSelectedModeMock = vi.fn();
const resetSessionMock = vi.fn();

vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(() => ({
    setSelectedMode: setSelectedModeMock,
    resetSession: resetSessionMock,
  })),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
    button: ({ children, className, onClick, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
}));

describe('ModeSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup the mock implementation for each test
    (useStoreModule.useStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      setSelectedMode: setSelectedModeMock,
      resetSession: resetSessionMock,
    }));
  });

  it('renders three mode options as accessible buttons', () => {
    render(<ModeSelector />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);

    expect(buttons[0]).toHaveAttribute('aria-label', 'VIBE CHECK: Instant Headshot Fit');
    expect(buttons[1]).toHaveAttribute('aria-label', 'DIGITAL TWIN: Full Body Precision');
    expect(buttons[2]).toHaveAttribute('aria-label', 'EASY FIT: Quick Stats Fit');

    expect(screen.getByText('VIBE CHECK')).toBeInTheDocument();
    expect(screen.getByText('DIGITAL TWIN')).toBeInTheDocument();
    expect(screen.getByText('EASY FIT')).toBeInTheDocument();
  });

  it('calls setSelectedMode when a mode is clicked', () => {
    render(<ModeSelector />);
    const vibeCheckText = screen.getByText('VIBE CHECK');
    // We need to find the clickable container.
    // In the current implementation (div), it's the parent of the text.
    // In the future implementation (button), it will be the button itself.

    // We can traverse up to the clickable element or just click the text
    // since the event bubbles up.
    fireEvent.click(vibeCheckText);

    expect(resetSessionMock).toHaveBeenCalled();
    expect(setSelectedModeMock).toHaveBeenCalledWith('vibe-check');
  });
});
