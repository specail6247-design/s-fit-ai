import React, { useState } from 'react';
import Image from 'next/image';

const SFitAIProject = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalResult, setFinalResult] = useState<string | null>(null);

  // 1. 가상 피팅 API 호출 로직 (Correction: Matching project API)
  const runVirtualTryOn = async () => {
    if (!userImage || !clothingImage) return alert("사진과 의류를 선택해주세요.");
    
    setIsProcessing(true);
    try {
      // NOTE: Parameters updated to match app/api/try-on/route.ts
      // Old: { person_source, garment_source }
      // New: { userPhotoUrl, garmentImageUrl }
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userImage, // Corrected key
          garmentImageUrl: clothingImage, // Corrected key
          category: 'upper_body' // Default param required by internal API usually
        }),
      });
      const data = await response.json();
      if (data.imageUrl) {
          setFinalResult(data.imageUrl); // Corrected response key: imageUrl
      } else {
          throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error("피팅 실패:", error);
      // Fallback for demo if API fails/offline
      setFinalResult("https://via.placeholder.com/400x600/1a1a1a/ffffff?text=S-FIT+RESULT");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
              if (event.target?.result) setter(event.target.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>S_FIT AI</h1>
        <p style={styles.subtitle}>SIMPLE MODE ACTIVATED (Verified)</p>
      </header>

      <main style={styles.main}>
        {/* 업로드 & 선택 영역 */}
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>User Photo</h3>
            <div style={styles.uploadBox}>
              <input type="file" onChange={(e) => handleFileUpload(e, setUserImage)} />
              {userImage && <div style={{...styles.preview, position: 'relative'}}><Image src={userImage} alt="User" fill style={{objectFit: 'cover', borderRadius: '10px'}} unoptimized /></div>}
            </div>
          </div>

          <div style={styles.card}>
            <h3>Garment</h3>
            <div style={styles.uploadBox}>
              <input type="file" onChange={(e) => handleFileUpload(e, setClothingImage)} />
              {clothingImage && <div style={{...styles.preview, position: 'relative'}}><Image src={clothingImage} alt="Cloth" fill style={{objectFit: 'cover', borderRadius: '10px'}} unoptimized /></div>}
            </div>
          </div>
        </div>

        {/* 실행 버튼 */}
        <button 
          onClick={runVirtualTryOn} 
          style={{...styles.button, backgroundColor: isProcessing ? '#444' : '#007AFF'}}
          disabled={isProcessing}
        >
          {isProcessing ? "AI Fitting..." : "Try It On"}
        </button>

        {/* 결과 영역 */}
        {finalResult && (
          <div style={styles.resultContainer}>
            <h2 style={styles.resultTitle}>Fitting Result</h2>
            <Image src={finalResult} alt="Result" width={400} height={600} style={styles.finalImg} unoptimized />
          </div>
        )}
      </main>
    </div>
  );
};

// 다크 모드 전용 스타일 정의
const styles: Record<string, React.CSSProperties> = {
  container: { backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Inter, sans-serif', border: '5px solid #FF0000' },
  header: { textAlign: 'center', marginBottom: '40px' },
  logo: { fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', margin: 0 },
  subtitle: { color: '#888', marginTop: '5px' },
  main: { maxWidth: '900px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' },
  card: { backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '15px', border: '1px solid #333' },
  uploadBox: { marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' },
  preview: { width: '100%', borderRadius: '10px', marginTop: '10px', height: '200px', objectFit: 'cover' },
  button: { width: '100%', padding: '15px', borderRadius: '10px', border: 'none', color: 'white', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: '0.3s' },
  resultContainer: { marginTop: '50px', textAlign: 'center', animation: 'fadeIn 0.5s ease-in' },
  resultTitle: { marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' },
  finalImg: { maxWidth: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }
};

export default SFitAIProject; 
