import { ClothingItem } from '@/data/mockData';

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
};

export const generateStoryImage = async (
  item: ClothingItem,
  resultImageUrl: string,
  fitScore: number,
  size?: string
): Promise<string> => {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');

  // 1. Background (Dark Gradient)
  const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
  gradient.addColorStop(0, '#0a0a0a');
  gradient.addColorStop(0.5, '#1a1a1a');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Load Images
  try {
    const resultImg = await loadImage(resultImageUrl);

    // Draw Result Image (Cover/Contain logic)
    // We want it to take up most of the center space
    const targetHeight = 1400;
    const scale = targetHeight / resultImg.height;
    const targetWidth = resultImg.width * scale;
    const x = (1080 - targetWidth) / 2;
    const y = (1920 - targetHeight) / 2;

    // Optional: Draw blurred background behind the image if it doesn't fill width
    if (targetWidth < 1080) {
        ctx.save();
        ctx.filter = 'blur(40px) brightness(0.5)';
        ctx.drawImage(resultImg, 0, 0, 1080, 1920);
        ctx.restore();
    }

    // Draw Main Image with shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 50;
    ctx.drawImage(resultImg, x, y, targetWidth, targetHeight);
    ctx.shadowBlur = 0;

    // 3. Overlay Logo (Top)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px sans-serif'; // Using system font for now
    ctx.textAlign = 'center';
    ctx.fillText('S_FIT AI', 540, 150);

    ctx.font = '30px monospace';
    ctx.fillStyle = '#007AFF';
    ctx.fillText('VIRTUAL FITTING PROTOCOL', 540, 200);

    // 4. Overlay Info (Bottom)
    const bottomY = 1650;

    // Glass card effect for info
    ctx.fillStyle = 'rgba(20, 20, 20, 0.8)';
    ctx.roundRect(100, bottomY, 880, 200, 30);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Item Name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 50px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(item.name, 150, bottomY + 80);

    // Brand
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '30px sans-serif';
    ctx.fillText(item.brand, 150, bottomY + 130);

    // Score Badge
    const scoreX = 800;
    const scoreY = bottomY + 100;
    ctx.beginPath();
    ctx.arc(scoreX, scoreY, 60, 0, Math.PI * 2);
    ctx.fillStyle = '#007AFF';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${fitScore}%`, scoreX, scoreY + 15);

    ctx.font = '16px sans-serif';
    ctx.fillText('MATCH', scoreX, scoreY + 100); // Below circle

    if (size) {
        ctx.fillStyle = '#007AFF';
        ctx.font = 'bold 30px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Size ${size}`, 150, bottomY + 170);
    }

    return canvas.toDataURL('image/png');

  } catch (e) {
    console.error('Error generating story image:', e);
    // Fallback if image fails loading?
    // Just return what we have (black bg + text)
    return canvas.toDataURL('image/png');
  }
};
