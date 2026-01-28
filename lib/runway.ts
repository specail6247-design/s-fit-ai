// Service to interact with Runway Gen-3 Alpha API for cinematic video generation
// Documentation: https://docs.runwayml.com/

export interface RunwayVideoResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  taskId?: string;
}

const RUNWAY_API_BASE = 'https://api.runwayml.com/v1';

export async function generateRunwayVideo(imageUrl: string): Promise<RunwayVideoResult> {
  const apiToken = process.env.RUNWAY_API_TOKEN;

  if (!apiToken) {
    console.warn("RUNWAY_API_TOKEN is not set. Skipping Runway generation.");
    return { success: false, error: 'RUNWAY_API_TOKEN not configured' };
  }

  try {
    console.log("Starting Runway Gen-3 generation...");

    // 1. Initiate Generation
    const response = await fetch(`${RUNWAY_API_BASE}/image_to_video`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-09-26', // Use latest stable version
      },
      body: JSON.stringify({
        promptImage: imageUrl,
        model: 'gen3a_turbo', // Or 'gen3a_long' for high fidelity
        promptText: "Cinematic fashion shot, slow motion, detailed texture, fabric movement, 4k, photorealistic, cinematic lighting",
        seed: 42,
        watermark: false,
        duration: 5, // seconds
        ratio: '9:16'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Runway API Error: ${errorData.message || response.statusText}`);
    }

    const { id: taskId } = await response.json();
    console.log(`Runway Task Initiated: ${taskId}`);

    // 2. Poll for Completion
    return await pollRunwayTask(taskId, apiToken);

  } catch (error) {
    console.error("Runway generation failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown Runway error'
    };
  }
}

async function pollRunwayTask(taskId: string, apiToken: string): Promise<RunwayVideoResult> {
  const maxAttempts = 60; // 2 minutes (assuming 2s interval)
  const interval = 2000;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, interval));

    try {
      const response = await fetch(`${RUNWAY_API_BASE}/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'X-Runway-Version': '2024-09-26',
        }
      });

      if (!response.ok) continue;

      const data = await response.json();
      const status = data.status; // 'PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED'

      if (status === 'SUCCEEDED') {
        console.log("Runway Task Succeeded!");
        // Usually output is an array of URLs
        const videoUrl = data.output?.[0];
        if (videoUrl) {
            return { success: true, videoUrl };
        }
        return { success: false, error: 'Task succeeded but no output URL found' };
      } else if (status === 'FAILED') {
        return { success: false, error: `Runway task failed: ${data.failure || 'Unknown error'}` };
      }

      // If PENDING or RUNNING, continue loop
      console.log(`Runway Task Status: ${status} (${i + 1}/${maxAttempts})`);

    } catch (e) {
      console.warn("Error polling Runway task:", e);
    }
  }

  return { success: false, error: 'Runway task timed out' };
}
