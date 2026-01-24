import React from 'react';
import Link from 'next/link';

export default function SPAPage() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-gray-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#2b8cee]">S_FIT SPA</h1>
          <p className="mt-2 text-sm text-gray-500 uppercase tracking-widest">Everyday Essentials • AR Try-On</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
           <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000")'}}>
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <span className="text-xs font-bold text-[#2b8cee]">NEW COLLECTION</span>
                </div>
           </div>
           <h3 className="text-xl font-bold mb-1">Urban Essentials</h3>
           <p className="text-sm text-gray-500 mb-6">Try on our latest street style collection using AI camera.</p>
           
           <Link href="/spa/fitting" className="block w-full py-4 bg-[#2b8cee] text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
             START AR FITTING
           </Link>
        </div>
        
        <div className="flex gap-4 justify-center">
            <Link href="/" className="text-xs font-bold text-gray-400 hover:text-gray-600">HOME</Link>
            <span className="text-gray-300">•</span>
            <Link href="/luxury" className="text-xs font-bold text-gray-400 hover:text-gray-600">LUXURY LINE</Link>
        </div>
      </div>
    </div>
  );
}
