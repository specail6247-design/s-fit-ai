import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
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

// Mock useStore
const mockSetPrivacyOpen = vi.fn();
const mockSetSupportOpen = vi.fn();
vi.mock('@/store/useStore', () => ({
  useStore: () => ({
    setPrivacyOpen: mockSetPrivacyOpen,
    setSupportOpen: mockSetSupportOpen,
  }),
}));

describe('RealLifeFitting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    global.alert = vi.fn();

    // Mock FileReader
    class MockFileReader {
      onload: ({ target }: { target: { result: string } }) => void = () => {};
      readAsDataURL() {
        setTimeout(() => {
           if (this.onload) {
             this.onload({ target: { result: 'data:image/png;base64,fakeimage' } });
           }
        }, 0);
      }
    }
    global.FileReader = MockFileReader as unknown as typeof FileReader;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

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

  it('renders Trust & Growth elements', () => {
    render(<RealLifeFitting />);

    // Secure Badge (Button)
    const secureBtn = screen.getByRole('button', { name: /Secure/i });
    expect(secureBtn).toBeInTheDocument();

    // Data Safety Badge
    expect(screen.getByText(/Photos processed securely & deleted after use/i)).toBeInTheDocument();

    // Support Button
    const supportBtn = screen.getByRole('button', { name: /Support & Feedback/i });
    expect(supportBtn).toBeInTheDocument();

    // Test Support Button interaction
    fireEvent.click(supportBtn);
    expect(mockSetSupportOpen).toHaveBeenCalledWith(true);

    // Test Privacy/Secure Button interaction
    fireEvent.click(secureBtn);
    expect(mockSetPrivacyOpen).toHaveBeenCalledWith(true);
  });

  it('shows Share to Story button after successful generation', async () => {
    // Mock successful fetch response
    (global.fetch as Mock).mockResolvedValue({
      json: async () => ({ imageUrl: 'https://example.com/result.jpg' }),
    });

    render(<RealLifeFitting />);

    // Simulate File Uploads (using hidden inputs)
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    const userInput = document.getElementById('user-upload') as HTMLInputElement;
    const garmentInput = document.getElementById('garment-upload') as HTMLInputElement;

    fireEvent.change(userInput, { target: { files: [file] } });
    fireEvent.change(garmentInput, { target: { files: [file] } });

    // Wait for state updates from FileReader
    await waitFor(() => {
       // Check if images are rendered (implied by state update)
       // The component renders the image when state is set.
       const images = screen.getAllByRole('img');
       expect(images.length).toBeGreaterThan(0);
    });

    // Click Try On
    const tryOnBtn = screen.getByText(/TRY IT ON/i);
    fireEvent.click(tryOnBtn);

    // Wait for Result
    await waitFor(() => {
      expect(screen.getByText(/Share to Story/i)).toBeInTheDocument();
    }, { timeout: 5000 });

    // Check for AI Generated label
    expect(screen.getByText(/AI GENERATED_/i)).toBeInTheDocument();
  });
});
