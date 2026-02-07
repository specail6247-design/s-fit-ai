import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LuxuryGarmentDetail from '@/components/LuxuryGarmentDetail';
import React from 'react';

// Mock Next.js Link
vi.mock('next/link', () => {
  return {
    default: ({ href, children, ...props }: React.ComponentProps<'a'>) => {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    },
  };
});

describe('LuxuryGarmentDetail', () => {
  it('renders interactive elements with accessible labels', () => {
    render(<LuxuryGarmentDetail />);

    // Test for accessible names on icon-only buttons/links
    expect(screen.getByLabelText(/go back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/share this item/i)).toBeInTheDocument();

    // Test for 3D control buttons
    expect(screen.getByLabelText(/zoom in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rotate view/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/toggle lighting/i)).toBeInTheDocument();

    // Check main CTA text is still present
    expect(screen.getByText(/try on mannequin/i)).toBeInTheDocument();
  });
});
