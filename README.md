# Dayframe

모바일 퍼스트 라이프로그 Today Card 앱 (Next.js 15, TypeScript, Tailwind, App Router).

## Quick Start

```bash
pnpm install
pnpm dev
```

http://localhost:3000 에 접속하세요. 기본 라우트는 `/today` 입니다.

## 환경변수
`.env.example`를 참고해 `.env.local`을 구성하세요.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## 현재 상태 (Phase A 스캐폴드)
- 라우트: `/today`, `/history`, `/settings`, `/share/[id]`
- 디자인 토큰: `src/styles/tokens.css` (브랜드 컬러/그레이/라디우스/섀도/폰트 변수)
- 접근성 기본: 375px 기준, 포커스 링 고려된 버튼 스타일

## 다음 단계
- shadcn/ui 프리미티브 구성
- Supabase 클라이언트 및 목 어댑터 추가
- Summary Engine 유닛 테스트 추가 (Vitest)
- GitHub Actions CI 구성
