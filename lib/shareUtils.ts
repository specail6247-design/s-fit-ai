export interface BrandingOptions {
  logoText?: string;
  footerText?: string;
}

export async function generateStoryImage(
  imageUrl: string,
  branding: BrandingOptions = { logoText: 'S_FIT AI', footerText: 'Try it at s-fit.ai' }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Story dimensions
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // 1. Background (Dark Tech Gradient)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#050505');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some noise or grid lines for "Tech" feel (Optional, keeping simple for now)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    for (let i = 0; i < width; i += 100) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 100) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Load Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // 2. Draw Image (Centered, max width 900)
      const maxImgWidth = 900;
      const maxImgHeight = 1200;
      let drawWidth = img.width;
      let drawHeight = img.height;
      const ratio = img.width / img.height;

      if (drawWidth > maxImgWidth) {
        drawWidth = maxImgWidth;
        drawHeight = drawWidth / ratio;
      }
      if (drawHeight > maxImgHeight) {
        drawHeight = maxImgHeight;
        drawWidth = drawHeight * ratio;
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      // Draw shadow/glow behind image
      ctx.shadowColor = '#007AFF';
      ctx.shadowBlur = 50;
      ctx.fillStyle = '#000';
      ctx.fillRect(x - 10, y - 10, drawWidth + 20, drawHeight + 20);
      ctx.shadowBlur = 0;

      // Draw image
      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // 3. Branding - Logo
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold italic 80px sans-serif'; // Using system font to avoid loading issues
      ctx.textAlign = 'center';
      ctx.fillText(branding.logoText || 'S_FIT AI', width / 2, 200);

      ctx.fillStyle = '#007AFF';
      ctx.font = 'bold italic 80px sans-serif';
      ctx.fillText('NEO', (width / 2) + 180, 200); // Rough positioning

      // 4. Footer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '40px sans-serif';
      ctx.fillText(branding.footerText || 'Try it at s-fit.ai', width / 2, height - 100);

      // Resolve with data URL
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for story generation'));
    };

    img.src = imageUrl;
  });
}
