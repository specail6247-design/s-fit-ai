'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PressPage() {
  return (
    <div className="min-h-screen bg-void-black text-pure-white font-sans selection:bg-cyber-lime selection:text-void-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-void-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold">S</span>
            <span className="text-xl font-bold text-cyber-lime">_</span>
            <span className="text-xl font-bold">FIT</span>
            <span className="text-xs text-gray-400 ml-2 uppercase tracking-wider">Press Kit</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to App
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Press <span className="text-cyber-lime">Kit</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Everything you need to cover S_FIT AI. High-resolution logos, product screenshots, and founder information.
          </p>
        </div>

        {/* Quick Facts */}
        <section className="mb-20 grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-white/10 rounded-xl bg-white/5">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Launch Date</h3>
            <p className="text-2xl font-semibold">October 2026</p>
          </div>
          <div className="p-6 border border-white/10 rounded-xl bg-white/5">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Headquarters</h3>
            <p className="text-2xl font-semibold">Seoul, South Korea</p>
          </div>
          <div className="p-6 border border-white/10 rounded-xl bg-white/5">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Website</h3>
            <p className="text-2xl font-semibold text-cyber-lime">sfit-ai.com</p>
          </div>
        </section>

        {/* Brand Assets */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-cyber-lime"></span>
            Brand Assets
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative aspect-square md:aspect-video bg-white/5 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                {/* Placeholder for Logo */}
                <div className="relative w-64 h-64">
                   <Image
                    src="/press/press_logo.png"
                    alt="S_FIT AI Logo"
                    fill
                    className="object-contain"
                   />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href="/press/press_logo.png" download className="btn-primary px-8 py-3 bg-cyber-lime text-black font-bold rounded-full hover:bg-white transition-colors">
                        Download Logo
                    </a>
                </div>
            </div>

             <div className="p-8 border border-white/10 rounded-xl bg-white/5 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Brand Colors</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-void-black border border-white/20"></div>
                        <div>
                            <p className="font-mono text-cyber-lime">Void Black</p>
                            <p className="text-gray-400 text-sm">#000000</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-cyber-lime"></div>
                        <div>
                            <p className="font-mono text-cyber-lime">Cyber Lime</p>
                            <p className="text-gray-400 text-sm">#CCFF00</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Product Screenshots */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-cyber-lime"></span>
            Product Gallery
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative aspect-video bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <Image
                    src={`/product-hunt/ph_gallery_${i}_${['hero', 'mode', 'brand', 'analysis', 'tryon', 'fit'][i-1]}.png`}
                    alt={`Gallery Image ${i}`}
                    fill
                    className="object-cover"
                />
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a
                        href={`/product-hunt/ph_gallery_${i}_${['hero', 'mode', 'brand', 'analysis', 'tryon', 'fit'][i-1]}.png`}
                        download
                        className="text-white hover:text-cyber-lime transition-colors"
                    >
                        Download ↓
                    </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Founders */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-cyber-lime"></span>
            The Team
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-48 relative rounded-xl overflow-hidden border border-white/10">
               <Image
                    src="/press/founder_photo.png"
                    alt="Jules"
                    fill
                    className="object-cover"
               />
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-2">Jules</h3>
                <p className="text-cyber-lime mb-4">Founder & Lead Engineer</p>
                <p className="text-gray-400 max-w-xl leading-relaxed mb-6">
                    "I built S_FIT AI to solve the 'return walk of shame'. Fashion should be about expression, not guessing sizes. We're using MediaPipe and WebGL to bring the fitting room to your browser."
                </p>
                <div className="flex gap-4">
                     <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Twitter / X</a>
                     <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="p-12 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-400 mb-8">For press inquiries, interviews, and partnership opportunities.</p>
            <a href="mailto:press@sfit-ai.com" className="btn-primary inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyber-lime transition-colors">
                press@sfit-ai.com
            </a>
        </section>

      </main>

       {/* Footer */}
       <footer className="py-8 text-center border-t border-white/10 bg-black">
        <p className="text-xs text-gray-600">
          © 2026 S_FIT AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
