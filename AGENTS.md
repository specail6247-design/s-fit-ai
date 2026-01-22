# S_FIT AI - AGENTS.md

> 이 파일은 AI 에이전트(Jules, Claude, Gemini 등)가 프로젝트를 이해하는 데 사용됩니다.

## 📋 프로젝트 개요

**S_FIT AI**는 AI 기반 가상 피팅 서비스입니다.
사용자가 옷을 가상으로 착용해볼 수 있는 웹 애플리케이션입니다.

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript (strict 모드)
- **3D 렌더링**: React Three Fiber + Three.js
- **AI/ML**: MediaPipe Pose Landmarker
- **스타일링**: Vanilla CSS (global.css)
- **상태관리**: Zustand
- **인증**: Supabase Auth
- **Virtual Try-On API**: Replicate IDM-VTON

## 📁 프로젝트 구조

```
s-fit-ai/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 메인 랜딩 페이지
│   ├── api/try-on/        # Virtual Try-On API
│   └── auth/              # 인증 관련
├── components/            # React 컴포넌트
│   ├── FittingRoom.tsx    # 핵심! 3D 피팅룸
│   ├── ARFittingMode.tsx  # AR 모드
│   ├── DigitalTwinMode.tsx # 디지털 트윈 모드
│   └── ...
├── lib/                   # 유틸리티 & 서비스
│   ├── virtualTryOn.ts    # Replicate API 연동
│   ├── mediapipe.ts       # 포즈 분석
│   └── visionService.ts   # 사이즈 추천 로직
├── data/                  # 목업 데이터
│   └── mockData.ts        # 브랜드/상품 데이터
└── public/                # 정적 파일
    └── clothing/          # 옷 이미지
```

## ✅ 코딩 스타일 규칙

### 필수

- TypeScript strict 모드 사용
- 함수형 컴포넌트만 사용 (class 금지)
- 한국어 주석 사용
- 에러 핸들링 항상 포함

### 금지

- `any` 타입 사용 금지
- `console.log` 프로덕션 코드에 남기지 않기
- `eslint-disable` 주석 금지

### 네이밍

- 컴포넌트: PascalCase (예: FittingRoom)
- 함수: camelCase (예: handleClick)
- 상수: UPPER_SNAKE_CASE (예: API_URL)
- 파일: camelCase.tsx / PascalCase.tsx (컴포넌트)

## 🎯 현재 주요 과제

### 1. Virtual Try-On 기능 (우선순위: 높음)

- **현재 상태**: Replicate IDM-VTON API 연동 코드 있음
- **문제**: 마네킹 실루엣만 표시, 실제 사람 사진 합성 안 됨
- **목표**: 사용자 사진에 옷 합성

### 2. AR 피팅 모드 개선

- **현재 상태**: MediaPipe로 포즈 감지 중
- **문제**: 옷 위치 정렬 부정확
- **목표**: 어깨/허리에 정확히 맞추기

## 🔐 환경 변수

```
REPLICATE_API_TOKEN - Virtual Try-On API
NEXT_PUBLIC_SUPABASE_URL - Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY - Supabase 익명 키
```

## 📝 테스트 체크리스트

코드 변경 후 반드시 확인:

1. [ ] `npm run build` 에러 없음
2. [ ] 타입 에러 없음
3. [ ] 브랜드 선택 → 피팅룸 진입 정상
4. [ ] 옷 선택 → 3D 뷰에 표시됨
5. [ ] AI 피팅 버튼 동작

## 💬 에이전트에게 요청할 때

좋은 요청 예시:

```
"FittingRoom.tsx의 2D 폴백 뷰를 수정해서,
사용자가 업로드한 사진 위에 선택한 옷 이미지가
어깨 위치에 맞게 오버레이되도록 해줘.
MediaPipe 랜드마크 데이터를 활용해."
```

---

> 마지막 업데이트: 2026-01-22
