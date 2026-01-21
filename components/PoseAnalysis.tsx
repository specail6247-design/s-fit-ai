'use client';

import { useEffect, useRef, useState } from 'react';
import { PoseLandmarker, FilesetResolver, PoseLandmarkerResult } from '@mediapipe/tasks-vision';
import { useStore } from '@/store/useStore';
import type { PoseAnalysis as PoseAnalysisType, PoseProportions } from '@/lib/mediapipe';

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
    if (imageFile && landmarker) {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);
      img.onload = () => {
        // Detect pose
        const poseResult = landmarker.detect(img);
        setResult(poseResult);
        
        // Draw logs for debug
        console.log("Pose/Landmarks:", poseResult);
        
        // Draw on canvas
        drawLandmarks(img, poseResult);

        // Update Store
        const landmarks = poseResult.landmarks?.[0] ?? [];
        const landmarkCount = landmarks.length;
        const coverage = landmarkCount ? landmarkCount / 33 : 0;
        const score = Math.round(Math.min(100, 60 + coverage * 40));
        const note = landmarkCount >= 28
          ? 'Full body captured. Ready for fitting.'
          : 'Pose detected but body is partially missing.';
        
        let proportions: PoseProportions | null = null;

        if (landmarkCount >= 25) { // Ensure we have enough points for body calculation
          const L_SHOULDER = 11, R_SHOULDER = 12;
          const L_HIP = 23, R_HIP = 24;
          const L_ANKLE = 27, R_ANKLE = 28;

          const dist = (i1: number, i2: number) => {
            const p1 = landmarks[i1];
            const p2 = landmarks[i2];
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
          };

          const shoulderWidth = dist(L_SHOULDER, R_SHOULDER);
          const hipWidth = dist(L_HIP, R_HIP);
          const torsoHeight = (dist(L_SHOULDER, L_HIP) + dist(R_SHOULDER, R_HIP)) / 2;
          const legLength = (dist(L_HIP, L_ANKLE) + dist(R_HIP, R_ANKLE)) / 2;
          
          // Overall body height estimate (head to toe approx)
          const bodyHeight = dist(0, L_ANKLE); // Nose to ankle as proxy
          
          proportions = {
            shoulderWidth,
            hipWidth,
            torsoHeight,
            legLength,
            overallRatio: shoulderWidth / (bodyHeight || 1)
          };
          
          console.log("Calculated Proportions:", proportions);
        }

        const analysisData: PoseAnalysisType = {
          landmarkCount,
          score,
          note,
          proportions,
        };
        
        console.log("Updating Store:", analysisData);
        setPoseAnalysis(analysisData);
      };
    }
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
