export async function generateStoryImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Story Resolution
    canvas.width = 1080;
    canvas.height = 1920;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      // Background - Dark gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Image (Cover/Fit logic)
      const scale = Math.max(canvas.width / img.width, canvas.height * 0.7 / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height * 0.4) - (img.height / 2) * scale;

      // Draw a subtle glow behind the image
      ctx.shadowColor = '#007AFF';
      ctx.shadowBlur = 100;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      ctx.shadowBlur = 0; // Reset

      // Overlay Gradient (Bottom up) to make text readable
      const overlayGrad = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
      overlayGrad.addColorStop(0, 'transparent');
      overlayGrad.addColorStop(0.8, 'rgba(0,0,0,0.9)');
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Logo Text (Top)
      ctx.font = 'italic 900 80px sans-serif'; // Approximating the font
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT', canvas.width / 2, 160);

      ctx.fillStyle = '#007AFF';
      ctx.fillText('NEO', canvas.width / 2, 250);

      // "Try it on" Badge
      ctx.fillStyle = '#007AFF';
      ctx.roundRect(canvas.width / 2 - 200, canvas.height - 300, 400, 100, 50);
      ctx.fill();

      ctx.font = 'bold 40px sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText('TRY IT ON', canvas.width / 2, canvas.height - 235);

      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
}

// Polyfill for roundRect if needed (usually modern browsers have it, but typescript might complain)
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x: number, y: number, w: number, h: number, r: number) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
  };
}
