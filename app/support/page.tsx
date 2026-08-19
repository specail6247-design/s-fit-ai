'use client';

import React from 'react';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-void-black text-pure-white p-8">
      <Link href="/" className="text-soft-gray hover:text-white mb-8 block">
        ← Back
      </Link>
      <h1 className="text-3xl font-bold mb-6">Support Hub</h1>
      <p className="text-soft-gray mb-8">Need help? We&apos;ve got you covered.</p>

      <div className="max-w-md w-full bg-charcoal/30 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-soft-gray mb-1">Issue Type</label>
            <select className="w-full bg-void-black border border-white/20 rounded p-2 text-white">
              <option>Bug</option>
              <option>Feature Request</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-soft-gray mb-1">Description</label>
            <textarea className="w-full bg-void-black border border-white/20 rounded p-2 text-white h-24" placeholder="Tell us what happened..."></textarea>
          </div>
          <button type="button" className="w-full py-2 bg-cyber-lime text-black font-bold rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
