import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

// Mock ModeSelector
vi.mock('@/components/ModeSelector', () => ({
  ModeSelector: () => <div data-testid="mode-selector">Mode Selector Content</div>
}));

// Mock Store
const mockUseStore = vi.fn();
vi.mock('@/store/useStore', () => ({
  useStore: () => mockUseStore()
}));

describe('RealLifeFitting', () => {
  beforeEach(() => {
    mockUseStore.mockReturnValue({
      selectedMode: null,
      resetSession: vi.fn(),
    });
  });

  it('renders ModeSelector when no mode is selected', () => {
    render(<RealLifeFitting />);
    expect(screen.getByTestId('mode-selector')).toBeInTheDocument();
    expect(screen.getByText(/Choose Your Experience/i)).toBeInTheDocument();
  });

  it('renders the Night City UI structure when mode is selected', () => {
    mockUseStore.mockReturnValue({
      selectedMode: 'vibe-check',
      resetSession: vi.fn(),
    });

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
