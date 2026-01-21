import { useState, useRef, useEffect, useCallback } from 'react';
import { detectVideoPose } from '@/lib/mediapipe';
import { useStore, Landmark } from '@/store/useStore';
import { v4 as uuidv4 } from 'uuid';

interface TrainingModeProps {
  onBack: () => void;
}

export function TrainingMode({ onBack }: TrainingModeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentLandmarks, setCurrentLandmarks] = useState<Landmark[] | null>(null);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  
  const { addTrainingSample, trainingData, clearTrainingData } = useStore();
  
  // Form State
  const [formData, setFormData] = useState({
    height: 175,
    weight: 70,
    brand: 'Generic',
    size: 'M',
    fitRating: 3, // 1: Tight, 3: Perfect, 5: Loose
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'brand' || name === 'size' ? value : Number(value)
    }));
  };

  const captureSample = () => {
    if (!currentLandmarks) {
      alert('No pose detected! Please stand in front of the camera.');
      return;
    }

    addTrainingSample({
      id: uuidv4(),
      timestamp: Date.now(),
      landmarks: currentLandmarks,
      label: {
        height: formData.height,
        weight: formData.weight,
        brand: formData.brand,
        size: formData.size,
        fitRating: formData.fitRating
      }
    });

    // Visual feedback
    const flash = document.createElement('div');
    flash.className = 'absolute inset-0 bg-white/50 z-50 pointer-events-none transition-opacity duration-300';
    document.body.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 300);
    }, 50);
  };

  const exportData = () => {
    if (trainingData.length === 0) {
      alert('No data to export!');
      return;
    }

    const dataStr = JSON.stringify(trainingData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `s-fit-training-data-${Date.now()}.json`;
    link.click();
  };

  const detectPose = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const render = async (time: number) => {
      if (!videoRef.current || !canvasRef.current || !isCameraActive) return;

      if (time - lastTimeRef.current >= 50) { // Limit to ~20fps for performance
        lastTimeRef.current = time;
        try {
          const landmarks = await detectVideoPose(videoRef.current, time);
          setCurrentLandmarks(landmarks); // Store for capture
          
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            // Draw Skeleton
            if (landmarks && landmarks.length > 0) {
              ctx.fillStyle = '#CCFF00';
              ctx.strokeStyle = 'rgba(204, 255, 0, 0.5)';
              ctx.lineWidth = 2;

              // Connections (Simplified)
              const connections = [
                [11, 12], // Shoulders
                [11, 13], [13, 15], // Left Arm
                [12, 14], [14, 16], // Right Arm
                [11, 23], [12, 24], // Torso
                [23, 24], // Hips
              ];

              connections.forEach(([start, end]) => {
                const s = landmarks[start];
                const e = landmarks[end];
                if (s && e) {
                   ctx.beginPath();
                   ctx.moveTo((1 - s.x) * canvasRef.current!.width, s.y * canvasRef.current!.height);
                   ctx.lineTo((1 - e.x) * canvasRef.current!.width, e.y * canvasRef.current!.height);
                   ctx.stroke();
                }
              });

              landmarks.forEach((lm) => {
                ctx.beginPath();
                ctx.arc((1 - lm.x) * canvasRef.current!.width, lm.y * canvasRef.current!.height, 4, 0, 2 * Math.PI);
                ctx.fill();
              });
            }
          }
        } catch (error) {
          console.error("Pose detection error:", error);
        }
      }
      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);
  }, [isCameraActive]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => setIsCameraActive(true);
        }
      } catch (err) {
        console.error('Webcam error:', err);
      }
    };
    startCamera();

    const videoElement = videoRef.current;
    
    return () => {
      if (videoElement && videoElement.srcObject) {
         const tracks = (videoElement.srcObject as MediaStream).getTracks();
         tracks.forEach(t => t.stop());
      }
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    if (isCameraActive) detectPose();
  }, [isCameraActive, detectPose]);

  return (
    <div className="flex flex-col md:flex-row h-[85vh] gap-6 bg-void-black p-6 rounded-3xl border border-border-color">
      {/* 1. Camera Section */}
      <div className="flex-1 relative bg-black rounded-2xl overflow-hidden border border-white/10">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full text-xs text-cyber-lime border border-cyber-lime/30">
          ⚫ DATA COLLECTION MODE
        </div>
      </div>

      {/* 2. Control Panel */}
      <div className="w-full md:w-96 flex flex-col gap-6">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">🏷️ Label Your Pose</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-soft-gray block mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-soft-gray block mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white text-sm"
              />
            </div>
          </div>

          <div>
             <label className="text-xs text-soft-gray block mb-1">Target Brand</label>
             <select 
               name="brand" 
               value={formData.brand} 
               onChange={handleInputChange}
               className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white text-sm"
             >
               <option value="Generic">Generic / No Brand</option>
               <option value="ZARA">ZARA</option>
               <option value="Uniqlo">Uniqlo</option>
               <option value="Gucci">Gucci</option>
             </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-soft-gray block mb-1">Wearing Size</label>
              <select 
                name="size" 
                value={formData.size} 
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white text-sm"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-soft-gray block mb-1">Fit Rating (1-5)</label>
              <input
                type="number"
                name="fitRating"
                min="1"
                max="5"
                value={formData.fitRating}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white text-sm"
              />
              <span className="text-[10px] text-gray-500">1=Tight, 3=Perfect, 5=Loose</span>
            </div>
          </div>

          <button
            onClick={captureSample}
            disabled={!currentLandmarks}
            className="w-full py-3 mt-4 bg-cyber-lime hover:bg-lime-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📸 Capture Sample
          </button>
        </div>

        {/* 3. Output Section */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex-1 flex flex-col">
          <h3 className="text-white font-bold mb-2">Collected Data</h3>
          <p className="text-soft-gray text-sm mb-4">
            Total Samples: <span className="text-cyber-lime font-mono">{trainingData.length}</span>
          </p>
          
          <div className="flex-1 overflow-y-auto mb-4 bg-black/50 rounded-lg p-2 max-h-40">
            {trainingData.slice().reverse().map((sample) => (
              <div key={sample.id} className="text-[10px] text-gray-400 border-b border-white/10 py-1 font-mono">
                {new Date(sample.timestamp).toLocaleTimeString()} - {sample.label.brand} ({sample.label.size}) - Fit: {sample.label.fitRating}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors border border-white/10"
            >
              📥 Export JSON
            </button>
            <button
              onClick={() => {
                if (confirm('Clear all collected data?')) clearTrainingData();
              }}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm rounded-lg transition-colors border border-red-500/20"
            >
              Clear
            </button>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full py-2 text-soft-gray hover:text-white text-sm"
        >
          ← Back to Main
        </button>
      </div>
    </div>
  );
}
