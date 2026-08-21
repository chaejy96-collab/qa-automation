# Tapas.io QA Automation Framework

이 프로젝트는 Tapas.io 웹 서비스의 핵심 사용자 시나리오를 검증하기 위해 구축된 Playwright 기반의 자동화 테스트 프레임워크입니다. 5년 차 QA 엔지니어의 관점에서 **유지보수성(Maintainability)**, **신뢰성(Reliability)**, 그리고 **기능적 깊이(Functional Depth)**를 최우선으로 고려하여 설계되었습니다.

## 🚀 설계 철학 및 기술 전략

### 1. Page Object Model (POM) 도입
UI 구조가 변경되어도 테스트 코드 전체를 수정할 필요가 없도록, 페이지의 요소(Locator)와 동작(Action)을 `pages/` 디렉토리에 추상화했습니다. 이는 자동화의 고질적인 문제인 유지보수 비용을 획기적으로 줄여줍니다.

### 2. 신뢰성 있는 검증 (Assertion Strategy)
단순 URL 변경 검증과 같이 환경 요인에 의해 실패하기 쉬운(Flaky) 방식 대신, **사용자가 인식하는 리더 UI 요소의 가시성(Visibility)** 및 **데이터의 동적 상태(Sorting)**를 검증하여 테스트의 신뢰도를 확보했습니다.

### 3. 지능형 대기 (Auto-waiting)
`isVisible()`과 같은 불안정한 조건문 검증을 제거하고, Playwright의 내장 Auto-waiting 메커니즘(`expect(...).toBeVisible()`)을 활용하여 네트워크 지연 및 동적 로딩 환경에서도 안정적으로 동작하도록 개선했습니다.

## 🧪 테스트 시나리오 구성

| 시나리오 분류 | 검증 항목 |
| :--- | :--- |
| **핵심 유저 흐름** | 검색, 작품 상세 이동, 에피소드 선택, 내비게이션 |
| **기능적 Edge Case** | 에피소드 정렬 동적 변경 검증 |
| **경계 값 테스트** | 첫 에피소드 진입 시 '이전 화' 버튼 비활성화 상태 확인 |

## 🛠 실행 방법

```bash
# 의존성 설치
npm install

# 모든 테스트 실행
npx playwright test

# 특정 시나리오만 실행
npx playwright test tests/user-scenarios/reader-navigation.spec.ts
```
