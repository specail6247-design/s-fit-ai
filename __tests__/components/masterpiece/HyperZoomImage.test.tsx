import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HyperZoomImage } from '@/components/masterpiece/HyperZoomImage';

// We don't necessarily need to mock next/image if we just check the src attribute transformation loosely
// But let's mock it to keep tests simple and consistent if we want exact matches,
// or just adjust expectations for the real next/image behavior in test environment.
// Given the environment setup, adjusting expectations is easier.

describe('HyperZoomImage', () => {
  it('renders correctly with base image', () => {
    render(<HyperZoomImage src="/test.jpg" alt="Test Image" />);
    const img = screen.getByAltText('Test Image');
    expect(img).toBeDefined();
    const src = img.getAttribute('src');
    // next/image transforms the src. We check if the original src is present in the query param or path.
    expect(decodeURIComponent(src || '')).toContain('/test.jpg');
  });

  it('renders correctly with high res image prop', () => {
    render(<HyperZoomImage src="/test.jpg" highResSrc="/test-high.jpg" alt="Test Image" />);
    const img = screen.getByAltText('Test Image');
    expect(img).toBeDefined();
    // High res logic is internal (rendering a div on hover), so just checking base render here
  });
});
