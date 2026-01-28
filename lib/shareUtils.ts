export async function generateStoryImage(resultImageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Instagram Story dimensions
    canvas.width = 1080;
    canvas.height = 1920;

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = resultImageUrl;

    img.onload = () => {
      // 1. Background (Dark Gradient)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Result Image (Centered, Best Fit)
      // Calculate aspect ratio to fit within a safe zone (leaving room for text)
      const safeWidth = 900;
      const safeHeight = 1400;

      const imgRatio = img.width / img.height;
      let drawWidth = safeWidth;
      let drawHeight = safeWidth / imgRatio;

      if (drawHeight > safeHeight) {
        drawHeight = safeHeight;
        drawWidth = safeHeight * imgRatio;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      // Draw shadow/glow
      ctx.shadowColor = 'rgba(0, 122, 255, 0.5)';
      ctx.shadowBlur = 40;
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
      ctx.shadowBlur = 0; // Reset

      // 3. Branding Text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold italic 60px sans-serif';
      ctx.textAlign = 'center';

      // Logo text
      ctx.fillText('S_FIT NEO', canvas.width / 2, 150);

      // Subtext
      ctx.fillStyle = '#007AFF';
      ctx.font = '30px monospace';
      ctx.fillText('VIRTUAL FITTING LAB', canvas.width / 2, 210);

      // Footer
      ctx.fillStyle = '#666666';
      ctx.font = '24px sans-serif';
      ctx.fillText('Try it at s-fit.ai', canvas.width / 2, canvas.height - 100);

      // Resolve with data URL
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
}
