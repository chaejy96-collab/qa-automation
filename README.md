# QA Automation - Tapas.io

이 프로젝트는 Playwright를 사용하여 **실제 실무에서 요구하는 유지보수성과 확장성**을 고려하여 설계된 웹 UI 테스트 자동화 스위트입니다.

## 주요 특징 (Best Practices)

- **Page Object Model (POM)**: 페이지 단위로 동작을 캡슐화하여 코드 재사용성을 극대화했습니다.
- **Data-Driven Testing**: 테스트 데이터를 별도 파일(`data/`)로 분리하여 코드 수정 없는 데이터 관리가 가능합니다.
- **Environment Configuration**: `.env` 파일을 통해 환경별 설정(URL 등)을 중앙화했습니다.
- **Robust Locators**: 동적 ID 대신 기능 기반의 클래스(.js-*)와 구조적 로케이터를 사용하여 유지보수성을 높였습니다.

## 프로젝트 구조

```text
/qa-automation
├── .env                 # 환경 변수 (BASE_URL 등)
├── /data                # 테스트 데이터 관리 (JSON)
├── /pages               # 페이지 객체 모델 (POM)
├── /tests               # 테스트 시나리오
│   └── /user-scenarios  # 사용자 흐름별 시나리오
├── playwright.config.ts # 설정 파일 (dotenv 통합)
└── package.json
```

## 시작하기

```bash
# 1. 설치
npm install
npx playwright install

# 2. 실행
npx playwright test

# 3. 리포트 및 영상 확인
npx playwright show-report
```
