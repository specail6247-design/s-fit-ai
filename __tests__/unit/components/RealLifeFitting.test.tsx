import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RealLifeFitting from '@/components/RealLifeFitting';

// Mock Three.js canvas components to avoid WebGL errors in happy-dom
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useFrame: vi.fn(),
  useLoader: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  Environment: () => null,
  OrbitControls: () => null,
  useGLTF: vi.fn(() => ({
    scene: { clone: () => ({}) },
    animations: [],
  })),
  useAnimations: vi.fn(() => ({
    actions: {},
  })),
  ContactShadows: () => null,
}));

// Mock Three.js
vi.mock('three', () => ({
  Group: class {},
  Vector3: class {},
}));

describe('RealLifeFitting', () => {
  it('renders the Night City UI structure', () => {
    render(<RealLifeFitting />);
    
    // Check for Main Header
    expect(screen.getByText(/S_FIT/i)).toBeInTheDocument();
    expect(screen.getByText(/NEO/i)).toBeInTheDocument();
    
    // Check for Sections
    expect(screen.getByText(/01. Identification/i)).toBeInTheDocument();
    expect(screen.getByText(/02. Target Garment/i)).toBeInTheDocument();
    
    // Check for CTA
    expect(screen.getByText(/TRY IT ON/i)).toBeInTheDocument();
  });

  it('renders accessible file inputs', () => {
    render(<RealLifeFitting />);

    // Check for User Photo input
    // The label text is inside a div, so we might need to be specific or use getByLabelText on the input id if the label has htmlFor
    const userInput = screen.getByLabelText(/Upload User Photo/i);
    expect(userInput).toBeInTheDocument();
    expect(userInput).toHaveAttribute('type', 'file');
    expect(userInput).toHaveClass('sr-only');

    // Check for Garment input
    const garmentInput = screen.getByLabelText(/Select Garment/i);
    expect(garmentInput).toBeInTheDocument();
    expect(garmentInput).toHaveAttribute('type', 'file');
    expect(garmentInput).toHaveClass('sr-only');
  });
});
