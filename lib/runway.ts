import RunwayML from '@runwayml/sdk';

export interface RunwayVideoResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  taskId?: string;
}

export async function generateRunwayVideo(imageUrl: string, prompt?: string): Promise<RunwayVideoResult> {
  if (!process.env.RUNWAYML_API_SECRET) {
    console.warn("RUNWAYML_API_SECRET is missing. Falling back to mock video.");
    return {
      success: true,
      videoUrl: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-runway-video.mp4',
      taskId: 'mock-task-id'
    };
  }

  // Initialize Runway SDK inside the function to avoid fatal initialization errors
  const client = new RunwayML({
    apiKey: process.env.RUNWAYML_API_SECRET,
  });

  try {
    const task = await client.imageToVideo.create({
      model: 'gen4_turbo', // Updated to match type definitions
      promptImage: imageUrl,
      promptText: prompt || 'Cinematic, hyper-realistic, slow motion, fashion runway shot, 4k, detailed texture',
      ratio: '1280:720',   // Updated to match type definitions
    });

    console.log("Runway Task created:", task.id);

    // Poll for completion (Simplified for demo/async handling in route)
    let status = await client.tasks.retrieve(task.id);
    let attempts = 0;
    while (status.status !== 'SUCCEEDED' && status.status !== 'FAILED' && attempts < 20) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      status = await client.tasks.retrieve(task.id);
      console.log(`Runway task status: ${status.status}`);
      attempts++;
    }

    if (status.status === 'SUCCEEDED') {
      // Find output URL - typical structure for imageToVideo tasks
      const videoUrl = status.output?.[0] as string | undefined;
      return { success: true, videoUrl, taskId: task.id };
    } else {
      return { success: false, error: `Task failed or timed out. Status: ${status.status}` };
    }

  } catch (error: unknown) {
    console.error("RunwayML Error:", error);
    return { success: false, error: (error as Error).message };
  }
}
