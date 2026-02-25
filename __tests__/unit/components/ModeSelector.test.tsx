import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ModeSelector } from '@/components/ModeSelector';
import { useStore } from '@/store/useStore';
import React from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, className, onClick, ...props }: any) => (
      <div className={className} onClick={onClick} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ({ children, className, onClick, ...props }: any) => (
      <button className={className} onClick={onClick} data-testid="motion-button" {...props}>
        {children}
      </button>
    ),
  },
}));

describe('ModeSelector', () => {
  const initialStoreState = useStore.getState();

  beforeEach(() => {
    useStore.setState(initialStoreState, true);
  });

  it('renders modes as accessible buttons', () => {
    render(<ModeSelector />);

    // We expect the cards to be buttons with descriptive names
    expect(screen.getByRole('button', { name: /VIBE CHECK/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /DIGITAL TWIN/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /EASY FIT/i })).toBeInTheDocument();
  });

  it('updates store on click', () => {
    render(<ModeSelector />);
    // Even if it's a div, clicking the text inside should work (legacy behavior check)
    fireEvent.click(screen.getByText('VIBE CHECK'));
    expect(useStore.getState().selectedMode).toBe('vibe-check');
  });
});
