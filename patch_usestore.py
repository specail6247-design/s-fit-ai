import re

with open('store/useStore.ts', 'r') as f:
    content = f.read()

# Add new interface properties
interface_patch = """
  // Global Audio State
  isAudioMuted: boolean;
  setIsAudioMuted: (muted: boolean) => void;

  // The Vault (Digital Wardrobe) State
  savedLooks: ClothingItem[];
  saveLook: (item: ClothingItem) => void;
  removeLook: (itemId: string) => void;
  isVaultOpen: boolean;
  setVaultOpen: (open: boolean) => void;

  // Reset
"""
content = re.sub(r'\n\s*// Reset\n', '\n' + interface_patch, content)

# Add new state and actions
actions_patch = """
      // Global Audio State
      isAudioMuted: false,
      setIsAudioMuted: (muted) => set({ isAudioMuted: muted }),

      // The Vault (Digital Wardrobe) State
      savedLooks: [],
      saveLook: (item) =>
        set((state) => {
          if (!state.savedLooks.find((look) => look.id === item.id)) {
            return { savedLooks: [...state.savedLooks, item] };
          }
          return state;
        }),
      removeLook: (itemId) =>
        set((state) => ({
          savedLooks: state.savedLooks.filter((look) => look.id !== itemId),
        })),
      isVaultOpen: false,
      setVaultOpen: (open) => set({ isVaultOpen: open }),

      // Reset Session
"""
content = re.sub(r'\n\s*// Reset Session\n', '\n' + actions_patch, content)

# Partialize savedLooks and isAudioMuted
partialize_patch = """
      partialize: (state) => ({
        dailyUsage: state.dailyUsage,
        isPremium: state.isPremium,
        userStats: state.userStats,
        selectedAIModels: state.selectedAIModels,
        trainingData: state.trainingData,
        savedLooks: state.savedLooks,
        isAudioMuted: state.isAudioMuted,
"""
content = re.sub(r'\n\s*partialize: \(state\) => \(\{\n\s*dailyUsage: state\.dailyUsage,\n\s*isPremium: state\.isPremium,\n\s*userStats: state\.userStats,\n\s*selectedAIModels: state\.selectedAIModels,\n\s*trainingData: state\.trainingData,', '\n' + partialize_patch, content)

with open('store/useStore.ts', 'w') as f:
    f.write(content)
