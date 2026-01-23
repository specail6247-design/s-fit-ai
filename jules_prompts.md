# Jules High-Fidelity Prompts

> **Note to User**: 아래 프롬프트들은 Jules에게 복사해서 그대로 전달하면 됩니다. 한 번에 하나씩 단계별로 실행시키는 것을 추천합니다.

---

## 🎬 Prompt 1: The Hollywood AI Video Engine (영상/모션)

**목표**: S_FIT AI를 단순 이미지 합성이 아닌, Runway 스타일의 '패션 필름' 생성기로 변신.

```markdown
Jules, 우리 앱의 시각적 경험을 '헐리우드 영화' 수준으로 끌어올리고 싶어.
지금의 정적인 가상 피팅(Image-to-Image)을 넘어서, **Video-to-Video 피팅 엔진**을 구축해줘.

**구체적인 요구사항:**

1. **Engine Upgrade**: `lib/virtualTryOn.ts`를 수정해서, Replicate의 최신 **"Stable Video Diffusion (SVD)"** 또는 **"Runway Gen-3 Alpha"** API를 연동해.
2. **Motion Logic**:
   - 사용자가 전신 사진 1장을 올리면, 이를 기반으로 4초 분량의 '런웨이 워킹' 또는 '360도 턴' 영상을 생성해야 해.
   - 단순히 옷만 입히는 게 아니라, 옷자락의 휘날림(Cloth Simulation)과 머리카락의 찰랑거림까지 물리적으로 자연스러워야 해.
3. **Output**: 결과물은 `<video>` 태그로 자동 재생되며, "Cinematic Mode" 버튼을 누르면 전체 화면으로 재생되게 UI를 구성해줘.

이 기능을 위한 새로운 API Route `/api/cinematic-try-on`을 작성하고, 프론트엔드 컴포넌트 `CinematicViewer.tsx`를 구현해줘.
```

---

## 🔬 Prompt 2: The Nano-Texture & Physics (초정밀 텍스처/물리)

**목표**: 확대해도 실밥이 보일 정도의 초고화질 텍스처와 부드러운 물리 엔진 적용.

```markdown
Jules, 우리 앱의 옷 재질 표현이 너무 평면적이야. **"만질 수 있을 것 같은"** 수준의 텍스처링과 물리 엔진을 도입하자.

**구체적인 요구사항:**

1. **AI Super-Resolution**:
   - `scripts/texture_upscaler.py`를 만들어. 저화질 쇼핑몰 이미지를 입력받으면 **Real-ESRGAN**을 통해 4K로 업스케일링하고, **Normal Map(요철)**과 **Displacement Map(깊이)**을 추출해줘.
2. **Softbody Physics**:
   - `components/FittingRoom.tsx`의 Three.js 씬에 **Ammo.js** 물리 엔진을 적용해.
   - '실크'는 흐르듯이 부드럽게(`stiffness: 0.1`), '데님'은 빳빳하게(`stiffness: 0.8`), '가죽'은 무겁게 반응하도록 소재별 물리 프리셋을 정의해줘.
3. **Micro-Zoom Interaction**:
   - 사용자가 옷을 줌인(Pinch Zoom)하면, 자동으로 '마이크로 텍스처 모드'로 전환되어 원단의 직조감(Knit pattern, Denim twill)이 보여야 해.

이걸 구현해서, 사용자가 옷을 클릭했을 때 출렁이는 물리 효과를 보여줘.
```

---

## 🛍️ Prompt 3: The Universal Wardrobe Scraper (글로벌 데이터)

**목표**: 전 세계 명품 및 K-브랜드를 우리 앱으로 집대성.

