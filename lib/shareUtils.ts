export const shareToStory = async (imageUrl: string) => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Draw main image
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for external images
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    // Calculate aspect ratio to fit inside canvas with padding
    const padding = 100;
    const maxWidth = 1080 - (padding * 2);
    const maxHeight = 1920 - (padding * 4); // Leave room for logo/text

    const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
    const drawWidth = img.width * ratio;
    const drawHeight = img.height * ratio;

    const x = (1080 - drawWidth) / 2;
    const y = (1920 - drawHeight) / 2;

    // Draw image with rounded corners effect (via clipping)
    ctx.save();
    ctx.beginPath();
    const radius = 40;
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + drawWidth - radius, y);
    ctx.quadraticCurveTo(x + drawWidth, y, x + drawWidth, y + radius);
    ctx.lineTo(x + drawWidth, y + drawHeight - radius);
    ctx.quadraticCurveTo(x + drawWidth, y + drawHeight, x + drawWidth - radius, y + drawHeight);
    ctx.lineTo(x + radius, y + drawHeight);
    ctx.quadraticCurveTo(x, y + drawHeight, x, y + drawHeight - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
    ctx.restore();

    // Add Branding Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 60px Geist, sans-serif'; // Assuming Geist font, fallback to sans-serif
    ctx.textAlign = 'center';
    ctx.fillText('S_FIT AI', 1080 / 2, y - 60);

    ctx.fillStyle = '#007AFF';
    ctx.font = '40px monospace';
    ctx.letterSpacing = '10px'; // Note: context.letterSpacing is supported in modern browsers
    ctx.fillText('VIRTUAL FITTING', 1080 / 2, y + drawHeight + 80);

    // Get the data URL
    const dataUrl = canvas.toDataURL('image/png');

    // Create download link (or trigger share API if on mobile)
    if (navigator.share) {
      try {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'sfit-story.png', { type: 'image/png' });
        await navigator.share({
          title: 'My Virtual Fit',
          text: 'Check out my virtual fit from S_FIT AI!',
          files: [file]
        });
        return;
      } catch (err) {
        console.log('Native share failed, falling back to download', err);
      }
    }

    // Fallback to download
    const link = document.createElement('a');
    link.download = 'sfit-story.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error('Error generating story image:', error);
    alert('Failed to generate story image. Please try again.');
  }
};
