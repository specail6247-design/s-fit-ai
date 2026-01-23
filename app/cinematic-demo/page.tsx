'use client';

import React, { useState } from 'react';
import CinematicViewer from '@/components/ui/CinematicViewer';

export default function CinematicDemoPage() {
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'); // Default fashion image
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!imageUrl) return;

    setLoading(true);
    setError('');
    setVideoUrl('');

    try {
      const response = await fetch('/api/cinematic-try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();

      if (data.success && data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        setError(data.error || 'Failed to generate video.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            The Hollywood AI Video Engine
          </h1>
          <p className="text-xl text-neutral-400">
            Transform static fashion photos into cinematic runway moments.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-neutral-800/50 p-6 rounded-2xl border border-neutral-700 space-y-4">
          <label className="block text-sm font-medium text-neutral-300">
            Input Image URL (Full body fashion photo recommended)
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="https://..."
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${
                loading
                  ? 'bg-neutral-600 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-neutral-200 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
              }`}
            >
              {loading ? 'Generating...' : 'Action! 🎬'}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {/* Preview / Result Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Input Preview */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-400">Input Source</h3>
            <div className="aspect-[9/16] relative rounded-xl overflow-hidden bg-black border border-neutral-800">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Input"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>

          {/* Video Output */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-400">Cinematic Output</h3>
            {videoUrl ? (
              <CinematicViewer videoUrl={videoUrl} posterUrl={imageUrl} />
            ) : (
              <div className="aspect-[9/16] rounded-xl bg-neutral-800/30 border border-neutral-800 border-dashed flex flex-col items-center justify-center text-neutral-500">
                {loading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p>Rendering Physics & Lighting...</p>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <p className="text-3xl mb-2">🎥</p>
                    <p>Video result will appear here</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