```markdown
Jules, 이제 콘텐츠 싸움이야. 전 세계 모든 옷을 우리 앱에서 입어볼 수 있게 **"Universal Brand Scraper"**를 구축해줘.

**구체적인 요구사항:**

1. **Target**: 명품 플랫폼(Farfetch, SSENSE)과 K-패션(Musinsa, W Concept)을 타겟팅해.
2. **Intelligence**:
   - 단순 이미지 크롤링이 아니야. 상품 페이지의 텍스트를 분석해서 **"소재 혼용률(Material Composition)"**을 파싱해. (예: "Wool 90%, Cashmere 10%" → `texture_type: 'soft_wool'`)
   - 이 데이터를 바탕으로 위에서 만든 '물리 엔진 프리셋'을 자동으로 매핑해.
3. **Automation**:
   - 매일 자정에 신상품을 긁어오는 `scripts/daily_fashion_sync.py`를 작성하고, Supabase DB에 자동으로 업데이트되도록 스케줄러를 짜줘.

데이터가 생명이야. 가장 핫한 신상이 매일 아침 우리 앱에 걸려있어야 해.
```

---

## 👗 Prompt 4: Masterpiece Fit Consultant (완벽한 핏)

**목표**: 재단사(Tailor) 수준의 정교한 사이즈 추천 및 핏 분석.

```markdown
Jules, 사이즈 추천 기능이 너무 단순해 (BMI 기준). 이걸 **"AI Masterpiece Fit"**으로 격상시키자.

**구체적인 요구사항:**

1. **3D Body Scanning**:
   - 사용자의 2D 사진에서 3차원 바디 메쉬를 복원하는 **HMR 2.0 (Human Mesh Recovery)** 모델을 연동해.
   - 어깨 경사도, 팔 길이, 허리-힙 비율을 cm 단위로 추출해내야 해.
2. **Fit Advisor Logic**:
   - 추출된 신체 치수와 옷의 실측 사이즈(Size Chart)를 비교해서, 단순 추천이 아닌 **"컨설팅"**을 해줘.
   - 예: "고객님은 팔이 긴 편이라 M 사이즈는 소매가 짧을 수 있습니다. L 사이즈를 추천하되, 허리 수선이 필요할 수 있습니다."
3. **Visual Heatmap**:
   - 옷을 입었을 때 꽉 끼는 부위는 붉은색, 헐렁한 부위는 푸른색으로 보여주는 **"Fit Heatmap"** 레이어를 피팅룸 위에 띄워줘.

이건 단순 계산기가 아니라, '나만의 전담 AI 테일러'가 되어야 해.
```

---

## 💍 Prompt 5: The Accessory & Layering System (악세사리 확장)

**목표**: 옷을 넘어 가방, 모자, 쥬얼리까지 착용 가능한 토탈 스타일링.

```markdown
Jules, 패션의 완성은 악세사리야. Top/Bottom을 넘어 **Accessories** 카테고리를 완벽하게 지원해줘.

**구체적인 요구사항:**

1. **Multi-Class Segmentation**:
   - **SAM 2 (Segment Anything Model)**를 도입해서, 목, 손목, 귀, 머리 등을 정확하게 인식해.
2. **Layering Intelligence (Z-Index Logic)**:
   - 목걸이는 옷 위로 나올 수도 있고(안으로 들어갈 수도 있고), 가방 끈은 어깨를 눌러야 해.
   - 이 **Depth Layering** 처리를 픽셀 단위로 정교하게 구현해줘. 옷 위에 악세사리가 둥둥 떠다니는 느낌이 들면 절대 안 돼.
3. **Catalog Expansion**:
   - `MockData`에 가방(Tote, Shoulder), 모자(Cap, Beanie), 쥬얼리(Necklace, Earrings) 카테고리를 추가하고, 스크래퍼도 이에 맞춰 업데이트해.

사용자가 "샤넬 백"을 들고 "슈프림 모자"를 쓴 모습을 완벽하게 시뮬레이션해줘.
```

---

### 💡 User Tip

이 프롬프트들은 각각 하나의 거대한 프로젝트입니다. Jules에게 한 번에 하나씩만 전달하여 집중하게 하세요. **Prompt 1 (Video Engine)**부터 시작하는 것을 추천합니다. 시각적 임팩트가 가장 크기 때문입니다.
