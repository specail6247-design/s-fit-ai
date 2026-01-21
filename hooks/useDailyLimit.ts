// S_FIT AI - Daily Limit Hook

import { useStore, DAILY_LIMIT } from '@/store/useStore';
import { useCallback } from 'react';

export function useDailyLimit() {
  const {
    dailyUsage,
    isPremium,
    incrementUsage,
    canTryOn,
    getRemainingTries,
    setShowPremiumModal,
  } = useStore();

  const tryOnWithLimit = useCallback(
    (onSuccess: () => void) => {
      if (canTryOn()) {
        incrementUsage();
        onSuccess();
      } else {
        setShowPremiumModal(true);
      }
    },
    [canTryOn, incrementUsage, setShowPremiumModal]
  );

  const remaining = getRemainingTries();
  const isLimitReached = !isPremium && remaining === 0;
  const usagePercentage = isPremium ? 0 : ((DAILY_LIMIT - remaining) / DAILY_LIMIT) * 100;

  return {
    dailyUsage,
    isPremium,
    remaining,
    isLimitReached,
    usagePercentage,
    tryOnWithLimit,
    DAILY_LIMIT,
  };
}
