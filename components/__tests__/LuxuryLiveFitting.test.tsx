import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import LuxuryLiveFitting from '../LuxuryLiveFitting';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Cinzel: () => ({ className: 'mock-cinzel' }),
  Space_Grotesk: () => ({ className: 'mock-space-grotesk' }),
}));

// Mock LuxuryImageDistortion to avoid Three.js issues in test
vi.mock('../masterpiece/LuxuryImageDistortion', () => ({
  default: () => <div data-testid="luxury-image-distortion">Luxury Image Distortion</div>
}));

describe('LuxuryLiveFitting', () => {
  it('renders the main title', () => {
    render(<LuxuryLiveFitting />);
    expect(screen.getByText('S_FIT LUXE')).toBeInTheDocument();
    expect(screen.getByText('Private Atelier')).toBeInTheDocument();
  });

  it('renders product items', () => {
    render(<LuxuryLiveFitting />);
    expect(screen.getByText('Aura Blazer')).toBeInTheDocument();
    expect(screen.getByText('Silk Gown')).toBeInTheDocument();
    expect(screen.getByText('Moto Jacket')).toBeInTheDocument();
    expect(screen.getByText('Tech Coat')).toBeInTheDocument();
  });

  it('displays brand information for the selected item (default Gucci)', () => {
    render(<LuxuryLiveFitting />);
    // Gucci appears multiple times (title and list), so we check all occurrences
    const gucciElements = screen.getAllByText('Gucci');
    expect(gucciElements.length).toBeGreaterThan(0);

    // Check for description text part
    expect(screen.getByText(/Influential, innovative and progressive/i)).toBeInTheDocument();
  });

  it('formats prices correctly', () => {
    render(<LuxuryLiveFitting />);
    expect(screen.getByText('$2,400')).toBeInTheDocument();
  });

  it('renders the capture button', () => {
    render(<LuxuryLiveFitting />);
    expect(screen.getByText('Capture Look')).toBeInTheDocument();
  });
});
