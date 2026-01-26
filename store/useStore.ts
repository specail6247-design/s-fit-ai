// S_FIT AI - Global State Store (Zustand)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ClothingItem } from '@/data/mockData';
import type { AIModelId } from '@/data/aiModels';
import type { FaceAnalysis, PoseAnalysis } from '@/lib/mediapipe';
import { ClothingStyleAnalysis, SizeRecommendation } from '@/lib/visionService';

// Fitting Mode Types
export type FittingMode = 'vibe-check' | 'digital-twin' | 'easy-fit' | 'ar-fit' | 'training' | null;
export type FittingModeKey = Exclude<FittingMode, null>;

// Body Shape Types for Easy Fit
export type BodyShape = 'rectangle' | 'hourglass' | 'pear' | 'apple' | 'inverted-triangle';

// User Stats for Easy Fit mode
export interface UserStats {
  height: number; // cm
  weight: number; // kg
  bodyShape: BodyShape;
}

// Selfie Data for Vibe Check / Digital Twin
export interface SelfieData {
  faceImage: string | null;
  fullBodyImage: string | null;
}

// Daily Usage for Freemium
interface DailyUsage {
  count: number;
  date: string; // YYYY-MM-DD format
}

export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

// Phase 2: ML Training Data Sample
export interface TrainingSample {
  id: string;
  timestamp: number;
  landmarks: Landmark[]; 
  label: {
    height: number;
    weight: number;
    brand: string;
    size: string;
    fitRating: number; // 1-5
  };
}

// Store State Interface
interface StoreState {
  // Mode Selection
  selectedMode: FittingMode;
  setSelectedMode: (mode: FittingMode) => void;

  // AI Model Selection
  selectedAIModels: Record<FittingModeKey, AIModelId>;
  setSelectedAIModel: (mode: FittingModeKey, modelId: AIModelId) => void;

  // User Stats (Easy Fit)
  userStats: UserStats | null;
  setUserStats: (stats: UserStats) => void;

  // Selfie Data (Vibe Check / Digital Twin)
  selfieData: SelfieData;
  setSelfieData: (data: Partial<SelfieData>) => void;
  clearSelfieData: () => void;

  // MediaPipe Analysis
  faceAnalysis: FaceAnalysis | null;
  setFaceAnalysis: (analysis: FaceAnalysis | null) => void;
  poseAnalysis: PoseAnalysis | null;
  setPoseAnalysis: (analysis: PoseAnalysis | null) => void;

  // Phase 2: ML Training
  trainingData: TrainingSample[];
  addTrainingSample: (sample: TrainingSample) => void;
  clearTrainingData: () => void;

  // Phase 2: AI Vision & Size Logic
  clothingAnalysis: ClothingStyleAnalysis | null;
  setClothingAnalysis: (analysis: ClothingStyleAnalysis | null) => void;
  sizeRecommendation: SizeRecommendation | null;
  setSizeRecommendation: (rec: SizeRecommendation | null) => void;

  // Selected Brand & Item
  selectedBrand: string | null;
  setSelectedBrand: (brandId: string | null) => void;
  selectedItem: ClothingItem | null;
  setSelectedItem: (item: ClothingItem | null) => void;

  // The Vault (Saved Items)
  vaultItemIds: string[];
  addToVault: (itemId: string) => void;
  removeFromVault: (itemId: string) => void;
  isItemInVault: (itemId: string) => boolean;

  // Daily Usage (Freemium)
  dailyUsage: DailyUsage;
  incrementUsage: () => void;
  canTryOn: () => boolean;
  getRemainingTries: () => number;

  // Premium Status
  isPremium: boolean;
  setPremium: (status: boolean) => void;

  // UI State
  showPremiumModal: boolean;
  setShowPremiumModal: (show: boolean) => void;

  // Reset
  resetSession: () => void;
}

const DAILY_LIMIT = 5;

