import {
  FaceDetector,
  FilesetResolver,
  PoseLandmarker,
  type Detection,
} from '@mediapipe/tasks-vision';

const TASKS_VERSION = '0.10.14';
const WASM_BASE_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VERSION}/wasm`;
const FACE_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite';
const POSE_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';

export interface FaceAnalysis {
  faceCount: number;
  confidence: number;
  coverage: number;
  score: number;
  note: string;
}

export interface PoseProportions {
  shoulderWidth: number;
  hipWidth: number;
  waistWidth: number;
  torsoHeight: number;
  legLength: number;
  armLength: number;
  shoulderSlope: number; // Angle or relative slope
  overallRatio: number; // aspect ratio of the body
}

export interface PoseLandmark {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

export interface PoseAnalysis {
  landmarkCount: number;
  score: number;
  note: string;
  proportions: PoseProportions | null;
  landmarks?: PoseLandmark[];
}

type VisionFileset = Awaited<ReturnType<typeof FilesetResolver.forVisionTasks>>;

let visionPromise: Promise<VisionFileset> | null = null;
let faceDetectorPromise: Promise<FaceDetector> | null = null;
let poseLandmarkerPromise: Promise<PoseLandmarker> | null = null;

const getVisionResolver = async () => {
  if (!visionPromise) {
    visionPromise = FilesetResolver.forVisionTasks(WASM_BASE_URL);
  }
  return visionPromise;
};

const getFaceDetector = async () => {
  if (!faceDetectorPromise) {
    const vision = await getVisionResolver();
    faceDetectorPromise = FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: FACE_MODEL_URL,
      },
      runningMode: 'IMAGE',
    });
  }
  return faceDetectorPromise;
};

const getPoseLandmarker = async () => {
  if (!poseLandmarkerPromise) {
    const vision = await getVisionResolver();
    poseLandmarkerPromise = PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: POSE_MODEL_URL,
      },
      runningMode: 'IMAGE',
      numPoses: 1,
    });
  }
  return poseLandmarkerPromise;
};

const loadImage = (dataUrl: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image load failed'));
    image.src = dataUrl;
  });

const getBestDetection = (detections: Detection[]) =>
  detections.reduce<Detection | null>((best, current) => {
    if (!best) return current;
    const bestScore = best.categories?.[0]?.score ?? 0;
    const currentScore = current.categories?.[0]?.score ?? 0;
    return currentScore > bestScore ? current : best;
  }, null);

export const analyzeFace = async (dataUrl: string): Promise<FaceAnalysis> => {
  if (typeof window === 'undefined') {
    throw new Error('MediaPipe is only available in the browser');
  }

  try {
    const image = await loadImage(dataUrl);
    console.log(`Analyzing Face: Image loaded ${image.width}x${image.height}`);
    
    const detector = await getFaceDetector();
    if (!detector) {
      throw new Error('Face Detector failed to initialize');
    }
    
    console.log('Face Detector initialized, running detect...');
    const result = detector.detect(image);
    console.log('Face Detection result:', result);

    const detections = result.detections ?? [];
    const bestDetection = getBestDetection(detections);

    if (!bestDetection) {
      return {
        faceCount: 0,
        confidence: 0,
        coverage: 0,
        score: 0,
        note: 'No face detected. Try better lighting or a closer shot.',
      };
    }

    const { width = 0, height = 0 } = bestDetection.boundingBox ?? {};
    const coverage = image.width && image.height ? (width * height) / (image.width * image.height) : 0;
    const confidence = bestDetection.categories?.[0]?.score ?? 0;
    const score = Math.round(Math.min(98, 65 + confidence * 25 + coverage * 60));
    const note = coverage > 0.14 ? 'Great framing. Face is clearly visible.' : 'Move a bit closer for sharper results.';

    return {
      faceCount: detections.length,
      confidence,
      coverage,
      score,
      note,
    };
  } catch (error: unknown) {
    console.error('Face Analysis Error:', error);
    // Return a graceful fallback instead of crashing
    return {
      faceCount: 0,
      confidence: 0,
      coverage: 0,
      score: 0,
      note: 'Could not analyze face. Please try again or use a clearer photo.',
    };
  }
};

export const analyzePose = async (dataUrl: string): Promise<PoseAnalysis> => {
  if (typeof window === 'undefined') {
    throw new Error('MediaPipe is only available in the browser');
  }

  try {
    const image = await loadImage(dataUrl);
    const landmarker = await getPoseLandmarker();
    const result = landmarker.detect(image);
    const landmarks = result.landmarks?.[0] ?? [];
    const landmarkCount = landmarks.length;
    const coverage = landmarkCount ? landmarkCount / 33 : 0;
    const score = Math.round(Math.min(100, 60 + coverage * 40));
    const note = landmarkCount >= 28
      ? 'Full body captured. Ready for fitting.'
      : 'Pose detected but body is partially missing.';

    const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      Math.hypot(a.x - b.x, a.y - b.y);
    const getMidpoint = (a: { x: number; y: number }, b: { x: number; y: number }) => ({
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
    });

    let proportions: PoseProportions | null = null;

    if (landmarkCount >= 29) {
      const leftShoulder = landmarks[11];
      const rightShoulder = landmarks[12];
      const leftHip = landmarks[23];
      const rightHip = landmarks[24];
      const leftAnkle = landmarks[27];
      const rightAnkle = landmarks[28];

      if (leftShoulder && rightShoulder && leftHip && rightHip && leftAnkle && rightAnkle) {
        const shoulderWidth = getDistance(leftShoulder, rightShoulder);
        const hipWidth = getDistance(leftHip, rightHip);
        const shoulderMid = getMidpoint(leftShoulder, rightShoulder);
        const hipMid = getMidpoint(leftHip, rightHip);
        const ankleMid = getMidpoint(leftAnkle, rightAnkle);
        const torsoHeight = getDistance(shoulderMid, hipMid);
        const legLength = getDistance(hipMid, ankleMid);
        const overallHeight = Math.max(0.0001, torsoHeight + legLength);
        const overallRatio = ((shoulderWidth + hipWidth) / 2) / overallHeight;

        // New Detailed Proportions
        // Waist estimation (roughly midpoint between shoulders and hips)
        const leftWaistPos = { x: (leftShoulder.x + leftHip.x) / 2, y: (leftShoulder.y + leftHip.y) / 2 };
        const rightWaistPos = { x: (rightShoulder.x + rightHip.x) / 2, y: (rightShoulder.y + rightHip.y) / 2 };
        const waistWidth = getDistance(leftWaistPos, rightWaistPos);

        // Arm length (average of both arms)
        const leftArmLen = getDistance(leftShoulder, landmarks[13] || leftShoulder) + getDistance(landmarks[13] || leftShoulder, landmarks[15] || leftShoulder);
        const rightArmLen = getDistance(rightShoulder, landmarks[14] || rightShoulder) + getDistance(landmarks[14] || rightShoulder, landmarks[16] || rightShoulder);
        const armLength = (leftArmLen + rightArmLen) / 2;

        // Shoulder slope (y difference normalized by width)
        const shoulderSlope = Math.abs(leftShoulder.y - rightShoulder.y) / shoulderWidth;

        proportions = {
          shoulderWidth,
          hipWidth,
          waistWidth,
          torsoHeight,
          legLength,
          armLength,
          shoulderSlope,
          overallRatio,
        };
      }
    }

    return {
      landmarkCount,
      score,
      note,
      proportions,
      landmarks: landmarks.map(l => ({ x: l.x, y: l.y, z: l.z, visibility: l.visibility })),
    };
  } catch (error: unknown) {
    console.error('Pose Analysis Error:', error);
    // Return a graceful fallback instead of crashing
    return {
      landmarkCount: 0,
      score: 0,
      note: 'Could not analyze pose. Please try again or use a clearer photo.',
      proportions: null,
      landmarks: [],
    };
  }
};

export const detectVideoPose = async (video: HTMLVideoElement, timestamp: number) => {
  if (typeof window === 'undefined') return [];
  try {
    const landmarker = await getPoseLandmarker();
    const result = landmarker.detectForVideo(video, timestamp);
    return result.landmarks?.[0] ?? [];
  } catch (error) {
    console.error("Video Pose Error:", error);
    return [];
  }
};
