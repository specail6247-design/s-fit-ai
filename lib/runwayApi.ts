import RunwayML from '@runwayml/sdk';

let _runwayClient: RunwayML | null = null;
function getRunwayClient() {
  if (!_runwayClient) {
    const apiToken = process.env.RUNWAYML_API_SECRET;
    if (!apiToken) {
      throw new Error('RUNWAYML_API_SECRET is not configured');
    }
    _runwayClient = new RunwayML({ apiKey: apiToken });
  }
  return _runwayClient;
}

export async function generateRunwayVideo(imageUrl: string): Promise<string | null> {
  try {
    const client = getRunwayClient();
    console.log("Starting Runway Video Generation...");
    const imageToVideo = await client.imageToVideo.create({
      model: 'gen4_turbo',
      promptImage: imageUrl,
      ratio: '1280:720',
      promptText: 'A high quality realistic fashion runway video, fashion model presenting a garment in cinematic lighting. Ultra-detailed fabric textures, revealing micro-fiber details. Perfect drape and physics as the model walks.'
    });

    // Polling for the task completion
    let task = await client.tasks.retrieve(imageToVideo.id);
    while (task.status === 'PENDING' || task.status === 'RUNNING' || task.status === 'THROTTLED') {
      console.log(`Task ${task.id} status: ${task.status}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      task = await client.tasks.retrieve(imageToVideo.id);
    }

    if (task.status === 'SUCCEEDED') {
      return task.output[0] || null;
    } else {
      console.error(`Task failed with status ${task.status}`, task);
      return null;
    }
  } catch (error) {
    console.error('Runway generation error:', error);
    return null;
  }
}
