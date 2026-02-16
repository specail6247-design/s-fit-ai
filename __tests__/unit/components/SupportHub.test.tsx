import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SupportHub from '@/components/SupportHub';

// Mock framer-motion AnimatePresence
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className }: { children: React.ReactNode; onClick?: React.MouseEventHandler<HTMLDivElement>; className?: string }) => (
      <div onClick={onClick} className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('SupportHub', () => {
  it('renders nothing when isOpen is false', () => {
    render(<SupportHub isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText('SUPPORT HUB')).not.toBeInTheDocument();
  });

  it('renders form when isOpen is true', () => {
    render(<SupportHub isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('SUPPORT HUB')).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const handleClose = vi.fn();
    render(<SupportHub isOpen={true} onClose={handleClose} />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Bug Report' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Something is broken' } });

    // Submit
    const submitBtn = screen.getByText(/SUBMIT REPORT/i);
    fireEvent.click(submitBtn);

    // Check loading state
    expect(screen.getByText(/SENDING.../i)).toBeInTheDocument();

    // Check success state (after timeout)
    await waitFor(() => {
      expect(screen.getByText('Report Sent!')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
