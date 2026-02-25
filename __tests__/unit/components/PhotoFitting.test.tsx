import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PhotoFitting from '@/components/PhotoFitting';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Space_Grotesk: () => ({ className: 'mock-space-grotesk' }),
  Cinzel: () => ({ className: 'mock-cinzel' }),
  Inter: () => ({ className: 'mock-inter' }),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Upload: () => <div data-testid="upload-icon">Upload</div>,
  Camera: () => <div data-testid="camera-icon">Camera</div>,
  Sparkles: () => <div data-testid="sparkles-icon">Sparkles</div>,
  Scan: () => <div data-testid="scan-icon">Scan</div>,
  ZoomIn: () => <div data-testid="zoom-in-icon">ZoomIn</div>,
  ZoomOut: () => <div data-testid="zoom-out-icon">ZoomOut</div>,
  Maximize: () => <div data-testid="maximize-icon">Maximize</div>,
  Film: () => <div data-testid="film-icon">Film</div>,
  Play: () => <div data-testid="play-icon">Play</div>,
  Share2: () => <div data-testid="share-icon">Share</div>,
  X: () => <div data-testid="close-icon">X</div>,
  Download: () => <div data-testid="download-icon">Download</div>,
  Info: () => <div data-testid="info-icon">Info</div>,
  Lock: () => <div data-testid="lock-icon">Lock</div>,
}));

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: React.ComponentProps<'div'>) => (
      <div className={className} onClick={onClick} {...props}>{children}</div>
    ),
    button: ({ children, className, onClick, ...props }: React.ComponentProps<'button'>) => (
      <button className={className} onClick={onClick} {...props}>{children}</button>
    ),
    img: ({ src, alt, className, ...props }: React.ComponentProps<'img'>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} {...props} />
    ),
    span: ({ children, className, ...props }: React.ComponentProps<'span'>) => (
      <span className={className} {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock useStore
const mockSetIsAnalyzing = vi.fn();
const mockSetIsFitting = vi.fn();
vi.mock('@/store/useStore', () => ({
  useStore: (selector: (state: unknown) => unknown) => {
    const state = {
      isAnalyzing: false,
      isFitting: false,
      isAudioMuted: true,
      setIsAnalyzing: mockSetIsAnalyzing,
      setIsFitting: mockSetIsFitting,
    };
    return selector(state);
  },
}));

// Mock API functions
vi.mock('@/lib/virtualTryOn', () => ({
  generateTryOn: vi.fn(),
  generateCinematicVideo: vi.fn(),
}));

// Mock fetch for upscale
global.fetch = vi.fn();

describe('PhotoFitting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
  });

  it('renders the Masterpiece Fit title', () => {
    render(<PhotoFitting />);
    expect(screen.getByRole('heading', { name: /Masterpiece Fit/i })).toBeInTheDocument();
    // Hyper-Fidelity Engine is the subtitle
    expect(screen.getByText(/Hyper-Fidelity Engine/i)).toBeInTheDocument();
  });

  it('shows upload area initially', () => {
    render(<PhotoFitting />);
    expect(screen.getByText(/UPLOAD PHOTO TO BEGIN/i)).toBeInTheDocument();
  });

  it('handles file upload interaction', async () => {
    render(<PhotoFitting />);

    // Find input by label text "Upload Photo" (case insensitive)
    const fileInput = screen.getByLabelText(/Upload Photo/i);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    // Create a mock change event
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Should transition to showing the uploaded image
    await waitFor(() => {
       const img = screen.getByAltText('User');
       expect(img).toBeInTheDocument();
       // In JSDOM/React testing with FileReader mock, src might be the data URL or blob.
       // Our component sets state with FileReader result.
       // We can just check it's in the document.
    });
  });
});
