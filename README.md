# S_FIT AI - Virtual Try-On Experience

> **Snap, Smart, Style.** The ultimate virtual fitting room for global fashion.

![S_FIT AI](https://img.shields.io/badge/S_FIT-AI-black?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.1.4-000000?style=flat-square&logo=next.js)
![React Three Fiber](https://img.shields.io/badge/R3F-3D%20Fitting-00FF00?style=flat-square)

## 🎯 Overview

S_FIT AI is a mobile-first virtual try-on web app that scales from mass brands (ZARA, Uniqlo) to luxury fashion (Gucci, Chanel). Our goal is **Zero Barrier** - users see results within 10 seconds.

## ✨ Features

### 3-Tier Entry System

| Mode             | Input                        | Speed    | Use Case               |
| ---------------- | ---------------------------- | -------- | ---------------------- |
| **Vibe Check**   | Selfie only                  | < 3 sec  | Quick style match      |
| **Digital Twin** | Selfie + Full Body           | ~ 10 sec | 360° realistic fitting |
| **Easy Fit**     | Height + Weight + Body Shape | Instant  | Size estimation        |

### Freemium Model

- 5 free tries daily (resets at midnight)
- Premium subscription: $9.99/month for unlimited access

### Brand Tiers

- **Mass Market**: ZARA, H&M
- **Basic**: Uniqlo
- **Luxury**: Gucci, Chanel (with custom shaders)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **3D**: React Three Fiber + Three.js
- **State**: Zustand
- **Animation**: Framer Motion
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/s-fit-ai.git
cd s-fit-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Production Build

```bash
npm run build
npm start
```

> **Note**: This project uses `--webpack` flag for builds due to Turbopack compatibility issues with Korean path names.

## 📁 Project Structure

```
s-fit-ai/
├── app/
│   ├── globals.css      # Minimalist Mono design system
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main landing page
├── components/
│   ├── ModeSelector.tsx      # 3-Tier mode selection
│   ├── BrandSelector.tsx     # Brand grid
│   ├── EasyFitMode.tsx       # Stats input
│   ├── VibeCheckMode.tsx     # Selfie upload
│   ├── DigitalTwinMode.tsx   # Dual photo upload
│   └── PremiumModal.tsx      # Paywall modal
├── data/
│   └── mockData.ts      # 15 mock items (fallback)
├── store/
│   └── useStore.ts      # Zustand global state
└── hooks/
    └── useDailyLimit.ts # Freemium logic
```

## 🔄 Switching from Mock Data to Real Data

1. Edit `data/mockData.ts` to add your API integration
2. Create a new file `services/api.ts` for API calls
3. Update `mockClothingItems` with real product data

## 🕷️ Running the Crawler (Future)

```bash
# Not yet implemented - placeholder for Python crawler
cd crawler
pip install -r requirements.txt
python scrape_zara.py
```

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables (if any)
4. Deploy!

The project is configured with `output: 'standalone'` for optimal Vercel deployment.

## 🎨 Design System

### Color Palette

| Name        | Hex       | Usage              |
| ----------- | --------- | ------------------ |
| Void Black  | `#0A0A0A` | Primary Background |
| Pure White  | `#FFFFFF` | Primary Text       |
| Soft Gray   | `#8A8A8A` | Secondary Text     |
| Cyber Lime  | `#CCFF00` | Accent Color       |
| Luxury Gold | `#C9B037` | Premium Indicator  |

### Typography

- **Brand**: Geist Mono (monospace)
- **Body**: Geist Sans

## 📄 License

MIT License - feel free to use for your projects!

---

Made with ❤️ by S_FIT AI Team
