// Runway Gen-3 Alpha API Client
// Handles interaction with Runway's API for high-fidelity video generation.

const RUNWAY_API_ENDPOINT = process.env.RUNWAY_API_ENDPOINT || 'https://api.runwayml.com/v1';

export interface RunwayVideoResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
}

interface RunwayTaskResponse {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';
  output?: string[];
  error?: string;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateRunwayVideo(imageUrl: string, promptText?: string): Promise<RunwayVideoResult> {
  const apiKey = process.env.RUNWAY_API_SECRET;

  if (!apiKey) {
    console.warn("RUNWAY_API_SECRET is not set. Skipping Runway generation.");
    return { success: false, error: "RUNWAY_API_SECRET not configured" };
  }

  try {
    console.log("Starting Runway Gen-3 Video Generation...");

    // 1. Initiate Generation
    const response = await fetch(`${RUNWAY_API_ENDPOINT}/image_to_video`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-09-26', // Example version header
      },
      body: JSON.stringify({
        promptImage: imageUrl,
        promptText: promptText || "Cinematic slow motion, high fashion, detailed texture, photorealistic, 4k",
        model: "gen3a_turbo", // Assumed model name
        seed: Math.floor(Math.random() * 1000000),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Runway API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const taskId = data.id;
    console.log(`Runway Task Started: ${taskId}`);

    // 2. Poll for Completion
    let attempts = 0;
    const maxAttempts = 60; // 60 * 2s = 120s timeout

    while (attempts < maxAttempts) {
      await sleep(2000);

      const statusRes = await fetch(`${RUNWAY_API_ENDPOINT}/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Runway-Version': '2024-09-26',
        },
      });

      if (!statusRes.ok) {
        console.warn(`Runway status check failed: ${statusRes.status}`);
        continue;
      }

      const statusData: RunwayTaskResponse = await statusRes.json();
      console.log(`Runway Task Status: ${statusData.status}`);

      if (statusData.status === 'SUCCEEDED') {
        const videoUrl = statusData.output?.[0];
        if (videoUrl) {
          return { success: true, videoUrl };
        } else {
          return { success: false, error: "Task succeeded but no output URL found" };
        }
      } else if (statusData.status === 'FAILED') {
        return { success: false, error: statusData.error || "Runway task failed" };
      }

      attempts++;
    }

    return { success: false, error: "Runway task timed out" };

  } catch (error) {
    console.error("Runway Generation Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Runway error"
    };
  }
}
