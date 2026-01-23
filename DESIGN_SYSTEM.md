# S_FIT AI Premium Design System

## Overview
The S_FIT AI Design System is built to convey a luxury, high-fashion aesthetic while maintaining a clean, user-centric interface. It utilizes a sophisticated dark mode palette by default, with gold accents and minimalist typography.

## Design Tokens

### Colors
Defined in `styles/design-system.css`.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#C9B037` (Gold) | Primary actions, highlights, luxury indicators |
| `--color-secondary` | `#0A0A0A` (Void Black) | Backgrounds, primary dark elements |
| `--color-luxury` | `#F4E4BC` (Champagne) | Subtle gradients, premium accents |
| `--color-surface` | `#FFFFFF` | Cards, modals, high-contrast elements |
| `--color-accent` | `#CCFF00` (Cyber Lime) | Tech/AI indicators, active states |

### Typography
*   **Display**: "Geist", -apple-system, sans-serif
*   **Body**: "Geist Mono", monospace

### Spacing
Scale: `xs` (0.25rem) to `2xl` (3rem).

## Components

All components are located in `components/ui/`.

### ProductCard
Displays a product with a premium hover effect.
*   **Props**: `name`, `brand`, `price`, `imageUrl`, `onTryOn`
*   **Interaction**: Hover scales image and reveals "Try On" button.

### BrandCard
Elegant card for brand selection.
*   **Props**: `name`, `tier`, `isActive`, `isLuxury`, `isRecommended`
*   **Interaction**: Hover scale, active state styling.

### SizeGuide
Visual representation of size analysis.
*   **Props**: `recommendedSize`, `confidence`, `measurements`
*   **Animation**: Pulsing rings around the recommendation.

### FittingResult
AR-style overlay for virtual try-on results.
*   **Props**: `resultImage`, `matchScore`, `onShare`, `onRetake`
*   **Animation**: Scanning line effect, pulsing indicators.

### LoadingState
Premium skeleton loader with shimmer effect.
*   **Props**: `type` ('card' | 'text' | 'image')

### BottomSheet
iOS-style modal sheet.
*   **Props**: `isOpen`, `onClose`, `title`, `children`
*   **Interaction**: Drag to close, spring animations.

## Animations
Defined in `styles/animations.css`.
*   `.animate-fade-in`: Simple fade in.
*   `.animate-slide-up`: Slide up with fade.
*   `.animate-shimmer`: Shimmer effect for loading states.
*   `.hover-scale`: Utility for scale on hover.
*   `.hover-glow`: Utility for glow on hover.

## Usage
Import CSS in `app/globals.css`:
```css
@import "../styles/design-system.css";
@import "../styles/animations.css";
```
Use CSS variables for styling to ensure consistency and theme support.
