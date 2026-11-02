import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn, upscaleImage, generateCinematicVideo } from '@/lib/virtualTryOn';

export async function POST(req: NextRequest) {
  try {
    const { userPhotoUrl, garmentImageUrl, category, isMasterpieceMode } = await req.json();

    if (!userPhotoUrl || !garmentImageUrl) {
      return NextResponse.json({ success: false, error: 'Missing images' }, { status: 400 });
    }

    // Step 1: IDM-VTON (Dressing)
    console.log("Pipeline Step 1: Generating Try-On Image...");
    const tryOnResult = await generateVirtualTryOn({
      userPhoto: userPhotoUrl,
      garmentImage: garmentImageUrl,
      category: category || 'upper_body'
    });

    if (!tryOnResult.success || !tryOnResult.imageUrl) {
      return NextResponse.json({ success: false, error: tryOnResult.error || 'Failed to generate try-on' }, { status: 500 });
    }

    const imageUrl = tryOnResult.imageUrl;
    let finalImageUrl = imageUrl;
    let videoUrl = null;

    if (isMasterpieceMode) {
      // Step 2: Post-Processing (Texture Sharpness)
      console.log("Pipeline Step 2: Upscaling Image (Post-Processing)...");
      const upscaledUrl = await upscaleImage(imageUrl);
      if (upscaledUrl) {
         finalImageUrl = upscaledUrl;
      }

      // Step 3: Runway / SVD (Motion Synthesis)
      console.log("Pipeline Step 3: Generating Motion...");
      const videoResult = await generateCinematicVideo(finalImageUrl);
      if (videoResult.success && videoResult.videoUrl) {
         videoUrl = videoResult.videoUrl;
      }
    }

    return NextResponse.json({
      success: true,
      imageUrl: finalImageUrl,
      videoUrl: videoUrl,
    });

  } catch (error) {
    console.error('Masterpiece Pipeline Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
