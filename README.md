# 심부름 관리자 시스템

심부름 서비스를 위한 관리자 패널입니다. 회원 관리, 심부름 관리, 통계 조회 등의 기능을 제공합니다.

## 🚀 기능

### 📊 대시보드
- 총 회원수, 진행중/완료된 심부름, 총 수익 등 주요 통계 표시
- 최근 심부름 목록 확인
- 주간 심부름 현황 차트 영역

### 👥 회원관리
- 전체 회원 목록 조회 (테이블 형태)
- 이름/이메일로 검색 기능
- 역할별 필터 (의뢰자/심부름꾼)
- 상태별 필터 (활성/비활성/정지)
- 회원 상태 변경, 수정, 삭제 기능
- 회원별 완료한 심부름 수 표시

### 📋 심부름 관리
- 심부름 목록 조회 (카드 형태)
- 제목/의뢰자/위치로 검색 기능
- 상태별 필터 (대기중/수락됨/진행중/완료/취소됨)
- 카테고리별 필터 (쇼핑대행/서류업무/펫케어/청소 등)
- 심부름 상태 변경, 수정, 삭제 기능
- 위치, 마감시간, 수수료 정보 표시

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Package Manager**: npm

## 📦 설치 및 실행

### 필요 사항
- Node.js 18 이상
- npm

### 설치
```bash
# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

개발 서버가 실행되면 브라우저에서 http://localhost:3000 (또는 사용 가능한 다른 포트)로 접속할 수 있습니다.

### 빌드
```bash
npm run build
```

### 린트 검사
```bash
npm run lint
```

## 📁 프로젝트 구조

```
src/
├── app/                      # Next.js App Router
│   ├── dashboard/           # 대시보드 페이지
│   ├── users/              # 회원관리 페이지
│   ├── errands/            # 심부름 관리 페이지
│   ├── layout.tsx          # 전역 레이아웃
│   └── page.tsx            # 홈 페이지 (대시보드로 리다이렉트)
├── components/             # 재사용 가능한 컴포넌트
│   ├── Sidebar.tsx        # 사이드바 네비게이션
│   └── Header.tsx         # 헤더 컴포넌트
└── globals.css            # 전역 스타일
```

## 🎨 UI/UX

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 화면에서 최적화
- **직관적인 네비게이션**: 왼쪽 사이드바를 통한 쉬운 페이지 이동
- **일관된 디자인**: Tailwind CSS를 활용한 통일된 디자인 시스템
- **접근성**: 적절한 색상 대비와 키보드 네비게이션 지원

## 📊 데이터 구조

### 회원 (User)
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'worker';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  completedErrands: number;
}
```

### 심부름 (Errand)
```typescript
interface Errand {
  id: number;
  title: string;
  description: string;
  client: string;
  worker?: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  fee: number;
  location: string;
  createdAt: string;
  deadline: string;
  category: string;
}
```

## 🔧 개발 가이드

### 새로운 페이지 추가
1. `src/app/` 디렉토리에 새 폴더 생성
2. `page.tsx` 파일 생성
3. `src/components/Sidebar.tsx`에 네비게이션 메뉴 추가

### 컴포넌트 개발 원칙
- TypeScript를 사용하여 타입 안정성 확보
- 재사용 가능한 컴포넌트는 `src/components/`에 배치
- Tailwind CSS 클래스를 사용하여 스타일링
- 접근성을 고려한 마크업 작성

## 🚧 향후 개선 사항

- [ ] 실제 API 연동
- [ ] 차트 라이브러리 (Chart.js/Recharts) 적용
- [ ] 페이지네이션 기능 구현
- [ ] 검색 성능 최적화
- [ ] 실시간 알림 시스템
- [ ] 데이터 내보내기 기능
- [ ] 다크 모드 지원
- [ ] 다국어 지원

## 📝 라이선스

이 프로젝트는 개인 프로젝트로 제작되었습니다.
