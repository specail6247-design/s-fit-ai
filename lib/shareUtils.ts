
/**
 * Generates a branded Instagram Story image (1080x1920) from the fitting result.
 * @param imageUrl The URL of the fitted image.
 * @returns A Promise that resolves to the data URL of the generated image.
 */
export async function generateStoryImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    canvas.width = 1080;
    canvas.height = 1920;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#050505');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const safeMargin = 100;
      const maxWidth = canvas.width - safeMargin * 2;
      const maxHeight = canvas.height - 700;

      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2 - 50; // Shift up slightly

      // Glow
      ctx.shadowColor = 'rgba(0, 122, 255, 0.5)';
      ctx.shadowBlur = 60;
      ctx.drawImage(img, x, y, w, h);
      ctx.shadowBlur = 0;

      // Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, w, h);

      // Branding
      ctx.textAlign = 'center';

      // Logo
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'italic 900 80px "Inter", sans-serif';
      ctx.fillText('S_FIT NEO', canvas.width / 2, 220);

      ctx.fillStyle = '#888888';
      ctx.font = '400 30px "Inter", monospace';
      ctx.fillText('VIRTUAL FITTING EXPERIENCE', canvas.width / 2, 280);

      // Footer
      const footerY = canvas.height - 200;
      ctx.fillStyle = '#007AFF';
      ctx.font = 'bold 36px "Inter", sans-serif';
      ctx.fillText('TRY IT YOURSELF', canvas.width / 2, footerY);

      ctx.fillStyle = '#444444';
      ctx.font = '30px "Inter", sans-serif';
      ctx.fillText('s-fit-neo.vercel.app', canvas.width / 2, footerY + 50);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}
