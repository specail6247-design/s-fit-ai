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
  it('renders the Digital Atelier UI structure', () => {
    render(<RealLifeFitting />);
    
    // Check for Main Header
    expect(screen.getByText(/MASTERPIECE/i)).toBeInTheDocument();
    expect(screen.getByText(/FIT/i)).toBeInTheDocument();
    
    // Check for Sections
    expect(screen.getByText(/01. Identity/i)).toBeInTheDocument();
    expect(screen.getByText(/02. Garment/i)).toBeInTheDocument();
    
    // Check for CTA
    expect(screen.getByText(/Initiate Sequence/i)).toBeInTheDocument();
  });
});
