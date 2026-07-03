import React from 'react';

export const shareToInstagramStory = async (imageUrl: string) => {
  try {
    // 1. Create a canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // 2. Draw background (S_FIT NEO branding)
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid pattern for luxury tech feel
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 100) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 100) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // 3. Draw Branding
    ctx.fillStyle = '#007AFF';
    ctx.font = 'bold 80px Arial'; // Using standard fonts as fallback
    ctx.textAlign = 'center';
    ctx.fillText('S_FIT NEO', canvas.width / 2, 200);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '30px Arial';
    ctx.letterSpacing = '10px';
    ctx.fillText('VIRTUAL TRY-ON', canvas.width / 2, 260);

    // 4. Load & Draw Image
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for CORS if fetching from external URL

    // Convert to promise to await loading
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    // Calculate dimensions to fit and center image nicely (adding a border)
    const padding = 100;
    const maxWidth = canvas.width - (padding * 2);
    const maxHeight = canvas.height - 600; // Leave space for header/footer

    let imgWidth = img.width;
    let imgHeight = img.height;
    const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

    imgWidth *= ratio;
    imgHeight *= ratio;

    const x = (canvas.width - imgWidth) / 2;
    const y = (canvas.height - imgHeight) / 2;

    // Draw image border/glow
    ctx.shadowColor = '#007AFF';
    ctx.shadowBlur = 50;
    ctx.fillStyle = '#111';
    ctx.fillRect(x - 10, y - 10, imgWidth + 20, imgHeight + 20);

    ctx.shadowBlur = 0;
    ctx.drawImage(img, x, y, imgWidth, imgHeight);

    // 5. Footer Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.fillText('Try it yourself at s-fit.ai', canvas.width / 2, canvas.height - 150);

    // 6. Convert to blob and share
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));

    if (!blob) throw new Error('Failed to generate image blob');

    const file = new File([blob], 'sfit_story.jpg', { type: 'image/jpeg' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'My S_FIT NEO Virtual Try-On',
        text: 'Check out my virtual fitting on S_FIT NEO! 🚀',
        files: [file],
      });
    } else {
      // Fallback: trigger download
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'sfit_story.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      alert('Image downloaded! You can now share it to your story.');
    }
  } catch (error) {
    console.error('Error sharing story:', error);
    alert('Could not generate story image. Please try again.');
  }
};
