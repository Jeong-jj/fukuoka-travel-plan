# 후쿠오카 여행 플래너 Beta 1.6.0

React 19 + TypeScript + Vite 기반의 모바일 퍼스트 정적 여행 웹입니다.

## 실행

```bash
pnpm install
pnpm dev
```

`main` 브랜치에 푸시하면 GitHub Actions가 빌드 후 GitHub Pages에 배포합니다.

## 모바일 앱 설치

- iPhone Safari: 공유 → 홈 화면에 추가
- Android Chrome: 메뉴 → 앱 설치 또는 홈 화면에 추가
- 설치 후 독립 실행 화면과 마지막으로 열어 본 화면의 오프라인 표시 지원

## 반응형 기준

- iPhone / Galaxy 375~430px 우선
- 메인 탭과 날짜 탭 가로 스와이프
- 일정 시간+내용 2열 유지
- 쇼핑·예산 표 모바일 카드 변환
- 44px 이상 터치 영역과 iOS safe-area 지원
- 데스크톱에서는 1080px 고밀도 레이아웃 유지
