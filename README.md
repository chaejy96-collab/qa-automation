# QA 자동화 테스트 프로젝트

Selenium과 pytest를 활용한 웹 서비스 자동화 테스트 프로젝트입니다.

## 테스트 항목

### 네이버 검색 테스트 (test_naver.py)
- 검색어 입력 후 결과 페이지 정상 이동 검증
- 빈 검색어 입력 시 동작 검증
- 블로그 탭 클릭 후 정상 이동 검증
- 검색 결과 30개 이상 노출 검증

### Tapas 로그인 테스트 (test_tapas.py)
- 이메일/패스워드 정상 로그인 검증
- 틀린 비밀번호 입력 시 에러 메시지 검증
- CAPTCHA 감지 시 자동 스킵 처리

### 시나리오 테스트 (test_scenario.py)
- 네이버 검색 → 블로그 탭 클릭 → 첫 번째 결과 클릭 → 새 탭 URL 검증

## 사용 기술
- Python
- Selenium
- pytest
- pytest-html

## 실행 방법
```bash
pip install selenium pytest pytest-html chromedriver-autoinstaller
pytest
```

## 테스트 결과
pytest 실행 시 report.html 파일로 결과 자동 생성