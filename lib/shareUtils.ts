export const generateStoryImage = async (
  resultImageUrl: string,
  brandName: string = 'S_FIT AI',
  itemCategory: string = 'Fashion'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Canvas generation only works on client side'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    // Set 9:16 aspect ratio (Stories)
    canvas.width = 1080;
    canvas.height = 1920;

    // Background - Dark Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for external images if CORS allowed
    img.src = resultImageUrl;

    img.onload = () => {
        // 1. Draw the main result image (Center cropped or contained)
        // Maintain aspect ratio but fill width largely
        const imgAspect = img.width / img.height;
        let drawWidth = 1080;
        let drawHeight = 1080 / imgAspect;

        // If height is too tall, fit by height
        if (drawHeight > 1400) {
            drawHeight = 1400;
            drawWidth = 1400 * imgAspect;
        }

        const x = (1080 - drawWidth) / 2;
        const y = (1920 - drawHeight) / 2 - 100; // Slightly shifted up

        // Add shadow/glow behind image
        ctx.shadowColor = 'rgba(0, 122, 255, 0.5)';
        ctx.shadowBlur = 50;
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        ctx.shadowBlur = 0;

        // 2. Add Branding Header
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 60px sans-serif'; // Fallback font, ideally use loaded font
        ctx.textAlign = 'center';
        ctx.fillText('S_FIT AI', 540, 150);

        ctx.fillStyle = '#007AFF';
        ctx.font = '30px monospace';
        ctx.fillText('VIRTUAL FITTING ROOM', 540, 200);

        // 3. Add Item Info Overlay
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(140, 1500, 800, 250);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.strokeRect(140, 1500, 800, 250);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 40px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(brandName.toUpperCase(), 180, 1580);

        ctx.font = '30px monospace';
        ctx.fillStyle = '#AAAAAA';
        ctx.fillText(`${itemCategory} Collection`, 180, 1630);

        // 4. CTA Button (Visual only)
        ctx.fillStyle = '#007AFF';
        ctx.beginPath();
        ctx.roundRect(180, 1670, 400, 60, 30);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TRY IT ON @ S-FIT.AI', 380, 1710);

        // 5. Watermark / Date
        ctx.fillStyle = '#555555';
        ctx.font = '20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(new Date().toLocaleDateString(), 540, 1850);

        // Return Data URL
        resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = (err) => {
        // If image loading fails (e.g., CORS), we might still want to resolve with a placeholder or reject
        // For now, reject to handle in UI
        console.error('Failed to load image for canvas', err);
        reject(new Error('Failed to load image for story generation (CORS or network error)'));
    };
  });
};
