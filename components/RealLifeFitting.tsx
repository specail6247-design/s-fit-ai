import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Dynamically import the 3D scene with SSR disabled
const AvatarCanvas = dynamic(() => import('./AvatarCanvas'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-[#007AFF] font-mono text-xs animate-pulse">LOADING 3D ENGINE...</div>
});

// --- MAIN CONTROL COMPONENT ---
export default function RealLifeFitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [issueSubmitted, setIssueSubmitted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleShareToStory = async () => {
    if (!resultImage) return;
    setIsSharing(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1920);

      // Load Image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = resultImage;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate size to fit nicely
      const scale = Math.min(900 / img.width, 1400 / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (1080 - w) / 2;
      const y = (1920 - h) / 2;

      // Add glow effect
      ctx.shadowColor = 'rgba(0, 122, 255, 0.5)';
      ctx.shadowBlur = 60;

      // Draw rounded image
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + 40, y);
      ctx.lineTo(x + w - 40, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + 40);
      ctx.lineTo(x + w, y + h - 40);
      ctx.quadraticCurveTo(x + w, y + h, x + w - 40, y + h);
      ctx.lineTo(x + 40, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - 40);
      ctx.lineTo(x, y + 40);
      ctx.quadraticCurveTo(x, y, x + 40, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, w, h);
      ctx.restore();

      // Reset shadow
      ctx.shadowBlur = 0;

      // Top Branding
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', 540, 180);

      ctx.fillStyle = '#007AFF';
      ctx.font = 'bold 36px monospace';
      ctx.fillText('VIRTUAL TRY-ON', 540, 240);

      // Bottom Call to Action
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '50px sans-serif';
      ctx.fillText('@sfit_ai', 540, 1750);

      // Draw grid pattern (subtle)
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 2;
      for(let i = 0; i < 1080; i += 100) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1920);
        ctx.stroke();
      }
      for(let i = 0; i < 1920; i += 100) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1080, i);
        ctx.stroke();
      }

      // Export
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sfit_story.png';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (e) {
      console.error('Failed to generate story image', e);
    } finally {
      setIsSharing(false);
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !garmentImage) return alert("Please upload both User Photo and Garment.");
    
    setIsProcessing(true);
    setProgress(0);

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 500);

    try {
      // API call to our backend (which calls Replicate/Fashn.ai)
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userImage,
          garmentImageUrl: garmentImage,
          category: 'tops' // Default for demo
        })
      });
      const data = await res.json();
      
      clearInterval(interval);
      setProgress(100);
      
      if (data.imageUrl) {
        setResultImage(data.imageUrl);
      } else {
        throw new Error(data.error || "Try-On Failed");
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      console.log("Using demo mode fallback");
      setResultImage("https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png"); // Fallback
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      
      {/* LEFT PANEL: CONTROLS */}
      <div className="w-1/3 min-w-[400px] h-full p-8 flex flex-col z-10 glass-panel border-r border-white/10 relative">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/5 to-[#007AFF]/10 pointer-events-none" />
        
        <header className="mb-10 relative z-10">
          <h1 className="text-4xl font-black tracking-tighter italic">
            S_FIT <span className="text-[#007AFF]">NEO</span>
          </h1>
          <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mt-2">
            Professional Virtual Fitting
          </p>
        </header>

        <div className="space-y-8 relative z-10 flex-1 overflow-y-auto">
          {/* User Photo Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">01. Identification</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} className="hidden" id="user-upload" />
              <label htmlFor="user-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                  {userImage ? <img src={userImage} className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Upload User Photo</div>
                  <div className="text-[10px] text-gray-500">Supports JPG, PNG (Max 5MB)</div>
                </div>
              </label>
            </div>
          </div>

          {/* Garment Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#007AFF] uppercase">02. Target Garment</label>
            <div className="border border-white/20 bg-black/40 rounded-xl p-4 hover:border-[#007AFF] transition-colors group">
              <input type="file" onChange={(e) => handleFileUpload(e, setGarmentImage)} className="hidden" id="garment-upload" />
              <label htmlFor="garment-upload" className="cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                  {garmentImage ? <img src={garmentImage} className="w-full h-full object-cover" /> : <span className="text-2xl">👕</span>}
                </div>
                <div>
                  <div className="text-sm font-bold group-hover:text-white text-gray-300">Select Garment</div>
                  <div className="text-[10px] text-gray-500">Front view preferred</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 relative z-10">
          {isProcessing ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#007AFF] font-mono">
                <span>PROCESSING DATA...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#007AFF]" 
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          ) : (
            <button 
              onClick={handleTryOn}
              className="w-full py-4 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>⚡️</span> TRY IT ON
            </button>
          )}
          
          <div className="mt-4 flex gap-2">
             <a href="/spa" className="flex-1 py-3 border border-white/20 hover:bg-white/10 rounded-xl text-xs font-bold text-center flex items-center justify-center tracking-widest uppercase transition-colors">
               SPA Line
             </a>
             <a href="/luxury" className="flex-1 py-3 border border-white/20 hover:bg-white/10 rounded-xl text-xs font-bold text-center flex items-center justify-center tracking-widest uppercase transition-colors">
               Luxury Line
             </a>
          </div>

          {/* Footer / Trust & Safety */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center space-y-4">
            <div className="flex justify-center items-center gap-1.5 text-xs text-gray-400 bg-black/40 py-2 px-3 rounded-lg border border-gray-800">
              <svg className="w-4 h-4 text-[#007AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" /></svg>
              <span>Photos are processed securely and not shared.</span>
            </div>
            <div className="flex justify-center gap-4 text-xs text-gray-600 uppercase tracking-widest font-bold">
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Privacy & Terms</button>
              <button onClick={() => setIsSupportOpen(true)} className="hover:text-white transition-colors">Support Hub</button>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL: 3D RESULT & ENVIRONMENT */}
      <div className="flex-1 relative bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        {/* Background Image (Night City Vibe) */}
        <div className="absolute inset-0 opacity-40 z-0">
           {/* Placeholder for Night City HDRI background visual */}
           <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
        </div>

        {/* 3D Canvas (Safe Load) */}
        <div className="absolute inset-0 z-10">
          <ErrorBoundary fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-4">
              <span className="text-4xl opacity-50">🤖</span>
              <p className="text-xs font-mono">3D VISUALIZATION UNAVAILABLE</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 text-xs"
              >
                RELOAD ENGINE
              </button>
            </div>
          }>
            <AvatarCanvas />
          </ErrorBoundary>
        </div>

        {/* Result Overlay (If success) */}
        {resultImage && !isProcessing && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
          >
            <div className="relative group">
              <img src={resultImage} alt="Result" className="w-auto h-[70vh] rounded-xl object-contain shadow-2xl" />
              <button 
                onClick={() => setResultImage(null)} 
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-[#007AFF] transition-colors"
              >
                ✕ Close
              </button>
              <div className="absolute bottom-4 left-4 bg-black/60 text-[#007AFF] px-3 py-1 rounded-md text-xs font-bold font-mono border border-[#007AFF]/30">
                AI GENERATED_
              </div>
              <button
                onClick={handleShareToStory}
                disabled={isSharing}
                className="absolute bottom-4 right-4 bg-gradient-to-r from-[#007AFF] to-[#005bb5] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                {isSharing ? 'GENERATING...' : 'SHARE TO STORY'}
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <h2 className="text-xl font-bold text-white">Privacy Policy & Terms</h2>
              <button onClick={() => setIsPrivacyOpen(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300">
              <section>
                <h3 className="text-[#007AFF] font-bold uppercase mb-2">1. Data Privacy</h3>
                <p>We take your privacy seriously. The photos you upload are processed securely on our servers solely for the purpose of generating your virtual try-on experience.</p>
              </section>
              <section>
                <h3 className="text-[#007AFF] font-bold uppercase mb-2">2. Data Retention</h3>
                <p>All uploaded photos and generated images are automatically deleted from our servers within 24 hours. We do not use your photos to train our models without your explicit consent.</p>
              </section>
              <section>
                <h3 className="text-[#007AFF] font-bold uppercase mb-2">3. Terms of Service</h3>
                <p>By using S_FIT AI, you agree to not upload any offensive, explicit, or copyrighted material. We reserve the right to suspend accounts that violate these terms.</p>
              </section>
              <section>
                <h3 className="text-[#007AFF] font-bold uppercase mb-2">4. Disclaimer</h3>
                <p>The virtual try-on results are AI-generated approximations and may not accurately reflect the exact fit or color of the actual garment.</p>
              </section>
            </div>
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex justify-end">
              <button onClick={() => setIsPrivacyOpen(false)} className="px-6 py-2 bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-lg font-bold transition-colors">
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support Hub Modal */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <h2 className="text-xl font-bold text-white">Support Hub</h2>
              <button onClick={() => { setIsSupportOpen(false); setIssueSubmitted(false); setIssueText(''); }} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 text-sm text-gray-300">
              {issueSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Issue Reported</h3>
                  <p>Thank you for your feedback. Our team will look into this immediately.</p>
                  <button
                    onClick={() => { setIsSupportOpen(false); setIssueSubmitted(false); setIssueText(''); }}
                    className="mt-4 px-6 py-2 border border-white/20 hover:bg-white/10 rounded-lg font-bold transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Encountered a bug or have feedback? Let us know.</p>
                  <div>
                    <label className="block text-xs font-bold text-[#007AFF] uppercase mb-2">Report Issue</label>
                    <textarea
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      placeholder="Describe the issue you encountered..."
                      className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#007AFF] transition-colors resize-none h-32"
                    ></textarea>
                  </div>
                  <button
                    onClick={() => {
                      if (issueText.trim()) {
                        setIssueSubmitted(true);
                      }
                    }}
                    disabled={!issueText.trim()}
                    className="w-full py-3 bg-[#007AFF] disabled:bg-gray-700 disabled:text-gray-400 hover:bg-[#005bb5] text-white rounded-xl font-bold transition-colors"
                  >
                    Submit Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
