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
    
    // Check for Main Header (updated to M_FIT MASTERPIECE)
    // Using a function matcher or finding by role is more robust when text is split
    expect(screen.getByRole('heading', { name: /M_FIT/i })).toBeInTheDocument();
    
    // Check for Sections
    expect(screen.getByText(/01. Identity Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/02. Garment Source/i)).toBeInTheDocument();
    
    // Check for CTA
    expect(screen.getByText(/GENERATE MASTERPIECE/i)).toBeInTheDocument();
  });
});
