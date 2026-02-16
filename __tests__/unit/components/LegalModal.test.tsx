import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LegalModal from '@/components/LegalModal';

// Mock framer-motion AnimatePresence
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className }: { children: React.ReactNode; onClick?: React.MouseEventHandler<HTMLDivElement>; className?: string }) => (
      <div onClick={onClick} className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('LegalModal', () => {
  it('renders nothing when isOpen is false', () => {
    render(<LegalModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText('LEGAL & COMPLIANCE')).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(<LegalModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('LEGAL & COMPLIANCE')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    render(<LegalModal isOpen={true} onClose={() => {}} />);

    // Default is Privacy
    expect(screen.getByText(/Data Collection/i)).toBeInTheDocument();

    // Switch to Terms
    fireEvent.click(screen.getByText('Terms of Service'));
    expect(screen.getByText(/Acceptance of Terms/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<LegalModal isOpen={true} onClose={handleClose} />);

    const closeButtons = screen.getAllByRole('button');
    // First button is usually the X in header
    fireEvent.click(closeButtons[0]);
    expect(handleClose).toHaveBeenCalled();
  });
});
