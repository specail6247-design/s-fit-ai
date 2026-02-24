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
});