const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Mode Selection
      selectedMode: null,
      setSelectedMode: (mode) => set({ selectedMode: mode }),

      // AI Model Selection
      selectedAIModels: {
        'vibe-check': 'claude-3.5',
        'digital-twin': 'gpt-4o',
        'easy-fit': 'gemini-pro',
        'ar-fit': 'gpt-4o',
        'training': 'gpt-4o',
      },
      setSelectedAIModel: (mode, modelId) =>
        set((state) => ({
          selectedAIModels: { ...state.selectedAIModels, [mode]: modelId },
        })),

      // User Stats
      userStats: null,
      setUserStats: (stats) => set({ userStats: stats }),

      // Selfie Data
      selfieData: {
        faceImage: null,
        fullBodyImage: null,
      },
      setSelfieData: (data) =>
        set((state) => ({
          selfieData: { ...state.selfieData, ...data },
        })),
      clearSelfieData: () =>
        set({
          selfieData: { faceImage: null, fullBodyImage: null },
          faceAnalysis: null,
          poseAnalysis: null,
          clothingAnalysis: null,
          sizeRecommendation: null,
        }),

      // MediaPipe Analysis
      faceAnalysis: null,
      setFaceAnalysis: (analysis) => set({ faceAnalysis: analysis }),
      poseAnalysis: null,
      setPoseAnalysis: (analysis) => set({ poseAnalysis: analysis }),

      // Phase 2: ML Training
      trainingData: [],
      addTrainingSample: (sample) =>
        set((state) => ({ trainingData: [...state.trainingData, sample] })),
      clearTrainingData: () => set({ trainingData: [] }),

      // Phase 2: AI Vision & Size Logic
      clothingAnalysis: null,
      setClothingAnalysis: (analysis) => set({ clothingAnalysis: analysis }),
      sizeRecommendation: null,
      setSizeRecommendation: (rec) => set({ sizeRecommendation: rec }),

      // Selected Brand & Item
      selectedBrand: null,
      setSelectedBrand: (brandId) => set({ selectedBrand: brandId }),
      selectedItem: null,
      setSelectedItem: (item) => set({ selectedItem: item }),

      // The Vault
      vaultItemIds: [],
      addToVault: (itemId) => set((state) => ({
        vaultItemIds: state.vaultItemIds.includes(itemId) ? state.vaultItemIds : [...state.vaultItemIds, itemId]
      })),
      removeFromVault: (itemId) => set((state) => ({
        vaultItemIds: state.vaultItemIds.filter((id) => id !== itemId)
      })),
      isItemInVault: (itemId) => get().vaultItemIds.includes(itemId),

      // Daily Usage
      dailyUsage: {
        count: 0,
        date: getTodayDate(),
      },
      incrementUsage: () => {
        const today = getTodayDate();
        const { dailyUsage, isPremium } = get();

        // Reset if it's a new day
        if (dailyUsage.date !== today) {
          set({
            dailyUsage: { count: 1, date: today },
          });
        } else if (!isPremium && dailyUsage.count < DAILY_LIMIT) {
          set({
            dailyUsage: { ...dailyUsage, count: dailyUsage.count + 1 },
          });
        }
      },
      canTryOn: () => {
        const { dailyUsage, isPremium } = get();
        const today = getTodayDate();

        // Reset check for new day
        if (dailyUsage.date !== today) {
          return true;
        }

        return isPremium || dailyUsage.count < DAILY_LIMIT;
      },
      getRemainingTries: () => {
        const { dailyUsage, isPremium } = get();
        const today = getTodayDate();

        if (isPremium) return Infinity;
        if (dailyUsage.date !== today) return DAILY_LIMIT;

        return Math.max(0, DAILY_LIMIT - dailyUsage.count);
      },

      // Premium Status
      isPremium: false,
      setPremium: (status) => set({ isPremium: status }),

      // UI State
      showPremiumModal: false,
      setShowPremiumModal: (show) => set({ showPremiumModal: show }),

      // Reset Session
      resetSession: () =>
        set({
          selectedMode: null,
          userStats: null,
          selfieData: { faceImage: null, fullBodyImage: null },
          faceAnalysis: null,
          poseAnalysis: null,
          clothingAnalysis: null,
          sizeRecommendation: null,
          selectedBrand: null,
          selectedItem: null,
        }),
    }),
    {
      name: 's-fit-ai-storage',
      partialize: (state) => ({
        dailyUsage: state.dailyUsage,
        isPremium: state.isPremium,
        userStats: state.userStats,
        selectedAIModels: state.selectedAIModels,
        trainingData: state.trainingData,
        vaultItemIds: state.vaultItemIds,
      }),
    }
  )
);

// Export constants
export { DAILY_LIMIT };
