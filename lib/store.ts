import { create } from 'zustand';

interface GlobalState {
  isLegalModalOpen: boolean;
  activeLegalTab: 'privacy' | 'terms';
  isSupportHubOpen: boolean;

  openLegalModal: (tab?: 'privacy' | 'terms') => void;
  closeLegalModal: () => void;
  setLegalTab: (tab: 'privacy' | 'terms') => void;

  openSupportHub: () => void;
  closeSupportHub: () => void;
  toggleSupportHub: () => void;
}

export const useStore = create<GlobalState>((set) => ({
  isLegalModalOpen: false,
  activeLegalTab: 'privacy',
  isSupportHubOpen: false,

  openLegalModal: (tab = 'privacy') => set({ isLegalModalOpen: true, activeLegalTab: tab }),
  closeLegalModal: () => set({ isLegalModalOpen: false }),
  setLegalTab: (tab) => set({ activeLegalTab: tab }),

  openSupportHub: () => set({ isSupportHubOpen: true }),
  closeSupportHub: () => set({ isSupportHubOpen: false }),
  toggleSupportHub: () => set((state) => ({ isSupportHubOpen: !state.isSupportHubOpen })),
}));
