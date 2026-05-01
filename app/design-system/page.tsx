'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { BrandCard } from '@/components/ui/BrandCard';
import { SizeGuide } from '@/components/ui/SizeGuide';
import { FittingResult } from '@/components/ui/FittingResult';
import { LoadingState } from '@/components/ui/LoadingState';
import { BottomSheet } from '@/components/ui/BottomSheet';

export default function DesignSystemPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="min-h-screen p-8 space-y-12 pb-32">
      <header className="mb-12">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold mb-4">
          S_FIT AI <span className="text-[var(--color-primary)]">Design System</span>
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Premium component library and style guide.
        </p>
      </header>

      {/* Product Cards */}
      <section>
        <h2 className="text-xl font-mono mb-6 text-[var(--color-text-secondary)] border-b border-[var(--border-color)] pb-2">
          01. Product Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductCard
            name="Silk Evening Gown"
            brand="Gucci"
            price="$2,400"
            imageUrl="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2883&auto=format&fit=crop"
            onTryOn={() => console.log('Try On')}
          />
           <ProductCard
            name="Structured Blazer"
            brand="Zara"
            price="$129"
            imageUrl="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop"
            onTryOn={() => console.log('Try On')}
          />
        </div>
      </section>

      {/* Brand Cards */}
      <section>
        <h2 className="text-xl font-mono mb-6 text-[var(--color-text-secondary)] border-b border-[var(--border-color)] pb-2">
          02. Brand Cards
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BrandCard name="Gucci" isLuxury isRecommended isActive />
          <BrandCard name="Zara" tier="Mass Market" />
          <BrandCard name="Uniqlo" tier="Essential" isRecommended />
          <BrandCard name="Chanel" isLuxury />
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-mono mb-6 text-[var(--color-text-secondary)] border-b border-[var(--border-color)] pb-2">
            03. Size Guide
          </h2>
          <SizeGuide
            recommendedSize="M"
            confidence={94}
            measurements={{ chest: "38\"", waist: "32\"", hips: "40\"" }}
          />
        </div>

        <div>
           <h2 className="text-xl font-mono mb-6 text-[var(--color-text-secondary)] border-b border-[var(--border-color)] pb-2">
            04. Loading States
          </h2>
          <div className="grid gap-4">
             <LoadingState type="text" />
             <LoadingState type="card" className="min-h-[200px]" />
          </div>
        </div>
      </section>

      {/* Fitting Result */}
      <section>
        <h2 className="text-xl font-mono mb-6 text-[var(--color-text-secondary)] border-b border-[var(--border-color)] pb-2">
          05. Fitting Result (AR View)
        </h2>
        <FittingResult
          originalImage=""
          resultImage="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
          matchScore={98}
          onShare={() => console.log('Share')}
          onRetake={() => console.log('Retake')}
        />
      </section>

      {/* Interactive */}
      <section>
        <h2 className="text-xl font-mono mb-6 text-[var(--color-text-secondary)] border-b border-[var(--border-color)] pb-2">
          06. Interactive Elements
        </h2>
        <button
          onClick={() => setIsSheetOpen(true)}
          className="btn-primary"
        >
          Open Bottom Sheet
        </button>

        <BottomSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          title="Premium Details"
        >
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)]">
              This is an example of the iOS-style bottom sheet component. It features a drag handle, spring animations, and a backdrop blur.
            </p>
            <div className="h-32 bg-[var(--color-background)] rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] text-sm">
              Content Area
            </div>
             <button
              onClick={() => setIsSheetOpen(false)}
              className="w-full btn-secondary mt-4"
            >
              Close Sheet
            </button>
          </div>
        </BottomSheet>
      </section>
    </div>
  );
}
