import { CinematicVideoResult } from './virtualTryOn';

const RUNWAY_API_URL = 'https://api.runwayml.com/v1';

interface RunwayTaskResponse {
  id: string;
}

interface RunwayStatusResponse {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'THROTTLED';
  output?: string[];
  failure?: string;
}

export async function generateRunwayVideo(imageUrl: string): Promise<CinematicVideoResult> {
  const apiKey = process.env.RUNWAY_API_SECRET;

  if (!apiKey) {
    console.warn("RUNWAY_API_SECRET is not set, skipping Runway Gen-3 generation.");
    return { success: false, error: 'RUNWAY_API_SECRET missing' };
  }

  try {
    console.log("Starting Runway Gen-3 Alpha Video Generation...");

    // 1. Initiate Generation
    const startRes = await fetch(`${RUNWAY_API_URL}/image_to_video`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-11-06',
      },
      body: JSON.stringify({
        promptImage: imageUrl,
        model: 'gen3a_turbo',
        duration: 5, // 5 seconds
        ratio: '1280:768' // Cinematic aspect ratio
      }),
    });

    if (!startRes.ok) {
      const err = await startRes.text();
      console.error("Runway API Error (Start):", err);
      return { success: false, error: `Runway Start Failed: ${startRes.status}` };
    }

    const startData = (await startRes.json()) as RunwayTaskResponse;
    const taskId = startData.id;
    console.log(`Runway Task Started: ${taskId}`);

    // 2. Poll for Completion
    let status: string = 'PENDING';
    let outputUrl: string | null = null;
    let attempts = 0;
    const maxAttempts = 60; // 2 minutes (assuming 2s interval)

    while (attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 2000));

      const pollRes = await fetch(`${RUNWAY_API_URL}/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Runway-Version': '2024-11-06',
        },
      });

      if (!pollRes.ok) {
        console.error("Runway Polling Error:", await pollRes.text());
        return { success: false, error: "Polling Failed" };
      }

      const pollData = (await pollRes.json()) as RunwayStatusResponse;
      status = pollData.status;
      console.log(`Runway Task Status: ${status}`);

      if (status === 'SUCCEEDED' && pollData.output && pollData.output.length > 0) {
        outputUrl = pollData.output[0];
        break;
      } else if (status === 'FAILED') {
        return { success: false, error: pollData.failure || 'Runway generation failed' };
      }

      attempts++;
    }

    if (outputUrl) {
      console.log("Runway Generation Success:", outputUrl);
      return { success: true, videoUrl: outputUrl };
    } else {
      return { success: false, error: "Runway generation timed out" };
    }

  } catch (error) {
    console.error("Runway Generation Exception:", error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown Runway Error' };
  }
}
