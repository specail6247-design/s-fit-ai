1. **Move Vision API logic to Server Route**
   - Create `app/api/vision/route.ts` using `run_in_bash_session` with `cat << 'EOF' > app/api/vision/route.ts` to act as a secure backend proxy for `analyzeClothingStyle`:
```typescript
import { NextResponse } from 'next/server';
import { analyzeClothingStyle } from '@/lib/visionService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const analysis = await analyzeClothingStyle(imageUrl);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Vision API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

2. **Update DigitalTwinMode.tsx**
   - Apply the following git merge diff to `components/DigitalTwinMode.tsx`:
```
<<<<<<< SEARCH
import { analyzeClothingStyle } from '@/lib/visionService';

type UploadStep = 'face' | 'body';
=======
type UploadStep = 'face' | 'body';
>>>>>>> REPLACE
<<<<<<< SEARCH
      try {
        const deepAnalysis = await analyzeClothingStyle(bodyPreview);
        setClothingAnalysis(deepAnalysis);

        // Finalize
        setSelfieData({ faceImage: facePreview, fullBodyImage: bodyPreview });
        onComplete();
      } catch (err) {
        console.error("Deep Analysis failed:", err);
=======
      try {
        const response = await fetch('/api/vision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: bodyPreview })
        });

        if (!response.ok) {
          throw new Error('Vision API error');
        }

        const deepAnalysis = await response.json();
        setClothingAnalysis(deepAnalysis);

        // Finalize
        setSelfieData({ faceImage: facePreview, fullBodyImage: bodyPreview });
        onComplete();
      } catch (err) {
        console.error("Deep Analysis failed:", err);
>>>>>>> REPLACE
```

3. **Secure the API Key in `lib/visionService.ts`**
   - Apply the following git merge diff to `lib/visionService.ts`:
```
<<<<<<< SEARCH
// In a real production app, the API key should be handled via environment variables
// and the analysis should ideally happen on the server to protect the key.
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your-key-here',
  dangerouslyAllowBrowser: true, // For client-side demo purposes only
});

/**
 * Deep Analysis using GPT-4o Vision
 */
=======
// In a real production app, the API key should be handled via environment variables
// and the analysis should ideally happen on the server to protect the key.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-key-here',
});

/**
 * Deep Analysis using GPT-4o Vision
 */
>>>>>>> REPLACE
```

4. **Verify changes**
   - Run `cat` on `components/DigitalTwinMode.tsx`, `lib/visionService.ts`, and `app/api/vision/route.ts` to ensure modifications were applied.

5. **Testing and Linting**
   - Run `pnpm install` and then `pnpm lint` and `pnpm test` to ensure changes don't cause any regressions.

6. **Pre-commit Steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

7. **Submit PR**
   - Submit the PR as Sentinel with format `🛡️ Sentinel: [CRITICAL] Fix API Key Exposure`. Provide PR description with sections 🚨 Severity, 💡 Vulnerability, 🎯 Impact, 🔧 Fix, ✅ Verification.
