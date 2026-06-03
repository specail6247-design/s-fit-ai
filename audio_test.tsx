import React, { useRef, useState } from 'react';

// Sensory Ambience:
// Audio: Add a subtle, mute-able background hum (white noise or soft synth) that plays when in "Immersive Fitting State". (Optional but elevates immersion).

export default function AudioTest() {
  const [isProcessing, setIsProcessing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (isProcessing) {
      audioRef.current?.play().catch(e => console.log('Audio autoplay blocked:', e));
    } else {
      audioRef.current?.pause();
    }
  }, [isProcessing]);

  return (
    <div>
      <audio ref={audioRef} loop src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" />
      <button onClick={() => setIsProcessing(!isProcessing)}>Toggle</button>
    </div>
  )
}
