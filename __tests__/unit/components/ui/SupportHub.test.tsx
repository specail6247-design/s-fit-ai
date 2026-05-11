import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SupportHub } from '@/components/SupportHub';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: Record<string, unknown> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: Record<string, unknown> & { children?: React.ReactNode }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: Record<string, unknown>) => <>{children}</>,
}));

describe('SupportHub', () => {
  it('renders the SupportHub component button initially', () => {
    render(<SupportHub />);
    expect(screen.getByRole('button', { name: /support/i })).toBeInTheDocument();
  });

  it('opens the drawer when button is clicked', () => {
    render(<SupportHub />);
    fireEvent.click(screen.getByRole('button', { name: /support/i }));

    expect(screen.getByText('Support & Guides')).toBeInTheDocument();
    expect(screen.getByText('How to Fit')).toBeInTheDocument();
    expect(screen.getByText('Setup Caution')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });
});
