export async function generateStoryImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Story Format: 1080x1920
    canvas.width = 1080;
    canvas.height = 1920;

    // Load Image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      // 1. Draw Black Background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Image (Contain or Cover)
      // Calculate aspect ratio to fit nicely
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2 - 100; // Shift up slightly for text

      // Add a soft glow behind the image
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, y + h / 2, w / 4,
        canvas.width / 2, y + h / 2, w
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, x, y, w, h);

      // 3. Add Border to Image
      ctx.strokeStyle = '#D4AF37'; // Luxury Gold
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, w, h);

      // 4. Branding Header
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 80px "Cinzel", serif'; // Assuming Cinzel is loaded or fallback to serif
      ctx.textAlign = 'center';
      ctx.fillText('S_FIT', canvas.width / 2, 200);

      ctx.fillStyle = '#D4AF37';
      ctx.font = '40px "Space Grotesk", sans-serif';
      ctx.fillText('MASTERPIECE COLLECTION', canvas.width / 2, 280);

      // 5. Footer / Tagline
      ctx.fillStyle = '#888888';
      ctx.font = '30px sans-serif';
      ctx.fillText('AI-POWERED VIRTUAL ATELIER', canvas.width / 2, canvas.height - 150);

      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 30px monospace';
      ctx.fillText('TRY IT NOW @ S-FIT.AI', canvas.width / 2, canvas.height - 100);

      // 6. Return Data URL
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = (err) => {
      reject(new Error(`Failed to load image for story generation: ${err}`));
    };
  });
}
