# 후쿠오카 여행 플래너 Beta 1.4.1

React 19 + TypeScript + Vite 기반의 모바일 퍼스트 정적 여행 웹입니다.

## 실행

```bash
pnpm install
pnpm dev
```

`main` 브랜치에 푸시하면 GitHub Actions가 빌드 후 GitHub Pages에 배포합니다.

## 반응형 기준

- iPhone / Galaxy 375~430px 우선
- 메인 탭과 날짜 탭 가로 스와이프
- 일정 시간+내용 2열 유지
- 쇼핑·예산 표 모바일 카드 변환
- 44px 이상 터치 영역과 iOS safe-area 지원
- 데스크톱에서는 1080px 고밀도 레이아웃 유지
