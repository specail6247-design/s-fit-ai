export const generateStoryImage = async (
  imageUrl: string,
  brandName: string = 'S_FIT AI',
  fitScore: number = 95
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Instagram Story Dimensions
    const width = 1080;
    const height = 1920;

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for external images
    img.onload = () => {
      // 1. Draw Background Image (Cover)
      // Calculate aspect ratios
      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) {
        // Image is wider than canvas
        drawHeight = height;
        drawWidth = height * imgAspect;
        offsetY = 0;
        offsetX = (width - drawWidth) / 2;
      } else {
        // Image is taller than canvas
        drawWidth = width;
        drawHeight = width / imgAspect;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      // Black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // 2. Add Gradient Overlay (Bottom)
      const gradient = ctx.createLinearGradient(0, height * 0.5, 0, height);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(0.7, 'rgba(0,0,0,0.8)');
      gradient.addColorStop(1, 'rgba(0,0,0,1)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Add Branding Text
      // Brand Name
      ctx.font = 'bold 80px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(brandName.toUpperCase(), width / 2, height - 400);

      // "S_FIT AI" Logo
      ctx.font = 'italic 900 60px "Cinzel", serif';
      ctx.fillStyle = '#007AFF'; // S_FIT Blue
      ctx.fillText('S_FIT NEO', width / 2, height - 300);

      // Fit Score Badge
      ctx.save();
      ctx.translate(width / 2, height - 150);

      // Circle background
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.fillStyle = '#007AFF';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Score Text
      ctx.font = 'bold 60px monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${fitScore}%`, 0, 5);

      // Label
      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText('FIT MATCH', 0, 45);

      ctx.restore();

      // 4. Resolve with Data URI
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = (err) => {
      reject(err);
    };

    img.src = imageUrl;
  });
};
