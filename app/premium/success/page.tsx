'use client';

import Link from 'next/link';

export default function PremiumSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-void-black text-pure-white">
      <div className="max-w-md text-center">
        <div className="mb-6 text-6xl">🎉</div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-luxury-gold to-yellow-400 bg-clip-text text-transparent">
          Welcome to Premium!
        </h1>
        <p className="text-soft-gray mb-8">
          Thank you for subscribing. You now have unlimited access to all features.
        </p>
        <Link
          href="/"
          className="inline-block bg-luxury-gold text-void-black font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors"
        >
          Start Styling
        </Link>
      </div>
    </div>
  );
}
