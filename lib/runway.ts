// RunwayML Gen-3 Alpha API Client
// Handles interaction with Runway's Image-to-Video API for cinematic motion generation

interface RunwayTaskResponse {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';
  output?: string[]; // Array of video URLs
  error?: string;
}

export async function generateRunwayGen3Video(imageUrl: string, promptText: string = "Cinematic slow motion, fashion runway walk, high detail, 4k"): Promise<string | null> {
  const apiKey = process.env.RUNWAY_API_SECRET;

  if (!apiKey) {
    console.warn("Runway API key not found. Skipping Gen-3 generation.");
    return null;
  }

  try {
    console.log("Initiating Runway Gen-3 Alpha generation...");

    // 1. Submit Generation Task
    const response = await fetch('https://api.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-09-26', // Hypothetical API Version for Gen-3 Alpha
      },
      body: JSON.stringify({
        promptImage: imageUrl,
        promptText: promptText,
        model: 'gen3a_turbo', // Targeting the Turbo model for speed/cost balance
        seed: Math.floor(Math.random() * 1000000),
        duration: 5, // 5 seconds clip
        watermark: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Runway API Error (${response.status}):`, errorText);
      return null;
    }

    const task: RunwayTaskResponse = await response.json();
    const taskId = task.id;
    console.log(`Runway Task Submitted: ${taskId}`);

    // 2. Poll for Completion
    const maxAttempts = 60; // 60 * 2s = 120s timeout
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s

      const pollResponse = await fetch(`https://api.runwayml.com/v1/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Runway-Version': '2024-09-26',
        },
      });

      if (!pollResponse.ok) continue;

      const statusData: RunwayTaskResponse = await pollResponse.json();

      if (statusData.status === 'SUCCEEDED' && statusData.output && statusData.output.length > 0) {
        console.log("Runway generation succeeded!");
        return statusData.output[0];
      } else if (statusData.status === 'FAILED') {
        console.error("Runway task failed:", statusData.error);
        return null;
      }
      // If PENDING or RUNNING, continue polling
    }

    console.error("Runway generation timed out.");
    return null;

  } catch (error) {
    console.error("Runway Client Exception:", error);
    return null;
  }
}
