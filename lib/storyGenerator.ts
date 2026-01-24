export async function generateStoryImage(imageSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    // Instagram Story Dimensions: 1080x1920
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // 1. Background
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative Elements (Cyberpunk/S_FIT style)
    ctx.strokeStyle = 'rgba(0, 122, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(250, 50);
    ctx.lineTo(250, 250);
    ctx.stroke();

    ctx.fillStyle = 'rgba(0, 122, 255, 0.1)';
    ctx.fillRect(width - 300, height - 300, 250, 250);

    // Load Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // 2. Draw Image (Centered and contained)
      // We want to preserve aspect ratio but maximize size in the center area
      // Safe area for story is usually central
      const safeMargin = 150;
      const targetWidth = width - (safeMargin * 2);
      const targetHeight = height - (safeMargin * 2) - 300; // Leave space for footer

      const imgRatio = img.width / img.height;
      let drawWidth = targetWidth;
      let drawHeight = targetWidth / imgRatio;

      if (drawHeight > targetHeight) {
        drawHeight = targetHeight;
        drawWidth = targetHeight * imgRatio;
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      // Draw a "polaroid" or frame effect
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 40;
      ctx.fillRect(x - 20, y - 20, drawWidth + 40, drawHeight + 40);

      ctx.shadowBlur = 0;
      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // 3. Branding
      ctx.font = 'bold 80px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT AI', width / 2, 120);

      ctx.font = '30px "Space Grotesk", monospace';
      ctx.fillStyle = '#007AFF';
      // ctx.letterSpacing = '10px'; // Canvas doesn't support letterSpacing directly in standard context without advanced handling or recent browser support. Safe to omit or ignore for MVP.
      ctx.fillText('VIRTUAL FITTING PROTOCOL', width / 2, 180);

      // 4. Footer / Call to Action
      ctx.font = '40px sans-serif';
      ctx.fillStyle = '#888888';
      ctx.fillText('Tried on with s-fit.ai', width / 2, height - 100);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = imageSrc;
  });
}
