# SPEC — S_FIT AI

## 0) One-liner

이 프로젝트는 **온라인 쇼핑객에게** **AI 기반 가상 피팅 및 사이즈 추천 서비스**를 제공한다.

## 1) Goals (MUST)

- MUST: 사용자의 전신 사진과 옷 이미지를 합성하여 실제 착용 모습을 보여준다 (Replicate IDM-VTON)
- MUST: 체형 분석 기반 개인 맞춤 사이즈 추천을 제공한다 (MediaPipe Pose)
- MUST: 6개 이상의 패션 브랜드(ZARA, Gucci, Uniqlo, H&M, COS, GAP) 상품을 지원한다
- MUST: 모바일/데스크탑 반응형 UI를 제공한다

## 2) Non-goals (MUST NOT)

- MUST NOT: 실제 결제/구매 기능 구현 (MVP 범위 외)
- MUST NOT: 사용자 계정/결제 정보 저장
- MUST NOT: 실시간 브랜드 웹사이트 크롤링 (정적 목 데이터 사용)
- MUST NOT: 3D 아바타 커스터마이징

## 3) Scope (What / What not)

### In scope

- AI Virtual Try-On (Replicate IDM-VTON API 연동)
- 얼굴/체형 분석 (MediaPipe Face Detection + Pose Estimation)
- 3가지 모드: Vibe Check, Digital Twin, Easy Fit
- 브랜드별 상품 브라우징 (6개 브랜드, 27개 상품)
- 사이즈 추천 알고리즘
- Fit Score 계산 및 표시
- Google OAuth 로그인

### Out of scope

- 실시간 재고 확인
- 외부 결제 연동
- 사용자 피팅 기록 저장 (다음 릴리즈)
- 추가 브랜드 확장 (다음 릴리즈)

## 4) Acceptance Criteria (Given / When / Then)

### Scenario 1: AI 피팅 생성

- Given: 사용자가 전신 사진을 업로드하고 상품을 선택한 상태
- When: "AI 피팅 시작하기" 버튼 클릭
- Then: 20-30초 내에 합성된 피팅 이미지가 표시됨

### Scenario 2: 사이즈 추천

- Given: 사용자가 체형 정보(키/몸무게)를 입력한 상태
- When: 상품 상세 화면 진입
- Then: 해당 상품에 대한 추천 사이즈와 Fit Score가 표시됨

### Scenario 3: 브랜드 탐색

- Given: 사용자가 앱에 접속한 상태
- When: 브랜드 선택 후 Continue 클릭
- Then: 해당 브랜드의 상품 리스트가 표시됨

### Scenario 4: 얼굴 분석 (Vibe Check)

- Given: 사용자가 Vibe Check 모드를 선택한 상태
- When: 셀피 이미지 업로드
- Then: 얼굴 분석 결과와 Vibe Score가 표시됨

## 5) Done (완료 조건)

- [x] 모든 Acceptance Criteria 통과
- [x] Vercel 프로덕션 빌드/배포 성공
- [x] AI 피팅 API 정상 작동 (Base64 이미지 변환 수정 완료)
- [x] 6개 브랜드, 27개 상품 데이터 등록
- [x] MediaPipe 얼굴/포즈 분석 작동
- [ ] 환경변수 Vercel 설정 (REPLICATE_API_TOKEN)

## 6) Do not (금지사항)

- 금지: "추측으로 기능 추가" - 사용자 요청 없이 새 기능 추가 금지
- 금지: 스펙과 충돌 시 임의 결정 → ADR/TODO로 남기기
- 금지: Replicate API 토큰 하드코딩
- 금지: 외부 URL을 localhost로 전송 (이미 수정됨)

---

## 기술 스택

| 카테고리   | 기술                             |
| ---------- | -------------------------------- |
| Frontend   | Next.js 16, React 19, TypeScript |
| Styling    | Tailwind CSS, Framer Motion      |
| 3D         | Three.js, React Three Fiber      |
| AI/ML      | Replicate (IDM-VTON), MediaPipe  |
| Auth       | Supabase Auth (Google OAuth)     |
| Deployment | Vercel                           |

## 주요 API

- `/api/try-on` - AI 가상 피팅 (Replicate IDM-VTON)
- `/api/auth/*` - 인증 (Supabase)

## 배포 URL

- **Production**: https://s-fit-ai.vercel.app
