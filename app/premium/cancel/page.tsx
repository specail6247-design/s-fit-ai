'use client';

import Link from 'next/link';

export default function PremiumCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-void-black text-pure-white">
      <div className="max-w-md text-center">
        <div className="mb-6 text-6xl">🤔</div>
        <h1 className="text-2xl font-bold mb-4">
          Subscription Cancelled
        </h1>
        <p className="text-soft-gray mb-8">
          No worries! You can continue using the free version or upgrade whenever you're ready.
        </p>
        <Link
          href="/"
          className="inline-block border border-soft-gray text-pure-white py-3 px-8 rounded-full hover:bg-soft-gray/10 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
