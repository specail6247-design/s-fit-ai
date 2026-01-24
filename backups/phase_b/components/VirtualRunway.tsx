'use client';

import { motion } from 'framer-motion';
import { getCategoryIcon } from './FittingRoom';
import { ClothingItem } from '@/data/mockData';

interface CommunityFit {
  id: string;
  userName: string;
  avatar: string;
  item: ClothingItem;
  fitScore: number;
  timestamp: string;
  likes: number;
}

const MOCK_COMMUNITY_FITS: CommunityFit[] = [
  {
    id: 'fit-1',
    userName: 'Alex Style',
    avatar: '👨‍🎤',
    item: { 
      id: 'zara-001', 
      name: 'Structured Blazer', 
      brand: 'ZARA', 
      category: 'outerwear', 
      price: 89.99,
      colors: ['Black'],
      description: '', 
      imageUrl: '', 
      textureUrl: '', 
      isLuxury: false, 
      sizes: [], 
      currency: 'USD' 
    },
    fitScore: 94,
    timestamp: '2m ago',
    likes: 24
  },
  {
    id: 'fit-2',
    userName: 'Elena Fashion',
    avatar: '💃',
    item: { 
      id: 'gucci-004', 
      name: 'Flora Dress', 
      brand: 'Gucci', 
      category: 'dresses', 
      price: 3200.00,
      colors: ['Floral'],
      description: '', 
      imageUrl: '', 
      textureUrl: '', 
      isLuxury: true, 
      sizes: [], 
      currency: 'USD' 
    },
    fitScore: 98,
    timestamp: '15m ago',
    likes: 156
  },
  {
    id: 'fit-3',
    userName: 'Urban Scout',
    avatar: '🛹',
    item: { 
      id: 'uniqlo-002', 
      name: 'Supima Tee', 
      brand: 'Uniqlo', 
      category: 'tops', 
      price: 14.90,
      colors: ['White'],
      description: '', 
      imageUrl: '', 
      textureUrl: '', 
      isLuxury: false, 
      sizes: [], 
      currency: 'USD' 
    },
    fitScore: 88,
    timestamp: '1h ago',
    likes: 12
  }
];

export function VirtualRunway() {
  return (
    <div className="w-full h-full bg-void-black overflow-y-auto pb-20">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-pure-white flex items-center gap-2">
              <span className="text-cyber-lime">✨</span> Community Runway
            </h2>
            <p className="text-soft-gray text-xs mt-1">Discover how others are fitting their favorite brands.</p>
          </div>
          <div className="flex -space-x-2">
            {['👨‍🚀', '👩‍🚀', '👨‍🎨', '👩‍🎨'].map((e, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-charcoal border-2 border-void-black flex items-center justify-center text-sm">
                {e}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_COMMUNITY_FITS.map((fit, index) => (
            <motion.div
              key={fit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 flex flex-col gap-4 border-l-2 border-l-cyber-lime/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-xl">
                    {fit.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-pure-white">{fit.userName}</h4>
                    <p className="text-[10px] text-soft-gray">{fit.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-cyber-lime/10 px-2 py-1 rounded text-cyber-lime">
                  <span className="text-[10px] font-bold">{fit.fitScore}% FIT</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-void-black/40 p-3 rounded-lg border border-border-color/30">
                <div className="w-16 h-16 bg-charcoal/50 rounded flex items-center justify-center text-3xl">
                  {getCategoryIcon(fit.item.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-cyber-lime uppercase tracking-widest font-bold">
                      {fit.item.brand}
                    </span>
                    {fit.item.isLuxury && (
                      <span className="text-[8px] bg-luxury-gold/20 text-luxury-gold px-1 rounded">PREMIUM</span>
                    )}
                  </div>
                  <h5 className="text-sm text-pure-white font-medium">{fit.item.name}</h5>
                  <p className="text-[10px] text-soft-gray mt-1 line-clamp-1">Styled with AI precision.</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-soft-gray hover:text-cyber-lime transition-colors">
                    <span>❤️</span>
                    <span className="text-xs">{fit.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-soft-gray hover:text-pure-white transition-colors">
                    <span>💬</span>
                    <span className="text-xs">Comment</span>
                  </button>
                </div>
                <button className="text-[10px] text-cyber-lime hover:underline">
                  View Detail →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-void-black to-transparent pointer-events-none" />
    </div>
  );
}
