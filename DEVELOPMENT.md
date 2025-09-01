# 개발 가이드

심부름 관리자 시스템 개발을 위한 상세한 가이드입니다.

## 🏗 아키텍처

### Next.js App Router
- `src/app/` 디렉토리 기반의 파일 시스템 라우팅
- 서버 컴포넌트와 클라이언트 컴포넌트 분리
- 레이아웃 기반의 중첩된 라우팅 구조

### 컴포넌트 구조
```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지 (리다이렉트)
│   ├── dashboard/
│   │   └── page.tsx        # 대시보드
│   ├── users/
│   │   └── page.tsx        # 회원관리
│   └── errands/
│       └── page.tsx        # 심부름관리
└── components/
    ├── Sidebar.tsx         # 사이드바
    └── Header.tsx          # 헤더
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Blue (bg-blue-600, text-blue-600)
- **Success**: Green (bg-green-100, text-green-800)
- **Warning**: Yellow (bg-yellow-100, text-yellow-800)
- **Error**: Red (bg-red-100, text-red-800)
- **Neutral**: Gray (bg-gray-50, text-gray-900)

### 타이포그래피
- **제목**: text-2xl font-bold
- **부제목**: text-lg font-bold
- **본문**: text-sm
- **캡션**: text-xs text-gray-500

### 레이아웃
- **카드**: bg-white rounded-lg shadow
- **버튼**: px-4 py-2 rounded-lg
- **입력폼**: border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500

## 🔧 개발 워크플로우

### 1. 환경 설정
```bash
# Node.js 18+ 설치
# 프로젝트 클론
git clone <repository-url>
cd errand_admin

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 2. 코딩 컨벤션
- **파일명**: PascalCase for components, kebab-case for pages
- **함수명**: camelCase
- **상수**: UPPER_SNAKE_CASE
- **타입/인터페이스**: PascalCase

### 3. 타입 정의
```typescript
// 새로운 타입 추가 시
interface NewDataType {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
}
```

### 4. 컴포넌트 작성 가이드
```tsx
'use client'; // 클라이언트 컴포넌트인 경우

import { useState } from 'react';
import { IconName } from '@heroicons/react/24/outline';

interface ComponentProps {
  title: string;
  onAction: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState<string>('');

  const handleClick = () => {
    onAction();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        실행
      </button>
    </div>
  );
}
```

## 📊 상태 관리

### 현재 상태
- 각 페이지에서 `useState`를 사용한 로컬 상태 관리
- 목업 데이터를 배열로 관리

### 향후 개선 방향
- Context API 또는 Zustand를 활용한 전역 상태 관리
- React Query를 활용한 서버 상태 관리
- 로컬 스토리지를 활용한 데이터 영속성

## 🧪 테스트

### 테스트 구조 (향후 추가 예정)
```
__tests__/
├── components/
│   ├── Sidebar.test.tsx
│   └── Header.test.tsx
├── pages/
│   ├── dashboard.test.tsx
│   ├── users.test.tsx
│   └── errands.test.tsx
└── utils/
    └── helpers.test.tsx
```

### 권장 테스트 도구
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright 또는 Cypress
- **Type Checking**: TypeScript

## 🚀 배포

### 빌드 프로세스
```bash
# 프로덕션 빌드
npm run build

# 로컬에서 프로덕션 버전 실행
npm start

# 린트 검사
npm run lint
```

### 배포 플랫폼
- **추천**: Vercel (Next.js 최적화)
- **대안**: Netlify, AWS Amplify, Docker

## 🔍 디버깅

### 개발 도구
- Next.js DevTools
- React Developer Tools
- TypeScript 컴파일러
- ESLint

### 로그 확인
- 브라우저 개발자 도구 Console
- Next.js 서버 로그
- Network 탭에서 API 호출 확인

## 📈 성능 최적화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- WebP 포맷 지원
- 지연 로딩 구현

### 번들 최적화
- Tree shaking 활용
- 동적 임포트로 코드 분할
- 불필요한 의존성 제거

### 렌더링 최적화
- React.memo 사용
- useMemo, useCallback 활용
- 가상화를 통한 긴 목록 처리

## 🛡 보안

### 클라이언트 사이드 보안
- XSS 방지를 위한 입력값 검증
- CSRF 토큰 사용
- 민감한 데이터 로컬 스토리지 저장 금지

### 서버 사이드 보안 (향후)
- JWT 토큰 기반 인증
- API 요청 제한
- HTTPS 강제 사용

## 🤝 기여 가이드

### Pull Request 프로세스
1. Feature 브랜치 생성
2. 변경사항 구현
3. 린트 및 타입 검사 통과
4. 테스트 작성 (해당 시)
5. PR 생성 및 코드 리뷰

### 코드 리뷰 체크리스트
- [ ] 타입 안정성 확보
- [ ] 접근성 고려
- [ ] 반응형 디자인 적용
- [ ] 성능 최적화
- [ ] 보안 검토