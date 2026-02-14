import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import TheVault from '@/components/TheVault';
import { useStore } from '@/store/useStore';
import { mockClothingItems } from '@/data/mockData';

// Mock dependencies
vi.mock('next/image', () => ({
  default: ({ fill, unoptimized, ...props }: React.ComponentProps<'img'> & { fill?: boolean; unoptimized?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} data-fill={fill?.toString()} data-unoptimized={unoptimized?.toString()} alt={props.alt || ''} />
  ),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/store/useStore', () => ({
  useStore: vi.fn(),
}));

describe('TheVault Component', () => {
  const mockSetVaultOpen = vi.fn();
  const mockToggleSavedItem = vi.fn();
  const mockSetSelectedItem = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isVaultOpen: true,
      setVaultOpen: mockSetVaultOpen,
      savedItemIds: [],
      toggleSavedItem: mockToggleSavedItem,
      setSelectedItem: mockSetSelectedItem,
    });
  });

  it('renders nothing when closed', () => {
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isVaultOpen: false,
      savedItemIds: [],
    });
    render(<TheVault />);
    expect(screen.queryByText('The Vault')).toBeNull();
  });

  it('renders when open', () => {
    render(<TheVault />);
    expect(screen.getByText('The Vault')).toBeInTheDocument();
    expect(screen.getByText(/Digital Wardrobe/)).toBeInTheDocument();
  });

  it('displays empty state when no items saved', () => {
    render(<TheVault />);
    expect(screen.getByText('Your Vault is Empty')).toBeInTheDocument();
  });

  it('displays saved items', () => {
    const item = mockClothingItems[0];
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isVaultOpen: true,
      savedItemIds: [item.id],
      toggleSavedItem: mockToggleSavedItem,
      setSelectedItem: mockSetSelectedItem,
      setVaultOpen: mockSetVaultOpen,
    });

    render(<TheVault />);
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.brand)).toBeInTheDocument();
  });

  it('handles removing an item', () => {
    const item = mockClothingItems[0];
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isVaultOpen: true,
      savedItemIds: [item.id],
      toggleSavedItem: mockToggleSavedItem,
      setSelectedItem: mockSetSelectedItem,
      setVaultOpen: mockSetVaultOpen,
    });

    render(<TheVault />);
    const deleteButton = screen.getByText('delete');
    fireEvent.click(deleteButton);
    expect(mockToggleSavedItem).toHaveBeenCalledWith(item.id);
  });

  it('handles trying on an item', () => {
    const item = mockClothingItems[0];
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isVaultOpen: true,
      savedItemIds: [item.id],
      toggleSavedItem: mockToggleSavedItem,
      setSelectedItem: mockSetSelectedItem,
      setVaultOpen: mockSetVaultOpen,
    });

    render(<TheVault />);
    const tryOnButton = screen.getByText('TRY ON');
    fireEvent.click(tryOnButton);
    expect(mockSetSelectedItem).toHaveBeenCalledWith(item);
    expect(mockSetVaultOpen).toHaveBeenCalledWith(false);
  });

  it('closes when close button is clicked', () => {
    render(<TheVault />);
    const closeButton = screen.getByText('close');
    fireEvent.click(closeButton);
    expect(mockSetVaultOpen).toHaveBeenCalledWith(false);
  });
});
