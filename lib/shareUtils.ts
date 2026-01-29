export async function generateStoryImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas not supported'));
      return;
    }

    // Instagram Story Size
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // Load Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // 1. Background (Dark Gradient)
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Grain Effect (Simulated)
      // Skipping for performance/simplicity, can add noise pattern if needed

      // 3. Draw Image (Centered & Fitted)
      // Calculate scaling to fit within 80% width/height
      const maxW = width * 0.85;
      const maxH = height * 0.70;
      const ratio = Math.min(maxW / img.width, maxH / img.height);
      const drawW = img.width * ratio;
      const drawH = img.height * ratio;
      const x = (width - drawW) / 2;
      const y = (height - drawH) / 2;

      // Drop Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 50;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 20;

      // Draw Image
      // Rounded corners would require clipping path, keep simple rectangular for now
      // or implement simple rounded rect clip
      ctx.save();
      roundRect(ctx, x, y, drawW, drawH, 20);
      ctx.clip();
      ctx.drawImage(img, x, y, drawW, drawH);
      ctx.restore();

      // Reset Shadow
      ctx.shadowColor = 'transparent';

      // 4. Branding (S_FIT AI Logo)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold italic 60px "Helvetica Neue", Arial, sans-serif';
      ctx.textAlign = 'center';

      // "S_FIT NEO"
      ctx.fillText('S_FIT NEO', width / 2, y + drawH + 120);

      ctx.font = '30px "Courier New", monospace';
      ctx.fillStyle = '#007AFF'; // Brand Color
      ctx.fillText('VIRTUAL FITTING ENGINE', width / 2, y + drawH + 170);

      // 5. Date/Tag
      ctx.font = '24px Arial, sans-serif';
      ctx.fillStyle = '#666666';
      ctx.fillText(new Date().toLocaleDateString().toUpperCase(), width / 2, height - 100);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (err) => reject(err);
    img.src = imageUrl;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
