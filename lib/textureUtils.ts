export function generateNoiseCanvas(width = 512, height = 512): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const imageData = ctx.createImageData(width, height);
  const buffer = new Uint32Array(imageData.data.buffer);

  for (let i = 0; i < buffer.length; i++) {
    const v = (Math.random() * 255) | 0;
    // ABGR order for 32-bit writes
    buffer[i] = (255 << 24) | (v << 16) | (v << 8) | v;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function generateNoiseTexture(width = 512, height = 512): string {
  const canvas = generateNoiseCanvas(width, height);
  return canvas ? canvas.toDataURL('image/png') : '';
}
