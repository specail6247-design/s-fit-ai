import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LuxuryGarmentDetail from '@/components/LuxuryGarmentDetail';

describe('LuxuryGarmentDetail Accessibility', () => {
  it('has accessible labels for icon-only buttons', () => {
    render(<LuxuryGarmentDetail />);

    // Back link
    const backLink = screen.getByRole('link', { name: /back to home/i });
    expect(backLink).toBeInTheDocument();

    // Share button
    const shareButton = screen.getByRole('button', { name: /share this item/i });
    expect(shareButton).toBeInTheDocument();

    // Zoom button
    const zoomButton = screen.getByRole('button', { name: /zoom in/i });
    expect(zoomButton).toBeInTheDocument();

    // 360 View button
    const rotateButton = screen.getByRole('button', { name: /view in 360 degrees/i });
    expect(rotateButton).toBeInTheDocument();

    // Light Mode button
    const lightButton = screen.getByRole('button', { name: /toggle lighting/i });
    expect(lightButton).toBeInTheDocument();
  });
});
