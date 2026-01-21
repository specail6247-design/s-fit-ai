'use client';

// S_FIT AI - Premium Modal Component
// Shown when user exceeds daily free limit

import { motion, AnimatePresence } from 'framer-motion';
import { useStore, DAILY_LIMIT } from '@/store/useStore';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export function PremiumModal() {
  const { showPremiumModal, setShowPremiumModal } = useStore();

  const handleClose = () => {
    setShowPremiumModal(false);
  };

  const handleSubscribe = () => {
    // TODO: Implement actual payment flow
    alert('Payment integration coming soon! 🚀');
    setShowPremiumModal(false);
  };

  return (
    <AnimatePresence>
      {showPremiumModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm glass-card overflow-hidden"
            variants={modalVariants}
          >
            {/* Premium Badge */}
            <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
              <div className="absolute transform rotate-45 bg-gradient-to-r from-luxury-gold to-yellow-400 text-void-black text-xs font-bold py-1 right-[-35px] top-[20px] w-[150px] text-center">
                PREMIUM
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Icon */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-luxury-gold/20 to-luxury-gold/5 mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h2 className="text-2xl font-bold text-pure-white mb-2">
                  Unlock Unlimited
                </h2>
                <p className="text-soft-gray text-sm">
                  You&apos;ve used all {DAILY_LIMIT} free tries today
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {[
                  'Unlimited Virtual Try-Ons',
                  'Access to Luxury Brands',
                  'HD 360° Fitting Room',
                  'Priority Support',
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-pure-white/80"
                  >
                    <span className="text-cyber-lime">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-pure-white">
                    $9.99
                  </span>
                  <span className="text-soft-gray">/month</span>
                </div>
                <p className="text-xs text-soft-gray/60 mt-1">
                  Cancel anytime
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSubscribe}
                  className="btn-primary w-full text-center"
                >
                  Start Premium
                </button>
                <button
                  onClick={handleClose}
                  className="btn-secondary w-full text-center"
                >
                  Maybe Later
                </button>
              </div>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 pointer-events-none luxury-shimmer" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
