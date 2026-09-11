export const generateStoryImage = async (imageUrl: string, onGenerated?: (blob: Blob) => void) => {
  try {
    const canvas = document.createElement('canvas');
    // Instagram Story aspect ratio is 9:16 (1080x1920)
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load image
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Calculate dimensions to fit and center image
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.width / imgRatio;

    if (drawHeight > canvas.height * 0.8) {
      drawHeight = canvas.height * 0.8;
      drawWidth = drawHeight * imgRatio;
    }

    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2;

    // Draw image
    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    // Draw Branding
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 60px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('S_FIT NEO', canvas.width / 2, 120);

    ctx.fillStyle = '#007AFF';
    ctx.font = '40px monospace';
    ctx.fillText('VIRTUAL FITTING', canvas.width / 2, 180);

    // Draw footer
    ctx.fillStyle = '#888888';
    ctx.font = '30px sans-serif';
    ctx.fillText('@s_fit_app', canvas.width / 2, canvas.height - 80);

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob && onGenerated) {
          onGenerated(blob);
        }
        resolve(blob);
      }, 'image/jpeg', 0.9);
    });

  } catch (error) {
    console.error("Failed to generate story image:", error);
    return null;
  }
};

export const shareToInstagramStory = async (imageUrl: string) => {
  try {
    const blob = await generateStoryImage(imageUrl);
    if (!blob) throw new Error("Failed to generate image");

    const file = new File([blob], 'sfit-story.jpg', { type: 'image/jpeg' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'My S_FIT Style',
        text: 'Check out my new fit! #SFIT #VirtualTryOn'
      });
    } else {
      // Fallback for browsers that don't support file sharing
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sfit-story.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error("Error sharing:", error);
    alert("Could not share directly. The image will be downloaded instead.");
  }
};
