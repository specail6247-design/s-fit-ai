import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PhotoFitting from '@/components/PhotoFitting';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({ className: 'mock-font' }),
}));

// Mock next/navigation
const mockBack = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: mockBack }),
}));

describe('PhotoFitting', () => {
  it('renders accessible elements', () => {
    render(<PhotoFitting />);

    // Check for accessible "Go back" button
    const backButton = screen.getByRole('button', { name: /go back/i });
    expect(backButton).toBeInTheDocument();

    // Check for "Fitting Information" button
    const infoButton = screen.getByRole('button', { name: /fitting information/i });
    expect(infoButton).toBeInTheDocument();

    // Check for checkboxes with labels
    // Since labels are visually hidden or not associated via htmlFor in the original code,
    // we expect the aria-label to be present on the checkbox itself.
    const heatmapCheckbox = screen.getByRole('checkbox', { name: /toggle fit heatmap/i });
    expect(heatmapCheckbox).toBeInTheDocument();

    const physicsCheckbox = screen.getByRole('checkbox', { name: /toggle fabric physics/i });
    expect(physicsCheckbox).toBeInTheDocument();

    // Check for status role
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent(/processing/i);
  });

  it('calls router.back when back button is clicked', () => {
    render(<PhotoFitting />);
    const backButton = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(backButton);
    expect(mockBack).toHaveBeenCalled();
  });
});
