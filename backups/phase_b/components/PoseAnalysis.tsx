'use client';

import { useEffect, useRef, useState } from 'react';
import { PoseLandmarker, FilesetResolver, PoseLandmarkerResult } from '@mediapipe/tasks-vision';
import { useStore } from '@/store/useStore';
import { analyzePose } from '@/lib/mediapipe';

interface PoseAnalysisProps {
  imageFile: File | null;
}

export default function PoseAnalysis({ imageFile }: PoseAnalysisProps) {
  const [landmarker, setLandmarker] = useState<PoseLandmarker | null>(null);
  const [result, setResult] = useState<PoseLandmarkerResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose/pose_landmarker/float16/1/pose_landmarker_full.tflite`,
            delegate: "GPU"
          },
          runningMode: "IMAGE",
          numPoses: 1
        });
        setLandmarker(poseLandmarker);
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing MediaPipe:", error);
        setIsLoading(false);
      }
    };

    initMediaPipe();
  }, []);

  const { setPoseAnalysis } = useStore();

  const drawLandmarks = (img: HTMLImageElement, poseResult: PoseLandmarkerResult) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw image
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Draw landmarks
    if (poseResult.landmarks && poseResult.landmarks.length > 0) {
      const landmarks = poseResult.landmarks[0];
      
      // Draw points
      ctx.fillStyle = '#00FF00';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;

      landmarks.forEach((landmark) => {
        const x = landmark.x * canvas.width;
        const y = landmark.y * canvas.height;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      });

      // Draw connections (skeleton) - simplified
      const connections = PoseLandmarker.POSE_CONNECTIONS;
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 3;
      
      connections.forEach((conn) => {
        const start = landmarks[conn.start];
        const end = landmarks[conn.end];
        
        ctx.beginPath();
        ctx.moveTo(start.x * canvas.width, start.y * canvas.height);
        ctx.lineTo(end.x * canvas.width, end.y * canvas.height);
        ctx.stroke();
      });
    }
  };

  useEffect(() => {
    const processImage = async () => {
      if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile);
        const img = new Image();
        img.src = imageUrl;
        
        img.onload = async () => {
          // Draw image and detect landmarks (for debug view)
          if (landmarker) {
            const poseResult = landmarker.detect(img);
            setResult(poseResult);
            drawLandmarks(img, poseResult);
          }

          // Use the unified analyzePose service for store updates
          try {
            const analysisData = await analyzePose(imageUrl);
            console.log("Pose Analysis Result (Unified):", analysisData);
            setPoseAnalysis(analysisData);
          } catch (error) {
            console.error("Unified Pose Analysis Error:", error);
          }
        };
      }
    };

    processImage();

    return () => {
      if (imageFile) {
        URL.revokeObjectURL(URL.createObjectURL(imageFile));
      }
    };
  }, [imageFile, landmarker, setPoseAnalysis]);

  if (isLoading) {
    return <div className="p-4 text-center">AI 모델 로딩중...</div>;
  }

  if (!imageFile) {
    return <div className="p-4 text-center text-gray-500">사진을 업로드하면 분석 결과를 볼 수 있습니다.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
        <h3 className="font-bold text-lg">AI 분석 결과 (Debug View)</h3>
        <div className="relative w-full max-w-[300px] aspect-[3/4] bg-black rounded-lg overflow-hidden">
             <canvas 
                ref={canvasRef} 
                className="w-full h-full object-contain"
             />
        </div>
        {result && (
            <div className="text-xs text-gray-500 overflow-auto max-h-20 w-full px-4">
                랜드마크 감지됨: {result.landmarks[0]?.length} 포인트
            </div>
        )}
    </div>
  );
}
