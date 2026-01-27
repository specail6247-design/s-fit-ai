
export const generateStoryImage = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Ensure we are in a browser environment
    if (typeof window === 'undefined') {
      reject('Canvas is not available on server side');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject('Canvas context not available');
      return;
    }

    // 1. Background (Dark Luxury Gradient)
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, '#050505'); // Deep black/blue
    gradient.addColorStop(0.5, '#111111');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative background elements (subtle grid or lines)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 1080; i += 100) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1920);
        ctx.stroke();
    }
    for (let i = 0; i < 1920; i += 100) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1080, i);
        ctx.stroke();
    }

    // 2. Load Image
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for CORS
    img.onload = () => {
      // Calculate sizing to fit nicely within a central frame
      // We reserve top 300px and bottom 300px for branding
      const safeAreaHeight = 1920 - 600;
      const safeAreaWidth = 1080 - 100; // 50px padding

      const imgAspect = img.width / img.height;
      const safeAspect = safeAreaWidth / safeAreaHeight;

      let drawWidth, drawHeight;

      if (imgAspect > safeAspect) {
        // Image is wider than safe area
        drawWidth = safeAreaWidth;
        drawHeight = safeAreaWidth / imgAspect;
      } else {
        // Image is taller than safe area
        drawHeight = safeAreaHeight;
        drawWidth = safeAreaHeight * imgAspect;
      }

      const x = (1080 - drawWidth) / 2;
      const y = 300 + (safeAreaHeight - drawHeight) / 2;

      // Draw shadow/glow
      ctx.shadowColor = 'rgba(0, 122, 255, 0.4)'; // #007AFF
      ctx.shadowBlur = 60;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 20;

      // Draw border rect
      ctx.fillStyle = '#000';
      ctx.fillRect(x - 10, y - 10, drawWidth + 20, drawHeight + 20);

      // Draw image
      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // Reset shadow
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Draw Image Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, drawWidth, drawHeight);

      // 3. Branding Overlay

      // TOP HEADER
      ctx.textAlign = 'center';

      // "S_FIT"
      ctx.font = 'italic 900 100px sans-serif'; // Using system fonts to be safe
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('S_FIT', 540 - 110, 200);

      // "NEO"
      ctx.fillStyle = '#007AFF';
      ctx.fillText('NEO', 540 + 160, 200);

      // Subtitle
      ctx.font = '300 24px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.letterSpacing = '10px'; // Canvas doesn't support letterSpacing easily in all browsers, skipping
      ctx.fillText('DIGITAL TWIN ENGINE', 540, 250);

      // BOTTOM FOOTER
      // Date/Time
      const date = new Date();
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

      ctx.font = 'bold 30px monospace';
      ctx.fillStyle = '#007AFF';
      ctx.fillText(dateStr, 540, 1750);

      // Call to Action
      ctx.font = '900 40px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('TRY IT ON @ S-FIT.AI', 540, 1820);

      // Resolve
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = (err) => {
        console.error("Error loading image for story generation", err);
        reject('Failed to load image');
    };

    // If the image is a data URL, it should load fine.
    // If it's a remote URL, crossOrigin='anonymous' is needed and server must support CORS.
    img.src = imageUrl;
  });
};
