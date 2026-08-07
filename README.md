# QA Automation - Playwright Project

이 프로젝트는 Playwright를 사용한 웹 UI 테스트 및 시나리오 자동화 스위트입니다.

## 주요 구성 요소

- **테스트 프레임워크**: Playwright (TypeScript)
- **대상 애플리케이션**: Tapas 웹 플랫폼 시나리오 자동화
- **CI/CD**: GitHub Actions 워크플로우 지원 (`.github/workflows/playwright.yml`)

## 시작하기

### 1. 패키지 설치

필요한 의존성 패키지와 Playwright 브라우저 바이너리를 설치합니다.

```bash
npm install
npx playwright install
```

### 2. 환경 변수 설정

루트 디렉토리에 `.env` 파일을 생성하고 필요한 환경 변수를 채워줍니다. (예시: API Key, 계정 정보 등)

```env
# 예시
# BASE_URL=https://tapas.io
```

### 3. 테스트 실행

```bash
# 전체 테스트 실행
npx playwright test

# 특정 브라우저로 실행
npx playwright test --project=chromium

# UI 모드로 실행
npx playwright test --ui
```

### 4. 리포트 확인

기본적으로 HTML 리포트가 생성되며, 테스트가 실패할 경우 자동으로 브라우저에 리포트가 열리도록 설정되어 있습니다.

```bash
npx playwright show-report
```
