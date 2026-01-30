// lib/runway.ts
// Integration with Runway Gen-3 Alpha API for Cinematic Video Generation

interface RunwayResponse {
  id: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';
  output?: string[]; // URL(s)
  error?: string;
}

const RUNWAY_API_URL = "https://api.runwayml.com/v1/image_to_video";

export async function generateRunwayVideo(imageUrl: string): Promise<string | null> {
  const apiToken = process.env.RUNWAY_API_TOKEN;

  if (!apiToken) {
    console.warn("RUNWAY_API_TOKEN not found. Using SVD fallback.");
    return null;
  }

  try {
    console.log("Initiating Runway Gen-3 Video Generation...");

    // 1. Start Task
    const startRes = await fetch(RUNWAY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-09-26'
      },
      body: JSON.stringify({
        promptImage: imageUrl,
        model: 'gen3-alpha',
        promptText: "Cinematic fashion film, high resolution, slow motion fabric movement, 4k, photorealistic, luxury aesthetic",
        watermark: false,
        duration: 5,
        ratio: "16:9"
      })
    });

    if (!startRes.ok) {
        const err = await startRes.text();
        console.error("Runway API Start Error:", err);
        return null;
    }

    const { id } = await startRes.json();
    console.log(`Runway Task Started: ${id}`);

    // 2. Poll for Status
    let attempts = 0;
    while (attempts < 60) { // 2 minutes timeout
      await new Promise(r => setTimeout(r, 2000));

      const statusRes = await fetch(`${RUNWAY_API_URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'X-Runway-Version': '2024-09-26'
        }
      });

      if (!statusRes.ok) continue;

      const statusData: RunwayResponse = await statusRes.json();
      console.log(`Runway Status: ${statusData.status}`);

      if (statusData.status === 'SUCCEEDED' && statusData.output && statusData.output.length > 0) {
        return statusData.output[0];
      }

      if (statusData.status === 'FAILED') {
        console.error("Runway generation failed:", statusData.error);
        return null;
      }

      attempts++;
    }

    console.error("Runway generation timed out");
    return null;

  } catch (error) {
    console.error("Runway Integration Error:", error);
    return null;
  }
}
